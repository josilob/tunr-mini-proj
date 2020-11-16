import React, { Link } from 'react';

const Playlist = (props) => {
	const songs = props.songs;

	const loaded = () => {
		const JSX = songs.map((song) => {
			const favSong = song.fav ? <span color='red'>Fav</span> : <>Fav</>;
			return (
				<article>
					<p>
						{song.title} , {song.artist}, {song.time}
						&nbsp;&nbsp;
						<button
							onClick={() => {
								props.deleteSong(song);
							}}>
							Del
						</button>
						<button>&nbsp; {favSong} &nbsp; </button>
						<button
							onClick={() => {
								props.selectSong(song);
								props.history.push('/edit');
							}}>
							Edit
						</button>
					</p>
				</article>
			);
		});

		return <div>{JSX}</div>;
	};

	return songs.length > 0 ? loaded() : <h1>Loading...</h1>;
};
export default Playlist;
