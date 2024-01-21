import { useGLTF, useHelper, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { BoxHelper } from "three";

export function Door({ setCurrentInteractive, currentInteractive }: any) {
    const { nodes, materials } = useGLTF("/door.gltf");
    const meshRef = useRef<any>(null);
    const [isHovered, setIsHovered] = useState(false);

    useHelper(isHovered && meshRef, BoxHelper, 'red');

    // const isInteractivePressed = useKeyboardControls(state => state.interact)


    // useEffect(() => {

    //     if (isInteractivePressed === true && currentInteractive === 'DOOR') {
    //         window.location.href = 'https://google.com';
    //     }

    // }, [isInteractivePressed, currentInteractive])

    return (

        <mesh
            ref={meshRef}
            onPointerOver={(e) => {
                setIsHovered(true)
                setCurrentInteractive('DOOR');
            }}
            onPointerLeave={(e) => {
                setIsHovered(false)
                setCurrentInteractive('NONE');
            }}
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.door.geometry}
            //@ts-ignore
            material={nodes.door.material}
        />

    );
}

useGLTF.preload("/door.gltf");