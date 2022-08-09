import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getGames, resetQuery, getGenres, getQuery } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import HomeLoading from "./HomeLoading";
import GameCard from "./GameCard";
import styles from "./styles/Home.module.css";

export default function Home() {
	// STATES
	const [update, setUpdate] = React.useState(1);
	const [input, setInput] = React.useState("");
	const [filter, setFilter] = React.useState([]);
	const [sort, setSort] = React.useState([]);
	const [page, setPage] = React.useState(0);
	// ----

	// HOOKS
	const dispatch = useDispatch();
	const history = useHistory();
	// ----

	// QUERY
	const search = useLocation().search;
	const query = new URLSearchParams(search).get("search");
	// -----

	// VIDEOGAMES VARIABLE
	const clearVideogames = useSelector((state) => state.videogames);
	const queryGames = useSelector((state) => state.queryGames);
	let videogames = [];
	if (sort.length) videogames = [...sort];
	else if (filter.length) videogames = [...filter];
	else videogames = [...clearVideogames];
	// -----

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
			setFilter([]);
			sortReset();
			setPage(0);
			setInput("");
		}
	};

	const filterBy = (e) => {
		let { name } = e.target;
		sortReset();
		e.target.classList.toggle(styles.active);

		let filteredVideogames = [];

		if (filter.join("") !== "No games found") {
			filter.length
				? (filteredVideogames = [...filter])
				: (filteredVideogames = [...clearVideogames]);

			if (name === "api") {
				filteredVideogames = filteredVideogames.filter(
					(game) => typeof game.id !== "string"
				);
			} else if (name === "database") {
				filteredVideogames = filteredVideogames.filter(
					(game) => typeof game.id !== "number"
				);
			} else if (name !== "clear") {
				filteredVideogames = filteredVideogames.filter((game) =>
					game.genres.some((genre) => genre.name.toLowerCase() === name)
				);
			}
		}

		if (!filteredVideogames.length)
			filteredVideogames = ["No ", "games ", "found"];
		if (name === "clear") filteredVideogames = [];
		if (filteredVideogames !== filter) {
			setSort(filteredVideogames);
			setFilter(filteredVideogames);
			setPage(0);
		}
		update === 0 ? setUpdate(1) : setUpdate(0);
	};

	const filterReset = (e) => {
		let list = document.getElementsByClassName(styles.active);
		console.log(list);

		for (let item of list) {
			console.log(list[item]);
			item.classList.remove(styles.active);
		}

		sortReset();
		setFilter([]);
	};

	const sortBy = (e) => {
		let { name, id } = e.target;
		let sortedVideogames = [];
		let sortName = document.getElementsByClassName("sortName")[0];
		let sortRating = document.getElementsByClassName("sortRating")[0];
		filter.length
			? (sortedVideogames = [...filter])
			: (sortedVideogames = [...clearVideogames]);

		id === "desc"
			? sortReset()
			: name === "name"
			? sortedVideogames.sort((a, b) => {
					let A = a[name].toUpperCase();
					let B = b[name].toUpperCase();
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

		setSort(sortedVideogames);
		setPage(0);
		update === 0 ? setUpdate(1) : setUpdate(0);
	};

	const sortReset = () => {
		setSort([]);
		document.getElementsByClassName("sortName")[0].innerHTML = "Sort by Name";
		document.getElementsByClassName("sortName")[0].id = "";
		document.getElementsByClassName("sortRating")[0].innerHTML =
			"Sort by Rating";
		document.getElementsByClassName("sortRating")[0].id = "";
	};

	const loader = () => {
		if (query) {
			if (!queryGames.length) {
				return [...Array(15)].map((a, b) => <HomeLoading key={b} />);
			} else {
				return queryGames.slice(15 * page, (page + 1) * 15).map((e) => ( <GameCard key={e.id} id={e.id} name={e.name} image={e.image} genres={e.genres} /> ));
			}
		} else {
			if (!videogames.length) {
				return [...Array(15)].map((a, b) => <HomeLoading key={b} />);
			} else {
				return videogames.slice(15 * page, (page + 1) * 15).map((e) => ( <GameCard key={e.id} id={e.id} name={e.name} image={e.image} genres={e.genres} /> ))
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
							<input
								className={styles.input}
								name="search"
								placeholder="Search a game..."
								value={input}
								onChange={(e) => handleChange(e)}
							></input>
							<button
								className={styles.searchButton}
								onClick={(e) => handleSubmit(e)}
							/>
						</form>
					</div>

					{/* FILTER */}
					<div className={styles.filter}>
						{/* <button
							name="clear"
							className={styles.clear_btn}
							onClick={(e) => filterReset(e)}
						>
							Clear filters
						</button> */}

						<div className={styles.dropdown}>
							<button className={styles.dropdown_btn}>Genre</button>
							<div className={styles.dropdown_content}>
								{genres &&
									genres.map((elem) => {
										return (
											<a
												href="#/"
												key={elem.id}
												name={elem.name.toLowerCase()}
												onClick={(event) => filterBy(event)}
											>
												{elem.name}
											</a>
										);
									})}
							</div>
						</div>

						<div className={styles.dropdown}>
							<button className={styles.dropdown_btn}>Origin</button>
							<div className={styles.dropdown_content}>
								<a href="#/" name="api" onClick={(e) => filterBy(e)}>
									API
								</a>
								<a href="#/" name="database" onClick={(e) => filterBy(e)}>
									Database
								</a>
							</div>
						</div>
					</div>

					{/* SORT */}
					<div className={styles.sort}>
						<button
							name="name"
							className="sortName"
							id={""}
							onClick={(e) => sortBy(e)}
						>
							Sort by Name
						</button>

						<button
							name="rating"
							className="sortRating"
							id={""}
							onClick={(e) => sortBy(e)}
						>
							Sort by Rating
						</button>
					</div>
				</div>

				<div className={styles.videogames}>
					{loader()}
				</div>

				{/* PAGINATOR */}
				{ Math.ceil(videogames.length / 15) > 1 ? (
					<div className={styles.paginator}>
						{ page > 0 ? ( <button className={styles.paginator_back} onClick={(e) => setPage(page - 1)}/> )
						: ( <div className={styles.spacer} /> ) }

						{page + 1} / {Math.ceil(videogames.length / 15)}
						
						{videogames.length > (page + 1) * 15 ? (
							<button className={styles.paginator_next} onClick={(e) => setPage(page + 1)} />
							) : (
							<div className={styles.spacer} />
						)}
					</div>)
					: (<div className={styles.paginator} />)}
			</div>
		</div>
	);
}