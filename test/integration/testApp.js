import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <div>
            <div>
              <h1> Hey there this is the rendering the html </h1>
            </div>
        </div>
    </Provider>,
    document.getElementById('root')
);
