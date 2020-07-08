import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MealTypes = [ "any", "appetizer", "beverage", "breakfast", "dessert", "main course", "salad", "snack", "soup" ];

const CapitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const SearchBarForm = () => {
    
    let history = useHistory();
    //to retain values on page refresh
    const paramsObject = new URLSearchParams(history.location.search);
    
    const mealTypeDef = paramsObject.get('mealType')? paramsObject.get('mealType') : 'Any';
    const searchTermDef = paramsObject.get('searchTerm')? paramsObject.get('searchTerm') : '';
    
    
    const [mealType, setMealType] = useState(mealTypeDef);
    const [searchTerm, setSearchTerm] = useState(searchTermDef);


    useEffect(() => {
        return history.listen((location) => {
            const paramsObject = new URLSearchParams(location.search);
            const mealTypeDef = paramsObject.get('mealType')? paramsObject.get('mealType') : '';
            const searchTermDef = paramsObject.get('searchTerm')? paramsObject.get('searchTerm') : '';
            setMealType(mealTypeDef);
            setSearchTerm(searchTermDef);
        })
       
    }, [history]);

    const handleMealTypeChange = (event)  => {
        setMealType(event.target.value);
    }

    const handleSearchBoxChange = (event)  => {
        setSearchTerm(event.target.value);
    }
    
    const getQueryString = (mealType, searchTerm) => {
        const params = new URLSearchParams();
        if(mealType) {
            params.append('mealType', mealType);
        }
        if(searchTerm) {
            params.append('searchTerm', searchTerm);
        }
        return params.toString();
    };

    const handleSubmit = (event) => {
        const params = getQueryString(event.target.mealType.value, event.target.searchInput.value);
        event.preventDefault();
        history.push({pathname: '/recipes/search', search: '?'+params});
    }

    return (
            <form onSubmit={handleSubmit} className="searchBar">
                <div className="dropdown">
                    <label>
                        MealType:
                        <select name="mealType" value={ mealType } onChange={handleMealTypeChange}>
                            { MealTypes.map(element => <option key={ element } value={ element }>{ CapitalizeFirst(element) }</option>) }
                        </select>
                    </label>
                </div>
                <div className="searchBox">
                    <input className="searchInput" name="searchInput" type="text" value={ searchTerm } onChange={ handleSearchBoxChange }  autoComplete="off"/>
                    <input className="submitInput" type="submit" value="Search" />
                </div>
            </form>
    );
};


export default SearchBarForm;