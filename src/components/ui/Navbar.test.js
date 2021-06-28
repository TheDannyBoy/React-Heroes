import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Router, MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

describe('Navbar', () => {
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: { logged: true, name: 'test user' }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should show correctly', () => {
        expect.hasAssertions();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('test user');
    });

    test('Should call logout and use history', () => {
        expect.hasAssertions();
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.Logout });
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });
});
