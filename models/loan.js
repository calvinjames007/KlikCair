'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.User)
      Loan.belongsTo(models.Platform)
    }
  }
  Loan.init({
    UserId: DataTypes.INTEGER,
    PlatformId: DataTypes.INTEGER,
    totalLoan: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};