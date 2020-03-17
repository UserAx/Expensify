import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import {shallow} from 'enzyme';
import moment from 'moment';

test('should render Expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense form correctly using data', () => {
    const expense = {...expenses[0], id:'staticTextforTesting'}
    const wrapper = shallow(<ExpenseForm expense={expense}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', ()=> {
    const description = 'change in description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target : {value: description}
    });
    expect(wrapper.state('description')).toBe(description);
});

test('should set note on textarea change', ()=> {
    const note = 'change in note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target : {value: note}
    });
    expect(wrapper.state('note')).toBe(note);
});

test('should set amount', ()=> {
    const amount = '60.54';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target : {value: amount}
    });
    expect(wrapper.state('amount')).toBe(amount);
});

test('should not set for invalid amount', ()=> {
    const amount = '12.02545'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target : {value: amount}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe(undefined);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change of singledatepicker', ()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set onFocus value of singledatepicker', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});