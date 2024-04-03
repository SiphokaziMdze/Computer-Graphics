
const canvas  = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
    
    if(!gl){
    throw new Error("webGL not supported");
    }
    gl.clearColor(1,0,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
   
    const vertices = new Float32Array(
    [
    
        0.5,0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,-0.5,
    
         0.5,0.5,-0.5,
        -0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,
  
        -0.5,0.5,-0.5,
          -0.5,-0.5,-0.5,
           -0.5,-0.5,0.5,
    
           -0.5,0.5,-0.5,
           -0.5,-0.5,0.5,
           -0.5,0.5,0.5,
    
         -0.5,0.5,0.5,
         -0.5,-0.5,0.5,
         0.5,0.5,0.5,
    
         -0.5,-0.5,0.5,
         0.5,0.5,0.5,
         0.5,-0.5,0.5,

        
        0.5,0.5,-0.5,
        0.5,-0.5,-0.5,
         0.5,-0.5,0.5,
  
         0.5,0.5,-0.5,
         0.5,-0.5,0.5,
         0.5,0.5,0.5,

         0.5,0.5,-0.5,
         0.5,0.5,0.5,
         -0.5,0.5,0.5,

         0.5,0.5,-0.5,
         -0.5,0.5,-0.5,
         -0.5,0.5,0.5,


          0.5,-0.5,-0.5,
          0.5,-0.5,0.5,
          -0.5,-0.5,0.5,
 
          0.5,-0.5,-0.5,
          -0.5,-0.5,-0.5,
          -0.5,-0.5,0.5,
 
    ]); //My coordinates....
    
    const colors = new Float32Array
    ([
    
         1,0,0,
         1,0,0, 
         1,0,0,
    
         1,0,0,
         1,0,0,
         1,0,0,
    
    0,1,0,
    0,1,0,
    0,1,0,

    0,1,0,
    0,1,0,
    0,1,0,

   
    0,0,1,
    0,0,1,
    0,0,1,

    0,0,1,
    0,0,1,
    0,0,1,
   
    1,1,0,
    1,1,0,
    1,1,0,

    1,1,0,
    1,1,0,
    1,1,0,
   
   1,1,1,
    1,1,1,
    1,1,1,

    1,1,1,
    1,1,1,
    1,1,1,
   
    0,1,1,
    0,1,1,
    0,1,1,

    0,1,1,
    0,1,1,
    0,1,1,
  

    ]);
    
    const buff = gl.createBuffer();
    const colorbuff = gl.createBuffer(); 
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buff);
    gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW);
    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
    attribute vec3 pos;//pos.x and pos.y pos.z
    attribute vec3 color;
    varying vec3 fragcolor;
    
    uniform float shift;
    //float x,y;
    float c = cos(shift);
    float s = sin(shift);
    void main(){
    
        fragcolor = color;
        //..............z axis rotation..................
        //gl_Position.x = pos.x*c-pos.y*s;
        //gl_Position.y = pos.y*c+pos.x*s;
    
        //gl_Position.z = 0.0;
        //gl_Position.w = 1.0;
        //................. x axis rotation...............
    
        gl_Position.y = pos.y*c - pos.z*s;
        gl_Position.z = pos.z*c + pos.y*s;
    
        gl_Position.x = pos.x;
        gl_Position.w = 1.0; 
    }
    `  );
    gl.compileShader(vertexShader);
    
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
    
    precision mediump float;
    varying vec3 fragcolor;
    
    void main(){
    gl_FragColor = vec4(fragcolor,1); //Color of the inside shape...
    }
     `);
    gl.compileShader(fragmentShader);
    
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    
    gl.enable(gl.DEPTH_TEST);

    const positionLocation = gl.getAttribLocation(program, 'pos');
    const uniformLocation = gl.getUniformLocation(program,`shift`);
    
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0,);
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorbuff);
    gl.bufferData(gl.ARRAY_BUFFER, colors,gl.STATIC_DRAW);
    
    const colorLocation = gl.getAttribLocation(program, 'color');
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0,);
    
    var myshift = 0;
    var shift = 0.01;
    
    draw();
    
    
    function draw()
    {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    myshift += shift;
    
    gl.uniform1f(uniformLocation,myshift);
    gl.drawArrays(gl.TRIANGLES, 0, 90);
    window.requestAnimationFrame(draw);
    }
    
    function stop()
{

    shift = shift*0 ;

}

 function start()
 {
     shift = 0.01;
 }

 document.getElementById("button1").onclick =  function speedup()
 {

    shift = shift*2;

 }

 function speedlow()
 {

    shift = shift/2;

 }