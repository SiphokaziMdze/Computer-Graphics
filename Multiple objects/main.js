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
    -0.4,-0.4, -0.6,-0.9, -0.2,-0.9,
    0.4,-0.4, 0.2,-0.9, 0.6,-0.9,
    //-0.9,-0.3, -0.7,0.2, -0.5,-0.3,
   // 0.9,-0.3, 0.7,0.2, 0.5,-0.3,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  uniform float shift, shift1;
                  void main() {
                    float z = pos.z*cos(shift) - pos.y*sin(shift);
                    float y = pos.y*cos(shift) + pos.z*sin(shift);
                    float x = pos.x;

                    float m = x;
                    x = m*cos(shift1) - z*sin(shift1);
                    z = z*cos(shift1) + m*sin(shift1);

                    m = x;
                    x = m*cos(shift1) - y*sin(shift1);
                    y = y*cos(shift1) - m*sin(shift1);

                    gl_Position = vec4(x, y, z, 1.0);

                    gl_Position = vec4(pos, 1);
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
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

const shiftPosition = gl.getUniformLocation(program, `shift`);
const shift1Position = gl.getUniformLocation(program, `shift1`);

let angle = 0;
let angle1 = 0;

draw();

function draw() {
    
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle =+ 0.01;
    angle1 =+ 0.01;

    gl.uniform1f(shiftPosition, angle);
    gl.uniform1f(shift1Position, angle1);

    gl.drawArrays(gl.TRIANGLES, 0, 24);

    window.requestAnimationFrame(draw);
}
