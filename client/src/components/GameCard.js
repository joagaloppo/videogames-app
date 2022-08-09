import React from "react";
import { Link, useHistory } from "react-router-dom";

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
				<div
					className={styles.loading}
					style={loaded ? { display: "none" } : {}}
				/>
				<img
					src={image}
					onLoad={() => showImage()}
					alt={name}
					style={loaded ? {} : { display: "none" }}
				/>
			</div>
			<div className={styles.info}>
				<i className={styles.cat_icon} />
				<span>
					{genres &&
						genres
							.map((e) => e.name)
							.toString()
							.replaceAll(",", " - ")}
				</span>
				<Link onClick={() => history.push(`/detail/${id}`)}>{name}</Link>
			</div>
		</div>
	);
}
