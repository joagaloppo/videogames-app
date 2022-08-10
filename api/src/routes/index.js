const { Router } = require("express");
const router = Router();

const videogames = require("./videogames.js");
const genres = require("./genres.js");
const videogame = require("./videogame.js");

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/videogame", videogame);

module.exports = router;
