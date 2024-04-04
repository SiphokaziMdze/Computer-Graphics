const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0.5, 0.6, 0.5, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `attribute vec2 pos;
                  void main() { gl_Position = vec4(pos, 0, 1); }`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `void main() {gl_FragColor = vec4(0.5, 1.0, 0.5, 1); }`;

const fragmentShader = 