import { mount } from 'enzyme';
import { LoginScreen } from './LoginScreen';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

describe('LoginScreen', () => {
    const history = {
        replace: jest.fn()
    };
    const contextValue = {
        dispatch: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('Should show correctly', () => {
        expect.hasAssertions();
        expect(wrapper).toMatchSnapshot();
    });

    test('Should dispatch and navigate', () => {
        expect.hasAssertions();
        const expectedDispatchValue = {
            payload: { name: 'Dany' },
            type: types.Login
        }
        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenCalledWith(expectedDispatchValue);
        expect(history.replace).toHaveBeenCalled(); 4
    });
});
