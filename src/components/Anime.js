import * as THREE from 'three';
import vertexShader from '@/src/shaders/anime.vert?raw';
import fragmentShader from '@/src/shaders/anime.frag?raw';

export class NeuralAnime extends THREE.Mesh {
    constructor(options) {
        super();

        const dim = options.dim || 32;
        const resolution = options.resolution || 512;
        
        // Create zero-filled textures for weight matrices
        const createWeightTexture = (width, height) => {
            const size = width * height;
            const data = new Float32Array(size * 4); // RGBA, all zeros by default
            
            const texture = new THREE.DataTexture(
                data,
                width,
                height,
                THREE.RGBAFormat,
                THREE.FloatType
            );
            texture.needsUpdate = true;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            return texture;
        };
        
        // Create textures for each weight matrix
        const fourierWeights = createWeightTexture(2, dim / 2);  // (dim/2) x 2 for Fourier
        const mlpWeight0 = createWeightTexture(dim, dim);        // dim x dim
        const mlpWeight1 = createWeightTexture(dim, dim);        // dim x dim
        const mlpWeight2 = createWeightTexture(dim, dim);        // dim x dim
        const mlpWeight3 = createWeightTexture(dim, 3);          // dim x 3 for output
        
        this.material = new THREE.ShaderMaterial({ 
            uniforms: {
                uColor: { value: new THREE.Color(255 / 255, 0 / 255, 0 / 255) },
                uResolution: { value: new THREE.Vector2(options.resolution, options.resolution) },
                uTime: { value: options.time || 0 },
                fourier: { value: fourierWeights },
                mlp0 : { value: mlpWeight0 },
                mlp1 : { value: mlpWeight1 },
                mlp2 : { value: mlpWeight2 },
                mlp3 : { value: mlpWeight3 }
            },
            vertexShader,
            fragmentShader,
        });

        this.geometry = new THREE.PlaneGeometry(2, 3, options.resolution, options.resolution);
    }
}