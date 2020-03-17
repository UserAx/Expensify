import {login, logout} from '../../actions/auth';

test('should setup login action correctly', () => {
    const action = login('1sd4');
    expect(action).toEqual({type:'LOGIN', uid:'1sd4'});
});

test('should setup logout action correctly', () => {
    const action = logout();
    expect(action).toEqual({type:'LOGOUT'});
});