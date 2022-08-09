const initialState = {
	videogames: [],
	queryGames: [],
	genres: [],
	gameDetail: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_GAMES":
			return {
				...state,
				videogames: action.payload,
			};
		case "RESET_QUERY":
			return {
				...state,
				queryGames: [],
			};
		case "GET_QUERY":
			return {
				...state,
				queryGames: action.payload,
			};
		case "GET_GAME_DETAIL":
			return {
				...state,
				gameDetail: action.payload,
			};
		case "REMOVE_GAME_DETAIL":
			return {
				...state,
				gameDetail: [],
			};
		case "GET_GENRES":
			return {
				...state,
				genres: action.payload,
			};
		case "POST_GAME":
			return {
				...state,
			};
		default:
			return state;
	}
}
