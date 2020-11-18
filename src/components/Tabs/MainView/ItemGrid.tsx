import { current } from '@reduxjs/toolkit';
import React from 'react'
import { Form, Segment } from 'semantic-ui-react';
import { getItemViewState } from '../../../State/ItemViewState';

import { GloomhavenItem } from '../../../State/Types'
import ItemCard from './ItemCard';

type Props = {
    items: GloomhavenItem[];
}


const ItemGrid = (props: Props) => {
    const { items } = props;
    const { currentPage } = getItemViewState();
    return (
        <Segment style={{overflow: 'auto', maxHeight: 700 }}>
         {items.map(item => (
            <ItemCard key={item.id} item={item}/>
            ))}
        </Segment>
    );
}

export default ItemGrid;
