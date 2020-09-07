import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';
import { useFirebase } from '../Firebase';
import SignOutButton from '../Tabs/Share/Account/SignOut';
 
const Navigation = () => {
  const {authUser} = useFirebase();

  const NavigationAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.GH}>Gloomhaven</Link>
      </li>
      <li>
        <Link to={ROUTES.JOTL}>JOTL</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
   
  const NavigationNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.GH}>Gloomhaven</Link>
      </li>
      <li>
        <Link to={ROUTES.JOTL}>JOTL</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  )
  return (<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>)
};
 
export default Navigation;
