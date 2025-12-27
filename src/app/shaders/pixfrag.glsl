precision highp float;

uniform float Pixels;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  
  float dx = (1.0 / Pixels);
  float dy = (1.0 / Pixels);
  vec2 Coord = vec2(dx * floor(uv.x / dx),
                    dy * floor(uv.y / dy));

  vec3 color = texture2D(inputBuffer, Coord).rgb;
  outputColor = vec4(color, 1.0);
}