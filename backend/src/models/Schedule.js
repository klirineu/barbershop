const { Model, DataTypes } = require("sequelize");

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        cutype: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        cutvalue: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
            isDate: {
              msg: "Valor tem que ser uma data",
            },
          },
        },
        hour: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "schedule",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Schedule;
