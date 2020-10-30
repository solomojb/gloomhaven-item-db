import React from 'react'
import { GloomhavenItem } from '../../../State/Types'
import ItemCard from './ItemCard';
import { Message } from 'semantic-ui-react';

type Props = {
    items : GloomhavenItem[];
}

const ItemGrid = (props:Props) => {
    const {items} = props;

    return (
        <>
            {items.map(item => (
                <ItemCard key={item.id} item={item}/>
                ))}
        </>
    );
}

export default ItemGrid;
