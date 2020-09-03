import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../../../Firebase';

import * as ROUTES from '../../../../../constants/routes';
import Firebase from '../../../../Firebase';
import { useDispatch } from 'react-redux';
import { SubView, storeAccountSubView } from '../../../../../State/AccountState';
import { SignUpLink } from '../SignUp';
import { PasswordForgetForm, PasswordForgetLink } from '../PasswordForgotten';
import { PasswordChangeLink } from '../PasswordChange';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
        <SignInForm/>
        <SignUpLink/>
        <PasswordForgetLink/>
        <PasswordChangeLink/>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
type Props = {
}

const SignInForm = (props: Props): JSX.Element  => {
    const { firebase } = useFirebase();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);
    const dispatch = useDispatch();

    const onSubmit = (event: any) => {
        if (!firebase)
            return;

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
                dispatch(storeAccountSubView(SubView.SignedIn))
        //        this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            });
 
        event.preventDefault();
    };
 
    const isInvalid = password === '' || email === '';
    return (
        <form onSubmit={onSubmit}>
           <input
             name="email"
             value={email}
             onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
             type="text"
             placeholder="Email Address"
           />
             <input
             name="passwordOne"
             value={password}
             onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
             type="password"
             placeholder="Password"
           />
          <button disabled={isInvalid} type="submit">Sign In</button>
 
          {error && <p>{error.message}</p>}   
        </form>
    );
}

const SignInLink = () => {
  const dispatch = useDispatch();
  return <p>
    Already have an account? <button onClick={ () =>  dispatch(storeAccountSubView(SubView.SignIn))}>Sign In</button>
  </p>
  };

  const BackToSignInLink = () => {
    const dispatch = useDispatch();
    return <p>
      Go back to login? <button onClick={ () =>  dispatch(storeAccountSubView(SubView.SignIn))}>Sign In</button>
    </p>
    };
  
 
export default SignInPage;
 
export { SignInForm, SignInLink, BackToSignInLink };
