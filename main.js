function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  let shapeT = [];
  let shapeO = [];
  let faces = [];
  var vertices = [
    // Face A
    -1,
    -1,
    -1, // Index:  0
    1,
    -1,
    -1, // Index:  1
    1,
    1,
    -1, // Index:  2
    -1,
    1,
    -1, // Index:  3
    // Face B
    -1,
    -1,
    1, // Index:  4
    1,
    -1,
    1, // Index:  5
    1,
    1,
    1, // Index:  6
    -1,
    1,
    1, // Index:  7
    // Face C
    -1,
    -1,
    -1, // Index:  8
    -1,
    1,
    -1, // Index:  9
    -1,
    1,
    1, // Index: 10
    -1,
    -1,
    1, // Index: 11
    // Face D
    1,
    -1,
    -1, // Index: 12
    1,
    1,
    -1, // Index: 13
    1,
    1,
    1, // Index: 14
    1,
    -1,
    1, // Index: 15
    // Face E
    -1,
    -1,
    -1, // Index: 16
    -1,
    -1,
    1, // Index: 17
    1,
    -1,
    1, // Index: 18
    1,
    -1,
    -1, // Index: 19
    // Face F
    -1,
    1,
    -1, // Index: 20
    -1,
    1,
    1, // Index: 21
    1,
    1,
    1, // Index: 22
    1,
    1,
    -1, // Index: 23
  ];
  console.log("vertices: " + vertices.length);
  var indices = [
    0,
    1,
    2,
    0,
    2,
    3, // Face A
    4,
    5,
    6,
    4,
    6,
    7, // Face B
    8,
    9,
    10,
    8,
    10,
    11, // Face C
    12,
    13,
    14,
    12,
    14,
    15, // Face D
    16,
    17,
    18,
    16,
    18,
    19, // Face E
    20,
    21,
    22,
    20,
    22,
    23, // Face F
  ];
  function getlastpixel(array) {
    return array.slice(-60);
  }
  // for loop the vertex thingy
  // faces = faces.concat(indices);
  // shapeT = shapeT.concat(vertices);
  // faces = faces.concat(indices);
  // jika index ujung +2, yang tengah kali 2
  let scalevalue = 0.4;
  // awal vertices di 0,0
  vertices = scale(vertices, scalevalue);
  vertices = shiftxy(vertices, scalevalue, 10, -10);
  let vertices2 = shiftx(vertices, 4 * scalevalue);
  let vertices3 = shiftxy(vertices, scalevalue, -2, 12);
  let vertices4 = shifty(vertices, scalevalue, -2, 12);
  for (let index = 0; index < 10; index = index + 2) {
    // console.table(shapeT);
    shapeT = shapeT.concat(shiftx(vertices, index * scalevalue));

    faces = faces.concat(shiftx(indices, index));
  }

  for (let index = 0; index < 12; index = index + 2) {
    // console.table(shapeT);
    shapeT = shapeT.concat(shifty(vertices2, -index * scalevalue));
  }

  for (let index = 0; index < 8; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shifty(vertices3, -index * scalevalue));
  }
  let lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, 1));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftx(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, 1));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 8; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shifty(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, -1));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftx(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shapeO);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shapeO = shapeO.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, -1));
  }
  console.log(shapeT.length / 24);

  console.log(shapeT.length);
  console.log(shapeO.length);
  // var Tbuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, Tbuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shapeT), gl.STATIC_DRAW);
  // var Obuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, Obuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shapeO), gl.STATIC_DRAW);

  // var indexBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // gl.bufferData(
  //   gl.ELEMENT_ARRAY_BUFFER,
  //   new Uint16Array(faces),
  //   gl.STATIC_DRAW
  // );

  // Vertex shader
  var vertexShaderCode = `
attribute vec3 aPosition; 
uniform mat4 uTShape; 
uniform mat4 uModel;
uniform mat4 uMatrix;
uniform mat4 uView;
uniform mat4 uProjection;
varying vec3 vColor;
void main() {
    gl_Position = uProjection * uView * uModel * uMatrix * vec4(aPosition, 1.0);
}
`;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // sampai sini sudah jadi .o

  // Fragment shader
  var fragmentShaderCode = `
  precision mediump float;
  void main(){
    float r = 1.0;
    float g = 1.0;
    float b = 1.0;
    gl_FragColor = vec4(r , g, b, 1.0);
  }`;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject); // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  function draw() {
    // renderer info

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Write the positions of vertices to a vertex shader
    // drawPoint();
    // drawLine();
    // drawTriangle();

    var pointsVertices = new Float32Array([-0.5, -0.5]);
    var linesVertices = new Float32Array([-0.25, -0.25, -0.5, +0.5]);
    var triangleVertices = new Float32Array([+0.5, -0.5, 0.0, 0.25, +0.5, 0.0]);
    drawA(gl.POINTS, pointsVertices);
    drawA(gl.LINES, linesVertices);
    drawA(gl.TRIANGLES, triangleVertices);
  }

  function drawA(type, vertices, rot) {
    var n = initBuffers(vertices);
    if (n < 0) {
      console.log("Failed to set the positions of the vertices");
      return;
    }

    for (let index = 0; index < n; index = index + 4) {
      // console.table(shapeT);
      gl.drawArrays(type, index, 4);
    }

    let yoddle = gl.getUniformLocation(shaderProgram, "uMatrix");
    var test = glMatrix.mat4.create(); // Membuat matriks identitas
    if (rot) {
      glMatrix.mat4.rotateX(test, test, theta);
      glMatrix.mat4.rotateY(test, test, theta);
    } else {
      glMatrix.mat4.rotateZ(test, test, theta);
    }
    gl.uniformMatrix4fv(yoddle, false, test);
  }

  function initBuffers(vertices) {
    var n = (vertices.length / 72) * 24;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    if (aPosition < 0) {
      console.log("Failed to get the storage location of aPosition");
      return -1;
    }

    gl.vertexAttribPointer(
      aPosition,
      3,
      gl.FLOAT,
      false,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(aPosition);
    return n;
  }

  // Variabel lokal

  var horizontalDelta = 0.0;
  var verticalDelta = 0.0;

  // Variabel shapeTter ke GLSL
  var uModel = gl.getUniformLocation(shaderProgram, "uModel");
  // View
  var cameraX = 0.0;
  var cameraZ = 10.0;
  var uView = gl.getUniformLocation(shaderProgram, "uView");
  var view = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(
    view,
    [cameraX, 0.0, cameraZ], // the location of the eye or the camera
    [cameraX, 0.0, -10], // the shapeTt where the camera look at
    [0.0, 1.0, 0.0]
  );
  // Projection
  var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
  var perspective = glMatrix.mat4.create();
  glMatrix.mat4.perspective(perspective, Math.PI / 3, 1.0, 0.5, 10.0);

  // Kita mengajari GPU bagaimana caranya mengoleksi
  //  nilai posisi dari ARRAY_BUFFER
  //  untuk setiap verteks yang sedang diproses
  // var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  // gl.vertexAttribPointer(
  //   aPosition,
  //   3,
  //   gl.FLOAT,
  //   false,
  //   3 * Float32Array.BYTES_PER_ELEMENT,
  //   0
  // );
  // gl.enableVertexAttribArray(aPosition);
  var triangles = [+0.5, -0.5, 0.0, 0.25, +0.5, 0.0];
  let theta = 0;
  function render() {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0, 0.65, 0.0, 1.0); // Oranye
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta += 0.01;

    // horizontalDelta += horizontalSpeed;
    // verticalDelta -= verticalSpeed;
    var model = glMatrix.mat4.create(); // Membuat matriks identitas
    glMatrix.mat4.translate(model, model, [
      horizontalDelta,
      verticalDelta,
      0.0,
    ]);
    // glMatrix.mat4.rotateX(model, model, theta);
    // glMatrix.mat4.rotateY(model, model, theta);
    // glMatrix.mat4.rotateZ(model, model, theta);
    gl.uniformMatrix4fv(uModel, false, model);

    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    // console.log(shapeT);

    drawA(gl.TRIANGLE_FAN, new Float32Array(shapeT), true);
    drawA(gl.TRIANGLE_FAN, new Float32Array(shapeO), false);
    // var pointsVertices = new Float32Array([-0.5, -0.5]);
    // var linesVertices = new Float32Array([-0.25, -0.25, -0.5, +0.5]);
    var triangleVertices = new Float32Array([+0.5, -0.5, 0.0, 0.25, +0.5, 0.0]);
    // drawA(gl.POINTS, pointsVertices);
    // drawA(gl.LINES, linesVertices);
    // drawA(gl.TRIANGLES, triangleVertices);

    // kali 24
    // 24*5 krn ada 5 blok, hitung blok yg
    // for (let index = 0; index < 800; index = index + 4) {
    //   // console.table(shapeT);
    //   gl.drawArrays(gl.TRIANGLE_FAN, index, 4);
    // }
    // gl.drawElements(gl.LINES, faces.length, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function shift(array, offset) {
  let pixelofx = [];
  for (let a = 0; a < array.length; a++) {
    pixelofx[a] = array[a] + offset;
  }
  return pixelofx;
}
function scale(array, offset) {
  let pixelofx = [];
  for (let a = 0; a < array.length; a++) {
    pixelofx[a] = array[a] * offset;
  }
  return pixelofx;
}

function shiftx(array, offset) {
  let pixelofx = [];
  for (let a = 0; a < array.length; a++) {
    if (a % 3 == 0) {
      pixelofx[a] = array[a] + offset;
    } else pixelofx[a] = array[a];
  }
  return pixelofx;
}
function shifty(array, offset) {
  let pixelofx = [];
  for (let a = 0; a < array.length; a++) {
    if (a % 3 == 1) {
      pixelofx[a] = array[a] + offset;
    } else pixelofx[a] = array[a];
  }
  return pixelofx;
}

// Double shift(dots diagonal)
function shiftxy(array, index, xsign, ysign) {
  return shiftx(shifty(array, xsign * index), ysign * index);
}
function shiftxyhalf(array, index, xsign, ysign) {
  return shiftx(shifty(array, (xsign * index) / 2), (ysign * index) / 2);
}

// Double shift(dots horizontal)
function shiftxx(array, index, xsign, ysign) {
  return shiftx(shiftx(array, xsign * index), ysign * index);
}

// Double shift(dots vertical)
function shiftyy(array, index, xsign, ysign) {
  return shifty(shifty(array, xsign * index), ysign * index);
}
