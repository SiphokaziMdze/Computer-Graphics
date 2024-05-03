const canvas = document.getElementById(`mycanvas`);
const gl = canvas.getContext(`webgl`);

gl.clearColor(0.6, 0.9, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0.5,0.5,
                                  -0.5,0.5,
                                   -0.5,-0.5,
                                   -0.5,-0.5,
                                   -0.5, 0.5,
                                   0.5,-0.5,
                                   -0.5,-0.5,
                                   -0.5,-0.5,
                                   0.5,-0.5,
                                   
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

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vsSource = `
    attribute vec3 pos;
    uniform float shiftX;
    uniform float shiftY;
    uniform float shiftZ;

    vec3 rotateX(vec3 point, float angle) {
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        return vec3(
            point.x,
            point.y * cosAngle - point.z * sinAngle,
            point.y * sinAngle + point.z * cosAngle
        );
    }

    vec3 rotateY(vec3 point, float angle) {
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        return vec3(
            point.x * cosAngle + point.z * sinAngle,
            point.y,
            -point.x * sinAngle + point.z * cosAngle
        );
    }

    vec3 rotateZ(vec3 point, float angle) {
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        return vec3(
            point.x * cosAngle - point.y * sinAngle,
            point.x * sinAngle + point.y * cosAngle,
            point.z
        );
    }

    void main() {
        vec3 rotatedPos = rotateX(pos, shiftX);
        rotatedPos = rotateY(rotatedPos, shiftY);
        rotatedPos = rotateZ(rotatedPos, shiftZ);
        gl_Position = vec4(rotatedPos, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
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

const shiftX = gl.getUniformLocation(program, `shiftX`);
const shiftY = gl.getUniformLocation(program, `shiftY`);
const shiftZ = gl.getUniformLocation(program, `shiftZ`);

let angleX = 0.01;
let angleY = 0.01;
let angleZ = 0.01;

draw();

function draw() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    angleX += 0.01;
    angleY += 0.01;
    angleZ += 0.01;
    
    gl.uniform1f(shiftX, angleX);
    gl.uniform1f(shiftY, angleY);
    gl.uniform1f(shiftZ, angleZ);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
    
    window.requestAnimationFrame(draw);
}

document.getElementById("stop").onclick = function stop() {
    angleX = 0;
    angleY = 0;
    angleZ = 0;
};

document.getElementById("start").onclick = function start() {
    angleX = 0.01;
    angleY = 0.01;
    angleZ = 0.01;
};

document.getElementById("speed_up").onclick = function x_axis(){
    angleX += 0.1;
}
