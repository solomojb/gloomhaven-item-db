import React from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { ClassesInUse, PullDownOptions } from '../../../State/Types';
import { getSpoilerFilter, storeClassesInUse, storeItemsOwnedBy } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

const ClassesToDisplay: Array<ClassesInUse> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT', 'DR', 'DM' , 'HT', 'RG', 'VW'];

const Party = () => {
    const { key : gameType} = useGame();
    const dispatch = useDispatch();
    const { classesInUse, itemsOwnedBy } = getSpoilerFilter();

    const cleanUpItemsOwned = (soloClass:ClassesInUse) => {
        const itemsOwnByCopy = Object.assign({}, itemsOwnedBy);
        Object.keys(itemsOwnByCopy).forEach( key => {
            const value:PullDownOptions[] = Object.assign([], itemsOwnByCopy[parseInt(key)]);
            if (value.includes(soloClass))
            {
                value[value.indexOf(soloClass)] = undefined
                itemsOwnByCopy[parseInt(key)] = value;
            }
        })
        dispatch(storeItemsOwnedBy({value:itemsOwnByCopy, gameType}));
    }

    const toggleClassFilter = (key: ClassesInUse) => {
        const classesInUseCopy = Object.assign([], classesInUse);
        if (classesInUseCopy.includes(key)) {
            classesInUseCopy.splice(classesInUseCopy.indexOf(key), 1);
            // We just removed the class, we need to find the class in the itemsOwnedBy and remove them there as well.
            cleanUpItemsOwned(key);
        } else {
            classesInUseCopy.push(key)
        }
        const value = ClassesToDisplay.filter( soloClass => classesInUseCopy.includes(soloClass));
        dispatch(storeClassesInUse({value, gameType}));
    }

    return (
        <>
            <Form.Group inline className={'inline-break'}>
              <label>Mercenaries Playing:</label>
                {ClassesToDisplay.map(key => (
                    <Image key={key} src={require(`../../../img/classes/${key}.png`)}
                        className={'icon' + (classesInUse.includes(key) ? '' : ' disabled')}
                        onClick={() => toggleClassFilter(key)}/>
                ))}
            </Form.Group>
        </>
    );
}

export default Party;
