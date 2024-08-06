module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        club: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        league: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Players
}
