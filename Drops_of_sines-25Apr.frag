// Author: Khoparzi
// Title: Drops of sines

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float plot(vec2 st, float pct)
{
    return smoothstep(pct - 0.021, pct, st.y) - smoothstep(pct, pct + 0.021, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    pct.r = sin(st.x * time);
    pct.g = cos(st.x * time) - tan(st.y * time);
    pct.b = tan(st.x * time);

    // Plot a line
    color = mix(color, vec3(0.5,0.3,0.3), plot(st, pct.r));
    color = mix(color, vec3(0.2,0.4,0.3), plot(st, pct.g));
    color = mix(color, vec3(0.0,0.4,0.4), plot(st, pct.b));

    gl_FragColor = vec4(color,1.0);
}
