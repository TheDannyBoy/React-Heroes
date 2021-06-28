import { mount } from 'enzyme';
import AppRouter from './AppRouter';
import { AuthContext } from '../auth/AuthContext';

const TestContext = ({ children, contextValue }) => (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
);

describe('AppRouter', () => {
    test('Should show login if user is not authenticated', () => {
        expect.hasAssertions();
        const contextValue = {
            dispatch: jest.fn(),
            user: { logged: false }
        };

        const wrapper = mount(
            <TestContext contextValue={contextValue}>
                <AppRouter />
            </TestContext>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Should show dashboard components if user is authenticated', () => {
        expect.hasAssertions();
        const contextValue = {
            dispatch: jest.fn(),
            user: { logged: true, name: 'Henry' }
        };

        const wrapper = mount(
            <TestContext contextValue={contextValue}>
                <AppRouter />
            </TestContext>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
});
