// Author: Khoparzi
// Title: BoobsForEyes

#version 150
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

#define PI 3.14159265

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    //st.x *= resolution.x/resolution.y;


    vec3 color = vec3(0.);
    vec2 center = vec2(0.5,0.5);

    float speed = 10.;
    vec2 vector = st - center;
    float angle = atan(vector.x, vector.y);
    float dist = length(vector) - cos(time/128);

    color.gb = vec2(fract((angle/PI - dist)) );
    color.r = fract(-(angle/PI + dist));

    gl_FragColor = vec4(color,1.0);
}
