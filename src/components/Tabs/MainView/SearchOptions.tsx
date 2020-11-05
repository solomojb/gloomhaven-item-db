import React from 'react'
import { Form, Button, Input, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { storeDisplayAs, storeDiscount, getSpoilerFilter } from '../../../State/SpoilerFilter';
import { storeFilterSearch, storeFilterSlots, getItemViewState, storeOwnerFilter, storeSortingDirection } from '../../../State/ItemViewState';
import { getSlotImageSrc } from '../../../helpers';
import { GloomhavenItemSlot, PullDownOptions, SortDirection, SortProperty} from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';

type Props = {
    setSorting : (newProperty: SortProperty) => void;
}

const SearchOptions = (props:Props) => {
    const { setSorting } =  props;
    const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];
    const { displayAs, discount, enableStoreStockManagement, classesInUse } = getSpoilerFilter();
    const { property, search, slots, ownerFilter, direction } = getItemViewState();
    const dispatch = useDispatch();
    const { key: gameType } = useGame();

    const setFilterSlot = (slot?: GloomhavenItemSlot) => {
        if (!slot)
        {
            dispatch(storeFilterSlots({value:undefined, gameType}));    
            return;
        }
        let value:GloomhavenItemSlot[]|undefined = Object.assign([], slots);
        const index = value.indexOf(slot);
        if (index !== -1) {
            value.splice(index, 1);
            if (value.length === 0)
            {
                value = undefined;
            }
        } else {
            value.push(slot);
        }
        dispatch(storeFilterSlots({value, gameType}));
    }

    const setFilterClass = (newOwner?: PullDownOptions) => {
        if (!newOwner)
        {
            dispatch(storeOwnerFilter({value:undefined, gameType}));    
            return;
        }
        const value = ownerFilter === newOwner ? undefined : newOwner; 
        dispatch(storeOwnerFilter({value, gameType}));
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group inline>
                    <label>Render as:</label>
                    <Button.Group>
                        <Button color={displayAs === 'list' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs({value:'list', gameType}));
                            }}>List</Button>
                        <Button.Or/>
                        <Button color={displayAs === 'images' ? 'blue' : undefined} onClick={() => {
                                dispatch(storeDisplayAs({value:'images', gameType}));
                            }}>Images</Button>
                    </Button.Group>
                </Form.Group>
                {displayAs === 'list' && <Form.Group inline>
                    <label>Reputation Discount:</label>
                    <Form.Select value={discount}
                            options={[
                                {value: -5, text: "-5 gold"}, // (19 - 20)
                                {value: -4, text: "-4 gold"}, // (15 - 18)
                                {value: -3, text: "-3 gold"}, // (11 - 14)
                                {value: -2, text: "-2 gold"}, // (7 - 13)
                                {value: -1, text: "-1 gold"}, // (3 - 6)
                                {value: 0, text: "none"}, // (-2 - 2)
                                {value: 1, text: "+1 gold"}, // (-3 - -6)
                                {value: 2, text: "+2 gold"}, // (-7 - -10)
                                {value: 3, text: "+3 gold"}, // (-11 - -14)
                                {value: 4, text: "+4 gold"}, // (-15 - -18)
                                {value: 5, text: "+5 gold"}, // (-19 - -20)
                            ]}
                            onChange={(obj, e) => {
                                dispatch(storeDiscount({value:typeof e.value === 'number' ? e.value : 0, gameType}));
                            }}
                    />
                </Form.Group>}
                {displayAs === 'images' && <Form.Group inline>
                    <label>Sort By:</label>
                    <Form.Select
                        value={property}
                        options={[
                            {value: 'id', text: 'Item Number'},
                            {value: 'slot', text: 'Equipment Slot'},
                            {value: 'cost', text: 'Cost'},
                            {value: 'name', text: 'Name'},
                            {value: 'source', text: 'Source'},
                            {value: 'use', text: 'Use'}
                        ]}
                        onChange={(obj, e) => setSorting(e.value as SortProperty)}
                    />
                    <Button.Group>
                        <Button color={direction === SortDirection.ascending ? 'blue' : undefined} onClick={() => {
                                dispatch(storeSortingDirection({value:SortDirection.ascending, gameType}));
                            }}>Ascending</Button>
                        <Button.Or/>
                        <Button color={direction === SortDirection.descending ? 'blue' : undefined} onClick={() => {
                                dispatch(storeSortingDirection({value:SortDirection.descending, gameType}));
                            }}>Descending</Button>
                    </Button.Group>

                </Form.Group>}
                <Form.Group inline>
                    <label>Filter Slot:</label>
                    <Form.Radio label={'all'} checked={slots === undefined} onChange={() => setFilterSlot(undefined)}/>
                    {gloomhavenItemSlots.map(itemSlot => 
                        <Form.Checkbox key={itemSlot}
                                    label={<img className={'icon'} src={getSlotImageSrc(itemSlot)} alt={itemSlot}/>} 
                                    checked={slots === undefined ? false : slots && slots.includes(itemSlot)} 
                                    onChange={() => setFilterSlot(itemSlot)} alt={itemSlot}/>)
                    }
                </Form.Group>
                <Form.Group inline>
                    <label>Find Item:</label>
                    <Input
                        value={search}
                        onChange={(e) => dispatch(storeFilterSearch({value:e.target.value, gameType}))}
                        icon={{name: 'close', link: true, onClick: () => dispatch(storeFilterSearch({value:'', gameType}))}}
                        placeholder={'Search...'}
                    />
                </Form.Group>
                {enableStoreStockManagement &&  classesInUse.length > 0 && <Form.Group inline>
                    <label>Filter Party Member:</label>
                    <Form.Radio label={'all'} checked={ownerFilter === undefined} onChange={() => setFilterClass(undefined)}/>
                    {
                        classesInUse.map(key => (
                        <Image key={key} src={require(`../../../img/classes/${key}.png`)}
                            className={'icon' + (key ===  ownerFilter? '' : ' disabled')}
                            onClick={() => setFilterClass(key)}/>
                        ))}
                    </Form.Group>
                }
            </Form>
        </React.Fragment>
    );
}

export default SearchOptions;
