const Shopify = require('shopify-api-node')

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
})

const createShopifyOrder = async details => {
  const order = await shopify.order.create({
    email: 'phil+8882@innovationdept.com',
    financial_status: 'paid',
    send_receipt: true,
    send_fulfillment_receipt: true,
    line_items: [
      {
        variant_id: 29165768999021,
        quantity: 1,
        requires_shipping: true,
      },
    ],
    note: 'Bonus Bottle',
    shipping_address: {
      first_name: 'Phil',
      last_name: 'Ng',
      address1: '10210 66th Rd',
      address2: 'Apt 1E',
      city: 'Forest Hills',
      province_code: 'NY',
      zip: '11375',
      country_code: 'US',
    },
    test: process.env.NODE_ENV !== 'production',
  })
  return order
}

module.exports = {
  createShopifyOrder,
}
