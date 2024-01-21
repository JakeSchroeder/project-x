import React from "react";
// import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function Base(props: any) {

    const gltf = useLoader(GLTFLoader, '/base-new.gltf')
    return (
        <RigidBody type="fixed" colliders={false}>
            <primitive object={gltf.scene} />
            <CuboidCollider args={[10, 1, 10]} position={[0, -1, 0]} />
        </RigidBody>
    );
}

