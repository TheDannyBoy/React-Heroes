import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from './HeroScreen';

describe('HeroScreen', () => {
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={historyMock} />
        </MemoryRouter>
    );

    test('Should show component <Redirect /> if there are no params in the URL', () => {
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Should show hero if the param and the hero exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route exact path='/hero/:heroId' component={HeroScreen}></Route>
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Should go back to last screen through .push', () => {
        const history = {
            ...historyMock,
            length: 1
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    exact
                    path='/hero/:heroId'
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('Should go back to last screen through .goBack', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    exact
                    path='/hero/:heroId'
                    component={() => <HeroScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
    });

    test('Should call Redirect if the Hero does not exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/pokemon']}>
                <Route exact path='/hero/:heroId' component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
    });
});
