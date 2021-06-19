import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Navbar } from '../components/ui/Navbar';
import { DcScreen } from '../components/dc/DcScreen';
import { HeroeScreen } from '../components/heroes/HeroeScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-2">
                <Switch>
                    <Route exact path='/marvel' component={MarvelScreen}></Route>
                    <Route exact path='/heroe/:heroId' component={HeroeScreen}></Route>
                    <Route exact path='/dc' component={DcScreen}></Route>
                    <Redirect to='/marvel'></Redirect>
                </Switch>
            </div>
        </>
    )
}
