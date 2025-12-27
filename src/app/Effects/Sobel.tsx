import { Effect } from 'postprocessing'
import { wrapEffect } from '@react-three/postprocessing'
import * as THREE from 'three'

import testfrag from '@/app/shaders/testfrag.glsl'

class SobelEffectImpl extends Effect {
    constructor(threshold = 0.1) {
        super('SobelEffect', testfrag, {
            uniforms: new Map([['threshold', new THREE.Uniform(threshold)]]),
        })
    }

    set threshold(value) {
        this.uniforms.get('threshold').value = value
    }

    get threshold() {
        return this.uniforms.get('threshold').value
    }
}

export const SobelEffect = wrapEffect(SobelEffectImpl)
