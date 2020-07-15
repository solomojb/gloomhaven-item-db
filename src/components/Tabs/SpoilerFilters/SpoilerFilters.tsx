import React from 'react'
import { Form, Button, Icon, Image } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { storeEnableStoreStockManagement, storeEnablePartyManagement, storeAll, storeProsperity, storeSoloClass, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { SoloClassShorthand } from '../../../State/Types';
import SpoilerFilterItemList from './SpoilerFilterItemList';
import { useGame } from '../../Game/GameProvider';

const SpoilerFilters = () => {
    const dispatch = useDispatch();
    const { spoilerFilter, key:gameType} = useGame();

    const { soloClass, enableStoreStockManagement, enablePartyManagement, prosperity, all } = getSpoilerFilter();

    const toggleClassFilter = (key: SoloClassShorthand) => {
        if (soloClass.includes(key)) {
            soloClass.splice(soloClass.indexOf(key), 1);
        } else {
            soloClass.push(key)
        }
        dispatch(storeSoloClass({value:soloClass, gameType}));
    }

    return (
        <>
            <Form>
                <Form.Group inline>
                    <label>Respecting Spoiler Settings:</label>
                    <Button
                        color={all ? 'red' : 'blue'}
                        onClick={() => dispatch(storeAll({value:!all, gameType}))}
                    >
                        {all
                            ? <React.Fragment><Icon name={'eye'}/> disabled</React.Fragment>
                            : <React.Fragment><Icon name={'eye slash'}/> enabled</React.Fragment>
                        }
                    </Button>
                </Form.Group>

                <Form.Group inline>
                    <label>Enable Store Stock Management:</label>
                    <Form.Checkbox
                        toggle
                        checked={enableStoreStockManagement}
                        onClick={() => {
                            dispatch(storeEnablePartyManagement({value:false, gameType}));
                            dispatch(storeEnableStoreStockManagement({value:!enableStoreStockManagement, gameType}));
                        }}/>
                </Form.Group>

                <Form.Group inline>
                    <label>Enable Party Managment:</label>
                    <Form.Checkbox
                        toggle
                        checked={enablePartyManagement}
                        onClick={() => {
                            dispatch(storeEnableStoreStockManagement({value:false, gameType}));
                            dispatch(storeEnablePartyManagement({value:!enablePartyManagement, gameType}));
                        }}/>
                </Form.Group>

                {spoilerFilter}

      
            </Form>
        </>
    );
}

export default SpoilerFilters;
