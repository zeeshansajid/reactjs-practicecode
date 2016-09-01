var mongoose = require('mongoose');
var Card = require('./kanban.card.model');

mongoose.connect('mongodb://localhost/kanbanapi');

var card = new Card({
	title: 'Read the book',
	description: 'I should read the whole book',
	status: 'in-progress'
});

// card.addTask('chapter 1');

card.save(function(err) {
	if (err) {
		console.log(err.message);
	} else {
		console.log('succeed');
	}
});

// Card.findById('56f5d1ebfb2713d615ec24e9', function(err, card) {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		if (card != null) {
// 			//card.updateTask('56f5d1ebfb2713d615ec24ea', 'chapter 1', true);

// 			card.removeTask('56f5d1ebfb2713d615ec24ea');
			
// 			card.save(function(err) {
// 				if (err) {
// 					console.log(err.message)
// 				} else {
// 					console.log('succeed');
// 				}
// 			});
// 		} else {
// 			console.log('invalid card');
// 		}
// 	}
// });