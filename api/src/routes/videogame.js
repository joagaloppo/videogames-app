const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Videogame, Genre } = require("../db");

router.get("/:id", async (req, res) => {
	const { API_KEY, URL } = process.env;
	const { id } = req.params;
	let detail = {};

	if (/x$/.test(id)) {
		let idn = parseInt(id);
		try {
			detail = await Videogame.findByPk(idn, {
				include: [{ model: Genre, attributes: ["id", "name"], through: { attributes: [] }}] })
				.then((res) => res.toJSON());
			detail = {
				id: detail.id + "A",
				name: detail.name,
				description: detail.description,
				released: detail.released,
				background_image: detail.image,
				rating: detail.rating,
				genres: detail.Genres,
				platforms: detail.platforms
			};
			res.status(200).send(detail);
		} catch (err) {
			res.status(404).send(err);
		}
	} else {
		try {
			const obj = await axios
				.get(`${URL}/${id}${API_KEY}`)
				.then((response) => response.data )
			
			detail = {
				background_image: obj.background_image,
				released: obj.released,
				rating: obj.rating,
				name: obj.name,
				genres: obj.genres,
				description: obj.description_raw,
				platforms: obj.platforms.map(e => e.platform),
			};
			res.status(200).send(detail);
		} catch (err) {
			res.status(404).send(err);
		}
	}
});

router.post("/", async (req, res) => {
	const { name, description, image, released, rating, genres, platforms } = req.body;

	try {
		const videogame = await Videogame.create({
			name,
			description,
			image,
			released,
			rating,
			platforms,
		});
		await videogame.addGenres(genres);
		res.status(201).send({ msg: `The game: ${name} was added successfully` });
	} catch (err) {
		res.status(404).send(err);
	}

	
});

module.exports = router;
