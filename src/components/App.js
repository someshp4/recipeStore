import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import RecipeList from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path='/' exact component={ RecipeList } />
                    <Route path='/recipes/search' exact component={ RecipeList } />
                    <Route path='/recipes/:id' exact component= { RecipeDetails } />
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;