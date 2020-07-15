import React from 'react'
import { useDispatch } from 'react-redux';
import { getItemViewState, storeFilterClass } from '../../../State/ItemViewState';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import { SoloClassShorthand } from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import ClassDropdown from './ClassDropdown';


const PartyDropdown = () => {
    const {key:gameType} = useGame();
     const { soloClass: filteredSoloClass } = getItemViewState();
     const { classesInUse } = getSpoilerFilter();
     const dispatch = useDispatch();

      const onChange = function(soloClass:SoloClassShorthand | undefined) {
        dispatch(storeFilterClass({value:soloClass, gameType}));
      };

      const filter = (soloClass:SoloClassShorthand) => {
        return soloClass !== filteredSoloClass && classesInUse.includes(soloClass);
      };
 
    return (
        <ClassDropdown 
          filter={filter}
          placeholder="Choose Class" 
          onChange={onChange}/>
    );
}

export default PartyDropdown;
