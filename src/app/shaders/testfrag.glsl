precision highp float;

const mat3 sobelMatrix = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
);

vec3 sobelGradient(vec2 uv) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 offset = vec2(float(i), float(j)) / resolution;
            vec4 s = texture2D(inputBuffer, uv + offset);
            float lum = dot(vec3(0.2126, 0.7152, 0.0722), s.rgb);
            gx += lum * sobelMatrix[j + 1][i + 1];
            gy += lum * sobelMatrix[i + 1][j + 1];
        }
    }

    float g = length(vec2(gx, gy));

    float threshold = 0.3;
    if (g < threshold) {
        g = 0.0;
    } else {
        g = 1.0;
    }

    return vec3(g);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec4 color = texture2D(inputBuffer, uv);

  float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
  color.rgb = sobelGradient(uv);

  outputColor = color;
}