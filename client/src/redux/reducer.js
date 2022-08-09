const initialState = {
	genres: [],
	videogames: [],
	queryGames: [],
	filterGames: [],
	sortGames: [],
	gameDetail: [],
	page: 0,
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_GAMES":
			return {
				...state,
				videogames: action.payload,
			};
		case "GET_QUERY":
			return {
				...state,
				queryGames: action.payload,
			};
		case "RESET_QUERY":
			return {
				...state,
				queryGames: [],
			};
		case "FILTER_GAMES":
			return {
				...state,
				filterGames: action.payload,
			}
		case "RESET_FILTER":
			return {
				...state,
				filterGames: [],
			}
		case "SORT_GAMES":
			return {
				...state,
				sortGames: action.payload,
			}
		case "RESET_SORT":
			return {
				...state,
				sortGames: [],
			}
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
		case "SET_PAGE":
			return {
				...state,
				page: action.payload,
			}
		default:
			return state;
	}
}
