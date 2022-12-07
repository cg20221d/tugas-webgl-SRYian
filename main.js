function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  let shapeT = [];
  let shapeO = [];
  let shape8 = [];
  let shape0 = [];
  let box = [];
  let faces = [];
  let vertices = [
    // Face A       // Red      // Surface orientation
    -1,
    -1,
    -1,
    1,
    0,
    0,
    0,
    0,
    -1, // Index:  0
    1,
    -1,
    -1,
    1,
    0,
    0,
    0,
    0,
    -1, // Index:  1
    1,
    1,
    -1,
    1,
    0,
    0,
    0,
    0,
    -1, // Index:  2
    -1,
    1,
    -1,
    1,
    0,
    0,
    0,
    0,
    -1, // Index:  3
    // Face B       // Yellow
    -1,
    -1,
    1,
    1,
    1,
    0,
    0,
    0,
    1, // Index:  4
    1,
    -1,
    1,
    1,
    1,
    0,
    0,
    0,
    1, // Index:  5
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1, // Index:  6
    -1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1, // Index:  7
    // Face C       // Green
    -1,
    -1,
    -1,
    0,
    1,
    0,
    -1,
    0,
    0, // Index:  8
    -1,
    1,
    -1,
    0,
    1,
    0,
    -1,
    0,
    0, // Index:  9
    -1,
    1,
    1,
    0,
    1,
    0,
    -1,
    0,
    0, // Index: 10
    -1,
    -1,
    1,
    0,
    1,
    0,
    -1,
    0,
    0, // Index: 11
    // Face D       // Blue
    1,
    -1,
    -1,
    0,
    0,
    1,
    1,
    0,
    0, // Index: 12
    1,
    1,
    -1,
    0,
    0,
    1,
    1,
    0,
    0, // Index: 13
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    0, // Index: 14
    1,
    -1,
    1,
    0,
    0,
    1,
    1,
    0,
    0, // Index: 15
    // Face E       // Orange
    -1,
    -1,
    -1,
    1,
    0.5,
    0,
    0,
    -1,
    0, // Index: 16
    -1,
    -1,
    1,
    1,
    0.5,
    0,
    0,
    -1,
    0, // Index: 17
    1,
    -1,
    1,
    1,
    0.5,
    0,
    0,
    -1,
    0, // Index: 18
    1,
    -1,
    -1,
    1,
    0.5,
    0,
    0,
    -1,
    0, // Index: 19
    // Face F       // White
    -1,
    1,
    -1,
    1,
    1,
    1,
    0,
    1,
    0, // Index: 20
    -1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0, // Index: 21
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0, // Index: 22
    1,
    1,
    -1,
    1,
    1,
    1,
    0,
    1,
    0, // Index: 23
  ];
  // var vertices = [
  //   // Face A
  //   -1,
  //   -1,
  //   -1, // Index:  0
  //   1,
  //   -1,
  //   -1, // Index:  1
  //   1,
  //   1,
  //   -1, // Index:  2
  //   -1,
  //   1,
  //   -1, // Index:  3
  //   // Face B
  //   -1,
  //   -1,
  //   1, // Index:  4
  //   1,
  //   -1,
  //   1, // Index:  5
  //   1,
  //   1,
  //   1, // Index:  6
  //   -1,
  //   1,
  //   1, // Index:  7
  //   // Face C
  //   -1,
  //   -1,
  //   -1, // Index:  8
  //   -1,
  //   1,
  //   -1, // Index:  9
  //   -1,
  //   1,
  //   1, // Index: 10
  //   -1,
  //   -1,
  //   1, // Index: 11
  //   // Face D
  //   1,
  //   -1,
  //   -1, // Index: 12
  //   1,
  //   1,
  //   -1, // Index: 13
  //   1,
  //   1,
  //   1, // Index: 14
  //   1,
  //   -1,
  //   1, // Index: 15
  //   // Face E
  //   -1,
  //   -1,
  //   -1, // Index: 16
  //   -1,
  //   -1,
  //   1, // Index: 17
  //   1,
  //   -1,
  //   1, // Index: 18
  //   1,
  //   -1,
  //   -1, // Index: 19
  //   // Face F
  //   -1,
  //   1,
  //   -1, // Index: 20
  //   -1,
  //   1,
  //   1, // Index: 21
  //   1,
  //   1,
  //   1, // Index: 22
  //   1,
  //   1,
  //   -1, // Index: 23
  // ];
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
  vertices = shiftxy(vertices, scalevalue, 12, -10);
  let vertices2 = shiftx(vertices, 4 * scalevalue);
  let vertices3 = shiftxy(vertices, scalevalue, -2, 12);
  let vertices4 = shiftxy(vertices, scalevalue, -20, 2);
  let vertices5 = shiftxy(vertices, scalevalue, -22, 12);
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

  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(vertices4, index * scalevalue, -1, -1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shifty(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, 1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftx(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, 1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shifty(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, -1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftx(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, -1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shifty(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, 1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftx(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, 1));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shifty(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape8);
  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape8 = shape8.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, -1));
  }

  for (let index = 0; index < 4; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shifty(vertices5, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, 1));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftx(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, 1));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 10; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shifty(lastpointt, index * scalevalue));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftxyhalf(lastpointt, index * scalevalue, 1, -1));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftx(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 6; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftxyhalf(lastpointt, index * scalevalue, -1, -1));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 10; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shifty(lastpointt, -index * scalevalue));
  }
  lastpointt = getlastpixel(shape0);
  for (let index = 0; index < 10; index = index + 2) {
    // console.table(shapeT);
    shape0 = shape0.concat(shiftxy(lastpointt, index * scalevalue, 1, 1));
  }
  box = box.concat(shiftxy(vertices, scalevalue, -11, 10));
  {
    console.log(shapeT.length / 24);

    console.log(shapeT.length);
    console.log(shapeO.length);
    // var Tbuffer = gl.createBuffer();
  }
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
attribute vec3 aColor;
attribute vec3 aNormal;
uniform mat4 uTShape; 
uniform mat4 uModel;
uniform mat4 uMatrix;
uniform mat4 uView;
uniform mat4 uProjection;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
    gl_Position = uProjection * uView * uModel * uMatrix * vec4(aPosition, 1.0);
    vColor = aColor;
    vNormal = aNormal;
    //store th vertex position
    vPosition = (uModel * vec4(aPosition, 1.0)).xyz;
}
`;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // sampai sini sudah jadi .o

  // Fragment shader
  var fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  uniform vec3 uLightConstant;        // merepresentasikan warna sumber cahaya
  uniform float uAmbientIntensity;    // merepresentasikan intensitas cahaya sekitar
  varying vec3 vNormal;
  varying vec3 vPosition;             // titik fragmen
  uniform vec3 uLightPosition;        // titik lokasi sumber cahaya
  uniform vec3 uViewerPosition;       // titik lokasi mata atau kamera pengamat
  uniform mat3 uNormalModel;
  void main(){
    // ambient is k*i
    vec3 ambient = uLightConstant * uAmbientIntensity;
    vec3 lightRay = vPosition - uLightPosition;
    // reflected cause we calaculated the light from v to l/kebalik
    vec3 normalizedLight = normalize(-lightRay);
    vec3 normalizedNormal = normalize(uNormalModel * vNormal);
    float cosTheta = dot(normalizedNormal, normalizedLight);
    vec3 diffuse = vec3(0.0, 0.0, 0.0);
    if (cosTheta > 0.0) {
        float diffuseIntensity = cosTheta;
        // diffuse is (light . normal) * k
        diffuse = uLightConstant * diffuseIntensity;
    }
    // spec is k * (reflector . viewer)^shininess
    vec3 normalizedReflector = normalize(reflect(lightRay, normalizedNormal));
    vec3 normalizedViewer = normalize(uViewerPosition - vPosition);
    float cosPhi = dot(normalizedReflector, normalizedViewer);
    vec3 specular = vec3(0.0, 0.0, 0.0);
    if (cosPhi > 0.0) {
        float shininessConstant = 100.0;    // batas minimum spesifikasi spekular untuk materi logam
        float specularIntensity = pow(cosPhi, shininessConstant);
        specular = uLightConstant * specularIntensity;
    }
    // phong thing
    vec3 phong = ambient + diffuse + specular;
    gl_FragColor = vec4(phong, 1.0);
    // float r = 1.0;
    // float g = 1.0;
    // float b = 1.0;
    // gl_FragColor = vec4(r , g, b, 1.0);
  }`;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject); // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Variabel shapeTter ke GLSL
  var uModel = gl.getUniformLocation(shaderProgram, "uModel");

  // View
  // z kamera 7.5 unit mundur dari origin
  // tapi pertahankan agar kamera tetap melihat ke arah origin
  var cameraX = 0.0;
  var cameraZ = 7.5;
  var uView = gl.getUniformLocation(shaderProgram, "uView");
  var view = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(
    view,
    [cameraX, 0.0, cameraZ], // Position of the viewer
    [0.0, 0.0, 0], // Point the viewer is looking at
    [0.0, 1.0, 0.0] //  vec3 pointing up
  );
  // Projection
  var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
  var perspective = glMatrix.mat4.create();
  // fov 75 derajat
  // near clip 0.5, far clip 50.0
  // perspective(out, fovy, aspect, near, far)
  glMatrix.mat4.perspective(perspective, degToRad(75), 1.0, 0.5, 50.0);

  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(
    aPosition,
    3,
    gl.FLOAT,
    false,
    9 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(aPosition);

  const shape = new Shape(gl, shaderProgram);
  const shape2 = new Shape(gl, shaderProgram);
  var triangles = [+0.5, -0.5, 0.0, 0.25, +0.5, 0.0];
  let theta = 0;
  let delta = [0, 0, 0];
  let ppong = 0;
  const duration = 2000;
  const duration08 = 1000;
  let speed = 0.008;
  let start = Date.now();
  let from = 0.5;
  let to = 2;
  let totranslate = 7;
  let fromtranslate = -1;
  function render() {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0, 0.65, 0.0, 1.0); // Oranye
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta += 0.01;
    ppong = pingpong(1, 3);

    var model = glMatrix.mat4.create(); // Membuat matriks identitas

    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    // console.log(shapeT);
    if (wkey) {
      delta[2] += 0.01;
    }
    if (skey) {
      delta[2] -= 0.01;
    }
    if (dkey) {
      delta[0] += 0.01;
    }
    if (akey) {
      delta[0] -= 0.01;
    }
    let now = Date.now();

    let elapsed = now - start;
    let val;
    let val2;
    // iftt his hits 200
    if (elapsed >= duration) {
      start = now;
      let x = from;
      from = to;
      to = x;
      // dengan rumus s = v x t, dapat dicari durasi yang pas untuk kecepatan 0.008
      // dari situlah varaiable 0.008 mucnul
      if (elapsed > duration08) {
        start = now;
        let x = fromtranslate;
        fromtranslate = totranslate;
        totranslate = x;
      }
    }
    val = easeInOutElastic(elapsed, from, to - from, duration);
    val2 = easeInOutElastic(
      elapsed,
      fromtranslate,
      totranslate - fromtranslate,
      duration08
    );

    console.log(elapsed + " " + to + " " + from + " " + duration);
    // Skalasikan objek digit kedua, memantul antara ukuran setengah dan dua kali lipat dengan kecepatan skalasi bebas
    // Rotasikan objek alfabet pertama terhadap sumbu Y dengan kecepatan sudut bebas (kalian tentukan sendiri) ketika tombol kiri atau kanan pada keyboard ditekan.
    // Rotasikan objek alfabet kedua terhadap sumbu X dengan kecepatan sudut bebas (kalian tentukan sendiri) ketika tombol atas atau bawah pada keyboard ditekan.

    shape.drawA(gl.TRIANGLE_FAN, new Float32Array(shapeT), "rotxs");

    // shape2.drawA(
    //   gl.TRIANGLE_FAN,
    //   new Float32Array(shapeO),
    //   "translate",
    //   speed,
    //   val2,
    //   0
    // );

    shape.setLight();
    shape2.drawA(
      gl.LINES,
      new Float32Array(shape8),
      "translate",
      0,
      delta[0],
      delta[1],
      delta[2]
    );
    shape.drawA(gl.TRIANGLE_FAN, new Float32Array(box));
    // shape2.drawA(gl.LINES, new Float32Array(shape0), "roty", delta[1]);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function fract(a) {
  return a - Math.floor(a);
}
function pingpong(a, b) {
  if (b == 0.0) {
    return 0.0;
  } else {
    return Math.abs(fract((a - b) / (b * 2.0)) * b * 2.0 - b);
  }
}
function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

function easeInOutElastic(t, b, c, d) {
  // jshint eqeqeq: false, -W041: true
  var s = 1.70158;
  var p = 0;
  var a = c;
  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  if (t < 1)
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
      b
    );
  return (
    a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
      0.5 +
    c +
    b
  );
}

let wkey = false;
let skey = false;
let akey = false;
let dkey = false;
// w
function onKeyWUp(event) {
  if (event.keyCode == 38 || event.keyCode == 73) {
    wkey = !wkey;
  }
}
// w
function onKeyWDown(event) {
  if (event.keyCode == 40 || event.keyCode == 73) {
    wkey = !wkey;
  }
}
// s
function onKeySUp(event) {
  if (event.keyCode == 40 || event.keyCode == 75) {
    skey = !skey;
  }
}
function onKeySDown(event) {
  if (event.keyCode == 83 || event.keyCode == 75) {
    skey = !skey;
  }
}
// a
function onKeyAUp(event) {
  if (event.keyCode == 37 || event.keyCode == 74) {
    akey = !akey;
  }
}
// a
function onKeyADown(event) {
  if (event.keyCode == 37 || event.keyCode == 74) {
    akey = !akey;
  }
}
// d
function onKeyDUp(event) {
  if (event.keyCode == 39 || event.keyCode == 76) {
    dkey = !dkey;
  }
}
function onKeyDDown(event) {
  if (event.keyCode == 39 || event.keyCode == 76) {
    dkey = !dkey;
  }
}

document.addEventListener("keydown", onKeyWDown);
document.addEventListener("keyup", onKeyWUp);
document.addEventListener("keydown", onKeySDown);
document.addEventListener("keyup", onKeySUp);
document.addEventListener("keydown", onKeyADown);
document.addEventListener("keyup", onKeyAUp);
document.addEventListener("keydown", onKeyDDown);
document.addEventListener("keyup", onKeyDUp);

function degToRad(d) {
  return (d * Math.PI) / 180;
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
