const mongoose = require('mongoose');

const FlashcardQuiz = new mongoose.Schema({
	username: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	term: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	content: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	category: {
		type: String,
		unique: false,
		required: false,
		default: ''
	}
});

FlashcardQuiz.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('FlashcardQuiz', FlashcardQuiz);
