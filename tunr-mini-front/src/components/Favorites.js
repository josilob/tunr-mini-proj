import React, { useEffect } from 'react';

const Favorites = (props) => {
	const [faves, setFaves] = React.useState(props.favorites);

	useEffect(() => {
		setFaves(props.favorites);
	}, [props.favorites]);

	const favesLoaded = faves.map((fave, index) => {
		return (
			<>
				<div className='songs' key={fave.id}>
					<p className='title'>Title : {fave.title}</p>
					<p className='artist'>Artist : {fave.artist}</p>
					<p className='time'>Duration : {fave.time}</p>
					<button
						onClick={() => {
							props.toggleFave(fave);
						}}>
						Fav
					</button>
				</div>
			</>
		);
	});

	const loading = 'Add some songs to favorite section!';

	return (
		<>
			<div className='faves'>
				<h3>Favorites</h3>
			</div>
			{props.favorites.length > 0 ? favesLoaded : loading}
		</>
	);
};

export default Favorites;
