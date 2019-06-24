'use strict'
const { Op } = require('sequelize')
const createError = require('http-errors')
const { createShopifyOrder } = require('../../util/shopify-api')

module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define(
    'Entries',
    {
      has_redeemed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      order_id: DataTypes.STRING,
      order_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      purchase_date: DataTypes.DATE,
      usage: DataTypes.STRING,
      items: DataTypes.ARRAY(DataTypes.STRING),
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      copied_comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      clicked_amazon_link: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      shipping_first_name: DataTypes.STRING,
      shipping_last_name: DataTypes.STRING,
      shipping_line1: DataTypes.STRING,
      shipping_line2: DataTypes.STRING,
      shipping_city: DataTypes.STRING,
      shipping_state: DataTypes.STRING,
      shipping_zip: DataTypes.STRING,
      shopify_order_id: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'entries',
    }
  )

  Entries.findOrCreateEntry = async entryData => {
    try {
      return await Entries.findOrCreate({
        where: {
          email: { [Op.eq]: entryData.email },
        },
        defaults: entryData,
      })
    } catch (e) {
      throw new Error('Uh oh, we had an issue signing you up. Please try again.')
    }
  }

  Entries.prototype.updateEntry = async function(entryData) {
    try {
      return await this.update(entryData)
    } catch (e) {
      throw new Error('Uh oh, we had an issue updating your information. Please try again.')
    }
  }

  Entries.prototype.generateShopifyOrder = async function(shipping) {
    try {
      return createShopifyOrder({ ...shipping, email: this.email })
    } catch (e) {
      throw new Error('Uh oh, we had an issue updating your information. Please try again.')
    }
  }

  return Entries
}
