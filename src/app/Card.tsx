'use client'

import { useRef } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camera } from 'three'

const fragmentShader = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`
const vertexShader = `
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

const Flag = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef(null)

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
                wireframe
            />
        </mesh>
    )
}

const Cube = () => {
    const mesh = useRef(null)

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
            />
        </mesh>
    )
}

export default function Card() {
    return (
        <div className="w-full min-h-full overflow-hidden">
            <Canvas>
                <OrbitControls />
                {/* <Cube /> */}
                <Flag />
                <axesHelper args={[3]} />
            </Canvas>
        </div>
    )
}
