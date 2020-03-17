import moment from 'moment';

export const defaultFilter = {
    text: '',
    sortBy: '',
    startDate: '',
    endDate: ''
}

export const validFilter = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
}