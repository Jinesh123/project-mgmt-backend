const {DataTypes, Sequelize, DATE} = require('sequelize')
const {sequelize} = require('../database/db')

const Project = sequelize.define(
    'Project',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description : {
            type: DataTypes.TEXT,
        },
        status : {
            type: DataTypes.ENUM,
            values: ['not_started', 'in_progress', 'completed'],
            defaultValue: 'not_started'
        },
        dueDate : {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: true
    }
)

// Project.sync({alter: true})

module.exports = Project