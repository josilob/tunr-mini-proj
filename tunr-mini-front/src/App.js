import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Form from './components/Form';
import Playlist from './components/Playlist';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';

function App() {
	const url = 'http://localhost:3000';

	const emptySong = {
		title: '',
		artist: '',
		time: '',
	};
	const [songs, setSongs] = React.useState(emptySong);

	const [selectedSong, setSelectedSong] = React.useState(emptySong);

	//fetch songs
	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data.songs);
				console.log(data.songs);
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

	//update songs
	const handleUpdate = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(song),
		}).then((response) => getSongs());
	};

	//select song
	const selectSong = (song) => {
		setSelectedSong(song);
	};

	//delete song
	const deleteSong = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	return (
		<Router>
			<div className='App'>
				<Header />

				<h3>ADD A NEW Song</h3>
				<main>
					<Switch>
						<Route
							exact
							path='/'
							render={(rp) => (
								<div>
									<Playlist
										songs={songs}
										deleteSong={deleteSong}
										selectSong={selectSong}
									/>
									<Form
										{...rp}
										label='Add New Song'
										song={emptySong}
										handleSubmit={handleCreate}
									/>
								</div>
							)}
						/>
						<Route
							exact
							path='/edit'
							render={(rp) => (
								<Form
									{...rp}
									label='Save'
									song={selectedSong}
									handleSubmit={handleUpdate}
								/>
							)}
						/>
					</Switch>
				</main>
			</div>
		</Router>
	);
}
export default App;
