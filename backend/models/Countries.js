module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define("Countries", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        selected: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
        }
        
    })

    return Countries
}
