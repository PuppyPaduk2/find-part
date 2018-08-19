import express from 'express';
import http from 'http';
import { main } from './http';
import socket from './socket';

const PORT = 3000;
const app = express();
const httpServer = http.Server(app);

app.use(express.static('dist/client'));
app.get('/', main);

socket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
