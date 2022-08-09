const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Videogame, Genre } = require("./src/db");
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(3001, async () => {
		console.log("%s listening at 3001"); // eslint-disable-line no-console

		const { GENRES_URL, API_KEY } = process.env;
		await axios.get(`${GENRES_URL}${API_KEY}`).then((genres) =>
			genres.data.results.forEach((e) => {
				Genre.create({ name: e.name });
			})
		);

		let testVideogame = await Videogame.create({
			name: "Age of Henry",
			description: "Lorem Ipsum",
			platforms: [2, 3, 4, 5],
			image:
				"https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg",
			released: "2020-11-18",
			rating: 4.4,
		});

		await testVideogame.addGenres([2, 5, 10]);
	});
});
