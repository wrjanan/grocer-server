const { sequelize } = require('.');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('Items', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.NUMBER,
  },
  imageSrc: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: 'TIMESTAMP',
  },
  updatedAt: {
    type: 'TIMESTAMP'
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Item === sequelize.models.Item); // true


module.exports = { Item };
