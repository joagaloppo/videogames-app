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

	const [errName, setErrName]  = React.useState("")
	const [errDescription, setErrDescription]  = React.useState("")
	const [errImage, setErrImage]  = React.useState("")
	const [errReleased, setErrReleased]  = React.useState("")
	const [errRating, setErrRating]  = React.useState("")
	const [errGenres, setErrGenres]  = React.useState("")
	const [errPlatforms, setErrPlatforms]  = React.useState("")

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

	const inputValidator = () => {
		let valid = true;

		if (input.name.length < 3) { setErrName("Enter a name of at least 3 characters"); valid = false; } 
		else { setErrName("") }

		if (input.description.length < 10) { setErrDescription("Enter a description of at least 10 characters"); valid = false; }
		else { setErrDescription("") }

		if (!/^https[^\?]*.(jpg|jpeg|png)(\?(.*))?$/gmi.test(input.image)) { setErrImage("Enter a valid JPG / PNG image url"); valid = false;  }
		else { setErrImage("") }

		if (input.released.length !== 10) { setErrReleased("Enter a valid date"); valid = false;  }
		else { setErrReleased("") }

		if (input.rating > 5 || input.rating < 1) { setErrRating("Enter a rating between 1 and 5"); valid = false;  }
		else { setErrRating("") }

		if (!input.genres.length) { setErrGenres("Select at least 1 genre"); valid = false;  }
		else { setErrGenres("") }

		if (!input.platforms.length) { setErrPlatforms("Select at least 1 platform"); valid = false;  }
		else { setErrPlatforms("") }

		if ( valid ) return true;
		else return false;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const val = inputValidator();
		if (val) {
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
		
			setInput({ name: "", description: "", image: "", released: "", rating: 0.0, genres: [], platforms: [] });
		}
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
			platforms: [...input.platforms].filter(e => e.id !== parseInt(id)),
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
							{ errName ? (<div className={styles.error}>{errName}</div>) : null}
							<div className={styles.closure}>
								<label>Name *</label>
								<input className={styles.input} name="name" placeholder="Super Mario Kart" onChange={(e) => handleChange(e)} value={input.name} />
							</div>
						</div>

						<div className={styles.section}>
							{ errDescription ? (<div className={styles.error}>{errDescription}</div>) : null}
							<div className={styles.closure}>
							<label>Description *</label>
							<input className={styles.input} name="description" placeholder="Super Mario Kart" onChange={(e) => handleChange(e)} value={input.description} />
							</div>
						</div>

						<div className={styles.section}>
							{ errImage ? (<div className={styles.error}>{errImage}</div>) : null}
							<div className={styles.closure}>
							<label>Image URL</label>
							<input className={styles.input} name="image" onChange={(e) => handleChange(e)} value={input.image} />
							</div>
						</div>

						<div className={styles.section}>
							{ errReleased ? (<div className={styles.error}>{errReleased}</div>) : null}
							<div className={styles.closure}>
							<label>Released</label>
							<input type="date" min="1958-10-01" max="2023-12-31" name="released" onChange={(e) => handleChange(e)} value={input.released} />
							</div>
						</div>

						<div className={styles.section}>
							{ errRating ? (<div className={styles.error}>{errRating}</div>) : null}
							<div className={styles.closure}>
							<label>Rating</label>
							<input className={styles.input} name="rating" onChange={(e) => handleChange(e)} value={input.rating} />
							</div>
						</div>

						<div className={styles.section}>
						{ errGenres ? (<div className={styles.error}>{errGenres}</div>) : null}
							<div className={styles.dropdown}>
								<button className={styles.dropdown_btn}> Genres ({input.genres.length}) </button>
								<div className={styles.dropdown_content}>
									{genres && genres.map((elem) => { return ( <a href="#/" key={elem.id} id={elem.id} name={elem.name} onClick={(e) => genreAdd(e)} > {elem.name}</a> ); })}
								</div>
							</div>
						</div>
						<div className={styles.section}>
						{ errPlatforms ? (<div className={styles.error}>{errPlatforms}</div>) : null}
							<div className={styles.dropdown}>
								<button className={styles.dropdown_btn}> Platforms ({input.platforms.length}) </button>
								<div className={styles.dropdown_content}>
									{platforms && platforms.map((elem) => { return ( <a href="#/" key={elem.id} id={elem.id} name={elem.name.toLowerCase()} onClick={(e) => platformAdd(e)}> {elem.name} </a>);})}
								</div>
							</div>
						</div>

						<input type="submit" value="Create" className={styles.submit} />
					</form>
				</div>
			</div>
		</div>
	);
}
