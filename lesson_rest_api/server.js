const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let posts = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/getAllPosts', function(req, res) {
    res.send(posts);
});

app.post('/api/createPost', function(req, res) {
    posts.push({
        title: req.body.title,
        text: req.body.text,
        id: posts.length
    });
    console.log(posts);
    res.send('Post created!');
});

app.patch('/api/updatePost/:id', function(req, res) {
    let updatePost = posts[req.params.id] || res.send('Post not found!');
    updatePost.title = req.body.title;
    updatePost.text = req.body.text;
    res.send('Post updated!');
})

app.delete('/api/deletePost/:id', function(req, res) {
    if (req.params.id) {
        posts.splice(req.params.id, 1);
        res.send('Post deleted!');
    }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

