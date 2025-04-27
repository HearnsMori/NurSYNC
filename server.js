const authMiddle = require('./middles/authMiddle');

require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

//Frontend part
// Serve static files (CSS, JS, images, etc.) from frontend folder
app.use(express.static(path.join(__dirname, 'frontendassets')));

// Non-auth routh html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontendpages', 'index.html'));
});

// Auth
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontendpages', 'login.html'));
});

app.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontendpages', 'signup.html'));
});

//Protected HTML
app.get('/learninghub', authMiddle, (req, res) => {
	if(req.userId) {
		res.sendFile(path.join(__dirname, 'frontendpages', 'learninghub.html'));
	}
});

app.get('/lesson', authMiddle, (req, res) => {
	if(req.userId) {
		res.sendFile(path.join(__dirname, 'frontendpages', 'lesson.html'));
	}
});

//Backend part

app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));

app.use(cors({
	origin: '',
	credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/serverstorage', express.static('./serverstorage'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/flashcard', require('./routes/flashcard'));
app.use('/api/note', require('./routes/note'));

//Connecting to Database
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoDBUri = process.env.MONGO_URI;
mongoose.connect(mongoDBUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {

	})
	.catch(err => {
		console.error('Failed to connect to MongoDB', err)
	});
const db = mongoose.connection;
db.on('connected', () => {});
db.on('error', err => console.error('Mongoose connection error:', err));
db.on('disconnected', () => {});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server listening at port ${PORT}`)
});

//When the user press ctrl C
process.on('SIGINT', () => {
	async function closeConnection() {
		try {
			await mongoose.connection.close();
			console.log('Connection closed successfully.');
			process.exit(0);
		} catch (err) {
			console.error('Failed to close the connection:', err);
		}
	}
	// Call the function when you need to close the connection
	closeConnection();
});
