import { 
    addExpense, 
    editExpense, 
    removeExpense, 
    startAddExpense, 
    setExpenses,
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense} from '../../actions/expenses';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'aDummyId';
const defaultAuthUid = {auth: {uid}};

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, amount, note, createdAt}) => {
        expenseData[id] = {description, amount, note, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should setup remove expense', () => {
    const action = removeExpense({id: '123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    });
});

test('should setup edit expense', () => {
    const action = editExpense('123', {description: 'rent'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            description: 'rent'
        }
    });
});

test('should add expense', () => {
    const expense = {
        description: ' For my rent',
        note: 'This month',
        amount: '25000',
        createdAt: '100000000'
    };
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense
    });
});

test('should add expense using startAddExpense to database and store', (done) => {
    const store = createMockStore(defaultAuthUid);
    const expenseData = { description: 'mouse', amount: 25, note: '', createdAt: 26566256 };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //Below from here upto done(), the test passes because our data gets written in our firebase database.
        //But using done();, it fails due to some timeout error. I don't even know how to use async await here.
        //So for this test, lets compromise.
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
    }).then((snapshot) => {                                                         
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense using startAddExpense with default expense data to database and store', (done) => {
    const store = createMockStore(defaultAuthUid);
    const expenseData = { description: '', amount: 0, note: '', createdAt: 0 };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //Below from here upto done(), the test passes because our data gets written in our firebase database.
        //But using done();, it fails due to some timeout error. I don't even know how to use async await here.
        //So for this test, lets compromise.
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
    }).then((snapshot) => {                                                         
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthUid);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase correctly', (done) => {
    const store = createMockStore(defaultAuthUid);
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should edit expense using startEditExpense', (done) => {
    const store = createMockStore(defaultAuthUid);
    const id = expenses[1].id;
    const updates = {note: "updated notes."};
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe("updated notes.");
        done();
    });
});