require('dotenv').config();
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/Shroomcraft';
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

app.use(helmet({
  // contentSecurityPolicy: {
  //   directives: {
  //     "default-src": ["'self'", "http://78.108.218.59:25787/"],
  //     "frame-src": ["https://www.youtube.com", "http://78.108.218.59:25787/"],
  //     "connect-src": ["http://78.108.218.59:25787/"],
  //     "media-src": ["http://78.108.218.59:25787/"],
  //     "img-src": ["http://78.108.218.59:25787/"],
  //     "child-src": ["http://78.108.218.59:25787/"],
  //     "fenced-frame-src": ["http://78.108.218.59:25787/"],
  //     "font-src": ["http://78.108.218.59:25787/"],
  //     "manifest-src": ["http://78.108.218.59:25787/"],
  //     "object-src": ["http://78.108.218.59:25787/"],
  //     "script-src": ["http://78.108.218.59:25787/"],
  //     "worker-src": ["http://78.108.218.59:25787/"]
  //   },
  // },
  
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: true
}));
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
