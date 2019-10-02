//MoNGODB CONNECTION: mongodb+srv://aim:<password>@cluster0-dbrul.mongodb.net/test?retryWrites=true&w=majority

const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aim:<passwd>@cluster0-dbrul.mongodb.net/test?retryWrites=true&w=majority')
    .then(()=>{
        console.log("successfully connected to mongodb atlas");
    })
    .catch( (error)=>{
        console.log("Unable To Connect to MongoDB Atlas");
        console.error(error);
    })

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port
    }
    return false;
};


const port = normalizePort(process.env.port || '3000');
app.set('port', port);

const errorHandler = error=>{
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address :'port' + port;

    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listen', ()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
})

server.listen(port);
