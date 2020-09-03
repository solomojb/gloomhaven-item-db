import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../../../Firebase';

import * as ROUTES from '../../../../../constants/routes';
import Firebase from '../../../../Firebase';
import { storeAccountSubView, SubView } from '../../../../../State/AccountState';
import { useDispatch } from 'react-redux';
import { SignInLink } from '../SignIn';

 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
      <SignUpForm/>
      <SignInLink/>
    </div>
);

// TODO: State variables?
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  type Props = {
  }


  const SignUpForm = (props: Props): JSX.Element  => {
      const { firebase } = useFirebase();
  // Consider using a slice here?
      const [username, setUsername] = useState<string>('');
      const [email, setEmail] = useState<string>('');
      const [passwordOne, setPasswordOne] = useState<string>('');
      const [passwordTwo, setPasswordTwo] = useState<string>('');
      const [error, setError] = useState<Error| null>(null);

      const onSubmit = (event: any) => {
          if (!firebase)
            return;
        firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
          .then((authUser:any) => {
            return firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
            });
          })
          .catch((error: Error) => {
            setError(error);
          });
     
        event.preventDefault();
      }

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
      return (
        <form onSubmit={onSubmit}>
           <input
            name="username"
            value={username}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordOne(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordTwo(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">Sign Up</button>
   
          {error && <p>{error.message}</p>}
        </form>
      )
  }

const SignUpLink = () => {
  const dispatch = useDispatch();
  return <p>
    Don't have an account? <button onClick={ () =>  dispatch(storeAccountSubView(SubView.SignUp))}>Sign Up</button>
  </p>
};


export default SignUpPage;
 
export { SignUpForm, SignUpLink };
