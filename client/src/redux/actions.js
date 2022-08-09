export function getGames() {
	return async function request(dispatch) {
		await fetch("http://localhost:3001/videogames")
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_GAMES", payload: data }));
	};
}

export function getQuery(query) {
	return async function request(dispatch) {
		await fetch(`http://localhost:3001/videogames/?name=${query}`)
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_QUERY", payload: data }));
	};
}

export function resetQuery() {
	return { type: "RESET_QUERY" };
}

export function filterGames(list) {
	return { type: "FILTER_GAMES", payload: list };
}

export function resetFilter() {
	return { type: "RESET_FILTER" };
}

export function sortGames(list) {
	return { type: "SORT_GAMES", payload: list };
}

export function resetSort() {
	return { type: "RESET_SORT" };
}


export function getGameDetail(id) {
	return async function request(dispatch) {
		await fetch(`http://localhost:3001/videogame/${id}`)
			.then((response) => response.json())
			.then((data) => dispatch({ type: "GET_GAME_DETAIL", payload: data }));
	};
}

export function resetGameDetail() {
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

export function setPage(number) {
	return { type: "SET_PAGE", payload: number };
}