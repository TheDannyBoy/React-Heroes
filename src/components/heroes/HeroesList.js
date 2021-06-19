import React from 'react'
import { getHeroesByPublisher } from '../selectors/getHero'
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => {
    const heroes = getHeroesByPublisher(publisher);

    return (
        <div className='card-columns'>
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
