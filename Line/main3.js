const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0.5, 0.6, 0.5, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([-0.9,0.1, 0.9,0.1, 0.9,-0.9, -0.9,-0.9, -0.9,0.1, 0,1, 0.9,0.1]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `attribute vec2 pos;
                  void main() { gl_Position = vec4(pos, 0, 1); }`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `void main() {gl_FragColor = vec4(1.0, 1.0, 1.0, 1); }`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const position = gl.getAttribLocation(program, `pos`);
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.LINE_LOOP, 0, 9);