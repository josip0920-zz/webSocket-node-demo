const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { WebSocketServer } = require('ws');

app.use(cors());

app.use(
    bodyParser.json({
        limit: "15360mb",
        type: "application/json",
    })
);

app.use(
    bodyParser.urlencoded({
        limit: "15360mb",
        extended: true,
        parameterLimit: 5000000,
        type: "application/x-www-form-urlencoded",
    })
);

app.get('/', (req, res) => {
    res.send('connected')
});


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        wss.broadcast(data)
        console.log('received: %s', data);
    });

    ws.send('something');
});

const port = process.env.PORT || 3030;

app.listen(port, () => console.log("App listening at port:", port))
