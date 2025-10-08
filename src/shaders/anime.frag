uniform float uTime;
uniform vec3 uColor;

uniform sampler2D fourier;  
uniform sampler2D mlp0;
uniform sampler2D mlp1;  
uniform sampler2D mlp2;
uniform sampler2D mlp3;

varying vec2 vUv;

float relu(float x) {
    return max(0.0, x);
}

const float PI = 3.14159265359;

// Optimized matrix-vector multiply using vec4
void matvec(sampler2D matrix, inout vec4 data[64]) {
    vec4 result[64];
    
    for(int row = 0; row < 64; row++) {
        vec4 sum = vec4(0.0);
        for(int col = 0; col < 64; col++) {
            // Each texel stores 4x4 block of weights
            vec4 w0 = texture(matrix, vec2((float(col*4) + 0.5) / 256.0, (float(row*4) + 0.5) / 256.0));
            vec4 w1 = texture(matrix, vec2((float(col*4) + 1.5) / 256.0, (float(row*4) + 0.5) / 256.0));
            vec4 w2 = texture(matrix, vec2((float(col*4) + 2.5) / 256.0, (float(row*4) + 0.5) / 256.0));
            vec4 w3 = texture(matrix, vec2((float(col*4) + 3.5) / 256.0, (float(row*4) + 0.5) / 256.0));
            
            sum += w0 * data[col].x + w1 * data[col].y + w2 * data[col].z + w3 * data[col].w;
        }
        result[row] = sum;
    }
    
    // Copy result back
    for(int i = 0; i < 64; i++) {
        data[i] = result[i];
    }
}


void main() {
    vec4 activation[64];

    vec2 scaled = PI * vUv;
    for(int i = 0; i < 32; i++) {
        vec4 weights = texture(fourier, vec2(0.5, (float(i) + 0.5) / 128.0));
        vec2 linear_out = vec2(
            dot(weights.xy, scaled),
            dot(weights.zw, scaled)
        );
        
        int idx = i / 4;
        int comp = (i % 4);
        
        // Store cos values in first half, sin in second half
        activation[idx][comp] = cos(linear_out.x);
        activation[idx + 8][comp] = cos(linear_out.y);
        activation[idx + 16][comp] = sin(linear_out.x);
        activation[idx + 24][comp] = sin(linear_out.y);
    }

    matvec(mlp0, activation);
    for(int i = 0; i < 64; i++) activation[i] = max(vec4(0.0), activation[i]);
    
    matvec(mlp1, activation);
    for(int i = 0; i < 64; i++) activation[i] = max(vec4(0.0), activation[i]);
    
    matvec(mlp2, activation);
    for(int i = 0; i < 64; i++) activation[i] = max(vec4(0.0), activation[i]);
    
    // Final layer to RGB
    vec3 color = vec3(0.0);
    for(int i = 0; i < 64; i++) {
        vec4 wr = texture(mlp3, vec2((float(i*4) + 0.5) / 256.0, 0.5 / 3.0));
        vec4 wg = texture(mlp3, vec2((float(i*4) + 0.5) / 256.0, 1.5 / 3.0));
        vec4 wb = texture(mlp3, vec2((float(i*4) + 0.5) / 256.0, 2.5 / 3.0));
        
        color.r += dot(wr, activation[i]);
        color.g += dot(wg, activation[i]);
        color.b += dot(wb, activation[i]);
    }

    gl_FragColor = vec4(color, 1.0);
}