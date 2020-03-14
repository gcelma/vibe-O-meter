import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import './index.sass';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const Root = () => (
    <HashRouter>
        <ApolloProvider client= { client }>
            <App />
        </ApolloProvider>
    </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
