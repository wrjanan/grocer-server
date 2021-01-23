const { sequelize } = require('./');
const { DataTypes } = require('sequelize');

const Badge = sequelize.define('Badges', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  gameId: {
    type: DataTypes.STRING,
  },
  gameHref: {
    type: DataTypes.STRING,
  },
  imageSrc: {
    type: DataTypes.STRING
  },
  text: {
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
console.log(Badge === sequelize.models.Badge); // true


module.exports = { Badge };
