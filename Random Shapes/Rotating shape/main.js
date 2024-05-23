const canvas = document.getElementById(`board`);
const webgl = canvas.getContext(`webgl`);

webgl.clearColor(0.5, 0.2, 0.7, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vsSource

