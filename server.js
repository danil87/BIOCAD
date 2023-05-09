const fs = require('fs');
const PATH = require('path');
const express = require('express');
const mime = require('mime-types');
const devicesRouter = require('./routes/devices.route');
const usersRouter = require('./routes/users.route');
const favoriteDevicesRouter = require('./routes/favoriteDevices.router');
const worksController = require('./routes/works.route');

const PORT = process.env.PORT || 3000;

const server = express();

server.listen(PORT, () => console.log('server start'));
server.use(express.static('public'));
server.get('/', (req, res) => {
    displayPage(req, res, 'main.html');
})

server.get('/analytics', (req, res) => {
    displayPage(req, res, 'analytics.html');
})

server.use(express.json());
server.use('/', devicesRouter);
server.use('/', usersRouter);
server.use('/' , worksController);
server.use('/favorite', favoriteDevicesRouter);

server.get('/:dir/:filename', (req, res) => {
    displayPage(req, res, PATH.join(req.params.dir, req.params.filename));
})

server.get('/:filename', (req, res) => {
    displayPage(req, res, req.params.filename);
})

function displayPage(req, res, path){
    const stream = fs.createReadStream(PATH.join(__dirname, 'public', path));
    stream.on('error', function(){
        const newStream = fs.createReadStream(PATH.join(__dirname, 'public', 'notFoundPage.html'));
        newStream.on('open', function() {
            res.set('Content-Type', mime.lookup(path));
            newStream.pipe(res);
        });
    })
    stream.on('open', function() {
        res.set('Content-Type', mime.lookup(path));
        stream.pipe(res);
    })
}
