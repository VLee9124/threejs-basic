import { Effect } from 'postprocessing'
import { wrapEffect } from '@react-three/postprocessing'
import * as THREE from 'three'

import pixfrag from '@/app/shaders/pixfrag.glsl'

class PixelEffectImpl extends Effect {
    constructor({ Pixels = 512.0 }) {
        super('PixelEffect', pixfrag, {
            uniforms: new Map([['Pixels', new THREE.Uniform(Pixels)]]),
        })
    }
}

export const PixelEffect = wrapEffect(PixelEffectImpl)
