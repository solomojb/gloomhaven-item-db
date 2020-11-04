import React, { Fragment, useEffect, useState } from 'react';
import { GloomhavenItem, PullDownOptions } from "../../../State/Types";
import { getSpoilerFilter, storeItemsOwnedBy } from "../../../State/SpoilerFilter";
import { useDispatch } from 'react-redux';
import { useGame } from '../../Game/GameProvider';
import ClassDropdown from './ClassDropdown';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const {item} = props;
    const { enableStoreStockManagement, itemsOwnedBy, classesInUse, lockSpoilerPanel } = getSpoilerFilter();
    const [possibleOwners, setPossibleOwners] = useState<PullDownOptions[]>(classesInUse);
    const owners = itemsOwnedBy[item.id] || [];
    const dispatch = useDispatch();
    const {key: gameType} = useGame();

    if (!enableStoreStockManagement) {
        return <>{item.count}</>
    }

    useEffect( () => {
        if (!owners)
            return;
        const newOwners = Object.assign([], classesInUse);
        owners.forEach( owner => {
            if (owner) 
            {
                const index = newOwners.indexOf(owner);
                if (index !== -1) {
                    newOwners.splice(index, 1);
                }
            }
        })
        newOwners.unshift("InUse");
        setPossibleOwners(newOwners);
    }, owners);

    return (
        <>
            {[...Array(item.count).keys()].map(index =>
                <Fragment key={"cb" + index}>
                    <ClassDropdown 
                        disabled={lockSpoilerPanel}
                        optionsList={possibleOwners} 
                        initialOption={owners[index]}
                        customClass={'itemmanagement i' + index} 
                        changeOption={ option => {
                            let itemClasses:PullDownOptions[] = Object.assign([], owners);
                            itemClasses[index] = option;
                            dispatch(storeItemsOwnedBy({value:{key:item.id, value:itemClasses}, gameType}));
                        }}
                        />
                </Fragment>
            )}
        </>
        );
}

export default ItemManagement;
