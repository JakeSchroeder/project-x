import { useKeyboardControls } from '@react-three/drei';

import { useEffect, useState } from 'react';

export const SoundManager = ({ howlSound, currentInteractive, shouldPlaySound, setShouldPlaySound }: any) => {

    const isInteractivePressed = useKeyboardControls(state => state.interact)


    useEffect(() => {

        if (isInteractivePressed === true && currentInteractive === 'RECORD_PLAYER') {
            if (shouldPlaySound === true) {
                howlSound.play();
                setShouldPlaySound(false)
            } else if (shouldPlaySound === false) {
                howlSound.pause();
                setShouldPlaySound(true)
            }
        }
    }, [isInteractivePressed, currentInteractive])

    return (<></>)
}