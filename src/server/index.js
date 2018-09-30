import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import { connect } from './database';
import App from '../client/App.jsx';
import Html from '../client/Html.jsx';

const PORT = 5000;
const app = express();
const httpServer = http.Server(app);

app.use(cookieParser());
app.use(express.static('dist/client'));

app.get('/api', (req, res) => {
  res.send({
    test: 'value from server',
    test2: 'asd',
  });
});

app.get('/', (req, res) => {
  const clietnApp = App({ cookies: req.cookies });
  const content = renderToString(clietnApp.content);

  const response = Html({
    title: 'FindPart',
    content,
    defStore: clietnApp.store ? clietnApp.store.getState() : null,
  });

  res.send(response);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);

  connect();
});
