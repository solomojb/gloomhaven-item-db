export enum SubView {
    SignIn,
    SignUp,
    ResetPassword,
    ChangePassword,
    SignedIn,
}

export const STORE_ACCOUNT_SUB_VIEW = 'STORE_ACCOUNT_SUB_VIEW';

export function storeAccountSubView(subView: SubView) {
    return { type: STORE_ACCOUNT_SUB_VIEW, subView}
}

export interface AccountState {
    subView: SubView;
}

const initialAccountState : AccountState = {
    subView: SubView.SignIn,
};

export function accountState(state = initialAccountState, action:any) {
    switch (action.type)
    {
        case STORE_ACCOUNT_SUB_VIEW:
            return { ...state, subView: action.subView};
        default:
            return state;
    }
}

export default AccountState;
