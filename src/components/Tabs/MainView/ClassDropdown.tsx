import React, { useState } from 'react'
import { Image, Dropdown } from 'semantic-ui-react';
import { PullDownOptions } from '../../../State/Types';

type Props  = {
  customClass?:string;
  initialOption: PullDownOptions;
  optionsList: PullDownOptions[];
  changeOption?: (option:PullDownOptions) => void;
  disabled?:boolean;
}

const ClassDropdown = (props:Props) => {
    const {disabled, customClass, initialOption, changeOption, optionsList} = props;

    const [selectedOption, setSelectedOption] = useState<PullDownOptions| undefined>(initialOption);

    const onSelectOption = (option:PullDownOptions) => {
      const currentTime = Date.now();
       setSelectedOption(option);
       if (changeOption) {
        changeOption(option)
       }
    };

    const createClassImage = (option:PullDownOptions) => {
      if (!option) {
        return <Image key={option} src={require(`../../../img/icons/element/use.png`)} className={'soloClass'}/>
      }
      else if (option === 'InUse')
      {
        return <Image  key={option} src={require(`../../../img/icons/equipment_slot/small.png`)} className={'soloClass'}/>
      }
      else 
      {
        return <Image key={option} src={require(`../../../img/classes/${option}.png`)} className={'soloClass'}/>;
      }
    }

    const options = () => {
      const opts:any = [];
      opts.push({ onClick:() => {onSelectOption(undefined)}, key:'dont', image: createClassImage(undefined)});
      return opts.concat(optionsList.map(option => {
        return { onClick:() => {onSelectOption(option)}, key: option, image: createClassImage(option)    }
      }));
    };

    return <Dropdown
      labeled={true}
      disabled={disabled}
      className={customClass}
      trigger={createClassImage(selectedOption)}
      pointing='top left'
      icon={null}
      options={options()}
    />     
}

export default ClassDropdown;
