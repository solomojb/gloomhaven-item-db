import React, { useState } from 'react'
import { Image, Dropdown } from 'semantic-ui-react';
import { PullDownOptions } from '../../../State/Types';

const InUseClasses: Array<PullDownOptions> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR', 'DM' , 'HT', 'RG', 'VW'];

type Props  = {
  filter?: (soloClass:PullDownOptions) => boolean;
  customClass?:string;
  initialClass?: PullDownOptions;
  onChange?: (option:PullDownOptions | undefined) => void;
  placeholder?: string;
  disabled?:boolean;
}

const ClassDropdown = (props:Props) => {
    const {disabled, filter, customClass, initialClass, onChange, placeholder} = props;

    const [selectedClass, setSelectedClass] = useState<PullDownOptions| undefined>(initialClass);

    const getClassList = (applyFilter:boolean) => {
      let classList = InUseClasses;
      if (filter && applyFilter) {
        classList = classList.filter((soloClass) => filter(soloClass as PullDownOptions));
      }
      classList.unshift('InUse');
      return classList;
    }

    const selectOption = (soloClass:PullDownOptions | undefined) => {
       setSelectedClass(soloClass);
      if (onChange)
        onChange(soloClass)
    };

    const createClassImage = (soloClass:PullDownOptions| undefined) => {
      if (InUseClasses.includes(soloClass as PullDownOptions))
      {
        return <Image key={soloClass} src={require(`../../../img/classes/${soloClass}.png`)} className={'soloClass'}/>;
      }
      else if (soloClass === 'InUse')
      {
        return <Image  key={soloClass} src={require(`../../../img/icons/equipment_slot/small.png`)} className={'soloClass'}/>
      }
      else 
      {
        return <Image  key={soloClass} src={require(`../../../img/icons/element/use.png`)} className={'soloClass'}/>
      }
    }

    const trigger = (
      placeholder && !selectedClass?  <div className={"nooption"}>{placeholder}</div> :    createClassImage(selectedClass)
    )

    const options = () => {
      const opts:any = [];
      opts.push({ onClick:() => {selectOption(undefined)}, key:'dont', image: createClassImage(undefined)});
      return opts.concat(getClassList(true).map((soloClass:PullDownOptions) => {
        return { onClick:() => {selectOption(soloClass as PullDownOptions)}, key: soloClass, image: createClassImage(soloClass as PullDownOptions)    }
      }));

    };

    return <Dropdown
      disabled={disabled}
      className={customClass}
      trigger={trigger}
      pointing='top left'
      icon={null}
      options={options()}
    />     
}

export default ClassDropdown;
