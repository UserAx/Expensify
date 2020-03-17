import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, onStartEditSpy, onStartRemoveSpy, historySpy;
const expense = {...expenses[1], id: '1s5sd'};

beforeEach(() => {
    onStartEditSpy = jest.fn();
    onStartRemoveSpy = jest.fn();
    historySpy = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage
                        startEditExpense={onStartEditSpy}
                        startRemoveExpense={onStartRemoveSpy}
                        history={historySpy}
                        expense={expense//to get the id for this.props.expense.id
                        }
                        />);
});

test('should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    //to pass our expense in editExpense(this.props.expense.id, expense) but not for the first argument, only the second.
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(onStartEditSpy).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    //to pass our expense in editExpense(this.props.expense.id, expense) but not for the first argument, only the second.
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(onStartRemoveSpy).toHaveBeenLastCalledWith({id: expense.id});
});
