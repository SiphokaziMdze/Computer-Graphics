const canvas = document.getElementById(`board`);
const webgl = canvas.getContext(`webgl`);

webgl.clearColor(0.5, 0.2, 0.7, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const linesVertices = new Float32Array([
    0, 0, 0, -0.85, 0.35, 0,
    0, 0, 0, -0.45, 0.7, 0,
    0, 0, 0, 0.1, 0.9, 0,
    0, 0, 0,  0.6, 0.7, 0,
    0, 0, 0,  0.85, 0.35, 0,


    -0.85, 0.35, 0,  -0.45, 0.7, 0,
    -0.45, 0.7, 0,  0.1, 0.9, 0, 
    0.1, 0.9, 0, 0.6, 0.7, 0,
    0.6, 0.7, 0,  0.85, 0.35, 0,

]);

const triangleVertices = new Float32Array([
    0, 0, 0, 
    -0.85, 0.35, 0,
    -0.45, 0.7, 0,

    0, 0, 0,
    -0.45, 0.7, 0,
    0.1, 0.9, 0,

    0, 0, 0,
    0.1, 0.9, 0,
    0.6, 0.7, 0,

    0, 0, 0,
    0.6, 0.7, 0,
    0.85, 0.35, 0,
    
]);

const pointsVertices = new Float32Array([
    0, 0, 0,
    -0.85, 0.35, 0,
    -0.45, 0.7, 0,
    0.1, 0.9, 0,
    0.6, 0.7, 0,
    0.85, 0.35, 0,

]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, pointsVertices, webgl.STATIC_DRAW);
webgl.bufferData(webgl.ARRAY_BUFFER, linesVertices, webgl.STATIC_DRAW);
webgl.bufferData(webgl.ARRAY_BUFFER, triangleVertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  attribute vec3 color;
                  varying vec3 vColor;

                  uniform mat4 matrix;

                  void main(){
                    gl_Position = matrix * vec4(pos, 1);
                    vColor = color;
                    gl_PointSize = 10.0;
                  }
`

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vsSource);
webgl.compileShader(vShader);

const fsSource = `
                   precision mediump float;
                   varying vec3 vColor;

                   void main(){
                    gl_FragColor = vec4(1, 1, 0, 1);
                   }
`

const fShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fShader, fsSource);
webgl.compileShader(fShader);

const program = webgl.createProgram();
webgl.attachShader(program, vShader);
webgl.attachShader(program, fShader);
webgl.linkProgram(program);
webgl.useProgram(program);

const position = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(position);
webgl.vertexAttribPointer(position, 3, webgl.FLOAT, false, 0, 0);

const colorPosition = webgl.getAttribLocation(program, `color`);
webgl.enableVertexAttribArray(colorPosition);
webgl.vertexAttribPointer(colorPosition, 3, webgl.FLOAT, false, 0, 0);



const uniformLocations = {
    matrix: webgl.getUniformLocation(program, `matrix`)
}

const matrix = glMatrix.mat4.create();
const projMatrix= glMatrix.mat4.create();


glMatrix.mat4.perspective(projMatrix, 75*Math.PI/180, canvas.width/canvas.height ,1e-4, 1e4);

animate();
function animate(){

   
    glMatrix.mat4.rotateZ(matrix, matrix, Math.PI/2 /80);
    glMatrix.mat4.rotateY(matrix, matrix, Math.PI/2 /80);
    glMatrix.mat4.rotateX(matrix, matrix, Math.PI/2 /80);

    webgl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);

    webgl.drawArrays(webgl.TRIANGLES, 0, 15);
    webgl.drawArrays(webgl.POINTS, 0, 12);
    webgl.drawArrays(webgl.LINES, 0, 30);

    window.requestAnimationFrame(animate);
}