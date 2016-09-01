import React from 'react';

class CardForm extends React.Component {
	handleChange(field, e) {
		this.props.handleChange(field, e.target.value);
	}

	handleClose(e) {
		e.preventDefault();
		this.props.handleClose();
	}

	render() {
		return(
			<div>
				<div className="modal-card">
					<form onSubmit={this.props.handleSubmit.bind(this)}>
						<input type='text'
							   value={this.props.draftCard.title}
							   onChange={this.handleChange.bind(this, 'title')}
							   placeholder="Title"
							   required={true}
							   autoFocus={true}
						/>
						<textarea value={this.props.draftCard.description}
								  onChange={this.handleChange.bind(this, 'description')}
								  placeholder="Description"
								  required={true}
						/>
						<label htmlFor="status">Status</label>
						<select id="status"
								value={this.props.draftCard.status}
								onChange={this.handleChange.bind(this, 'status')}
						>
							<option value="todo">To Do</option>
							<option value="in-progress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<br />

						<div className='actions'>
							<button type="submit">{this.props.buttonLabel}</button>
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}></div>
			</div>
		);
	}
};

export default CardForm;