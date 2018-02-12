//Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//Instruments
import todoApp from './reducers';

const store = createStore(todoApp);

render(
    <Provider store = { store }>
        
    </Provider>,
    document.getElementById('root')
);
