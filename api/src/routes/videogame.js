const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { Videogame, Genre } = require("../db");
// const platforms=[{id:4,name:"PC"},{id:187,name:"PlayStation 5"},{id:18,name:"PlayStation 4"},{id:1,name:"Xbox One"},{id:186,name:"Xbox Series S/X"},{id:7,name:"Nintendo Switch"},{id:3,name:"iOS"},{id:21,name:"Android"},{id:8,name:"Nintendo 3DS"},{id:9,name:"Nintendo DS"},{id:13,name:"Nintendo DSi"},{id:5,name:"macOS"},{id:6,name:"Linux"},{id:14,name:"Xbox 360"},{id:80,name:"Xbox"},{id:16,name:"PlayStation 3"},{id:15,name:"PlayStation 2"},{id:27,name:"PlayStation"},{id:19,name:"PS Vita"},{id:17,name:"PSP"},{id:10,name:"Wii U"},{id:11,name:"Wii"},{id:105,name:"GameCube"},{id:83,name:"Nintendo 64"},{id:24,name:"Game Boy Advance"},{id:43,name:"Game Boy Color"},{id:26,name:"Game Boy"},{id:79,name:"SNES"},{id:49,name:"NES"},{id:55,name:"Classic Macintosh"},{id:41,name:"Apple II"},{id:166,name:"Commodore / Amiga"},{id:28,name:"Atari 7800"},{id:31,name:"Atari 5200"},{id:23,name:"Atari 2600"},{id:22,name:"Atari Flashback"},{id:25,name:"Atari 8-bit"},{id:34,name:"Atari ST"},{id:46,name:"Atari Lynx"},{id:50,name:"Atari XEGS"},{id:167,name:"Genesis"},{id:107,name:"SEGA Saturn"},{id:119,name:"SEGA CD"},{id:117,name:"SEGA 32X"},{id:74,name:"SEGA Master System"},{id:106,name:"Dreamcast"},{id:111,name:"3DO"},{id:112,name:"Jaguar"},{id:77,name:"Game Gear"},{id:12,name:"Neo Geo"},]

//---/videogame/:id
router.get("/:id", async (req, res) => {
	const { API_KEY, URL } = process.env;
	const { id } = req.params;
	let detail = {};

	if (/x$/.test(id)) {
		let parsedID = parseInt(id);
		detail = await Videogame.findByPk(parsedID, {
			include: [
				{
					model: Genre,
					attributes: ["id", "name"],
					through: { attributes: [] },
				},
			],
		}).then((res) => res.toJSON());

		detail = {
			id: detail.id + "A",
			name: detail.name,
			description: detail.description,
			released: detail.released,
			background_image: detail.image,
			rating: detail.rating,
			genres: detail.Genres,
			// platforms: await Promise.all(
			//     detail.platforms.map(e =>
			//         axios.get(`https://api.rawg.io/api/platforms/${e}?key=${key}`)
			//             .then(res => res.data.name)
			//             .catch(e => { })
			//     )),
		};
	} else {
		detail = await axios
			.get(`${URL}/${id}${API_KEY}`)
			.then((response) => response.data);
	}

	return detail ? res.send(detail) : res.send("No se ha encontrado el juego.");
});

//---/videogame/
router.post("/", async (req, res) => {
	const { name, description, image, released, rating, genres, platforms } =
		req.body;

	const videogame = await Videogame.create({
		name,
		description,
		image,
		released,
		rating,
		platforms,
	});

	await videogame.addGenres(genres);

	res.send({ msg: `Game ${name} was added successfully` });
});

module.exports = router;
