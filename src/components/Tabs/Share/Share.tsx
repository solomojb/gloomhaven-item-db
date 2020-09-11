import React, { useState, ChangeEvent } from 'react'
import { Form, Icon, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { useFirebase } from '../../Firebase';
import { storeSpoilerFilter } from '../../../State/SpoilerFilter';
import { useGame } from '../../Game/GameProvider';

type Props = {
}

const Share = (props:Props) => {
    const {} = props;
    const spoilerFilter = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const [ shareLockSpoilerPanel, setShareLockSpoilerPanel] = useState(false);
    const [error, setError] = useState<Error| null>(null);
    const [ importUserId, setImportUserId] = useState<string|undefined>();
    const { firebase, authUser} = useFirebase();
    const dispatch = useDispatch();
    const {localStorageKey} = useGame();

    const shareUrl = location.origin + location.pathname + '#' + btoa(JSON.stringify({
        ...spoilerFilter,
        lockSpoilerPanel: shareLockSpoilerPanel
    }));

    const importData = () => {
        if (!firebase || !authUser) {
            throw Error("No firebase or auth user")
            return;
        }
        firebase
            .spoilerFilter(importUserId || authUser.uid).on("value", (snapshot) => {
                if (snapshot.val())
                {
                    dispatch(storeSpoilerFilter(JSON.parse(snapshot.val()[localStorageKey])));
                    setError(null);
                }
                else {
                    setError(new Error(`Cannot find data for user ${importUserId || authUser.uid}`))
                }
            },
            (error: any)=> setError(error))
    }

    const exportData = () => {
        if (!firebase || !authUser) {
            throw Error("No firebase or auth user")
            return;
        }
        const obj = {
            [localStorageKey]:JSON.stringify(spoilerFilter),
        };
        firebase
            .spoilerFilter(authUser.uid)
            .update(obj);
    }
    
    return (
        <>
            <p>Here you can generate a link to this app with your current spoiler configuration.</p>
            <Form>
                <Form.Group inline>
                    <label htmlFor={'share-spoiler-toggle'}>Deactivate spoiler configuration panel for people
                        following your shared link.</label>
                    <Form.Checkbox id={'share-spoiler-toggle'} toggle className={'share-spoiler-toggle'}
                                    checked={shareLockSpoilerPanel}
                                    onChange={() => setShareLockSpoilerPanel(!shareLockSpoilerPanel)}/>
                </Form.Group>
                {shareLockSpoilerPanel && false && <Message negative>
                    <Icon name="exclamation triangle"/>Do not open the link yourself or you will not be able to
                    change any settings anymore
                </Message>}
                <Form.Group>
                    <Form.Input id={'share-url-input'} width={14} value={shareUrl}/>
                    <Form.Button width={2} onClick={() => {
                        (document.getElementById('share-url-input') as HTMLInputElement).select();
                        document.execCommand("copy");
                    }}>Copy</Form.Button>
                </Form.Group>
                <Form.Group>
                    <Form.Button onClick={() => importData()}>Import</Form.Button>
                    <Form.Input value={importUserId} onChange={(e:ChangeEvent<HTMLInputElement>) => setImportUserId(e.target.value)}/>
                    {error && <Form.Field>{error.message}</Form.Field>} 
                </Form.Group>
                <Form.Group>
                    { authUser && !authUser.isAnonymous && <Form.Button onClick={() => exportData()}>Export</Form.Button> }
                    { authUser && !authUser.isAnonymous && authUser.uid }
                </Form.Group>
            </Form>
        </>
    );
}

export default Share;
