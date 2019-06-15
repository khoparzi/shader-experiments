// Author: Khoparzi
// Title: Waveguides3

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec2 kaleid(vec2 st, float nSides) {
  st -= 0.5;
  float ra = length(st);
  float aa = atan(st.y, st.x);
  float pi = 2. * 3.1416;
  aa = mod(aa, pi / nSides);
  aa = abs(aa - pi / nSides / 2.);
  return ra * vec2(cos(aa), sin(aa));
}

vec2 rotate(vec2 st, float _angle, float speed) {
  vec2 xy = st - vec2(0.5);
  float angle = _angle + speed * u_time;
  xy = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * xy;
  xy += 0.5;
  return xy;
}

float plot(vec2 st, float pct)
{
    return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.5, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = kaleid(st, 3.);
    st = rotate(st, 0., 0.02);

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
