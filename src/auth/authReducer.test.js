import { authReducer } from './authReducer'
import { types } from "../types/types";

describe('authReducer', () => {
    test('Should return default state', () => {
        expect.hasAssertions();
        const state = authReducer({}, { type: null });
        expect(state).toStrictEqual({});
    });

    test('Should authenticate and set the user name', () => {
        expect.hasAssertions();
        const state = authReducer({}, {
            payload: { name: 'test' },
            type: types.Login
        });
        expect(state).toStrictEqual({ name: 'test', logged: true });
    });

    test('Should erase user name and set logged as false', () => {
        expect.hasAssertions();
        const state = authReducer({}, { type: types.Logout });
        expect(state).toStrictEqual({ logged: false });
    });
});
