import React from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetQuery, resetFilter, resetSort, setPage } from "../redux/actions";

import styles from "./styles/Nav.module.css";

export default function Nav() {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	const resetGame = () => {
		dispatch(resetQuery());
		dispatch(resetSort());
		dispatch(resetFilter());
		dispatch(setPage(0));
		history.push("/home");
	};

	return (
		<div className={styles.nav}>
			<div className={styles.container}>
				<div className={styles.home}>
					<a onClick={() => resetGame()}/>
				</div>
				<h1>videogames</h1>
				{pathname !== "/create" ? (
					<div className={styles.create} id={styles.plus}>
						<Link to="/create"></Link>
					</div>
				) : (
					<div className={styles.create} id={styles.cross}>
						<a onClick={() => history.goBack()}></a>
					</div>
				)}
			</div>
		</div>
	);
}
