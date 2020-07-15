import React from 'react'
import { Form, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { SoloClassShorthand } from '../../../State/Types';
import { getSpoilerFilter, storeClassesInUse } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

const GloomhavenSoloClassShorthands: Array<SoloClassShorthand> = ['BR', 'TI', 'SW', 'SC', 'CH', 'MT', 'SK', 'QM', 'SU', 'NS', 'PH', 'BE', 'SS', 'DS', 'SB', 'EL', 'BT'];

const Party = () => {
    const { key : gameType} = useGame();
    const dispatch = useDispatch();
    const { classesInUse } = getSpoilerFilter();
    const toggleClassFilter = (key: SoloClassShorthand) => {
        if (classesInUse.includes(key)) {
            classesInUse.splice(classesInUse.indexOf(key), 1);
        } else {
            classesInUse.push(key)
        }
        dispatch(storeClassesInUse({value:classesInUse, gameType}));
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
