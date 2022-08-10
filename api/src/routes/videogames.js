const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	const queryName = req.query.name;
	const { API_KEY, URL } = process.env;
	let apiVideogames = [];
	let dbVideogames = [];
	let videogames = [];

	if (queryName) {
		try {
		apiVideogames = await axios
			.get(`${URL}${API_KEY}&search=${queryName}&page_size=15`)
			.then((response) => response.data.results)
			.then((game) =>
				game.map((e) => {
					return {
						id: e.id,
						name: e.name,
						image: e.background_image,
						rating: e.rating,
						genres: e.genres.map((genre) => {
							return { id: genre.id, name: genre.name };
						})
					}}));

		dbVideogames = await Videogame.findAll({
			attributes: ["id", "name", "image", "rating"],
			include: [
				{
					model: Genre,
					attributes: ["id", "name"],
					through: { attributes: [] },
				},
			],
			where: {
				name: {
					[Op.iLike]: "%" + queryName + "%",
				}
			}});

		videogames = dbVideogames
			.map((e) => {
				return {
					id: e.id + "x",
					name: e.name,
					image: e.image,
					rating: e.rating,
					genres: e.Genres,
				}}).concat(apiVideogames);

			if (videogames.length) {
				res.status(200).send(videogames)
			} else {
				res.status(404).send(["No ", "games ", "found"])
			}
		} catch(err) {
			res.status(404).send(err);
		}
	} else {
		try {
		dbVideogames = await Videogame.findAll({
			attributes: ["id", "name", "image", "rating"],
			include: [
				{ model: Genre, attributes: ["id", "name"], through: { attributes: [] } },
			],
		});

		apiVideogames = await Promise.all([
			axios.get(`${URL}${API_KEY}&page_size=40`),
			axios.get(`${URL}${API_KEY}&page_size=40&page=2`),
			axios.get(`${URL}${API_KEY}&page_size=40&page=3`),
		])
			.then((values) => values.flatMap((e) => e.data.results))
			.then((game) =>
				game.map((e) => {
					return {
						id: e.id,
						name: e.name,
						image: e.background_image,
						rating: e.rating,
						genres: e.genres.map((genre) => {
							return { id: genre.id, name: genre.name };
						}),
					};
				})
			);

		videogames = dbVideogames
			.map((e) => {
				return {
					id: e.id + "x",
					name: e.name,
					image: e.image,
					rating: e.rating,
					genres: e.Genres,
				};
			})
			.concat(apiVideogames);

			if (videogames.length) {
				res.status(200).send(videogames)
			} else {
				res.status(404).send(["No ", "games ", "found"])
			}
		} catch(err) {
			res.status(404).send(err);
		}
	}
});

module.exports = router;
