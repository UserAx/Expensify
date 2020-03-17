import selectExpense from '../../selectors/expenses';
import moment from 'moment';

const expenses = [{
    description: 'rent',
    amount: 1500,
    createdAt: moment(0).valueOf(),
    note: "This month's rent."
}, {
    description: 'Shoping',
    amount: 150,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: "Brought eggs."
}, {
    description: 'Gas Bill',
    amount: 2000,
    createdAt: moment(0).add(4, 'days').valueOf(),
    note: "This month's gas bill."
}];

test('should filter by startDate', () => {
    const filter = {
        text:'',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const action = selectExpense(expenses, filter);
    expect(action).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate', () => {
    const filter = {
        text:'',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const action = selectExpense(expenses, filter);
    expect(action).toEqual([expenses[0], expenses[1]]);
});


test('should filter by text value', () => {
    const filter = {
        text:'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const action = selectExpense(expenses, filter);
    expect(action).toEqual([expenses[0]]);
});