const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();//express server func
app.use(morgan('dev'));//morgan using the develpmt version
app.use(express.json());//express will handle parsing json into js objs





// i think we delete this l8r
app.all('/home', (req, res, next) => {//route emulating /campsites
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();//onto next routing method
});

app.get('/home', (req, res) => {
    res.end('This is the get home endpt');
});

//i dont think i want post OR put on the homepage.... except for mal... i want her to be able to update the app
app.post('/home', (req, res) => {
    res.end(`This is the post home endpt - ${req.body.name}, ${req.body.description}`); //WHat's on the req obj depends on my data (right?)
});

app.put('/home', (req, res) => { 
    res.statusCode = 403;
    res.end('Put operation not supported on home')
})

//will make it so only admins can do this
app.delete('/home', (req, res) => { 
     res.end('Deleting info selected')
})



//this is following /campsites/:campsiteId
//idk if i'll use this...
// OR would the path to other screens be through /home? or maybe that's just popups
app.get('/home/:somepathId', (req, res) => {
    res.end(`This is the get home endpt - ${req.params.somepathId}`); 
});
app.post('/home/:somepathId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST not supported on /home/${req.params.somepathId}`); 
});
//again, not sure I'll want put
app.put('/home/:somepathId', (req, res) => { 
    res.write(`updating smth: ${req.params.somepathId}`);
    res.end(`Will update ${req.body.name} with ${req.body.description}`);
})
app.delete('/home/:somepathId', (req, res) => { });

app.use(express.static(__dirname + '/public'));//.!.!.!so if I changed the __dirname to the location of my front-end code, would it serve those up instead??

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

  // removed "type": "module",\ from the 1st object in pasckage.json bc it gave an error as "require not defined", weird
