import React, { Component, useState, ChangeEvent } from 'react';
 
import { useFirebase } from '../../../../Firebase';
import { useDispatch } from 'react-redux';
import { storeAccountSubView, SubView } from '../../../../../State/AccountState';
import { BackToSignInLink } from '../SignIn';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
const PasswordChangeForm = () => {
    const { firebase } = useFirebase();
    const [passwordOne, setPasswordOne] = useState<string>('');
    const [passwordTwo, setPasswordTwo] = useState<string>('');
    const [error, setError] = useState<Error| null>(null);


  const onSubmit = (event: any) => {
    if (!firebase) {
        return;
    }
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
 
    event.preventDefault();
  };
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <form onSubmit={onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordOne(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }

  const PasswordChangeLink = () => {
    const dispatch = useDispatch();
    return <p>
      Change your password? <button onClick={ () =>  dispatch(storeAccountSubView(SubView.ChangePassword))}>Change Password</button>
    </p>
};

const PasswordChangePage = () => {
  return <>
      <h1>Change Password</h1>
      <PasswordChangeForm/>
      <BackToSignInLink/>
      </>
}
 
export default PasswordChangeForm;
export { PasswordChangePage, PasswordChangeLink };
