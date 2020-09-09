import { GloomhavenItemSlot, GloomhavenItem, SortDirection, GloomhavenItemSourceType } from "../State/Types"
import { useSelector } from "react-redux";
import { RootState } from "../State/Reducer";
import { useGame } from "../components/Game/GameProvider"

const gloomhavenItemSlots: Array<GloomhavenItemSlot> = ['Head', 'Body', 'Legs', 'One Hand', 'Two Hands', 'Small Item'];

const useItems = (): Array<GloomhavenItem> => {

    const { isItemShown, initialItems, key} = useGame();
    const spoilerFilter = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const { all, item: spoilerFilterItem } = spoilerFilter;
    const { property, direction, slots, search } = useSelector<RootState>( state => state.itemViewState) as RootState['itemViewState'];

    const getFilteredItems = (initialItems:Array<GloomhavenItem>) => {
        const spoilerFiltered = all ? initialItems : initialItems.filter(item => {
            if (isItemShown(item, spoilerFilter)) return true;
            return spoilerFilterItem.includes(item.id);
        });
        return spoilerFiltered.filter(item => {
            let hit = true;
            if (slots) { 
                hit = slots.includes(item.slot);
            }
            if (search.length > 2 && hit) { 
                hit = (!!item.name.match(new RegExp(search, 'i')) || !!item.desc.match(new RegExp(search, 'i')));
            }
            return hit;
        });
    }

    const getSortedAndFilteredItems = (initialItems:Array<GloomhavenItem>) => {
        const items = getFilteredItems(initialItems);
        return (items.sort((itemA, itemB) => {
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
                    if (itemA["cost"] === itemB["cost"]) return 0;
                    value = itemA["cost"] > itemB["cost"] ? 1 : -1;
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
            return direction === SortDirection.ascending ? value : value * -1;
        }));
    }

    return getSortedAndFilteredItems(initialItems);
}

export default useItems;
