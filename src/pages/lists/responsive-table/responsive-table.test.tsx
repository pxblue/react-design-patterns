import React from 'react';
import { ResponsiveTable } from '.';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <ResponsiveTable />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
