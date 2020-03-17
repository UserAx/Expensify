import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

test('should set default state', () => {
    const state = expenseReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = expenseReducer(expenses, {type: 'REMOVE_EXPENSE', id: expenses[1].id});
    expect(action).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if no id is given', () => {
    const action = expenseReducer(expenses, {type: 'REMOVE_EXPENSE', id: '-1'});
    expect(action).toEqual(expenses);
});

test('should add expense', () => {
    const expense = ({
        id: uuidv4(),
        description: 'Electricity Bill',
        amount: 3000,
        createdAt: moment(0).add(10, 'days').valueOf(),
        note: "This month's electricity bill."
    });
    const action = expenseReducer(expenses, {type: 'ADD_EXPENSE', expense});
    expect(action). toEqual([...expenses, expense]);
});

test('should edit expense', () => {
    const action = expenseReducer(expenses, {
        type: 'EDIT_EXPENSE', 
        id: expenses[0].id,
        updates: {
            amount: 25000
        }
    });
    expect(action[0].amount).toBe(25000);
});

test('should not edit expense if expense not found', () => {
    const action = expenseReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: 's1ad5sa1d5',
        updates: {
            amount: 25000
        }
    });
    expect(action).toEqual(expenses);
});

test('should set expenses in redux store from firebase', () => {
    const action = expenseReducer(expenses, {type: 'SET_EXPENSES', expenses});
    expect(action).toEqual(expenses);
})