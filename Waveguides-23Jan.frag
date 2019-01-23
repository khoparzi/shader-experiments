// Author: Khoparzi
// Title: Waveguides

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float u_time;

float plot(vec2 st, float pct)
{
    return smoothstep(pct - 0.001, pct, st.y) - smoothstep(pct, pct + 0.001, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    pct.r = sin(st.x * u_time);
    pct.g = cos(st.x * u_time);
    pct.b = tan(st.x * u_time);

    // Plot a line
    color = mix(color, vec3(1.0,0.0,0.0), plot(st, pct.r));
    color = mix(color, vec3(0.0,1.0,0.0), plot(st, pct.g));
    color = mix(color, vec3(0.0,0.0,1.0), plot(st, pct.b));

    gl_FragColor = vec4(color,1.0);
}
