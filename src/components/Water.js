import * as THREE from 'three';
import vertexShader from '@/src/shaders/water.vert?raw';
import fragmentShader from '@/src/shaders/water.frag?raw';

export class Water extends THREE.Mesh {
    constructor(options) {
        super();
        
        this.material = new THREE.ShaderMaterial({ 
            uniforms: {
                uSurfaceColor: { value: new THREE.Color(82 / 255, 200 / 255, 255 / 255) },
                uFlowStrength: { value: options.flowStrength || 0.01 },
                uTime: { value: options.time || 0 },
                uResolution: { value: new THREE.Vector2(options.resolution, options.resolution) },
                uGrid: { value: options.grid || 6 },
                uAnimationSpeed: { value: new THREE.Vector2(options.animationSpeed || 0.01, options.animationSpeed || 0.01) },
                uNoiseScale: { value: options.noiseScale || 8.0 },
                uTimeScale: { value: options.timeScale || 0.1 },
                uDisplacementStrength: { value: options.displacementStrength || 0.03 },
                uPrimaryFoamIntensity: { value: options.primaryFoamIntensity || 12.0 },
                uPrimaryShadowIntensity: { value: options.primaryShadowIntensity || 0.35 },
                uSecondaryFoamIntensity: { value: options.secondaryFoamIntensity || 0.35 },
                uSecondaryShadowIntensity: { value: options.secondaryShadowIntensity || 0.0 },
                uPrimaryShadowOffset: { value: new THREE.Vector2(options.primaryShadowOffset || 0.02, options.primaryShadowOffset || 0.01) },
                uSecondaryFoamOffset: { value: new THREE.Vector2(options.secondaryFoamOffset || 0.04, options.secondaryFoamOffset || 0.02) },
                uSecondaryShadowOffset: { value: new THREE.Vector2(options.secondaryShadowOffset || 0.06, options.secondaryShadowOffset || 0.03) },
            },
            vertexShader,
            fragmentShader,
            // fragmentShader,
            // causticsFragmentShader,
            // wireframe: true,
        });

        this.geometry = new THREE.PlaneGeometry(2, 3, options.resolution, options.resolution);
    }
}