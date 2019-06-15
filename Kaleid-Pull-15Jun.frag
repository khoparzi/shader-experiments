// Author: Khoparzi
// Title: Pull

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
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
    return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = rotate(st, 0., 0.02);
    st = kaleid(st, 6.);

    float y = sin(pow(st.x, 5.0) * PI*1010.0- + u_time/20.0);
    vec3 color = vec3(y);
    // Plot a line
    float pct = plot(st, y);
    color = (1.0 - pct) * color + pct;
    color = mix(color, vec3(0.4, 0.7, 0.6), st.x);

    gl_FragColor = vec4(color,1.0);
}
