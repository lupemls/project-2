module.exports = function(sequelize, DataTypes) {
    const Opponent = sequelize.define('Opponent', {
        github: DataTypes.STRING,
        wins: DataTypes.INTEGER,
        losses: DataTypes.INTEGER
    });
    return Opponent; 
}; 