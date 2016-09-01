import 'whatwg-fetch';

const API_URL = 'http://localhost:8000/api';
const API_JSON_HEADERS = {
    'Content-Type': 'application/json'
};

let KanbanAPI = {
	fetchCards() {
		return fetch(
					`${API_URL}/cards`, 
					{headers: API_JSON_HEADERS}
			   ).then(
			   		(response) => response.json()
			   );
	},

	addCard(card) {
		return fetch(
					`${API_URL}/cards`, 
					{
						method: 'post',
						headers: API_JSON_HEADERS,
						body: JSON.stringify(card)
					}
			   ).then(
			   		(response) => response.json()
			   );
	},

	updateCard(origCard, draftCard) {
		return fetch(
					`${API_URL}/cards/${origCard._id}`,
					{
						method: 'put',
						headers: API_JSON_HEADERS,
						body: JSON.stringify(draftCard)
					}
			   );
	},

	deleteCard(card) {
		return fetch(
					`${API_URL}/cards/${card._id}`,
					{
						method: 'delete',
						headers: API_JSON_HEADERS
					}
			   );
	},

	addTask(cardId, task) {
		return fetch(
					`${API_URL}/cards/${cardId}/tasks`,
					{
						method: 'post',
						headers: API_JSON_HEADERS,
						body: JSON.stringify({taskname: task.name})
					}
			   ).then(
			   		(response) => response.json()
			   );
	},

	deleteTask(cardId, task) {
		return fetch(
					`${API_URL}/cards/${cardId}/tasks/${task._id}`,
					{
						method: 'delete',
						headers: API_JSON_HEADERS
					}
			   );
	},

	toggleTask(cardId, task) {
		return fetch(
					`${API_URL}/cards/${cardId}/tasks/${task._id}`,
					{
						method: 'put',
						headers: API_JSON_HEADERS,
						body: JSON.stringify({taskstatus: !task.done})
					}
			   );
	}    
};

export default KanbanAPI;