import React from 'react'
import { Image } from 'semantic-ui-react';
import '../../../react-super-select.css'
import SuperSelectWrapper from './SuperSelectWrapper';
import { SoloClassShorthand } from '../../../State/Types';

export type ClassOption = {
  id:number;
  soloClass: SoloClassShorthand;
}

type Props  = {
  filter?: (options:ClassOption) => boolean;
  customClass?:string;
  initialClass?: SoloClassShorthand;
  classes: Array<SoloClassShorthand>;
  onChange: (option:ClassOption) => void;
  placeholder: string;
}


const ClassDropdown = (props:Props) => {
    const {filter, customClass, initialClass, classes, onChange, placeholder} = props;

     const allClasses: Array<ClassOption> = classes.map( (soloClass:SoloClassShorthand, index:number) => {
          return { id: index, soloClass}
        })

    const customOptionTemplate = function(item:ClassOption) {
      return(
        <div>
          <Image  key={item.soloClass} src={require(`../../../img/classes/${item.soloClass}.png`)}
                  className={'icon'}
              />
        </div>);
    };

    const getInitialValue = () => {
      let initValue = undefined;
      if (initialClass) {
        initValue = allClasses.find( sc => sc.soloClass === initialClass);
      }
      console.log(allClasses, "the init value is", initValue);
      return undefined;
    };

    const getDataSource = () => {
        const c = filter? allClasses.filter(filter): allClasses
        console.log(classes, allClasses, "Data Source is ", c);
        return c;
    }
 
    return (
        <SuperSelectWrapper 
          customClass={customClass}
          initalValue={getInitialValue()}
          placeholder={placeholder}
          onChange={onChange} 
          customOptionTemplate={customOptionTemplate}
          dataSource={getDataSource()} />
    );
}

export default ClassDropdown;