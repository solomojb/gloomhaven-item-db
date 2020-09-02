import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import Firebase from '../Firebase';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
        <SignInForm/>
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

    const onSubmit = (event: any) => {
        if (!firebase)
            return;

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
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

const SignInLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign In</Link>
    </p>
  );
  
 
export default SignInPage;
 
export { SignInForm, SignInLink };
