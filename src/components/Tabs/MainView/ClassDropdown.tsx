import React, { useState } from 'react'
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import { SoloClassShorthand } from '../../../State/Types';

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

type Props  = {
  filter?: (soloClass:SoloClassShorthand) => boolean;
  customClass?:string;
  initialClass?: SoloClassShorthand;
  onChange?: (option:SoloClassShorthand | undefined) => void;
  placeholder?: string;
}

const ClassDropdown = (props:Props) => {
    const {filter, customClass, initialClass, onChange, placeholder} = props;

    const [selectedClass, setSelectedClass] = useState<SoloClassShorthand| undefined>(initialClass);

    const getClassList = (applyFilter:boolean) => {
      let classList = GloomhavenSoloClassShorthands;
      if (filter && applyFilter) {
        classList = classList.filter(filter);
      }
      return classList;
    }

    const selectOption = (soloClass:SoloClassShorthand | undefined) => {
       setSelectedClass(soloClass);
      if (onChange)
        onChange(soloClass)
    };

    const createClassImage = (soloClass:SoloClassShorthand| undefined) => {
      return soloClass ?
        <Image  key={soloClass} src={require(`../../../img/classes/${soloClass}.png`)} className={'soloClass'}/> : 
        <Image  key={soloClass} src={require(`../../../img/icons/element/use.png`)} className={'soloClass'}/>
    }

    const trigger = (
      placeholder && !selectedClass?  <div className={"nooption"}>{placeholder}</div> :    createClassImage(selectedClass)
    )

    const options = () => {
      const opts:any = [];
      if (selectedClass) {
        opts.push({ onClick:() => {selectOption(undefined)}, key:'dont', image: createClassImage(undefined)});
      }
      
      return opts.concat(getClassList(true).map((soloClass:SoloClassShorthand) => {
        return { onClick:() => {selectOption(soloClass)}, key: soloClass, image: createClassImage(soloClass)    }
      }));

    };

    return <Dropdown
      className={customClass}
      trigger={trigger}
      pointing='top left'
      icon={null}
      options={options()}
    />     
}

export default ClassDropdown;