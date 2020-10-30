import React from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { PullDownOptions, SoloClassShorthand } from '../../../State/Types';
import { getSpoilerFilter, storeClassesInUse, storeItem, storeItemsOwnedBy } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

const Party = () => {
    const { key : gameType} = useGame();
    const dispatch = useDispatch();
    const { classesInUse, itemsOwnedBy } = getSpoilerFilter();

    const cleanUpItemsOwned = (soloClass:SoloClassShorthand) => {
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

    const toggleClassFilter = (key: SoloClassShorthand) => {
        const classesInUseCopy = Object.assign([], classesInUse);
        if (classesInUseCopy.includes(key)) {
            classesInUseCopy.splice(classesInUseCopy.indexOf(key), 1);
            // We just removed the class, we need to find the class in the itemsOwnedBy and remove them there as well.
            cleanUpItemsOwned(key);
        } else {
            classesInUseCopy.push(key)
        }
        const value = GloomhavenSoloClassShorthands.filter( soloClass => classesInUseCopy.includes(soloClass));
        dispatch(storeClassesInUse({value, gameType}));
    }

    return (
        <>
            <p>Select mercanaries that are in use.</p>
            <Form>
                <Form.Group inline className={'inline-break'}>
                    <label>Classes in use:</label>
                    {GloomhavenSoloClassShorthands.map(key => (
                        <Image key={key} src={require(`../../../img/classes/${key}.png`)}
                            className={'icon' + (classesInUse.includes(key) ? '' : ' disabled')}
                            onClick={() => toggleClassFilter(key)}/>
                    ))}
                </Form.Group>

            </Form>
        </>
    );
}

export default Party;
