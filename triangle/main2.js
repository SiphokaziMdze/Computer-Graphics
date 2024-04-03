window.onload = function() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
        return;
    }

    // Define vertices and colors
    var verticesColors = [
        // Vertices      // Colors
        0.0,  0.5, 0.0,  1.0, 0.0, 0.0,  // Top center, red
        -0.5, -0.5, 0.0,  0.0, 1.0, 0.0, // Bottom left, green
        0.5, -0.5, 0.0,   0.0, 0.0, 1.0, // Bottom right, blue
    ];

    // Create buffer
    var vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesColors), gl.STATIC_DRAW);

    // Create shaders
    var vertCode = `
        attribute vec3 coordinates;
        attribute vec3 color;
        varying vec3 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            vColor = color;
        }`;

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode = `
        precision mediump float;
        varying vec3 vColor;
        void main(void) {
            gl_FragColor = vec4(vColor, 1.0);
        }`;

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Bind vertex buffer
    var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(coord);

    // Bind color buffer
    var color = gl.getAttribLocation(shaderProgram, 'color');
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(color);

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw the triangle
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}