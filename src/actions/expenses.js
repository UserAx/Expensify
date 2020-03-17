import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startAddExpense = (expenseData ={}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note='',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {description, note, amount, createdAt};
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  }
}

export const startSetExpenses = ( ) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({id: childSnapshot.key,
                      ...childSnapshot.val()});
      });
      dispatch(setExpenses(expenses));
    });
  }
}

export const startRemoveExpense = ({id}={}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=> {
      dispatch(removeExpense({id}));
    });
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({//Note here we pass id as {id: 'someId'}
  type: 'REMOVE_EXPENSE',
  id
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=> {
      dispatch(editExpense(id, updates));
    });
  }
}


// EDIT_EXPENSE
export const editExpense = (id, updates) => ({//However here we pass argument as ('someId', {description: 'Some Text'})
  type: 'EDIT_EXPENSE',
  id,
  updates
});