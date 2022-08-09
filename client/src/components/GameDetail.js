import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getGameDetail, resetGameDetail } from "../redux/actions";

import styles from "./styles/GameDetail.module.css";

import GameDetailLoading from "./GameDetailLoading";

export default function GameDetail() {
	const dispatch = useDispatch();
	const params = useParams();
	const history = useHistory();

	const detail = useSelector((state) => state.gameDetail);

	React.useEffect(() => {
		dispatch(resetGameDetail());
		dispatch(getGameDetail(params.id));
		console.log(detail);
		// console.log(detail);
	}, [dispatch, params.id]);

	return (
		<div>
			{Array.isArray(detail) ? (
				<GameDetailLoading />
			) : (
				<div className={styles.home}>
					<div className={styles.container}>
						<div className={styles.image}>
							<img
								alt={detail.name}
								className={styles.img}
								src={detail.background_image}
								width="300px"
								height="200px"
							/>
						</div>
						<div className={styles.info}>
							<span className={styles.released}>
								Released: {detail.released}
							</span>
							<span className={styles.rating}>Rating: {detail.rating}</span>
						</div>

						<div className={styles.name}>
							<h2 className={styles.title}>{detail.name}</h2>
							{detail.genres &&
								detail.genres.map((e) => (
									<span key={e.id} className={styles.genres}>
										{e.name}
									</span>
								))}
						</div>

						<div className={styles.separator}></div>

						<h3>Description:</h3>
						<div className={styles.description}>
							{detail.description
								? detail.description.replace(/<[^>]*>?/gm, "")
								: null}
						</div>

						<div className={styles.separator}></div>

						<div>
							<h3>Platforms:</h3>
							<ul>
								{detail.platforms &&
						detail.platforms.map((e) => (
							<li key={e.id}> {e.name} </li>
						))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
