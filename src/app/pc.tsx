import React, { useRef, useState } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

export function PC({ setCurrentInteractive }: any) {
    const { nodes, materials } = useGLTF("/pc-screen.gltf");
    const meshRef = useRef<any>(null);
    const [isHovered, setIsHovered] = useState(false);

    useHelper(isHovered && meshRef, BoxHelper, 'green')

    return (
        <mesh
            ref={meshRef}
            castShadow
            receiveShadow
            onPointerOver={(e) => {
                setIsHovered(true)
                setCurrentInteractive('PC');
            }}
            onPointerLeave={(e) => {
                setIsHovered(false)
                setCurrentInteractive('NONE');
            }}
            //@ts-ignore
            geometry={nodes["pc-screen"].geometry}
            //@ts-ignore
            material={nodes["pc-screen"].material}
        />
    );
}

useGLTF.preload("/pc-screen.gltf");
