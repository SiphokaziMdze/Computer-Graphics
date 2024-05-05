const canvas = document.getElementById(`mycanvas`);
const webgl = canvas.getContext(`webgl`);

if(!webgl){
    throw new Error("webGL is not supported");
}

webgl.clearColor(0.9, 1, 0.3, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const linesVertices = new Float32Array([
    0,0, -0.45,0.25,
    0,0, -0.2,0.4,
    0,0, 0.1,0.55,
    0,0, 0.4,0.5,
    0,0, 0.5,0.15,

    -0.45,0.25, -0.2,0.4,
    -0.2,0.4, 0.1,0.55,
    0.1,0.55, 0.4,0.5,
    0.4,0.5, 0.5,0.15
]);

const pointsVertices = new Float32Array([
    -0.45,0.25,
    -0.2,0.4,
    0.1,0.55,
    0.4,0.5,
    0.5,0.15
]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, linesVertices, webgl.STATIC_DRAW);

//webgl.bufferData(webgl.ARRAY_BUFFER, pointsVertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  uniform float shift, myshift;
                  void main() {
                    //rotate in x-axis
                    float z = pos.z*cos(shift) - pos.y*sin(shift);
                    float y = pos.y*cos(shift) + pos.z*sin(shift);
                    float x = pos.x;

                    gl_Position = vec4(x, y, z, 1);
                    gl_PointSize = 10.0;
                  }
`;

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vsSource);
webgl.compileShader(vShader);

const fsSource = `
                  void main() {
                    gl_FragColor = vec4(0, 1, 1, 1);
                  }
`;

const fShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fShader, fsSource);
webgl.compileShader(fShader);

const program = webgl.createProgram();
webgl.attachShader(program, vShader);
webgl.attachShader(program, fShader);
webgl.linkProgram(program);
webgl.useProgram(program);

const shiftPosition = webgl.getUniformLocation(program, `shift`);

const position = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(position);
webgl.vertexAttribPointer(position, 2, webgl.FLOAT, false, 0, 0);



let ang = 0;

draw();

function draw() {
    webgl.enable(webgl.DEPTH_TEST);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    ang += 0.01;
    //ang += 0.01;

    webgl.uniform1f(shiftPosition, ang);

    webgl.drawArrays(webgl.LINES, 0, 18);
    webgl.drawArrays(webgl.POINTS, 0, 12);

    window.requestAnimationFrame(draw);

}