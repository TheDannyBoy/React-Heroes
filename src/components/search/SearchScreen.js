import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../selectors/getHero';

export const SearchScreen = ({ history }) => {
    // Get the hero keyword from queryParam
    const { search } = useLocation();
    const { q: query = '' } = queryString.parse(search);

    // Match the queryParam to the input value
    const [formValues, handleInputChange] = useForm({ searchText: query });
    const { searchText } = formValues;

    // Filter the heroes
    const heroesFiltered = useMemo(() => getHeroesByName(query), [query]);

    const handleSearch = (evt) => {
        evt.preventDefault();
        history.push(`?q=${searchText}`)
    };

    return (
        <>
            <div>SearchScreen</div>
            <hr />

            <div className='row'>
                <div className="col-12">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Find your hero...'
                            className='form-control'
                            autoComplete='off'
                            name='searchText'
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button
                            type='submit'
                            className='btn mt-1 btn-block btn-outline-primary'
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <div className="row mt-5">
                <div className='col-12'>
                    <h4>Results</h4>
                    <hr />

                    {
                        !heroesFiltered.length
                            ?
                            <div className="alert alert-info">No heroes to show</div>
                            :
                            <div className='card-columns animate__animated animate__fadeIn'>
                                <ul>
                                    {
                                        heroesFiltered.map(hero =>
                                            <HeroCard key={hero.id} {...hero} />
                                        )
                                    }
                                </ul>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
