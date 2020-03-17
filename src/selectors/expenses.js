// Get visible expenses
import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {//returns only those expense object that match the following cases.
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    //Here startDate is getting compared to createdAtMoment not the other war around. 
    //if start day is yesterday and createdAtMoment is yesterday then we get true since startday is before today.
    //Same is true for my endDateMatch bellow.
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {//and sorts those object by amount or date if set.
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};