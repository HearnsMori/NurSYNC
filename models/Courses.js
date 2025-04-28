const mongoose = require('mongoose');

const Courses = new mongoose.Schema({
	username: {
		type: String,
		unique: false,
		required: true
	},
	level: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	},
	title: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	},
	aaa: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	},
	sem: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	},
	level: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	},
	progress: {
		type: String,
		unique: false,
		required: false,
		default: '/serverstorage/courses/level/default/default.txt'
	}
});

Courses.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('Courses', Courses);
