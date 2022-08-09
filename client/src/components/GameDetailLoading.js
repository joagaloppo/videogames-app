import React from "react";

import styles from "./styles/GameDetailLoading.module.css";

export default function GameDetailLoading() {
	return (
		<div className={styles.home}>
			<div className={styles.container}>
				<div className={styles.image} />
				<div className={styles.info}>
					<div className={styles.released} />
					<div className={styles.rating} />
				</div>

				<div className={styles.name}>
					<div className={styles.title} />
					<div className={styles.genres} />
				</div>

				<div className={styles.separator} />

				<h3>Description:</h3>
				<div className={styles.description} />
				<div className={styles.description} />
				<div className={styles.description} />
				<div className={styles.description} />

				<div className={styles.separator} />

				<h3>Platforms:</h3>
				<div className={styles.description} />
				<div className={styles.description} />
				<div className={styles.description} />
				<div className={styles.description} />
			</div>
		</div>
	);
}
