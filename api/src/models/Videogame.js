const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo de videojuego
	sequelize.define(
		"Videogame",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			released: {
				type: DataTypes.DATEONLY,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			rating: {
				type: DataTypes.FLOAT,
				min: 0.0,
				max: 5.0,
			},
			platforms: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
