const express = require('express');
require('./models');
const parcel = require('parcel-bundler')
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const app = express();
// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://ldsrogan:endure2theend@cluster0-wg8ix.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
   });
   
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));
 
var bundler = new parcel('client/index.html', {});

app.use(bundler.middleware());

module.exports = app;
