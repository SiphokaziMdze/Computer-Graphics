const board = document.getElementById(`board`);
const webgl = board.getContext(`webgl`);

const vertices = new Float32Array([
    //=====back====
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,

    0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,

    //====front======
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,

    -0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, -0.5,

    //====left====
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,

    -0.5, 0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,

    //=====right=====
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5, 

    0.5, 0.5, -0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,

    //===top====
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    //=====bottom=====
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,

    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,

]);

function repeat(n, pattern){
    return [...Array(n).reduce(sum => sum.concat(pattern), [])];
}

const uvData = repeat(6, [
    0, 0,
    0, 1,
    1, 0,

    1, 0, 
    0, 1,
    1, 1,
]);



const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

//const uvBuffer = webgl.createBuffer();
//webgl.bindBuffer(webgl.ARRAY_BUFFER, uvBuffer);
//webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(uvData), webgl.STATIC_DRAW);

/*function randomColor(){
    return [Math.random(),Math.random(), Math.random()];
}

let colorData = [];
for(let face = 0; face < 6; face++){
    let faceColor = randomColor();
    for(let vertex = 0; vertex < 6; vertex++){
        colorData.push(...faceColor);
    }
}*/

const vsSource = `
                   precision mediump float;
                   attribute vec3 pos;
                  // attribute vec3 color;
                  // varying vec3 vColor;
                   uniform mat4 matrix;

                   attribute vec2 uv;
                   varying vec2 uUV;

                   void main() {

                    uUV = uv;
                   // vColor = color;
                    gl_Position = matrix * vec4(pos, 1);
                   }
`
const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vsSource);
webgl.compileShader(vertexShader);

const fsSource = `
                  // precision mediump float;
                  // varying vec3 vColor;

                   varying vec2 uUV;
                   uniform sampler2D textureID;

                   void main(){
                    gl_FragColor = texture2D(textureID, uUV);
                   }
`
const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fsSource);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
webgl.useProgram(program);

const position = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(position);
webgl.vertexAttribPointer(position, 3, webgl.FLOAT, false, 0, 0);

//const colorPosition = webgl.getAttribLocation(program, `color`);
//webgl.enableVertexAttribArray(colorPosition);
//webgl.vertexAttribPointer(colorPosition, 3, webgl.FLOAT, false, 0, 0);

const brick = loadTexture(`texture.png`);
webgl.activeTexture(webgl.TEXTURE0);
webgl.bindTexture(webgl.TEXTURE_2D, brick);

const uvLocation = webgl.getAttribLocation(program, `uv`);
webgl.enableVertexAttribArray(uvLocation);
webgl.vertexAttribPointer(uvLocation, 2, webgl.FLOAT, false, 0, 0);


const uniformMatrix = {
    matrix: webgl.getUniformLocation(program, `matrix`),
    textureID: webgl.getUniformLocation(program, `textureID`)
}

webgl.uniform1i(uniformMatrix.textureID, 0);
const matrix = glMatrix.mat4.create();
//glMatrix.mat4.translate(matrix, matrix, [0.2, 0.5, 0]);
//glMatrix.mat4.scale(matrix, matrix, [0.25, 0.25, 0.25]);

animate();

function loadTexture(url){
    const texture = webgl.createTexture();
    const image = new Image();

    image.onload = e => {
        webgl.bindTexture(webgl.TEXTURE_2D, texture);
        webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA,webgl.RGBA, webgl.UNSIGNED_BYTE, image);

        webgl.generateMipmap(webgl.TEXTURE_2D); };

        image.src = url;
        return texture;
    
}

console.log(matrix);



function animate() {


    webgl.clearColor(0.5, 0.4, 0.3, 1);
    webgl.enable(webgl.DEPTH_TEST);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    glMatrix.mat4.rotateX(matrix, matrix, Math.PI/2 /70);
    glMatrix.mat4.rotateZ(matrix, matrix, Math.PI/2 /70);
    //glMatrix.mat4.rotateY(matrix, matrix, Math.PI/2 /70);
    webgl.uniformMatrix4fv(uniformMatrix.matrix, false, matrix);
    webgl.drawArrays(webgl.TRIANGLES, 0, 36);

    window.requestAnimationFrame(animate);
}

