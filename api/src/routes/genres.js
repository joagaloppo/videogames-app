const express = require("express");
const router = express.Router();
const { Genre } = require("../db");

//---/genres
router.get("/", async (req, res) => {
	const genres = await Genre.findAll();

	res.send(genres);
});

module.exports = router;
