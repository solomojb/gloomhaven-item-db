import React, { useState, useContext, createContext } from 'react';
import Firebase from './firebase';

const FirebaseContext = createContext<Firebase | undefined>(undefined);

export function useFirebase() {
    return useContext(FirebaseContext);
}

const { Provider } = FirebaseContext;

const FirebaseProvider: React.FC<{}> = ({ children }) => {
    const [firebase, setFirebase] = useState<Firebase | undefined>(new Firebase());

    return <Provider value={firebase}>{children}</Provider>
}
 
export default FirebaseProvider;