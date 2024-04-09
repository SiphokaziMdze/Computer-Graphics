const canvas = document.getElementById(`mycanvas`);
const gl = canvas.getContext(`webgl`);

const vsSource = `
                  void main() {
                    gl_Position = vec4(1.0, 1.0, 1.0, 1);
                    gl_PointSize = 500.0;
                  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
                   void main() {
                    gl_FragColor = vec4(1, 0, 0, 1);
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

gl.drawArrays(gl.POINTS, 0, 1);