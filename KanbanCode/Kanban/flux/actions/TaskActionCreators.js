import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';
import KanbanApi from './KanbanAPI';

let TaskActionCreators = {
	addTask(cardId, task) {
		AppDispatcher.dispatchAsync(KanbanApi.addTask(cardId, task), {
			request: Constants.CREATE_TASK,
			success: Constants.CREATE_TASK_SUCCESS,
			failure: Constants.CREATE_TASK_FAILURE
		}, {cardId, task});
	},

	deleteTask(cardId, task, taskIndex) {
		AppDispatcher.dispatchAsync(KanbanApi.deleteTask(cardId, task), {
			request: Constants.DELETE_TASK,
			success: Constants.DELETE_TASK_SUCCESS,
			failure: Constants.DELETE_TASK_FAILURE
		}, {cardId, task, taskIndex});
	},
	
	toggleTask(cardId, task, taskIndex) {
		AppDispatcher.dispatchAsync(KanbanApi.toggleTask(cardId, task), {
			request: Constants.TOGGLE_TASK,
			success: Constants.TOGGLE_TASK_SUCCESS,
			failure: Constants.TOGGLE_TASK_FAILURE
		}, {cardId, task, taskIndex});
	}
};

export default TaskActionCreators;