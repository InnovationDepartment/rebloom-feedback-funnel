const Shopify = require('shopify-api-node')

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
})

const createShopifyOrder = async data => {
  const { email, address1, address2, first_name, last_name, city, state: province_code, zip } = data
  return shopify.order.create({
    email,
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
    shipping_address: {
      first_name,
      last_name,
      address1,
      address2,
      city,
      province_code,
      zip,
      country_code: 'US',
    },
    shipping_lines: [
      {
        title: 'Free Shipping',
        price: '0.00',
        code: 'Free Shipping',
      },
    ],
    tags: 'bonus-bottle',
    test: process.env.APP_ENV !== 'production',
  })
}


module.exports = {
  createShopifyOrder,
}
