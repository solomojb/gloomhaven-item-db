import React, { Fragment } from 'react';
import { GloomhavenItem } from "../../../State/Types";
import { getSpoilerFilter } from "../../../State/SpoilerFilter";
import CustomDropdown from './CustomDropdown';

type Props = {
    item : GloomhavenItem;
}

const ItemManagement = (props:Props) => {
    const {item} = props;
    const { enableStoreStockManagement } = getSpoilerFilter();

    if (!enableStoreStockManagement) {
        return <>{item.count}</>
    }

    return (
        <>
            {[...Array(item.count).keys()].map(index =>
                <Fragment key={"cb" + index}>
                    <CustomDropdown className={'itemmanagement i' + index} index={index} item={item}/>
                </Fragment>
            )}
        </>
        );
}

export default ItemManagement;
