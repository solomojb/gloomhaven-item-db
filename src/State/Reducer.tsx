import {combineReducers } from "redux";
import {spoilerFilter} from "./SpoilerFilter"
import {itemViewState} from "./ItemViewState"
import { accountState } from "./AccountState"

const rootReducer = combineReducers( { itemViewState, spoilerFilter, accountState} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
