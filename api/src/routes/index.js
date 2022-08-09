const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames.js");
const genres = require("./genres.js");
const videogame = require("./videogame.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/videogame", videogame);

module.exports = router;
