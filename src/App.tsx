import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import dbApp from "./State/Reducer";
import MainView from './components/Tabs/MainView/MainView';
import GameProvider from './components/Game/GameProvider'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { GameType } from './games';
import Navigation from './components/Navigation';
import SignInPage from './components/Tabs/Share/Account/SignIn';
import SignUpPage from './components/Tabs/Share/Account/SignUp';
import * as ROUTES from './constants/routes';
import PasswordForgetPage from './components/Tabs/Share/Account/PasswordForgotten';
import AccountPage from './components/Tabs/Share/Account/Account';

export const store = createStore(dbApp,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
    return (
        <Container>
            <Provider store={store}>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path={ROUTES.GH}>
                            <GameProvider gameType={GameType.Gloomhaven}>
                                <MainView/>
                            </GameProvider>
                        </Route>                    
                        <Route exact path={ROUTES.JOTL}>
                        <GameProvider gameType={GameType.JawsOfTheLion}>
                            <MainView/>
                        </GameProvider>
                        </Route>
                        <Route exact path={ROUTES.SIGN_IN}>
                            <SignInPage/>
                        </Route>                    
                        <Route exact path={ROUTES.SIGN_UP}>
                            <SignUpPage/>
                        </Route>                    
                        <Route exact path={ROUTES.PASSWORD_FORGET}>
                            <PasswordForgetPage/>
                        </Route>                    
                        <Route exact path={ROUTES.ACCOUNT}>
                            <AccountPage/>
                        </Route>                    
                    </Switch>
                </Router>
            </Provider>
        </Container>
    );
}

export default App;
