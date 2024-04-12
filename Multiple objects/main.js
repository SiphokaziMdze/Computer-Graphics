const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if(!gl){
    throw new Error("Webgl is not supported by browser!!!!!!");
}

gl.clearColor(0.5, 0.3, 0.9, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([0,0.5, 0.2,0, -0.2,0, 
    -0.4,0.9, -0.2,0.4, -0.6,0.4, 
    0.2,0.4, 0.4,0.9, 0.6,0.4,

]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
                  attribute vec2 pos;
                  void main() {
                    gl_Position = vec4(pos, 0, 1);
                  }
`;

const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, vsSource);
gl.compileShader(vShader);

const fsSource = `
                  void main() {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                  }
`;

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, fsSource);
gl.compileShader(fShader);

const program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);
gl.useProgram(program);

const position = gl.getAttribLocation(program, `pos`);
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 9);