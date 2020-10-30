import React from 'react'
import { useDispatch } from 'react-redux';
import { getSpoilerFilter, storeItemsOwnedBy } from '../../../State/SpoilerFilter';
import { PullDownOptions, SoloClassShorthand } from '../../../State/Types';
import ClassDropdown from './ClassDropdown';
import { useGame } from '../../Game/GameProvider';

type Props = 
{
  index:number;
  item: any;
  className: string;
}

const CustomDropdown = (props:Props) => {
    const {index, item, className} = props;

    const {key: gameType} = useGame();
     const { itemsInUse, itemsOwnedBy, classesInUse } = getSpoilerFilter();
     const dispatch = useDispatch();

    const toggleItemsInUse = (soloClass: PullDownOptions | undefined) => {

      const newItemsInUse = {...itemsOwnedBy};
      let itemClasses:PullDownOptions[] = Object.assign([], newItemsInUse[item.id]);
      if (soloClass) {
        itemClasses[index] = soloClass;
      } else {
        itemClasses.splice(index, 1);
      }
      if (itemClasses.length === 0)
      {
        delete newItemsInUse[item.id];
      }
      else {
        newItemsInUse[item.id] = itemClasses;
      }
      dispatch(storeItemsOwnedBy({value:newItemsInUse, gameType}));
  }

    const filterClasses = (soloClass:SoloClassShorthand) => {
      if (!classesInUse.includes(soloClass)) {
        return false;
      }
      const itemClasses = itemsOwnedBy[item.id] || [];
      return !itemClasses.includes(soloClass)
    }
  
    const getInitialClass  = (): PullDownOptions => {
      if (!!(itemsInUse[item.id] & Math.pow(2, index)))
      {
        return "InUse";
      }
      const itemClasses = itemsOwnedBy[item.id] || [];
      const initClass = itemClasses[index] ;
      return initClass || "None";
    };

    return (
      <ClassDropdown 
        customClass={className}
        initialClass={getInitialClass()}
        filter={filterClasses}
        onChange={toggleItemsInUse} 
       />
    );
}

export default CustomDropdown;
