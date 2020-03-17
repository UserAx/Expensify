import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import {shallow} from 'enzyme';

test('should render expense list items', () => {
    const expense = {...expenses[0], id: 'staticIdforthistest'};
    //I have set a static id because every time the test runs the id is going to be unique i.e. it will fail every second time.
    const wrapper = shallow(<ExpenseListItem {...expense}/>);
    expect(wrapper).toMatchSnapshot();
});