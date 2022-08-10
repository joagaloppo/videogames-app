const express = require("express");
const router = express.Router();
const { Genre } = require("../db");

router.get("/", async (req, res) => {
	try {
		const genres = await Genre.findAll();
		res.status(200).send(genres);
	} catch (err) {
		res.status(404).send(err);
	}
});

module.exports = router;
