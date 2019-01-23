// Author: Khoparzi
// Title: Pull

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265359

float plot(vec2 st, float pct)
{
    return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float y = sin(pow(st.x, 5.0) * PI*1010.- + u_time/20.0);
    vec3 color = vec3(y);
    // Plot a line
    float pct = plot(st, y);
    color = (1.0 - pct) * color + pct;

    gl_FragColor = vec4(color,1.0);
}
