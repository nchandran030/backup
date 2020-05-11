const applicationRouting = require('./api/routes/application-routing').makeObject();
const express = require('express');
const app = express();
const cors = require('cors');

class Server {

    constructor() {
        const server = app.listen(3000),
            host = server.address().address,
            port = server.address().port
        console.log("Example app listening at", host, port);
    }
}

const server = new Server();
app.use(cors());
app.get('/api/readingFile', applicationRouting.readFileRoute);
app.get('/api/writingFile/:key/:value', applicationRouting.writeFileRoute);
app.get('/api/editingValue/:key/:value', applicationRouting.valueEditFileRoute);
app.get('/api/editingKey/:key/:value', applicationRouting.keyEditFileRoute);
app.get('/api/getHardwareDetails', applicationRouting.getHardwareDetails);
app.get('/api/getMemoryDetails', applicationRouting.getMemoryDetails);
app.get('/api/getDiskWiseMemoryDetails', applicationRouting.getDiskWiseMemoryDetails);
app.get('/api/getFolderDetailsDirectoryTree', applicationRouting.getFileFolderDetailsDirectoryTree);
app.get('/api/executeCommands/:commands', applicationRouting.executeCommands);
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});
module.exports = Server;