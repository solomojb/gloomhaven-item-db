import React from 'react'
import { useDispatch } from 'react-redux';
import { getItemViewState, storeOwnerFilter } from '../../../State/ItemViewState';
import { getSpoilerFilter } from '../../../State/SpoilerFilter';
import { PullDownOptions, SoloClassShorthand } from '../../../State/Types';
import { useGame } from '../../Game/GameProvider';
import ClassDropdown from './ClassDropdown';

const PartyDropdown = () => {
    const {key:gameType} = useGame();
     const { ownerFilter } = getItemViewState();
     const { classesInUse } = getSpoilerFilter();
     const dispatch = useDispatch();

      const onChange = function(soloClass:PullDownOptions | undefined) {
        dispatch(storeOwnerFilter({value:soloClass, gameType}));
      };

      const filter = (soloClass:SoloClassShorthand) => {
        return soloClass !== ownerFilter && classesInUse.includes(soloClass);
      };
 
    return (
        <ClassDropdown 
          filter={filter}
          placeholder="Choose Class" 
          onChange={onChange}/>
    );
}

export default PartyDropdown;
