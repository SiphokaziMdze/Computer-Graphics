const canvas = document.getElementById(`board`);
const webgl = canvas.getContext(`webgl`);

webgl.clearColor(0.5, 0.2, 0.7, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0.5, -0.5, 0
]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;
                  attribute vec3 color;
                  varying vec3 vColor;

                  void main(){
                    gl_Position = vec4(pos, 1);
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

animate();

function animate(){

    webgl.drawArrays(webgl.TRIANGLES, 0, 9);
    webgl.drawArrays(webgl.POINTS, 0, 6);
    webgl.drawArrays(webgl.LINES, 0, 9);

    window.requestAnimationFrame(animate);
}