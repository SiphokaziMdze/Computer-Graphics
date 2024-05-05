const canvas = document.getElementById(`mycanvas`);
const webgl = canvas.getContext(`webgl`);

if(!webgl){
    throw new Error("webGL is not supported");
}

webgl.clearColor(0.9, 1, 0.3, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0, 0.5, 0,
    -0.5 ,-0.5 ,0,
    0.5, -0.5 ,0,
]);

const colorVertices = new Float32Array([
    1, 0.5, 0.9,
    0.8, 1, 1.8,
    1, 0, 0,
])

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

//webgl.bufferData(webgl.ARRAY_BUFFER, colorVertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  attribute vec3 color;
                  varying vec3 vColor;
                  uniform float shift;
                  void main() {

                    float x = pos.x*cos(shift) - pos.y*sin(shift);
                    float y = pos.y*cos(shift) + pos.x*sin(shift);
                    float z = pos.z;

                    

                    gl_Position = vec4(x, y, z, 1);
                    vColor = color;
                  }
`;

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vsSource);
webgl.compileShader(vShader);

const fsSource = `
                    precision mediump float;
                    varying vec3 vColor;
                  void main() {
                   
                    gl_FragColor = vec4(vColor, 1);
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

//const shiftPosition = webgl.getUniformLocation(program, `shift`);

const position = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(position);
webgl.vertexAttribPointer(position, 3, webgl.FLOAT, false, 0, 0);

const colorPosition = webgl.getAttribLocation(program, `color`);
webgl.enableVertexAttribArray(colorPosition);
webgl.vertexAttribPointer(colorPosition, 3, webgl.FLOAT, false, 0, 0);

const shiftPosition = webgl.getUniformLocation(program, `shift`);

//webgl.enable(webgl.DEPTH_TEST);
//webgl.clear(webgl.DEPTH_BUFFER_BIT);



let ang = 0;

draw();

function draw() {
    webgl.enable(webgl.DEPTH_TEST);
    webgl.clear(  webgl.DEPTH_BUFFER_BIT);

    ang += 0.04;
    //ang += 0.01;

    webgl.uniform1f(shiftPosition, ang);

    webgl.drawArrays(webgl.TRIANGLES, 0, 3);

    window.requestAnimationFrame(draw);

}