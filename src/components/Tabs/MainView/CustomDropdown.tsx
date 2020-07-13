import React from 'react'
import { Image } from 'semantic-ui-react';
import '../../../react-super-select.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSpoilerFilter, storeItemsInUseClasses } from '../../../State/SpoilerFilter';
import { RootState } from '../../../State/Reducer';
import { SoloClassShorthand } from '../../../State/Types';
import SuperSelectWrapper from './SuperSelectWrapper';
import { useGame } from '../../Game/GameProvider';

type Props = 
{
  index:number;
  item: any;
  className: string;
}

type ClassOption = {
  id:number;
  soloClass: SoloClassShorthand;
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

    const allClasses:Array<ClassOption> = classesInUse.map( (soloClass:SoloClassShorthand, index:number) => {
          return { id: index, soloClass}
        })

    const filterClasses = (option:ClassOption) => {
      const itemClasses = itemsInUseClasses[item.id] || [];
      const found = itemClasses.includes(option.soloClass)
      return !found;
    }
  
      var handlerExample = function(option:ClassOption) {

        if (!option) {
          console.log('custom_filter_function_output', "no option chosen");
          toggleItemsInUse(undefined);
          return;
        }

        toggleItemsInUse(option.soloClass);
      };

    var customOptionTemplate = function(item:ClassOption) {
      return(
        <div>
          <Image  key={item.soloClass} src={require(`../../../img/classes/${item.soloClass}.png`)}
                  className={'icon'}
              />
        </div>);
    };

    const getInitialValue = () => {
      const itemClasses = itemsInUseClasses[item.id] || [];
      return allClasses.find( sc => sc.soloClass === itemClasses[index]);
    };
 
    return (
      <SuperSelectWrapper 
        customClass={className}
        initialValue={getInitialValue()}
        placeholder="None" 
        onChange={handlerExample} 
        customOptionTemplate={customOptionTemplate}
        dataSource={allClasses.filter(filterClasses)} />
    );
}

export default CustomDropdown;
