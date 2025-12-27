'use client'

import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Effect } from 'postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

// Testing the retro shader from Maxime Heckel
import vertexShader from '@/app/shaders/vert.glsl'
import fragmentShader from '@/app/shaders/frag.glsl'

// Custom Sobel Shader
import testfrag from '@/app/shaders/testfrag.glsl'

class SobelEffectImpl extends Effect {
    constructor() {
        super('SobelEffect', testfrag, {
            uniforms: new Map(),
        })
    }
}

const SobelEffect = wrapEffect(SobelEffectImpl)

const Sobel = () => {
    const mesh = useRef(null)

    return (
        <>
            <mesh receiveShadow castShadow>
                <torusKnotGeometry args={[1, 0.25, 128, 100]} />
                <meshStandardMaterial color="cyan" />
            </mesh>
            <EffectComposer>
                <SobelEffect />
            </EffectComposer>
        </>
    )
}
class RetroEffectImpl extends Effect {
    constructor({ matrixSize = 8.0, bias = 0.5 }) {
        const uniforms = new Map([
            ['matrixSize', new THREE.Uniform(8.0)],
            ['bias', new THREE.Uniform(0.5)],
        ])

        super('RetroEffect', fragmentShader, {
            uniforms,
        })

        this.uniforms = uniforms
    }

    set matrixSize(value) {
        this.uniforms.get('matrixSize').value = value
    }

    get matrixSize() {
        return this.uniforms.get('matrixSize').value
    }

    set bias(value) {
        this.uniforms.get('bias').value = value
    }

    get bias() {
        return this.uniforms.get('bias').value
    }
}

const RetroEffect = wrapEffect(RetroEffectImpl)

const Retro = () => {
    const mesh = useRef(null)

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

    return (
        <>
            <mesh receiveShadow castShadow>
                <torusKnotGeometry args={[1, 0.25, 128, 100]} />
                <meshStandardMaterial color="cyan" />
            </mesh>
            <EffectComposer>
                <RetroEffect matrixSize={parseFloat(matrixSize)} bias={bias} />
            </EffectComposer>
        </>
    )
}

const Scene = () => {
    return (
        <Canvas shadows dpr={[1, 2]}>
            <directionalLight position={[0, 10, 5]} intensity={10.5} />
            <color attach="background" args={['black']} />

            {/* <Retro /> */}
            <Sobel />

            <OrbitControls />
            <OrthographicCamera
                makeDefault
                position={[5, 5, 5]}
                zoom={120}
                near={0.01}
                far={500}
            />
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
