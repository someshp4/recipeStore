import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import RecipeList from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import { useDarkMode } from './mode/useDarkMode';
import { GlobalStyles } from './mode/GlobalStyles';
import { lightTheme, darkTheme } from './mode/Themes';

const App = () => {

    const [theme, themeToggler] = useDarkMode();
    console.log("theme", theme);
    const themeMode = theme === 'light'? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles />
                <div>
                    <BrowserRouter>
                        <Header theme={theme} themeToggler={themeToggler} />
                        <Switch>
                            <Route path='/' exact component={ RecipeList } />
                            <Route path='/recipes/search' exact component={ RecipeList } />
                            <Route path='/recipes/:id' exact component= { RecipeDetails } />
                        </Switch>
                    </BrowserRouter>
                </div>
            </>
        </ThemeProvider> 
    );

};

export default App;