import React from 'react'
import { GloomhavenItem } from "../../../State/Types"
import ItemManagement from "./ItemManagement";
import { useGame } from '../../Game/GameProvider';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';

type Props = {
    item : GloomhavenItem
}

const ItemCard = (props:Props) => {
    const { item } = props;
    const game = useGame();
    const { itemsOwnedBy} = getSpoilerFilter();

    return (
        <div className={'item-card-wrapper'}>
            <img
                src={game.getItemPath(item)}
                alt={item.name}
                className={'item-card'}/>
            <ItemManagement item={item} owners={itemsOwnedBy[item.id]}/>
        </div>
    )
}

export default ItemCard;
