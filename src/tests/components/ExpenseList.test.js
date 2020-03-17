import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseList} from '../../components/ExpenseList';

import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses = {expenses.map((expense)=> ({...expense, id:'staticIdforTesting'}))} />);
    //I have set a static id because every time the test runs the id is going to be unique i.e. it will fail every second time.
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with no expenses provided', () => {
    const wrapper = shallow(<ExpenseList expenses = {[]} />);
    expect(wrapper).toMatchSnapshot();
});
