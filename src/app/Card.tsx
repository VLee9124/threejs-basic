'use client'

import { useRef, useMemo } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, StatsGl } from '@react-three/drei'
import { Camera, MathUtils, MeshStandardMaterial } from 'three'
import { Bloom, Noise, EffectComposer } from '@react-three/postprocessing'

import vertexShader from '@/app/shaders/vert.glsl'
import fragmentShader from '@/app/shaders/frag.glsl'

const MovingPlane = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef(null)

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
        }),
        []
    )

    useFrame((state) => {
        const { clock } = state
        mesh.current.material!.uniforms.u_time.value = clock.getElapsedTime()
    })

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.5}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                // wireframe
            />
        </mesh>
    )
}

const Blob = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef(null)
    const hover = useRef(false)

    const uniforms = useMemo(
        () => ({
            u_intensity: {
                value: 0.3,
            },
            u_time: {
                value: 0.0,
            },
        }),
        []
    )

    useFrame((state) => {
        const { clock } = state
        mesh.current.material.uniforms.u_time.value =
            0.4 * clock.getElapsedTime()

        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
            mesh.current.material.uniforms.u_intensity.value,
            hover.current ? 0.85 : 0.15,
            0.02
        )
    })

    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            scale={1.5}
            onPointerOver={() => (hover.current = true)}
            onPointerOut={() => (hover.current = false)}
        >
            <icosahedronGeometry args={[2, 20]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    )
}

const Sphere = () => {
    const mesh = useRef(null)
    return (
        <mesh ref={mesh} position={[0, 1.5, 0]} scale={1.5}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

const Plane = () => {
    const mesh = useRef(null)
    return (
        <mesh
            ref={mesh}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={9999}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            <meshStandardMaterial color="lightblue" />
        </mesh>
    )
}

const Scene = () => {
    return (
        <Canvas camera={{ position: [3, 3, 3], fov: 90 }}>
            <ambientLight intensity={0} />
            <pointLight
                position={[0, 15, 0]}
                intensity={1}
                color={[230, 245, 240]}
            />

            <OrbitControls />

            <Sphere />
            <Plane />

            {/* <axesHelper args={[5]} /> */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0}
                    luminanceSmoothing={0.3}
                    height={300}
                    intensity={5}
                />

                <Noise opacity={0.02} />
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
