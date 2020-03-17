import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

export default [{
    id: '1',
    description: 'rent',
    amount: 1500,
    createdAt: moment(0).valueOf(),
    note: "This month's rent."
}, {
    id: '2',
    description: 'Shoping',
    amount: 150,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: "Brought eggs."
}, {
    id: '3',
    description: 'Gas Bill',
    amount: 2000,
    createdAt: moment(0).add(4, 'days').valueOf(),
    note: "This month's gas bill."
}];