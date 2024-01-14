import React, { useRef, useState } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

export function RecordPlayer({ setCurrentInteractive }: any) {

    const { nodes } = useGLTF("/record_player.gltf");
    const meshRef = useRef<any>(null);
    const [isHovered, setIsHovered] = useState(false);

    useHelper(isHovered && meshRef, BoxHelper, 'green')

    // useFrame(() => {

    //     if (meshRef.current) {
    //         meshRef.current.material.color.set(isHovered ? 'yellow' : 'gray');
    //     }
    // })



    return (
        <mesh
            ref={meshRef}
            onPointerOver={(e) => {
                setIsHovered(true)
                setCurrentInteractive('RECORD_PLAYER');
            }}
            onPointerLeave={(e) => {
                setIsHovered(false)
                setCurrentInteractive('NONE');
            }}
            castShadow
            receiveShadow
            //@ts-ignore
            geometry={nodes.record_player.geometry}
            //@ts-ignore
            material={nodes.record_player.material}
        >
            <meshLambertMaterial />
        </mesh>
    )

}

useGLTF.preload("/record_player.gltf");

