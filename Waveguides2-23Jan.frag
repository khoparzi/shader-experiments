// Author: Khoparzi
// Title: Waveguides2

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct)
{
    return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.1, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.1);

    vec3 pct = vec3(st.x);
    pct.r = sin(st.x * (u_time * 0.02));
    pct.g = cos(st.x * (u_time * 0.02));
    pct.b = tan(st.x * (u_time * 0.02));

    // Plot a line
    color = mix(color, vec3(0.13,0.0,0.0), plot(st, pct.r));
    color = mix(color, vec3(0.0,0.13,0.0), plot(st, pct.g));
    color = mix(color, vec3(0.0,0.0,0.13), plot(st, pct.b));

    gl_FragColor = vec4(color,1.0);
}
