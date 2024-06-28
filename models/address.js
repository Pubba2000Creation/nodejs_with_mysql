'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mobile: {
      type: DataTypes.INTEGER, // or DataTypes.INTEGER depending on how you want to store it
      allowNull: true // assuming mobile number can be optional
    }
  }, {});

  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Address;
};
