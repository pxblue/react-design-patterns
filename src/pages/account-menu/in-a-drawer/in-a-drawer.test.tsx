import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { InADrawer } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <InADrawer />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
