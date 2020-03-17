import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('should return 0 for no expense', () => {
    const action = expensesTotal([]);
    expect(action).toBe(0);
});

test('should add single expense correctly', () => {
    const action = expensesTotal([expenses[0]]);
    expect(action).toBe(expenses[0].amount);
});

test('should add multiple expenses correctly', () => {
    const action = expensesTotal(expenses);
    expect(action).toBe(3650);
});