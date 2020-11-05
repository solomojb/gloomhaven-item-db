import { GloomhavenItemSlot, GloomhavenItem, SortDirection } from "../State/Types"
import { useGame } from "../components/Game/GameProvider"
import { getSpoilerFilter } from "../State/SpoilerFilter";
import { getItemViewState } from "../State/ItemViewState";
import { useEffect, useState } from "react";

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];

const useItems = (): Array<GloomhavenItem> => {
    const [ filteredItems, setFilteredItems] = useState<GloomhavenItem[]>([]);
    const { isItemShown, initialItems} = useGame();
    const spoilerFilter = getSpoilerFilter();
    const { all, item:spoilerFilterItem, itemsOwnedBy } = spoilerFilter;
    const { slots, search, ownerFilter, property, direction } = getItemViewState();

    useEffect(() => {
        const isItemFiltered = (item:GloomhavenItem) : boolean => {
            if (!all)
            {
                if (!isItemShown(item, spoilerFilter)) {
                    if (!spoilerFilterItem.includes(item.id))
                    {
                        return false;
                    }
                }
            }
    
            if (slots) {
                if (!slots.includes(item.slot))
                {
                    return false;
                }
            }
    
            if (search.length > 2 )
            {
                const nameMatch = item.name.match(new RegExp(search, 'i'));
                const descMatch = item.desc.match(new RegExp(search, 'i'));
                if (!nameMatch && !descMatch)
                {
                    return false;
                }
            }
    
            if (ownerFilter) {
                const classes = itemsOwnedBy[item.id];
                if (!classes || !classes.includes(ownerFilter))
                {
                    return false;
                }
            }
    
            return true;
        }

        setFilteredItems(initialItems.filter(isItemFiltered));
    },[all, slots, search, ownerFilter, spoilerFilterItem])

    useEffect(() => {
        const compareFunction = (itemA:GloomhavenItem, itemB:GloomhavenItem): number => {
            let value = 0;
            switch (property) {
                case "name":
                    value = itemA["name"].localeCompare(itemB["name"]);
                    break;
                case "slot":
                    if (gloomhavenItemSlots.indexOf(itemA.slot) === gloomhavenItemSlots.indexOf(itemB.slot)) {
                        value = 0
                    } else {
                        value = gloomhavenItemSlots.indexOf(itemA.slot) > gloomhavenItemSlots.indexOf(itemB.slot) ? 1 : -1
                    }
                    break;
                case "cost":
                    if (itemA.cost === itemB.cost) return 0;
                    value = itemA.cost > itemB.cost ? 1 : -1;
                    break;
                case "id":
                    if (itemA["id"] === itemB["id"]) return 0;
                    value = itemA["id"] > itemB["id"] ? 1 : -1;
                    break;
                case "use":
                    // assign a dummy value to sort by
                    const itemAuse = itemA.spent ? 'c' : (itemA.consumed ? 'b' : 'a');
                    const itemBuse = itemB.spent ? 'c' : (itemB.consumed ? 'b' : 'a');
                    value = itemAuse.localeCompare(itemBuse);
                    break;
            }
            const val = direction === SortDirection.ascending ? value : value * -1;
            return val;
        }

        const sortedItems = Object.assign([], filteredItems);
        sortedItems.sort(compareFunction);
        setFilteredItems(sortedItems);
    }, [property, direction])

    return filteredItems;
}

export default useItems;
