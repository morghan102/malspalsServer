const express = require('express');
const homeRouter = express.Router();

homeRouter.route('/')
.all((req, res, next) => {//route emulating /campsites
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();//onto next routing method
})
.get((req, res) => {
    res.end('This is the get home endpt');
})

//i dont think i want post OR put on the homepage.... except for mal... i want her to be able to update the app
.post((req, res) => {
    res.end(`This is the post home endpt - ${req.body.name}, ${req.body.description}`); //WHat's on the req obj depends on my data (right?)
})

.put((req, res) => { 
    res.statusCode = 403;
    res.end('Put operation not supported on home')
})

//will make it so only admins can do this
.delete((req, res) => { 
     res.end('Deleting info selected')
});



module.exports = homeRouter;