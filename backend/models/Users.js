module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })

    Users.associate = (models) => {
        Users.hasMany(models.Players, {
            onDelete: 'CASCADE',
          });

        Users.hasMany(models.Countries, {
            onDelete: "cascade",
        });
    }

    return Users
}
