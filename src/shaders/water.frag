
uniform vec3 uSurfaceColor;
uniform float uFlowStrength;
uniform float uTime;
uniform float uGrid;
uniform vec2 uAnimationSpeed;
uniform float uNoiseScale;
uniform float uTimeScale;
uniform float uDisplacementStrength;
uniform float uPrimaryFoamIntensity;
uniform float uPrimaryShadowIntensity;
uniform float uSecondaryFoamIntensity;
uniform float uSecondaryShadowIntensity;
uniform vec2 uPrimaryShadowOffset;
uniform vec2 uSecondaryFoamOffset;
uniform vec2 uSecondaryShadowOffset;
varying vec2 vUv;

vec2 random2(vec2 id) {
    return fract(sin(vec2(dot(id, vec2(121, 143)), dot(id, vec2(142, 243)))));
}

vec4 caustics(vec2 uv, float grid) {
    // convert to uv space
    vec2 id = floor(uv * grid);
    uv = fract(uv * grid);

    vec3 color = vec3(0.);

    float dmin = 1.;
    float ddmin = 1.;

    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 cellId = id + vec2(float(i), float(j));
            vec2 point = random2(cellId) + vec2(float(i), float(j));
            
            float d = distance(uv, point);
            
            if (d < dmin) {
                ddmin = dmin;
                dmin = d;
            } else if (d < ddmin) {
                ddmin = d;
            }
        }
    }

    // Anti-aliased voronoi cell edges
    float edge = ddmin - dmin;
    float width = fwidth(edge) * 1.2;
    color += smoothstep(-width, width, edge - 0.06);

    // flip black and white
    color = 1. - color;

    return vec4(color, 1.);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

// taken from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,-0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec3 color = uSurfaceColor;

    vec2 uv = vUv + uAnimationSpeed * uTime;
    vec2 ruv = vUv + (-uAnimationSpeed) * uTime;

    // use 2D displacement map with foam
    vec2 displacement = vec2(
        snoise(uv * uNoiseScale + uTime * uTimeScale),
        snoise(uv * uNoiseScale + uTime * uTimeScale)
    ) * uDisplacementStrength;

    vec4 primaryFoam = caustics(uv + displacement, uGrid) * uPrimaryFoamIntensity;
    vec4 primaryShadows = caustics(uv + displacement + uPrimaryShadowOffset, uGrid) * uPrimaryShadowIntensity;
    vec4 secondaryFoam = caustics(ruv + displacement + uSecondaryFoamOffset, uGrid) * uSecondaryFoamIntensity;
    vec4 secondaryShadows = caustics(ruv + displacement + uSecondaryShadowOffset, uGrid) * uSecondaryShadowIntensity;

    color += primaryFoam.rgb - primaryShadows.rgb + secondaryFoam.rgb - secondaryShadows.rgb;

    gl_FragColor = vec4(color, 1.);
}