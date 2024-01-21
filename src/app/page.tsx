'use client';

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Base } from './base'
import { Physics } from '@react-three/rapier';
import { Environment, KeyboardControls, PointerLockControls } from '@react-three/drei';
import { Player } from './player';
import { RecordPlayer } from './record_player';
import { Perf } from 'r3f-perf';
import { Howl } from 'howler';
import { SoundManager } from './SoundManager';
import { Door } from './door';
import { PC } from './pc';


export default function App() {

  const [currentInteractive, setCurrentInteractive] = useState('NONE');
  const [howlSound, setHowlSound] = useState<any>(undefined);
  const [shouldPlaySound, setShouldPlaySound] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  return (
    <main className='relative bg-black' id="canvas-container">
      {!howlSound ? (
        <div className="flex flex-col space-y-16 items-center text-white justify-center w-full h-full">
          <p className='max-w-prose'>
            In the surreal silence of the lab, an eerie triumph echoed. The Internet wormhole experiment, a concoction of science and fantasy, had breached the bounds of reality. The year was 2000, a year that whispered echoes of my own birth. But, a creeping dissonance began to unravel the fabric of this success. The telemetry data, a cryptic oracle, spoke of an alternate timeline – a reality askew. Diagnostics spun their analytical webs, unveiling a chilling truth. The server's clock, a heartbeat out of sync with our world, hinted at a darker narrative. It seemed the wormhole had cast its traveler into a shadowed parallel, where 1999 marked not my genesis, but my demise, and where the dreaded Y2K fears had morphed into a cataclysmic reality. <br /> <br />

            The world that unfolded was an apocalyptic tapestry. The sun, once a symbol of life, now languished behind a veil of nuclear smog, its light suffocated. Peering through this veil, a ghastly vision materialized. Bodies, countless and silent, lay strewn across the landscape. Cities, once vibrant, now bore the scars of desperation – gaping holes that punctured the earth, extending as deep as two miles. It was as if humanity, in its final throes, had sought refuge in the bowels of the earth, entombing themselves in steel coffins, blanketed by concrete in a futile bid to escape the relentless march of radiation. <br /> <br />

            Amidst this desolation, a solemn directive broke through: Explore. Uncover the secrets of this forsaken timeline. And when the truth had been gleaned, retreat to the nearest exit. A beacon back to our reality, a sliver of hope in this dystopian nightmare. Good luck.
          </p>
          <button className='px-8 py-4 border border-white' onClick={() => {
            setHowlSound(new Howl({
              src: ['/music/Windowlicker.mp3']
            }));
          }}>Start game</button>
        </div>) : (
        <Suspense>
          <div className='flex flex-col space-y-4 items-center absolute bottom-4 left-4 z-10 text-white'>
            <small>Controls</small>
            <div className='border border-white w-8 h-8 flex items-center justify-center'>W</div>
            <div className='flex space-x-4'>
              <div className='border border-white w-8 h-8 flex items-center justify-center'>A</div>
              <div className='border border-white w-8 h-8 flex items-center justify-center'>S</div>
              <div className='border border-white w-8 h-8 flex items-center justify-center'>D</div>
            </div>
          </div>
          <div className='flex flex-col space-y-4 items-center z-10 absolute right-4 bottom-4 text-white'>
            <small>Items discovered:</small>
            <div className='flex space-x-2'>
              <div className='w-6 h-6 flex items-center justify-center'>0</div>
              <div className='w-6 h-6 flex items-center justify-center'>/</div>
              <div className='w-6 h-6 flex items-center justify-center'>16</div>
            </div>
          </div>
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-32 text-white z-10 ${currentInteractive !== 'NONE' ? `opacity-100` : `opacity-0`}`}>
            {currentInteractive === 'RECORD_PLAYER' && `Press 'F' to ${shouldPlaySound ? 'play' : 'pause'} the record player`}
            {currentInteractive === 'DOOR' && (isLocked ? `Door is locked. There's still items to collect.` : `Press 'F' to exit`)}
            {currentInteractive === 'PC' && `Press 'F' to use the PC`}
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
              {/* <Perf /> */}
              <Physics gravity={[0, -30, 0]}>
                <Base />
                <Player />
                <PC setCurrentInteractive={setCurrentInteractive} />
                <Door currentInteractive={currentInteractive} setCurrentInteractive={setCurrentInteractive} />
                <RecordPlayer setCurrentInteractive={setCurrentInteractive} />
              </Physics>
              <pointLight
                intensity={5}
                decay={3}
                color="#fffbfc"
                position={[0, 1.52, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              {/* <Environment preset='sunset' /> */}
              <PointerLockControls />
            </Canvas>
            <SoundManager shouldPlaySound={shouldPlaySound} setShouldPlaySound={setShouldPlaySound} currentInteractive={currentInteractive} howlSound={howlSound} />
          </KeyboardControls>
        </Suspense>
      )}



    </main>
  )
}