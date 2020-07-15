import React, { Fragment } from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { storeItemsInUse, getSpoilerFilter } from "../../../State/SpoilerFilter";
import { useGame } from '../../Game/GameProvider';
import CustomDropdown from './CustomDropdown';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const { key:gameType } = useGame();
    const {item} = props;
    const { enableStoreStockManagement, enablePartyManagement, lockSpoilerPanel, itemsInUse } = getSpoilerFilter();
    const dispatch = useDispatch();

    if (!enableStoreStockManagement && !enablePartyManagement) {
        return <>
                {item.count}
                </>
    }

    const toggleItemInUse = (id: number, bit: number) => {

        itemsInUse[id] = itemsInUse[id] & bit ? itemsInUse[id] ^ bit : itemsInUse[id] | bit;

        if (itemsInUse[id] === 0) {
            delete (itemsInUse[id]);
        }

        dispatch(storeItemsInUse({value:itemsInUse, gameType}));
    }

    return (
        <>
            {[...Array(item.count).keys()].map(index =>
                <Fragment key={"cb" + index}>
                    {enablePartyManagement && <CustomDropdown className={'itemmanagement i' + index} index={index} item={item}/>}
                    {enableStoreStockManagement && <Checkbox key={"cb" + index}
                            className={'i'+index}
                            toggle
                            disabled={lockSpoilerPanel}
                            checked={!!(itemsInUse[item.id] & Math.pow(2, index))}
                            onChange={() => toggleItemInUse(item.id, Math.pow(2, index))}/>}
                </Fragment>
            )}
        </>
        );
}

export default ItemManagement;
