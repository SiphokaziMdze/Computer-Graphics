window.onload = function () {
    const canvas = document.querySelector(`canvas`);
    const gl = canvas.getContext(`webgl`);

    if(!gl){
       alert("WeGL is not supported!!!!!!!");
    }

    const verticesColors = new Float32Array([
        0.0, 0.5, 0.0,     1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0,   0.0, 1.0, 0.0,
        0.5, -0.5, 0.0,    0.0, 0.0, 1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    const vsSource = `
                      attribute vec3 coordinates;
                      attribute vec3 color;
                      varying vec3 vColor;
                      void main(){
                        gl_Position = vec4(coordinates, 1.0);
                        vColor = color;
                      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fsSource = `
                          precision mediump float;
                          varying vec3 vColor;
                          void main(){
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

    const location = gl.getAttribLocation(program, `coordinates`);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 6 * Float32Array, 0);
    gl.enableVertexAttribArray(location);

    const color = gl.getAttribLocation(program, `color`);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 6 * Float32Array, 3 * Float32Array);
    gl.enableVertexAttribArray(color);

    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

}