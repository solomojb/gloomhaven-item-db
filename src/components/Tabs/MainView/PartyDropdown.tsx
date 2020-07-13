import React from 'react'
import '../../../react-super-select.css'
import { useDispatch } from 'react-redux';
import { storeFilterClass } from '../../../State/ItemViewState';
import ClassDropdown, {ClassOption} from './ClassDropdown';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

const PartyDropdown = () => {
    const { key: gameType} = useGame();
     const { classesInUse } = getSpoilerFilter();
     const dispatch = useDispatch();

      const onChange = function(option:ClassOption) {

        if (!option) {
          console.log('custom_filter_function_output', "no option chosen");
          dispatch(storeFilterClass({value:undefined, gameType}));
          return;
        }
        dispatch(storeFilterClass({value:option.soloClass, gameType}));
      };

    return (
        <ClassDropdown 
          placeholder="Choose a class" 
          onChange={onChange} 
          classes={classesInUse}/>
    );
}

export default PartyDropdown;
