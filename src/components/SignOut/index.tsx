import React from 'react';
import Firebase, { useFirebase } from '../Firebase';
import { Form } from 'semantic-ui-react';
 
const SignOutButton = (): JSX.Element | null => 
{
    const {firebase} = useFirebase();      
    if (!firebase)
    {
        return null;
    }  
    return (
        <Form.Button onClick={() => {firebase.doSignOut()}} >Sign Out</Form.Button>
    )
};
 
export default SignOutButton;
