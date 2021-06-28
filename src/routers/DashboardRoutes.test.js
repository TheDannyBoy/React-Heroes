import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { DashboardRoutes } from './DashboardRoutes';
import { AuthContext } from '../auth/AuthContext';

const TestContext = ({ children, contextValue }) => (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
);

describe('DashboardRoutes', () => {
    test('Should show correctly', () => {
        expect.hasAssertions();
        const contextValue = {
            dispatch: jest.fn(),
            user: { logged: true, name: 'Henry' }
        };

        const wrapper = mount(
            <TestContext contextValue={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </TestContext>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Henry');
    });
});
