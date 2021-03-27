import React, {useState, useContext, createContext} from 'react';
import Router from 'next/router'

const searchContext = createContext();

export function ProvideSearch({children}) {
    const search = useProvideSearch();
    return <searchContext.Provider value={search}>{children}</searchContext.Provider>;
}

export const useSearch = () => {
    return useContext(searchContext);
};

function useProvideSearch() {
    const [search, setSearch] = useState('');

    const onSearch = (e) => {
        e.preventDefault();

        if (Router.pathname !== '/me/books' || Router.pathname !== '/books') {
            Router.push('/books')
        }

        const searchValue = e.target.value;
        const valueWithoutSlash = searchValue.replace('/', '');

        setSearch(valueWithoutSlash);
        return valueWithoutSlash;
    };

    return {
        onSearch,
        search
    };
}