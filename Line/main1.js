const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(1.0, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([-0.5,1, 0.8,-0.3, -0.8,-0.3, 0.5,1, 0,-1, -0.5,1]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `attribute vec2 pos;
                  void main() { gl_Position = vec4(pos, 0, 1); }`

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `void main() { gl_FragColor = vec4 (1.0, 1.0, 1.0, 1); }`

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

//gl.drawArrays(gl.LINE_STRIP, 0, 12);
//gl.drawArrays(gl.LINES, 0, 12);
gl.drawArrays(gl.LINE_LOOP, 0, 5);