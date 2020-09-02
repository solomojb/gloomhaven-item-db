import React, { useState, useContext, createContext, useEffect } from 'react';
import Firebase from './firebase';

type FirebaseContextData = {
    firebase: Firebase | null | undefined;
    authUser: firebase.User | null | undefined;
}

const FirebaseContext = createContext<FirebaseContextData>({firebase:null, authUser: null});

export function useFirebase() {
    return useContext(FirebaseContext);
}

const { Provider } = FirebaseContext;

const FirebaseProvider: React.FC<{}> = ({ children }) => {
    console.log("In here");
    const [firebase, setFirebase] = useState<Firebase>();
    const [authUser, setAuthUser] = useState<firebase.User | null>();
    useEffect( () => {
        setFirebase(new Firebase());
    }, [])
    useEffect( () => {
        if (!firebase)
            return;
        firebase.auth.onAuthStateChanged(authUser => {
            setAuthUser( authUser )
            });
    }, [firebase])

    return <Provider value={{firebase,authUser}}>{children}</Provider>
}
 
export default FirebaseProvider;
