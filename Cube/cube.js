const canvas = document.getElementById(`mycanvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0.6, 0.9, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([0.5,0.5,-0.5,
                                   0.5,-0.5,-0.5,
                                   -0.5,-0.5,-0.5,
                                   0.5,0.5,-0.5,
                                   -0.5,-0.5,-0.5,
                                   -0.5,0.5,-0.5,
                                   
                                   0.5,0.5,-0.5,
                                   0.5,-0.5,-0.5,
                                   0.5,-0.5,0.5,
                                   0.5,0.5,-0.5,
                                   0.5,-0.5,0.5,
                                   0.5,0.5,0.5,

                                   -0.5,0.5,-0.5,
                                   -0.5,-0.5,-0.5,
                                   -0.5,-0.5,0.5,
                                   -0.5,0.5,-0.5,
                                   -0.5,-0.5,0.5,
                                   -0.5,0.5,0.5,

                                   0.5,0.5,-0.5,
                                   0.5,0.5,0.5,
                                   -0.5,0.5,0.5,
                                   0.5,0.5,-0.5,
                                   -0.5,0.5,-0.5,
                                   -0.5,0.5,0.5,

                                   -0.5,0.5,0.5,
                                   -0.5,-0.5,0.5,
                                   0.5,0.5,0.5,
                                   -0.5,-0.5,0.5,
                                   0.5,0.5,0.5,
                                   0.5,-0.5,0.5,

                                   0.5,-0.5,-0.5,
                                   0.5,-0.5,0.5,
                                   -0.5,-0.5,0.5,
                                   0.5,-0.5,-0.5,
                                   -0.5,-0.5,-0.5,
                                   -0.5,-0.5,0.5

                                ]);

const colorVertices = new Float32Array([]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
                      attribute vec3 pos;
                      uniform float shift;
                      uniform float shift1;

                      
              void main(){

                //ROTATE BY X
                float z = pos.z*cos(shift) - pos.y*sin(shift);
                float y = pos.y*cos(shift) - pos.z*sin(shift);
                float x = pos.x;

                //ROTATE BY Y
                float m = x;
                x = m*cos(shift1) - z*sin(shift1);
                z = z*cos(shift1) + m*sin(shift1);

                m = x;
                x = m*cos(shift1) - y*sin(shift1);
                y = y*cos(shift1) + m*sin(shift1);

                gl_Position = vec4(x, y, z, 1.0);

              }

`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;

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

const shiftposition = gl.getUniformLocation(program, `shift`);
const shift1position = gl.getUniformLocation(program, `shift1`);

let angle = 0;
let angle1 = 0;

let green = 1;
let blue = 1;
let red = 1;

draw();

function draw(){
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUUFER_BIT);

    angle += 0.01;
    angle1 += 0.01;

    gl.uniform1f(shiftposition, angle);
    gl.uniform1f(shift1position, angle1);

    gl.drawArrays(gl.TRIANGLES, 0, 90);
    
    window.requestAnimationFrame(draw);

}

document.getElementById(`button1`)