function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");
  let poin = [];
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
  function getlastpixel() {
    return poin.slice(-60);
  }
  // for loop the vertex thingy
  // faces = faces.concat(indices);
  // poin = poin.concat(vertices);
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
    // console.table(poin);
    poin = poin.concat(shiftx(vertices, index * scalevalue));

    faces = faces.concat(shiftx(indices, index));
  }

  for (let index = 0; index < 12; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shifty(vertices2, -index * scalevalue));
  }

  for (let index = 0; index < 8; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shifty(vertices3, -index * scalevalue));
  }
  let lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftxyhalf(lastpoint, index * scalevalue, -1, 1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftx(lastpoint, index * scalevalue));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftxyhalf(lastpoint, index * scalevalue, 1, 1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 8; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shifty(lastpoint, index * scalevalue));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftxyhalf(lastpoint, index * scalevalue, 1, -1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftx(lastpoint, -index * scalevalue));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(poin);
    poin = poin.concat(shiftxyhalf(lastpoint, index * scalevalue, -1, -1));
  }
  console.log(poin.length / 24);

  console.log(poin);
  console.log(faces);
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(poin), gl.STATIC_DRAW);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(faces),
    gl.STATIC_DRAW
  );

  // Vertex shader
  var vertexShaderCode = `
attribute vec3 aPosition; 
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
varying vec3 vColor;
void main() {
    gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
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

  // Variabel lokal
  var theta = 0.0;
  var freeze = false;
  var horizontalSpeed = 0.0;
  var verticalSpeed = 0.0;
  var horizontalDelta = 0.0;
  var verticalDelta = 0.0;

  // Variabel pointer ke GLSL
  var uModel = gl.getUniformLocation(shaderProgram, "uModel");
  // View
  var cameraX = 0.0;
  var cameraZ = 10.0;
  var uView = gl.getUniformLocation(shaderProgram, "uView");
  var view = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(
    view,
    [cameraX, 0.0, cameraZ], // the location of the eye or the camera
    [cameraX, 0.0, -10], // the point where the camera look at
    [0.0, 1.0, 0.0]
  );
  // Projection
  var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
  var perspective = glMatrix.mat4.create();
  glMatrix.mat4.perspective(perspective, Math.PI / 3, 1.0, 0.5, 10.0);

  // Kita mengajari GPU bagaimana caranya mengoleksi
  //  nilai posisi dari ARRAY_BUFFER
  //  untuk setiap verteks yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(
    aPosition,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(aPosition);

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
    // kali 24
    // 24*5 krn ada 5 blok, hitung blok yg
    for (let index = 0; index < 800; index = index + 4) {
      // console.table(poin);
      gl.drawArrays(gl.TRIANGLE_FAN, index, 4);
    }
    // gl.drawElements(gl.LINES, faces.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function getPointOnBezierCurve(points, offset, t) {
  const invT = 1 - t;
  return v2.add(
    v2.mult(points[offset + 0], invT * invT * invT),
    v2.mult(points[offset + 1], 3 * t * invT * invT),
    v2.mult(points[offset + 2], 3 * invT * t * t),
    v2.mult(points[offset + 3], t * t * t)
  );
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

function getPointsOnBezierCurve(points, offset, numPoints) {
  const cpoints = [];
  for (let i = 0; i < numPoints; ++i) {
    const t = i / (numPoints - 1);
    cpoints.push(getPointOnBezierCurve(points, offset, t));
  }
  return cpoints;
}

const v2 = (function () {
  // adds 1 or more v2s
  function add(a, ...args) {
    const n = a.slice();
    [...args].forEach((p) => {
      n[0] += p[0];
      n[1] += p[1];
    });
    return n;
  }

  function mult(a, s) {
    if (Array.isArray(s)) {
      let t = s;
      s = a;
      a = t;
    }
    if (Array.isArray(s)) {
      return [a[0] * s[0], a[1] * s[1]];
    } else {
      return [a[0] * s, a[1] * s];
    }
  }

  return {
    add: add,
    mult: mult,
  };
})();
