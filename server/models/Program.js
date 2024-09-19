const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Program extends Model {}

Program.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Program',
});

module.exports = Program;
