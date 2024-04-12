const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if(!gl){
    throw new Error("Webgl is not supported by browser!!!!!!");
}

gl.clearColor(0.5, 0.3, 0.9, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  void main() {
                    gl_Position = vec4(pos, 0, 1);
                  }
`;

const vShader = gl.createShader();