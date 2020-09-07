import React, { useState } from 'react'
import { Form, Icon, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../State/Reducer';
import { useFirebase } from '../../Firebase';

type Props = {
}

const Share = (props:Props) => {
    const {} = props;
    const spoilerFilter = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const [ shareLockSpoilerPanel, setShareLockSpoilerPanel] = useState(false);
    const { firebase, authUser} = useFirebase();

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
            .spoilerFilter(authUser.uid).on("value", (snapshot) => {
                console.log(snapshot.val());
            },
            (error: any)=> console.log(error))
    }

    const exportData = () => {
        if (!firebase || !authUser) {
            throw Error("No firebase or auth user")
            return;
        }
        firebase
            .spoilerFilter(authUser.uid)
            .set({
                spoilerFilter,
            });
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
            </Form>
            <Form>
                <Form.Group>
                    <Form.Button onClick={() => importData()}>Import</Form.Button>
                    <Form.Button onClick={() => exportData()}>Export</Form.Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Share;
