const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if(!gl){
    throw new Error("WebGL is not supported!");
}

gl.clearColor(1.0, 0.8, 0.7, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0.5,0.5,-0.5,
    0.5,-0.5,-0.5,

    0.2,0.2,-0.2,
    0.2,-0.2,-0.2,
]);

const colorVertices = new Float32Array([
    1,0,1,
    1,0,1,
    1,0,1,
]);

const buffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
                 attribute vec3 pos;
                 attribute vec3 color;
                 varying vec3 vColor;
                 uniform float shift, myshift, shift1;
 
                 void main() {

                    float z = pos.z*cos(shift) - pos.y*sin(shift);
                    float y = pos.y*cos(shift) + pos.z*sin(shift);
                    float x = pos.x;

                    float m = x;
                    x = m*cos(myshift) - z*sin(myshift);
                    z = z*cos(myshift) + m*sin(myshift);

                    m = x;
                    x = m*cos(myshift) - y*sin(myshift);
                    y = y*cos(myshift) + m*sin(myshift);

                    float x = pos.x*cos(shift1) - pos.y*sin(shift1);
                    float y = pos.y*cos(shift1) + pos.x*sin(shift1);
                    float z = pos.z;

                    gl_Position = vec4(x, y, z, 1.0);
                    vColor = color;
                 }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
                 precision mediump float;
                 varying vec3 vColor; 
                 
                  void main() {
                    gl_FragColor = vec4(vColor, 1.0);
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

function colors() {

    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

}

const shiftPosition = gl.getUniformLocation(program, `shift`);
const myshiftPosition = gl.getUniformLocation(program, `myshift`);
const shift1P = gl.getUniformLocation(program, `shift`);

let angle = 0.02;
let angle1 = 0.02;
let angle2 = 0.02;

draw();

function draw() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 0.02;
    angle1 += 0.02;
    angle2 += 0.02;

    gl.uniform1f(shiftPosition, angle);
    gl.uniform1f(myshiftPosition, angle1);
    gl.uniform1f(shift1P, angle2);

    colors();

    gl.drawArrays(gl.TRIANGLES, 0, 90);

    window.requestAnimationFrame(draw);
}

