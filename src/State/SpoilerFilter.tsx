import { createSelector } from "reselect";
import { SoloClassShorthand, ItemViewDisplayType, PullDownOptions } from "./Types";
import { RootState } from "./Reducer";
import memoize from 'lodash.memoize'
import { GameType } from "../games";
import { useGame } from "../components/Game/GameProvider";
import { useSelector } from "react-redux";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameTypeAction } from "./GameTypeAction";

export type ItemsInUse = {
    [key:number]: number;
  };

  export type ItemsOwnedBy = {
    [key:number] : Array<PullDownOptions>
  }


export interface SpoilerFilter {
    all: boolean
    prosperity: number
    item: Array<number>
    itemsInUse: ItemsInUse;
    itemsOwnedBy: ItemsOwnedBy;
    classesInUse: Array<SoloClassShorthand>
    soloClass: Array<SoloClassShorthand>
    discount: number
    displayAs: ItemViewDisplayType
    enableStoreStockManagement: boolean
    enablePartyManagement: boolean
    lockSpoilerPanel: boolean
    scenarioCompleted: Array<number>
}

// todo: only keep during migration
export interface OldSpoilerFilter extends SpoilerFilter {
    item: Array<number> | any
    soloClass: Array<SoloClassShorthand> | any
}


const initialSpoilerFilterState:SpoilerFilter = {
    all: false,
    prosperity: 1,
    item: [],
    itemsInUse: {},
    itemsOwnedBy: {},
    classesInUse: [],
    soloClass: [],
    discount: 0,
    displayAs: 'list',
    enableStoreStockManagement: false,
    enablePartyManagement: false,
    lockSpoilerPanel: false,
    scenarioCompleted: [],
};

export type SpoilerMap = {
    [K in GameType]?: SpoilerFilter;
  };

const initialSpoilerMapState = Object.values(GameType).reduce(
    (acc, value: GameType) => {
      acc[value] = initialSpoilerFilterState;
      return acc;
    },
    {} as SpoilerMap,
  );

  const spoilerSlice = createSlice({
      name: "spoilerFilter",
      initialState: initialSpoilerMapState,
      reducers: {
        storeSpoilerFilter(state, action: PayloadAction<GameTypeAction<SpoilerFilter>>)
        {
            const gameState = state[action.payload.gameType]; 
            if (gameState) { 
                const newGameState = Object.assign(gameState, action.payload.value);
                state[action.payload.gameType] = newGameState;
            }
        },
        storeProsperity(state, action: PayloadAction<GameTypeAction<number>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.prosperity = action.payload.value;
            } 
        },
        storeSoloClass(state, action: PayloadAction<GameTypeAction<Array<SoloClassShorthand>>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.soloClass = action.payload.value;
            } 
        },
        storeScenarioCompleted(state, action: PayloadAction<GameTypeAction<Array<number>>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.scenarioCompleted = action.payload.value;
            } 
        },
        storeItem(state, action: PayloadAction<GameTypeAction<Array<number>>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.item = action.payload.value;
            } 
        },
        storeItemsInUse(state, action: PayloadAction<GameTypeAction<ItemsInUse>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.itemsInUse = action.payload.value;
            } 
        },
        storeAll(state, action: PayloadAction<GameTypeAction<boolean>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.all = action.payload.value;
            } 
        },
        storeEnableStoreStockManagement(state, action: PayloadAction<GameTypeAction<boolean>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.enableStoreStockManagement = action.payload.value;
            } 
        },        
        storeEnablePartyManagement(state, action: PayloadAction<GameTypeAction<boolean>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.enablePartyManagement = action.payload.value;
            } 
        },        
        storeDisplayAs(state, action: PayloadAction<GameTypeAction<ItemViewDisplayType>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.displayAs = action.payload.value;
            } 
        },
        storeDiscount(state, action: PayloadAction<GameTypeAction<number>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.discount = action.payload.value;
            } 
        },
        storeClassesInUse(state, action:PayloadAction<GameTypeAction<Array<SoloClassShorthand>>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.classesInUse = action.payload.value;
            } 
        },
        storeItemsOwnedBy(state, action:PayloadAction<GameTypeAction<ItemsOwnedBy>>) {
            const gameState = state[action.payload.gameType]; 
            if (gameState) {
                gameState.itemsOwnedBy = action.payload.value;
            } 
        }
      }
  })


export const restoreFromLocalStorage = (filterLocalStorageKey:string) => {
    const storage = localStorage.getItem(filterLocalStorageKey);

    let spoilerFilter = initialSpoilerFilterState;

    if (typeof storage === 'string') {
        const configFromStorage: OldSpoilerFilter = JSON.parse(storage);

        // convert from old object style to array
        if (!configFromStorage.soloClass.hasOwnProperty('length')) {
            const soloClass: Array<SoloClassShorthand> = [];
            Object.keys(configFromStorage.soloClass).forEach(k => {
                if (configFromStorage.soloClass[k] === true) {
                    soloClass.push(k as SoloClassShorthand);
                }
            });
            configFromStorage.soloClass = soloClass;
        }
        // convert from old object style to array
        if (!configFromStorage.item.hasOwnProperty('length')) {
            const items: Array<number> = [];
            Object.keys(configFromStorage.item).forEach(k => {
                if (configFromStorage.item[k] === true) {
                    items.push(parseInt(k));
                }
            });
            configFromStorage.item = items;
        }

        spoilerFilter = Object.assign({}, initialSpoilerFilterState, configFromStorage);
    }

    return spoilerFilter;
}

export const spoilerFilterSelector = createSelector(
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => memoize(
      (type:GameType) => {
        const state = spoilerFilter[type];
        if (state === undefined)
          {
              throw new Error("Wrong type");
          }
          return state as SpoilerFilter;
      }
    )
  )

  export const getSpoilerFilter = () : SpoilerFilter => {
      const {key:gameType} = useGame();
    return useSelector(spoilerFilterSelector)(gameType);
  }

  export const allSpoilerFiltersSelector = createSelector(
    (state:RootState) => state.spoilerReducer,
    spoilerFilter => spoilerFilter
  )


  export const getAllSpoilerFilters = () : SpoilerMap => {
  return useSelector(allSpoilerFiltersSelector);
}


export const { storeEnablePartyManagement, storeItemsOwnedBy, storeClassesInUse, storeAll, storeItem, storeItemsInUse, storeEnableStoreStockManagement, storeDiscount, storeDisplayAs, storeScenarioCompleted, storeSoloClass, storeProsperity, storeSpoilerFilter} = spoilerSlice.actions;

export default spoilerSlice.reducer;
