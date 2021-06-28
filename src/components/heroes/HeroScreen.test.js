import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
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
    })
})
