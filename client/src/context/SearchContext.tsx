import { createContext, useState, useContext } from 'react';

// Data handling and hook functions
export interface ISearchContextType {
    searchResults: IDeezerTrack[];
    selectedTrack: IDeezerTrack | null;
    isLoading: boolean;
    isSearching: boolean;

    setIsLoading: (value: boolean) => void;
    setIsSearching: (value: boolean) => void;

    setSearchResults: (tracks: IDeezerTrack[]) => void;
    setSelectedTrack: (track: IDeezerTrack | null) => void;
}

// context init et typing
export const SearchContext = createContext< ISearchContextType | (undefined)>(undefined)

// Props types declaration
type SearchProviderProps = React.PropsWithChildren<{}>

const SearchProvider = ({ children }: SearchProviderProps) => {
    
    // Variables init
    const [searchResults, setSearchResults] = useState<IDeezerTrack[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<IDeezerTrack | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    // Varables integrations
    const value = {
        searchResults,
        selectedTrack,
        isLoading,
        isSearching,

        setSearchResults,
        setSelectedTrack,
        setIsLoading,
        setIsSearching,
    }

    return(

        // Accessibility to variables for children
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
} 

export default SearchProvider

// Allows the use of received data
export function useSearch () {
    const resultSearchContext = useContext(SearchContext)

    if (resultSearchContext == undefined) {
        throw new Error("Le hook useSearch doit être utilisé à l'intérieur du SearchProvider.");
    }

    return resultSearchContext
}