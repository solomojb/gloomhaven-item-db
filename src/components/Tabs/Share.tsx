import React, { useState, useEffect } from 'react'
import { Form, Icon, Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/Reducer';
import { SignUpForm } from '../SignUp';

type Props = {
}

const Share = (props:Props) => {
    const {} = props;
    const spoilerFilter = useSelector<RootState>( state => state.spoilerFilter) as RootState['spoilerFilter'];
    const [ shareLockSpoilerPanel, setShareLockSpoilerPanel] = useState(false);
    const [ peerId, setPeerId] = useState<string>();
    const [ serverPeerId, setServerPeerId] = useState<string>();

    const shareUrl = location.origin + location.pathname + '#' + btoa(JSON.stringify({
        ...spoilerFilter,
        lockSpoilerPanel: shareLockSpoilerPanel
    }));

<<<<<<< HEAD
=======
    const importData = () => {
        console.log("I am going to import from the db")
    }

    const exportData = () => {
        console.log("I am going to export to the db")
    }


>>>>>>> 005c613... Added Basic auth
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
                     <SignUpForm/>
                    <Form.Button onClick={() => importData()}>Import</Form.Button>
                    <Form.Button onClick={() => exportData()}>Export</Form.Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Share;
