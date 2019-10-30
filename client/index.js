import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost';
import './style/style.css'

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail'

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={ client } >
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={SongList} />
            <Route path="/songs/new" component={SongCreate} />
            <Route path="/songs/:id" component={SongDetail} />
          </Switch>
        </App>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
); 