import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        rules: {
            '*.glsl': {
                loaders: ['raw-loader', 'glslify-loader'],
                as: '*.js',
            },
        },
    },
}

export default nextConfig
