export function getGames() {
	return async function request(dispatch) {
		await fetch("http://localhost:3001/videogames")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_GAMES", payload: data }));
	};
}

export function resetGames() {
	return { type: "RESET_GAMES" };
}

export function getQuery(query) {
	return async function request(dispatch) {
		await fetch(`http://localhost:3001/videogames/?name=${query}`)
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_QUERY", payload: data }));
	};
}

export function getGameDetail(id) {
	return async function request(dispatch) {
		await fetch(`http://localhost:3001/videogame/${id}`)
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_GAME_DETAIL", payload: data }));
	};
}

export function removeGameDetail() {
	return { type: "REMOVE_GAME_DETAIL" };
}

export function getGenres() {
	return async function request(dispatch) {
		await fetch("http://localhost:3001/genres")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_GENRES", payload: data }));
	};
}

export function postGame(game) {
	return { type: "POST_GAME", payload: game };
}
