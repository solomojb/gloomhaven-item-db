import React, { Component, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
 
import { useFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
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
    
  const onSubmit = (event: any) => {
      if (!firebase)
        return;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
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
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
export { PasswordForgetForm, PasswordForgetLink };
