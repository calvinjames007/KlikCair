'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Platform.hasMany(models.Loan)
    }

    static findByLocation(search) {
      let options = {};

        if (search) {
            options = {
                where: {
                    location: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
        }


        return Platform.findAll(options)
    }
  }
  Platform.init({
    name: DataTypes.STRING,
    platformLogo: DataTypes.STRING,
    location: DataTypes.STRING,
    loanLimit: DataTypes.INTEGER,
    loanMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Platform',
  });
  return Platform;
};