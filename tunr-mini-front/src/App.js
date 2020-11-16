import React from 'react';
import './App.css';
import Form from './components/Form';
import Playlist from './components/Playlist';
import Favorites from './components/Favorites';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

function App() {
	const url = 'http://localhost:3000';

	const emptySong = {
		title: '',
		artist: '',
		time: '',
	};
	const [songs, setSongs] = React.useState(emptySong);
	const [favorites, setFavorites] = React.useState([]);

	//fetch songs
	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data.songs);
			});
	};
	//get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);

	//create songs
	const handleCreate = (newSong) => {
		fetch(url + '/songs/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};

	//delete song
	const deleteSong = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	const toggleFave = (song) => {
		const favs = [...favorites];
		const idx = favs.indexOf(song);
		favs.includes(song) ? favs.splice(idx, 1) : favs.push(song);
		setFavorites(favs);
	};
	return (
		<Router>
			<div className='App'>
				<h1>TUNR.</h1>
				<h6>FOR ALL YOUR PLAYLIST NEEDS</h6>
				<hr />
				<h1>PLAYLIST 1</h1>

				<h3>ADD A NEW Song</h3>
				<main id='mainbox'>
					<Switch>
						<Route
							exact
							path='/'
							render={(rp) => (
								<div>
									<div id='playlist'>
										<Playlist
											songs={songs}
											deleteSong={deleteSong}
											toggleFave={toggleFave}
											// selectSong={selectSong}
										/>
									</div>
									<Form
										{...rp}
										label='Add New Song'
										song={emptySong}
										handleSubmit={handleCreate}
									/>
									<Favorites favorites={favorites} toggleFave={toggleFave} />
								</div>
							)}
						/>
					</Switch>
				</main>
			</div>
		</Router>
	);
}
export default App;
