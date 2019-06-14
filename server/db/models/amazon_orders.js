module.exports = (sequelize, DataTypes) => {
  const AmazonOrders = sequelize.define(
    'AmazonOrders',
    {
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      order_status: DataTypes.STRING,
      order_purchase_date: DataTypes.DATE,
      order_last_updated: DataTypes.DATE,
      items_asins: DataTypes.STRING,
      buyer_name: DataTypes.STRING,
      discount: DataTypes.STRING,
      price: DataTypes.STRING,
      redeemed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
      tableName: 'amazon_orders',
    }
  )

  return AmazonOrders
}
