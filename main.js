function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  //   note:pakai backtick untuk multiple lines

  // decalre array untuk tiga pixel
  let pixel1 = [-0.67, 0.55, -0.57, 0.55, -0.57, 0.65, -0.67, 0.65];
  let pixel2 = [-0.46, 0.45, -0.36, 0.45, -0.36, 0.55, -0.46, 0.55];
  let pixel3 = [0.21, -0.01, 0.31, -0.01, 0.31, 0.09, 0.21, 0.09];
  console.log(pixel2.length);

  function shiftx(array, length, offset) {
    let pixelofx = [];
    for (let a = 0; a < array.length; a++) {
      if (a % 2 == 0) {
        pixelofx[a] = array[a] + offset;
      } else pixelofx[a] = array[a];
    }
    return pixelofx;
  }
  function shifty(array, length, offset) {
    let pixelofx = [];
    for (let a = 0; a < array.length; a++) {
      if (a % 2 == 1) {
        pixelofx[a] = array[a] + offset;
      } else pixelofx[a] = array[a];
    }
    return pixelofx;
  }

  // Double shift(dots diagonal)
  function shiftxy(array, index, xsign, ysign) {
    return shiftx(
      shifty(array, array.length, (xsign * index) / 10),
      array.length,
      (ysign * index) / 10
    );
  }
  function shiftxyhalf(array, index, xsign, ysign) {
    return shiftx(
      shifty(array, array.length, (xsign * index) / 2 / 10),
      array.length,
      (ysign * index) / 2 / 10
    );
  }

  // Double shift(dots horizontal)
  function shiftxx(array, index, xsign, ysign) {
    return shiftx(
      shiftx(array, array.length, (xsign * index) / 10),
      array.length,
      (ysign * index) / 10
    );
  }

  // Double shift(dots vertical)
  function shiftyy(array, index, xsign, ysign) {
    return shifty(
      shifty(array, array.length, (xsign * index) / 10),
      array.length,
      (ysign * index) / 10
    );
  }

  function getlastpixel() {
    return poin.slice(-8);
  }

  let poin = [];
  poin = poin.concat(pixel1);

  // for loop the vertex thingy
  for (let index = 0; index < 5; index++) {
    // console.table(poin);
    poin = poin.concat(shiftx(pixel1, pixel1.length, index / 10));
  }
  for (let index = 0; index < 6; index++) {
    // console.table(poin);
    poin = poin.concat(shifty(pixel2, pixel2.length, -index / 10));
  }

  // draw the 0
  for (let index = 0; index < 2; index++) {
    // console.table(poin);
    poin = poin.concat(shiftxyhalf(pixel3, index, -1, 1));
  }
  let lastpoint = getlastpixel();
  for (let index = 0; index < 3; index++) {
    poin = poin.concat(shiftx(lastpoint, lastpoint.length, index / 10));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 3; index++) {
    poin = poin.concat(shiftxyhalf(lastpoint, index, 1, 1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 5; index++) {
    poin = poin.concat(shifty(lastpoint, lastpoint.length, index / 10));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 3; index++) {
    poin = poin.concat(shiftxyhalf(lastpoint, index, 1, -1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 3; index++) {
    poin = poin.concat(shiftx(lastpoint, lastpoint.length, -index / 10));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 3; index++) {
    poin = poin.concat(shiftxyhalf(lastpoint, index, -1, -1));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 5; index++) {
    poin = poin.concat(shifty(lastpoint, lastpoint.length, -index / 10));
  }
  lastpoint = getlastpixel();
  for (let index = 0; index < 5; index++) {
    poin = poin.concat(shiftxy(lastpoint, index, 1, 1));
  }
  console.log("test " + poin.length + " " + poin.length / 8);
  let number8 = [
    -0.39, -0.3, -0.36, -0.3, -0.36, -0.27, -0.33, -0.27, -0.33, -0.24, -0.14,
    -0.24, -0.14, -0.27, -0.11, -0.27, -0.11, -0.3, -0.08, -0.3, -0.08, -0.43,
    -0.11, -0.43, -0.11, -0.47, -0.08, -0.47, -0.08, -0.6, -0.11, -0.6, -0.11,
    -0.64, -0.14, -0.64, -0.14, -0.67, -0.33, -0.67, -0.33, -0.64, -0.36, -0.64,
    -0.36, -0.6, -0.39, -0.6, -0.39, -0.47, -0.36, -0.47, -0.36, -0.43, -0.39,
    -0.43, -0.39, -0.3, -0.36, -0.3,
  ];
  let number8bolong1 = [];
  let number8bolong2 = [];
  poin = poin.concat(number8);
  console.log("test2 " + poin.length + " " + poin.length / 8);
  let vertices = [];
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(poin), gl.STATIC_DRAW);

  //   vertex shader - posisi
  //   shader code
  let vertexShaderCode = `
    attribute vec2 aPosition;
    void main(){
       float x = aPosition.x;
       float y = aPosition.y;
       gl_PointSize = 4.0;
       gl_Position = vec4( x, y, 0.0, 1.0);
       //also works like aPossition.xy
    }`;
  //assignment yg diterrima yg terkahir saja, supaya shader
  // bisa dipanggil beberpaa kali, drawarrays harus dipanggil beberpaa kali

  //   creaate shader object
  let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  //   compile the shader
  gl.compileShader(vertexShaderObject);

  // fragment shader - warna
  //   shader code
  let fragmentShaderCode = `
    precision mediump float;
    void main(){
      float r = 1.0;
      float g = 1.0;
      float b = 1.0;
      gl_FragColor = vec4(r , g, b, 1.0);
    }`;
  let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  //   compile the shader
  gl.compileShader(fragmentShaderObject);

  //   ".exe" file, but it's empty
  let shaderProgram = gl.createProgram();

  //   attach the shader to the file
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);

  //   link the Program
  gl.linkProgram(shaderProgram);

  // use the program, which color to use?
  gl.useProgram(shaderProgram);

  // Teach the GPU how to collect position value from ARRAY_BUFFERS for every vertex that is processed
  let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(0.14117647058, 0.10588235294, 0.10196078431, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let n = 0;
  for (let index = 0; index < 176; index = index + 4) {
    // console.table(poin);
    gl.drawArrays(gl.TRIANGLE_FAN, index, 4);
  }
  gl.drawArrays(gl.LINE_STRIP, 176, 29);

  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
  // gl.POINTS
  // gl.LINE_LOOP
  // gl.LINE_STRIP
  // gl.TRIANGLES
  // gl.TRIANGLE_STRIP
  // gl.TRIANGLE_FAN
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
