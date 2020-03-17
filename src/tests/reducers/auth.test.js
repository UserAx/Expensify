import authReducer from '../../reducers/auth';

test('should set up auth reducer for login', () => {
    const action = authReducer({}, {type: 'LOGIN', uid: '14s'});
    expect(action.uid).toBe('14s');
});

test('should set up auth reducer for logout', () => {
    const action = authReducer({uid: '142s'}, {type: 'LOGOUT'});
    expect(action).toEqual({});
});