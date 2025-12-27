import { Effect } from 'postprocessing'
import * as THREE from 'three'
import { wrapEffect } from '@react-three/postprocessing'

import fragmentShader from '@/app/shaders/frag.glsl'

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

export const RetroEffect = wrapEffect(RetroEffectImpl)

//

// export const Retro = () => {
//     const mesh = useRef(null)

//     const { matrixSize, bias } = useControls({
//         matrixSize: {
//             value: '8.0',
//             options: ['2.0', '4.0', '8.0'],
//         },
//         bias: {
//             value: 0.7,
//             min: 0.0,
//             max: 1.0,
//         },
//     })

//     return (
//         <>
//             <mesh receiveShadow castShadow>
//                 <torusKnotGeometry args={[1, 0.25, 128, 100]} />
//                 <meshStandardMaterial color="cyan" />
//             </mesh>
//             <EffectComposer>
//                 <RetroEffect matrixSize={parseFloat(matrixSize)} bias={bias} />
//             </EffectComposer>
//         </>
//     )
// }
