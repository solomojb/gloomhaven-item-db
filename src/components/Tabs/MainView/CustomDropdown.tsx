import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSpoilerFilter, storeItemsInUseClasses } from '../../../State/SpoilerFilter';
import { RootState } from '../../../State/Reducer';
import { SoloClassShorthand } from '../../../State/Types';
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
     const { itemsInUseClasses, classesInUse } = getSpoilerFilter();
     const dispatch = useDispatch();

    const toggleItemsInUse = (soloClass: SoloClassShorthand | undefined) => {

      const newItemsInUse = {...itemsInUseClasses};
      const itemClasses = newItemsInUse[item.id] || [];
      if (soloClass) {
        const classIndex = itemClasses.indexOf(soloClass);
        // We've already selected this for another slot
        if (classIndex !== -1 && classIndex !== index)
        {
            console.log("Can't change", item.id, soloClass);
            return;
        }
        // We don't already have this,
        itemClasses[index] = soloClass;
      } else {
        delete itemClasses[index];
      }
      newItemsInUse[item.id] = itemClasses;
      dispatch(storeItemsInUseClasses({value:newItemsInUse, gameType}));
  }

    const filterClasses = (soloClass:SoloClassShorthand) => {
      if (!classesInUse.includes(soloClass)) {
        return false;
      }
      const itemClasses = itemsInUseClasses[item.id] || [];
      return !itemClasses.includes(soloClass)
    }
  
    const getInitialClass  = (): SoloClassShorthand => {
      const itemClasses = itemsInUseClasses[item.id] || [];
      const initClass = itemClasses[index];
      return initClass;
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
