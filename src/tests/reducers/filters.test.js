import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should set up default filter reducer correctly', () => {
    //To check if our redux sets up the store correctly before running everything else.
    const state = filterReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set startDate filter', () => {
    const action = filterReducer(undefined, {type: 'SET_START_DATE', startDate: moment(0)});
    expect(action.startDate).toEqual(moment(0));
});

test('should set endDate filter', () => {
    const action = filterReducer(undefined, {type: 'SET_END_DATE', endDate: moment(0)});
    expect(action.endDate).toEqual(moment(0));
});

test('should set text filter', () => {
    const action = filterReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'The changed text.'});
    expect(action.text).toBe('The changed text.');
});

test('should set sortBy to amount', () => {
    //we don't need a filter object here because the default has the sortBy set to date.
    const action = filterReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(action.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentFilter = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
      };
    const action = filterReducer(undefined, {type: 'SORT_BY_DATE'});
    expect(action.sortBy).toBe('date');
});