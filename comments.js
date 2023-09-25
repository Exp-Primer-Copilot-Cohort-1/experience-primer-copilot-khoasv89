// Create web server
const express = require('express');
const app = express();
const port = 3000;
// Create database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CommentDB', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// Create model
const Comment = mongoose.model('Comment', commentSchema);
// Create sample comments
const comment1 = new Comment({ name: 'John', comment: 'Hello World' });
const comment2 = new Comment({ name: 'Mary', comment: 'Hi, nice to meet you' });
// Save sample comments
comment1.save(function (err, comment) {
    if (err) return console.error(err);
    console.log(comment.name + " saved.");
});
comment2.save(function (err, comment) {
    if (err) return console.error(err);
    console.log(comment.name + " saved.");
});
// Set view engine
app.set('view engine', 'pug');
// Set static files
app.use(express.static('public'));
// Set routes
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/comments', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) return console.error(err);
        console.log(comments);
        res.render('comments', { comments: comments });
    })
});
// Start server
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});