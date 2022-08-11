import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./styles/GameCard.module.css";

export default function GameCard({ id, name, image, genres }) {
	const [loaded, setLoaded] = React.useState(false);
	const history = useHistory();

	const showImage = () => {
		setLoaded(true);
	};

	return (
		<div className={styles.videogame_card}>
			<div className={styles.image}>
				<div className={styles.loading} style={loaded ? { display: "none" } : {}} />
				<img src={image} onLoad={() => showImage()} alt={name} style={loaded ? {} : { display: "none" }} />
			</div>
			<div className={styles.info}>
				<span> {genres && genres.map((e) => e.name).toString().replaceAll(",", " - ")} </span>
				<a onClick={() => history.push(`/detail/${id}`)}>{name}</a>
			</div>
		</div>
	);
}
