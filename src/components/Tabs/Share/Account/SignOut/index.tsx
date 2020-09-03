import React from 'react';
import Firebase, { useFirebase } from '../../../../Firebase';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeAccountSubView, SubView } from '../../../../../State/AccountState';
 
const SignOutButton = (): JSX.Element | null => 
{
    const {firebase} = useFirebase();      
    const dispatch = useDispatch();
    if (!firebase)
    {
        return null;
    }  
    return (
        <Form.Button onClick={() => 
            {
                firebase.doSignOut().then(() => {
                    dispatch(storeAccountSubView(SubView.SignIn))
                })
            }
        } >Sign Out</Form.Button>
    )
};
 
export default SignOutButton;
