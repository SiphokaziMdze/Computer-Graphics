const canvas = document.getElementById(`mycanvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.enable(gl.DEPTH_TEST);

const vertices = new Float32Array([-0.5, 0.5, 0.0,
                                   0.0, 0.5, 0.0,
                                   -0.25, 0.25, 0.0]
);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

vsSource = `
            attribute vec3 pos;
            void main() {
                gl_Position = vec4(pos, 1);
                gl_PointSize = 10.0;
            }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
                  void main() {
                    gl_FragColor = vec4(1.0, 0, 0, 1);
                  }
`;

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
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.POINTS, 0, 9);