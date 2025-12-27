precision highp float;

uniform float threshold;

const mat3 sobelMatrix_x = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
);

const mat3 sobelMatrix_y = mat3(
     1.0,  2.0,  1.0,
     0.0,  0.0,  0.0,
    -1.0, -2.0, -1.0
);

vec3 sobelGradient(vec2 uv) {
  float gx = 0.0;
  float gy = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y)) / resolution;
      vec3 rgb = texture2D(inputBuffer, uv + offset).rgb;
      float lum = dot(rgb, vec3(0.2126, 0.7152, 0.0722));

      // mat3[col][row] => [x+1][y+1]
      gx += lum * sobelMatrix_x[x + 1][y + 1];
      gy += lum * sobelMatrix_y[x + 1][y + 1];
    }
  }

  float g = length(vec2(gx, gy));

  g = step(threshold, g); // 0 below threshold, 1 above

  return vec3(g);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // vec4 color = texture2D(inputBuffer, uv);

  // float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
  // color.rgb = sobelGradient(uv);

  // outputColor = color;

  outputColor = vec4(sobelGradient(uv), 1.0);
}