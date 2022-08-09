import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../redux/actions";

import styles from "./styles/Create.module.css";

import platforms from "./platforms";

export default function Create() {
	const genres = useSelector((state) => state.genres);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const [input, setInput] = React.useState({
		name: "",
		description: "",
		image: "",
		released: "",
		rating: 0.0,
		genres: [],
		platforms: [],
	});

	const handleChange = (e) => {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("INPUT:", input);
		(async () => {
			const rawResponse = await fetch("http://localhost:3001/videogame/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});
			const content = await rawResponse.json();

			console.log("CONTENT:", content);
		})();
	};

	const genreAdd = (e) => {
		console.log(genres);
		const { name, id } = e.target;
		console.log(id);
		console.log(name);
		
		e.preventDefault();

		if (e.target.classList[0] !== "active")  {
		setInput({
			...input,
			genres: [...input.genres, parseInt(id)]
		});
		} else {
		setInput({
			...input,
			genres: [...input.genres].filter(e => e !== parseInt(id)),
		});
		}

		e.target.classList.toggle("active");
	};

	const platformAdd = (e) => {
		console.log(platforms);
		const { name, id } = e.target;
		console.log(id);
		console.log(name);
		
		e.preventDefault();

		if (e.target.classList[0] !== "active")  {
		setInput({
			...input,
			platforms: [...input.platforms, {id: parseInt(id), name}]
		});
		} else {
		setInput({
			...input,
			platforms: [...input.platforms].filter(e => e !== parseInt(id)),
		});
		}

		e.target.classList.toggle("active");
	};

	return (
		<div className={styles.home}>
			<div className={styles.container}>
				<h2 className={styles.title}>Add Game</h2>
				<div className={styles.form_container}>
					<form className={styles.create} onSubmit={(e) => handleSubmit(e)}>
						<div className={styles.section}>
							<label>Name *</label>
							<input
								name="name"
								onChange={(e) => handleChange(e)}
								value={input.name}
							></input>
						</div>

						<div className={styles.section}>
							<label>Description *</label>
							<input
								name="description"
								onChange={(e) => handleChange(e)}
								value={input.description}
							></input>
						</div>

						<div className={styles.section}>
							<label>Image URL</label>
							<input
								name="image"
								onChange={(e) => handleChange(e)}
								value={input.image}
							></input>
						</div>

						<div className={styles.section}>
							<label>Released</label>
							<input
								type="date"
								name="released"
								onChange={(e) => handleChange(e)}
								value={input.released}
							></input>
						</div>

						<div className={styles.section}>
							<label>Rating</label>
							<input
								type="number"
								min="1"
								max="5"
								name="rating"
								onChange={(e) => handleChange(e)}
								value={input.rating}
							></input>
						</div>

						<div className={styles.section}>
							<div className={styles.dropdown}>
								<button className={styles.dropdown_btn}>
									Genres ({input.genres.length})
								</button>
								<div className={styles.dropdown_content}>
									{genres &&
										genres.map((elem) => {
											return (
												<a
													href="#/"
													key={elem.id}
													id={elem.id}
													name={elem.name}
													onClick={(e) => genreAdd(e)}
												>
													{elem.name}
												</a>
											);
										})}
								</div>
							</div>

							<div className={styles.dropdown}>
								<button className={styles.dropdown_btn}>
									Platforms ({input.platforms.length})
								</button>
								<div className={styles.dropdown_content}>
									{platforms &&
										platforms.map((elem) => {
											return (
												<a
													href="#/"
													key={elem.id}
													id={elem.id}
													name={elem.name.toLowerCase()}
													onClick={(e) => platformAdd(e)}
												>
													{elem.name}
												</a>
											);
										})}
								</div>
							</div>

						</div>

						<input type="submit" value="Submit" className={styles.submit} />
					</form>
				</div>
			</div>
		</div>
	);
}
