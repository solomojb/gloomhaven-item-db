import React, { useState } from "react"
import SignInPage, { SignInForm } from "./Account/SignIn";
import { useFirebase } from "../../Firebase";
import SignUpPage, { SignUpForm } from "./Account/SignUp";
import PasswordForgetPage, { PasswordForgetForm } from "./Account/PasswordForgotten";
import PasswordChangeForm, { PasswordChangePage } from "./Account/PasswordChange";
import SignOutButton from "./Account/SignOut";
import { useSelector } from "react-redux";
import { RootState } from "../../../State/Reducer";
import { SubView } from "../../../State/AccountState";
import { defaultMaxListeners } from "stream";


const AccountView = () => {
    const { authUser} = useFirebase();
    const { subView} = useSelector<RootState>( state => state.accountState) as RootState['accountState'];

    switch (subView)
    {
        case SubView.SignIn:
            return <SignInPage/>
        case SubView.SignUp:
            return <SignUpPage/>
        case SubView.ResetPassword:
            return <PasswordForgetPage/>
        case SubView.ChangePassword:
            return <PasswordChangePage/>
        case SubView.SignedIn:
            return <>
                        {authUser && authUser.email}
                        <SignOutButton/>
                    </>
        default:
            return <>
                {"unknown state " + subView}
                </>
    }
}

export default AccountView;
