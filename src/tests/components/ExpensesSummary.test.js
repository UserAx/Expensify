import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('should render expenses summary with a single expense', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal= {235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render expenses summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal= {23500}/>);
    expect(wrapper).toMatchSnapshot();
});

