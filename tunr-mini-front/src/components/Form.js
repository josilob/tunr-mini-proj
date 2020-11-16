import React from 'react';

const Form = (props) => {
	const emptySong = {
		title: '',
		artist: '',
		time: '',
	};
	const [formData, setFormData] = React.useState(props.song);

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleSubmit(formData);
		setFormData(emptySong);
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form className='songForm' onSubmit={handleSubmit}>
			<input
				id='title'
				type='text'
				name='title'
				value={formData.title}
				onChange={handleChange}
			/>
			<br />
			<input
				id='artist'
				type='text'
				name='artist'
				value={formData.artist}
				onChange={handleChange}
			/>
			<br />
			<input
				id='time'
				type='text'
				name='time'
				value={formData.time}
				onChange={handleChange}
			/>
			<br />
			<input type='submit' value={props.label} />
		</form>
	);
};

export default Form;
