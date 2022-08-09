import React from "react";

import styles from "./styles/HomeLoading.module.css";

export default function HomeLoading() {
	return (
		<div className={styles.videogame_card}>
			<div className={styles.image}>
				<div className={styles.loading} />
			</div>
			<div className={styles.info}>
				<div className={styles.cat} />
				<div className={styles.title} />
			</div>
		</div>
	);
}
