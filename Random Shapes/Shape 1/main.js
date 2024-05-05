const canvas = document.getElementById(`mycanvas`);
const webgl = canvas.getContext(`webgl`);

webgl.clearColor(0.8, 0.1, 0.5, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([

]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vsSource = `
                  attribute vec3 pos;

                  void main(){
                    gl_Position = vec4(pos, 1);
                    gl_PointSize = 10.0;
                  }
`;

const vShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vShader, vsSource);
webgl.compileShader(vShader);

const fsSource = `
                   void main(){
                    gl_FragColor = vec4(1, 1, 1, 1);
                   
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

webgl.drawArrays(webgl.POINTS, 0, 6);