import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'

const TestComponent = () => <span>Test Component</span>;

describe('PrivateRoute', () => {
    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();

    test('Should show component if the user is authenticated and save in the localStorage', () => {
        expect.hasAssertions();
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated component={TestComponent} {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
    });

    test('Should not show the component if the user is not authenticated', () => {
        expect.hasAssertions();
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute isAuthenticated={false} component={TestComponent} {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
    });
});
