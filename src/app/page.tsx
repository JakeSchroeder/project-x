'use client';

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Base } from './base'
import { Physics } from '@react-three/rapier';
import { KeyboardControls, PointerLockControls } from '@react-three/drei';
import { Player } from './player';
import { RecordPlayer } from './record_player';
import { Perf } from 'r3f-perf';
import { Howl } from 'howler';
import { SoundManager } from './SoundManager';
import { Door } from './door';


export default function App() {

  const [currentInteractive, setCurrentInteractive] = useState('NONE');
  const [howlSound, setHowlSound] = useState<any>(undefined);
  const [shouldPlaySound, setShouldPlaySound] = useState(true);

  return (
    <main className='relative' id="canvas-container">
      {!howlSound ? (
        <>
          <div className='absolute w-full h-full bg-black bg-opacity-80'>
          </div>
          <button className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-16 py-8' onClick={() => {
            setHowlSound(new Howl({
              src: ['/music/Windowlicker.mp3']
            }));
          }}>Start game</button>
        </>) : (
        <Suspense>
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-32 text-white z-10 ${currentInteractive !== 'NONE' ? `opacity-100` : `opacity-0`}`}>
            {currentInteractive === 'RECORD_PLAYER' && `Press 'F' to ${shouldPlaySound ? 'play' : 'pause'} the record player`}
            {currentInteractive === 'DOOR' && `Press 'F' to exit`}
          </div>
          <KeyboardControls

            map={[
              { name: "forward", keys: ["ArrowUp", "w", "W"] },
              { name: "backward", keys: ["ArrowDown", "s", "S"] },
              { name: "left", keys: ["ArrowLeft", "a", "A"] },
              { name: "right", keys: ["ArrowRight", "d", "D"] },
              { name: "jump", keys: ["Space"] },
              { name: 'interact', keys: ["f", "F"] }
            ]}>
            <Canvas frameloop='demand'>
              <Perf />
              <Physics gravity={[0, -30, 0]}>
                <Base />
                <Player />
                <Door currentInteractive={currentInteractive} setCurrentInteractive={setCurrentInteractive} />
                <RecordPlayer setCurrentInteractive={setCurrentInteractive} />
              </Physics>
              <pointLight
                intensity={10}
                decay={2}
                color="#fffbfc"
                position={[0, 2.52, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <PointerLockControls />
            </Canvas>
            <SoundManager shouldPlaySound={shouldPlaySound} setShouldPlaySound={setShouldPlaySound} currentInteractive={currentInteractive} howlSound={howlSound} />
          </KeyboardControls>
        </Suspense>
      )}



    </main>
  )
}