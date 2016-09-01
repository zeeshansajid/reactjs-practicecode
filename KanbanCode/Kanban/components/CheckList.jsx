import React from 'react';
import uuid from 'node-uuid';

import TaskActionCreators from '../flux/actions/TaskActionCreators';

class CheckList extends React.Component {
	checkInputKeyPress(evt) {
		if(evt.key === 'Enter') {
			TaskActionCreators.addTask(this.props.cardId, {
			    _id: uuid.v4(),
			    name: evt.target.value,
			    done: false
			});
			evt.target.value = '';
		}
	}
	
	render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li className="checklist_task" key={task._id}>
                <input type="checkbox" checked={task.done} 
                    onChange={TaskActionCreators.toggleTask.bind(
                                null,
                                this.props.cardId,
                                task,
                                taskIndex
                            )} 
                />
                {task.name}
                <a href="#" className="checklist_task_remove"
                            onClick={TaskActionCreators.deleteTask.bind(
					   				    null,
					   				    this.props.cardId,
					   				    task,
					   				    taskIndex
					   		        )}
                />
            </li>
        ));
        
        return(
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                        className="checklist_add_task"
                        placeholder="Type then hit Enter to add a task"
                        onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        )
    }
}

export default CheckList;