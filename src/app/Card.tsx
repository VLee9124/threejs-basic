'use client'

import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { useRef } from 'react'

import { RetroEffect } from './Effects/Retro'
import { SobelEffect } from './Effects/Sobel'
import { useControls } from 'leva'

const TorusKnot = () => {
    const mesh = useRef(null)
    return (
        <mesh receiveShadow castShadow>
            <torusKnotGeometry args={[1, 0.25, 128, 100]} />
            <meshStandardMaterial color="cyan" />
        </mesh>
    )
}

const Sphere = () => {
    const mesh = useRef(null)
    return (
        <mesh receiveShadow castShadow position={[2, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

const Scene = () => {
    // Leva controls for uniforms

    // RetroEffect params
    const { matrixSize, bias } = useControls({
        matrixSize: {
            value: '8.0',
            options: ['2.0', '4.0', '8.0'],
        },
        bias: {
            value: 0.7,
            min: 0.0,
            max: 1.0,
        },
    })

    const { threshold } = useControls({
        threshold: {
            value: 0.1,
            min: 0.0,
            max: 1.0,
            step: 0.01,
        },
    })

    return (
        <Canvas shadows dpr={[1, 2]}>
            {/* Lighting */}
            {/* <directionalLight position={[0, 10, 5]} intensity={10.5} /> */}
            <ambientLight intensity={0.5} />
            <pointLight position={[1, 3, 1]} intensity={10} />

            {/* Scene Objects */}
            <Sphere />
            <TorusKnot />

            {/* Helpers and camera */}
            <axesHelper args={[5]} />
            <OrbitControls />
            <OrthographicCamera
                makeDefault
                position={[5, 5, 5]}
                zoom={120}
                near={0.01}
                far={500}
            />

            {/* Pass effects here */}
            <EffectComposer>
                <SobelEffect threshold={threshold} />
                {/* <RetroEffect matrixSize={parseFloat(matrixSize)} bias={bias} /> */}
            </EffectComposer>
        </Canvas>
    )
}

export default function Card() {
    return (
        <div className="w-full min-h-full overflow-hidden relative">
            <Scene />
        </div>
    )
}
