const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if(!gl){
    throw new Error("WebGL is not supported by this browser");
}

gl.clearColor(0.9, 0.1, 0.5, 0.9);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0.5,0.5,-0.5,
    0.5,-0.5,-0.5,
]);

const colorVertices = new Float32Array([
    1,1,1,
    1,1,1,
]);

const buffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


//gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//gl.bufferData(gl.ARRAY_BUFFER, colorVertices, gl.STATIC_DRAW);

vsSource = `
            attribute vec3 pos;
            attribute vec3 colors;
            varying vec3 vColors;
            uniform float shift, myshift;
            
            void main() {
                //ROTATE BY X

                float z = pos.z*cos(shift) - pos.y*sin(shift);
                float y = pos.y*cos(shift) + pos.z*sin(shift);
                float x = pos.x;

                //ROTATE BY Y

                float m = x;
                x = m*cos(myshift) - z*sin(myshift);
                z = z*cos(myshift) + m*sin(myshift);

                m = x;
                x = m*cos(myshift) - y*sin(myshift);
                y = y*cos(myshift) + m*sin(myshift);

                gl_Position = vec4(x, y, z, 1.0);
                vColors = colors;
            }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
                  precision mediump float;
                  varying vec3 vColors;
                  void main() {
                    gl_FragColor = vec4(vColors, 1.0);
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

const shiftPosition = gl.getUniformLocation(program, `shift`);
const myshiftPosition = gl.getUniformLocation(program, `myshift`);

let angle = 0;
let angle1 = 0;

function coloring() {
    const colorLocation = gl.getAttribLocation(program, `colors`);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
}

draw();
function draw() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 0.02;
    angle1 += 0.02;

    gl.uniform1f(shiftPosition, angle);
    gl.uniform1f(myshiftPosition, angle1);

    coloring();

    gl.drawArrays(gl.TRIANGLES, 0, 90);
     window.requestAnimationFrame(draw);
}



