import React from 'react'
import { getHeroesByPublisher } from '../selectors/getHero'
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => {
    const heroes = React.useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className='card-columns animate__animated animate__fadeIn'>
            <ul>
                {
                    heroes.map(hero =>
                        <HeroCard key={hero.id} {...hero} />
                    )
                }
            </ul>
        </div>
    )
}
