const canvas = document.getElementById(`board`);
const webgl = canvas.getContext(`webgl`);

webgl.clearColor(0.9, 0.9, 0.9, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const linesVertices = new Float32Array([

]);

const pointsVertices = new Float32Array([

]);

const trianglesVertices = new Float32Array([
    -0.6, 0.4, 0,
    -0.4, -0.4, 0,
    -0.2, 0.4, 0,

    -0.2, 0.4, 0,
    -0.4, -0.4, 0,
    0.2, -0.4, 0,

]);

const colorVertices = new Float32Array([
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    0, 0, 0,
    0, 0, 0,
    0, 0, 0,

]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
//webgl.bufferData(webgl.ARRAY_BUFFER, linesVertices, webgl.STATIC_DRAW);
//webgl.bufferData(webgl.ARRAY_BUFFER, pointsVertices, webgl.STATIC_DRAW);
webgl.bufferData(webgl.ARRAY_BUFFER, trianglesVertices, webgl.STATIC_DRAW);
webgl.bufferData(webgl.ARRAY_BUFFER, colorVertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  attribute vec3 color;
                  varying vec3 vColor;

                  void main(){
                    
                    gl_Position = vec4(pos, 1);
                    gl_PointSize = 10.0;
                    vColor = color;
                  }
`;

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vsSource);
webgl.compileShader(vShader);

const fsSource = `
                   precision mediump float;
                   varying vec3 vColor;

                   void main(){
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

const position = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(position);
webgl.vertexAttribPointer(position, 3, webgl.FLOAT, false, 0, 0);

const colorPosition = webgl.getAttribLocation(program, `color`);
webgl.enableVertexAttribArray(colorPosition);
webgl.vertexAttribPointer(colorPosition, 3, webgl.FLOAT, false, 0, 0);

animate();

function animate() {
    webgl.clearColor(0.9, 0.9, 0.9, 1);
    webgl.enable(webgl.DEPTH_TEST);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    webgl.drawArrays(webgl.TRIANGLES, 0, 15);
    webgl.drawArrays(webgl.LINES, 0, 15);
    webgl.drawArrays(webgl.POINTS, 0, 15);


}