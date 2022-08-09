import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getGames, getQuery, resetQuery, filterGames, resetFilter, sortGames, resetSort, getGenres, setPage } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import HomeLoading from "./HomeLoading";
import GameCard from "./GameCard";
import styles from "./styles/Home.module.css";

export default function Home() {
	// HOOKS
	const dispatch = useDispatch();
	const history = useHistory();
	// ----

	// QUERY
	const search = useLocation().search;
	const query = new URLSearchParams(search).get("search");
	// -----

	// STATES
	const [input, setInput] = React.useState("");
	const page = useSelector((state) => state.page);
	const sort = useSelector((state) => state.sortGames);
	const filter = useSelector((state) => state.filterGames);
	// ----

	// VIDEOGAMES VARIABLE
	const clearVideogames = useSelector((state) => state.videogames);
	const queryGames = useSelector((state) => state.queryGames);
	let videogames = [];
	let queryVideogames = []
	if (sort.length) {
		videogames = [...sort];
		queryVideogames = [...sort];
	} else if (filter.length) {
		videogames = [...filter];
		queryVideogames = [...filter];
	} else {
		videogames = [...clearVideogames];
		queryVideogames = [...queryGames];
	}

	// GENRES VARIABLE
	const genres = useSelector((state) => state.genres);
	// -----

	React.useEffect(() => {
		if (query) {
			dispatch(getQuery(query));
		} else dispatch(getGames());
		dispatch(getGenres());
	}, [dispatch, query]);

	const handleChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input && input.match(/[^\s-]/)) {
			dispatch(resetQuery());
			history.push(`?search=${input}`);
			dispatch(resetFilter());
			sortReset();
			dispatch(setPage(0));
			setInput("");
		}
	};

	const filterBy = (e) => {
		sortReset();
		const { name } = e.target;
		let filteredVideogames = [];


		if (query) {
			filteredVideogames = [...queryGames]
		} else {
			filteredVideogames = [...clearVideogames]
		}

		if (name === "api") {
			filteredVideogames = filteredVideogames.filter(
				(game) => typeof game.id !== "string"
			);
		} else if (name === "database") {
			filteredVideogames = filteredVideogames.filter(
				(game) => typeof game.id !== "number"
			);
		} else {
			filteredVideogames = filteredVideogames.filter((game) =>
					game.genres.some((genre) => genre.name.toLowerCase() === name)
				);
		}

		if (!filteredVideogames.length)
			filteredVideogames = ["No ", "games ", "found"];
		if (filteredVideogames !== filter) {
			dispatch(sortGames(filteredVideogames));
			dispatch(filterGames(filteredVideogames));
			dispatch(setPage(0));
		}
	};

	const sortBy = (e) => {
		const { name, id } = e.target;
		const sortName = document.getElementsByClassName("sortName")[0];
		const sortRating = document.getElementsByClassName("sortRating")[0];
		let sortedVideogames = [];

		if (filter.length) {
			sortedVideogames = [...filter];
		} else if (query) {
			sortedVideogames = [...queryGames];
		} else {
			sortedVideogames = [...clearVideogames];
		}

		if (filter.join("") !== "No games found") {
		if (id === "desc") {
			sortReset();
		} else  {
			name === "name"
			? sortedVideogames.sort((a, b) => {
					let A = a ? a[name].toUpperCase() : null;
					let B = b ? b[name].toUpperCase() : null;
					if (!id) {
						e.target.id = "asc";
						sortName.innerHTML = "Sort by Name ▼";
						sortRating.innerHTML = "Sort by Rating";
						sortRating.id = "";
						return A < B ? -1 : A > B ? 1 : 0;
					} else {
						e.target.id = "desc";
						sortName.innerHTML = "Sort by Name ▲";
						return A < B ? 1 : A > B ? -1 : 0;
					}
			  })
			: sortedVideogames.sort((a, b) => {
					if (!id) {
						e.target.id = "asc";
						sortRating.innerHTML = "Sort by Rating ▼";
						sortName.innerHTML = "Sort by Name";
						sortName.id = "";
						return b.rating - a.rating;
					} else {
						e.target.id = "desc";
						sortRating.innerHTML = "Sort by Rating ▲";
						return a.rating - b.rating;
					}
			  });
			}
			dispatch(sortGames(sortedVideogames));
			dispatch(setPage(0));
		}
	};

	const sortReset = () => {
		dispatch(resetSort());
		document.getElementsByClassName("sortName")[0].innerHTML = "Sort by Name";
		document.getElementsByClassName("sortName")[0].id = "";
		document.getElementsByClassName("sortRating")[0].innerHTML =
			"Sort by Rating";
		document.getElementsByClassName("sortRating")[0].id = "";
	};

	// PARTS

	const loader = () => {
		if (query) {
			if (!queryVideogames.length) {
				return [...Array(15)].map((a, b) => <HomeLoading key={b} />);
			} else {
				return queryVideogames.slice(15 * page, (page + 1) * 15).map((e) => ( <GameCard key={e.id} id={e.id} name={e.name} image={e.image} genres={e.genres} /> ));
			}
		} else {
			if (!videogames.length) {
				return [...Array(15)].map((a, b) => <HomeLoading key={b} />);
			} else {
				return videogames.slice(15 * page, (page + 1) * 15).map((e) => ( <GameCard key={e.id} id={e.id} name={e.name} image={e.image} genres={e.genres} /> ))
			}
		}
	}

	const paginator = () => {
		if (!query) {
			if (Math.ceil(videogames.length / 15) > 1) {
				return (
				<div className={styles.paginator}>
					{ page > 0
					? ( <button className={styles.paginator_back} onClick={(e) => dispatch(setPage(page - 1))}/> )
					: ( <div className={styles.spacer} /> ) }

					{page + 1} / {Math.ceil(videogames.length / 15)}
					
					{videogames.length > (page + 1) * 15
					? ( <button className={styles.paginator_next} onClick={(e) => dispatch(setPage(page + 1))} /> ) 
					: ( <div className={styles.spacer} /> )}
				</div>
				);
		}
	}
}

	return (
		<div className={styles.home}>
			<div className={styles.container}>

				{/* FINDER DIV */}
				<div className={styles.finder}>

					{/* SEARCH */}
					<div className={styles.search}>
						<form className={styles.form}>
							<input className={styles.input} name="search" placeholder="Search a game..." value={input} onChange={(e) => handleChange(e)} />
							<button className={styles.searchButton} onClick={(e) => handleSubmit(e)}/>
						</form>
					</div>

					{/* FILTER */}
					<div className={styles.filter}>
						<div className={styles.dropdown}>
							<button className={styles.dropdown_btn}>Genre</button>
							<div className={styles.dropdown_content}> {genres && genres.map((elem) => { return ( <a href="#/" key={elem.id} name={elem.name.toLowerCase()} onClick={(event) => filterBy(event)} > {elem.name} </a> ); })} </div>
						</div>

						<div className={styles.dropdown}>
							<button className={styles.dropdown_btn}>Origin</button>
							<div className={styles.dropdown_content}>
								<a href="#/" name="api" onClick={(e) => filterBy(e)}>API</a>
								<a href="#/" name="database" onClick={(e) => filterBy(e)}>Database</a>
							</div>
						</div>
					</div>

					{/* SORT */}
					<div className={styles.sort}>
						<button name="name" className="sortName" id={""} onClick={(e) => sortBy(e)}>Sort by Name</button>
						<button name="rating" className="sortRating" id={""} onClick={(e) => sortBy(e)}>Sort by Rating</button>
					</div>

				</div>

				{/* CONTAINER */}
				<div className={styles.videogames}>
					{loader()}
				</div>

				{/* PAGINATOR */}
				{paginator()}
			</div>
		</div>
	);
}