import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from './SearchScreen';

describe('SearchScreen', () => {
    test('Should show correctly with default valules', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Should show Batman and the input value the same as the query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
    });

    test('Should show an error if there is no hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-info').text().trim()).toBe('No heroes to show');
    });

    test('Should show push history()', () => {
        const history = { push: jest.fn() };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path='/search' component={() => <SearchScreen history={history} />} />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'hulk'
            }
        });
        wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() });

        expect(history.push).toHaveBeenCalledWith('?q=hulk');
    });
});
