import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetGames } from "../redux/actions";

import styles from "./styles/Nav.module.css";

export default function Nav() {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	const resetGame = () => {
		dispatch(resetGames());
	};

	return (
		<div className={styles.nav}>
			<div className={styles.container}>
				<div className={styles.home}>
					<Link
						to="/home"
						onClick={() => (pathname !== "/home" ? resetGame() : null)}
					></Link>
				</div>
				<h1>VIDEOGAMES</h1>
				{pathname !== "/create" ? (
					<div className={styles.create}>
						<Link to="/create"></Link>
					</div>
				) : (
					<div className={styles.back}>
						<Link to="/home" onClick={() => history.goBack()}></Link>
					</div>
				)}
			</div>
		</div>
	);
}
