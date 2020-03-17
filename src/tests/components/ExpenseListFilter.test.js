import React from 'react';
import {shallow} from 'enzyme';
import {defaultFilter, validFilter} from '../fixtures/filter';
import {ExpenseListFilter} from '../../components/ExpenseListFilters';
import moment from 'moment';

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper ;

beforeEach(()=> {
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilter
            filters={defaultFilter}
            setTextFilter={setTextFilterSpy}
            sortByDate={sortByDateSpy}
            sortByAmount={sortByAmountSpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy}
        />
    );
});

test('should handle date focus change', () => {
    const newCalendarFocusChange = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(newCalendarFocusChange);
    expect(wrapper.state('calenderFocused')).toBe(newCalendarFocusChange);
});

test('should handle date changes', () => {
    const startDate = moment();
    const endDate = moment().add(5, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate, endDate});
    expect(setStartDateSpy).toHaveBeenCalledWith(startDate);
    expect(setEndDateSpy).toHaveBeenCalledWith(endDate);
});

test('should handle sort by date', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'date'}
    });
    expect(sortByDateSpy).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'amount'}
    });
    expect(sortByAmountSpy).toHaveBeenCalled();
});

test('should handle text changes', () => {
    const newtext = 'check';
    wrapper.find('input').simulate('change', {
        target: {value: newtext}
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(newtext);
});

test('should render ExpenseListFiter for default data', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFiter properly', () => {
    wrapper.setProps({
        filters: validFilter
    });
    expect(wrapper).toMatchSnapshot();
});