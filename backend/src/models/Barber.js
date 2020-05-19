const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class Barber extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 30],
              msg: "Esse campo deve ter entre 4 e 30 caracteres",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Esse campo tem que ser um Email",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [6],
              msg: "Senha deve ter mais que 6 caracteres",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isNumeric: {
              msg: "Esse campo só pode possuir números",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        insta: {
          type: DataTypes.STRING,
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
        tableName: "barber",
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
        instanceMethods: {
          validatePassword: function (password) {
            return bcrypt.compareSync(password, this.password);
          },
        },
      }
    );
  }
}

module.exports = Barber;
