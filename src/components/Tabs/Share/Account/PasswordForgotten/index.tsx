import React, { Component, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
 
import { useFirebase } from '../../../../Firebase';
import * as ROUTES from '../../../../../constants/routes';
import { useDispatch } from 'react-redux';
import { storeAccountSubView, SubView } from '../../../../../State/AccountState';
import { BackToSignInLink } from '../SignIn';
 
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
    <BackToSignInLink/>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
const PasswordForgetForm = () => {
    const { firebase } = useFirebase();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);
    const dispatch = useDispatch();
    
  const onSubmit = (event: any) => {
      if (!firebase)
        return;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
        dispatch(storeAccountSubView(SubView.SignIn))
      })
      .catch(error => {
        setError(error);
      });
 
    event.preventDefault();
  };
 
    const isInvalid = email === '';
 
    return (
      <form onSubmit={onSubmit}>
        <input
            name="email"
            value={email}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
}
 
const PasswordForgetLink = () => {
    const dispatch = useDispatch();
    return <p>
      Forgot your password? <button onClick={ () =>  dispatch(storeAccountSubView(SubView.ResetPassword))}>Reset Password</button>
    </p>
};
 
export default PasswordForgetPage;
 
export { PasswordForgetForm, PasswordForgetLink };
