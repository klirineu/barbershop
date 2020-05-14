const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
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
              msg: "Esse campo tem que ser um E-mail",
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
              args: [4],
              msg: "Senha deve ter mais que 4 caracteres",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
      },
      {
        sequelize,
        tableName: "users",
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

  static associate(models) {
    this.hasOne(models.Schedule, { foreignKey: "user_id", as: "schedule" });
  }
}

module.exports = User;
