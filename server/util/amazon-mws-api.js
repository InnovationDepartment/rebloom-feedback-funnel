const crypto = require('crypto')
const util = require('util')
const { parseString } = require('xml2js')
const axios = require('axios')
const csv = require('csvtojson')
const Promise = require('bluebird')

const secret = process.env.AWS_MWS_CLIENT_SECRET
const parseXML = util.promisify(parseString)
const { AmazonOrders } = require('./../db/models')
const redisClient = require('./../db/redis')

// Required params for any Amazon MWS API call
const BASE_PARAMS = {
  AWSAccessKeyId: process.env.AWS_MWS_ACCESS_KEY,
  SellerId: process.env.AWS_MWS_SELLER_ID,
  SignatureMethod: 'HmacSHA256',
  SignatureVersion: '2',
}

// signs the AWS query request with the AWS Client Secret
const generateSignature = str => {
  return crypto
    .createHmac('sha256', secret)
    .update(str)
    .digest('base64')
}

// generate query string with sorted keys
const querystring = obj => {
  return Object.keys(obj)
    .sort()
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    })
    .join('&')
}

// Extract order details - Expect ListOrderItemsResponse object
const extractOrderDetails = data => {
  const {
    ListOrderItemsResult: [
      {
        OrderItems: [{ OrderItem }],
        AmazonOrderId,
      },
    ],
  } = data

  const items_ASINs = OrderItem.map(item => {
    return {
      asin: item.ASIN[0],
      discount: item.PromotionDiscount.reduce(
        (acc, discount) => acc + Number(discount.Amount[0]),
        0
      ),
    }
  })
  return {
    id: AmazonOrderId[0],
    items_ASINs,
  }
}

// Amazon MWS - GetReport API Call
const getReport = async reportId => {
  const params = {
    Action: 'GetReport',
    ReportId: reportId,
    Version: '2009-01-01',
  }
  const uri = '/Reports/2009-01-01'
  const response = await APICall(params, uri)
  return csv({ delimiter: '\t' }).fromString(response)
}

// Amazon MWS - GetReportRequestList API Call
const getReportRequestList = async reportRequestId => {
  const params = {
    Action: 'GetReportRequestList',
    Version: '2009-01-01',
    Timestamp: new Date().toISOString(),
    'ReportRequestIdList.Id.1': reportRequestId,
  }
  const uri = '/Reports/2009-01-01'
  const response = await APICall(params, uri)
  return parseXML(response)
}

// Amazon MWS - RequestReport API Call
const requestAmazonReport = async (startDate, endDate) => {
  const params = {
    Action: 'RequestReport',
    Version: '2009-01-01',
    ReportType: '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_',
    StartDate: startDate.toISOString(),
    EndDate: endDate.toISOString(),
    Timestamp: new Date().toISOString(),
  }
  const uri = '/Reports/2009-01-01'
  const response = await APICall(params, uri)
  const {
    RequestReportResponse: {
      RequestReportResult: [
        {
          ReportRequestInfo: [
            {
              ReportRequestId: [id],
            },
          ],
        },
      ],
    },
  } = await parseXML(response)
  if (id) {
    await redisClient.setexAsync(
      `mwsReportRequestId`,
      60 * 60 * 24, // Expires after 24hrs (secs)
      id
    )
  } else {
    throw new Error('No report request id sent back')
  }
}

const processReportRequestList = data => {
  const {
    GetReportRequestListResponse: {
      GetReportRequestListResult: [
        {
          ReportRequestInfo: [
            {
              ReportProcessingStatus: [status],
              GeneratedReportId: [reportId],
            },
          ],
        },
      ],
    },
  } = data
  return { reportId, status }
}

const fetchAmazonOrderData = async () => {
  const reportRequestId = await redisClient.getAsync(`mwsReportRequestId`)
  if (!reportRequestId) {
    throw new Error('No report request id available, you must request report first!')
  }
  const response = await getReportRequestList(reportRequestId)
  const { reportId, status } = processReportRequestList(response)
  if (status === '_DONE_') {
    await fetchAndStoreOrders(reportId)
  } else {
    throw new Error('Report is not ready')
  }
}

const fetchAndStoreOrders = async reportId => {
  const orderHash = {}
  const jsonArray = await getReport(reportId)

  // only storing shipped orders
  const shippedArray = jsonArray.filter(row => row['item-status'] === 'Shipped')
  shippedArray.forEach(row => {
    if (orderHash[row['amazon-order-id']]) {
      orderHash[row['amazon-order-id']]['items_ASINs'].push(row['asin'])
      orderHash[row['amazon-order-id']]['discount'].push(row['item-promotion-discount'] || '0.00')
      orderHash[row['amazon-order-id']]['price'].push(row['item-price'])
    } else {
      orderHash[row['amazon-order-id']] = {
        order_id: row['amazon-order-id'],
        order_status: row['item-status'],
        order_purchase_date: row['purchase-date'],
        order_last_updated: row['last-updated-date'],
        items_ASINs: [row['asin']],
        discount: [row['item-promotion-discount'] || '0.00'],
        price: [row['item-price']],
      }
    }
  })
  const orders = Object.keys(orderHash).map(key => {
    const { items_ASINs, discount, price, ...rest } = orderHash[key]
    return {
      ...rest,
      items_ASINs: items_ASINs.join(','),
      discount: discount.join(','),
      price: price.join(','),
    }
  })

  await Promise.map(
    orders,
    order => {
      return AmazonOrders.create(order).catch(() => Promise.resolve())
    },
    { concurrency: 3 }
  )
}

const APICall = async (params, uri) => {
  const queryParams = {
    ...BASE_PARAMS,
    ...params,
    Timestamp: new Date().toISOString(),
  }

  const canonicalizedQueryString = querystring(queryParams)
  const method = 'GET'
  const host = 'mws.amazonservices.com'

  const stringToSign = `${method}\n${host}\n${uri}\n${canonicalizedQueryString}`

  queryParams['Signature'] = generateSignature(stringToSign)

  const finalQueryString = querystring(queryParams)

  const url = `https://${host}${uri}?${finalQueryString}`

  const { data } = await axios.get(url)
  return data
}

module.exports = {
  fetchAmazonOrderData,
  requestAmazonReport,
}
