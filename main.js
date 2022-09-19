function main(params) {
  let cnavas = document.getElementById("canvas");
  let gl = cnavas.getContext("webgl");

  //   note:pakai backtick untuk multiple lines

  // decalre array untuk tiga titik
  let poin = [
    -0.52, 0.07, -0.52, 0.2, -0.65, 0.2, -0.65, 0.39, -0.52, 0.39, -0.52, 0.52,
    -0.65, 0.52, -0.65, 0.72, -0.52, 0.72, -0.52, 0.85, -0.26, 0.85, -0.26,
    0.72, -0.13, 0.72, -0.13, 0.52, -0.26, 0.52, -0.26, 0.4, -0.13, 0.4, -0.13,
    0.2, -0.26, 0.2, -0.26, 0.07, -0.52, 0.07, 0.14, 0.2, 0.14, 0.72, 0.27,
    0.72, 0.27, 0.85, 0.53, 0.85, 0.53, 0.72, 0.66, 0.72, 0.66, 0.2, 0.53, 0.2,
    0.53, 0.07, 0.27, 0.07, 0.27, 0.2, 0.14, 0.2, -0.65, -0.2, -0.65, -0.1,
    -0.15, -0.1, -0.15, -0.2, -0.45, -0.81, -0.45, -0.2, -0.35, -0.2, -0.35,
    -0.81, 0.16, -0.2, 0.16, -0.71, 0.21, -0.71, 0.21, -0.75, 0.26, -0.76, 0.26,
    -0.81, 0.56, -0.81, 0.56, -0.76, 0.61, -0.76, 0.61, -0.71, 0.66, -0.7, 0.67,
    -0.2, 0.61, -0.2, 0.61, -0.15, 0.56, -0.15, 0.56, -0.1, 0.26, -0.1, 0.26,
    -0.15, 0.21, -0.15, 0.31, -0.25, -0.52, 0.52, -0.52, 0.72, -0.26, 0.72,
    -0.26, 0.52, -0.52, 0.52,

    -0.52, 0.2, -0.52, 0.39, -0.26, 0.4, -0.26, 0.2, -0.52, 0.2,

    0.27, 0.71, 0.27, 0.4, 0.33, 0.4, 0.33, 0.52, 0.46, 0.52, 0.46, 0.65, 0.53,
    0.65, 0.53, 0.72, 0.27, 0.71,

    0.27, 0.26, 0.33, 0.27, 0.33, 0.39, 0.46, 0.4, 0.46, 0.52, 0.53, 0.52, 0.52,
    0.2, 0.27, 0.2, 0.27, 0.26, 0.33, 0.27,
  ];
  console.log(poin.length);
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
       gl_PointSize = 10.0;
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
  gl.drawArrays(gl.LINE_STRIP, 0, 21);
  gl.drawArrays(gl.LINE_STRIP, 21, 13);
  gl.drawArrays(gl.TRIANGLE_FAN, 34, 4);
  gl.drawArrays(gl.TRIANGLE_FAN, 38, 4);
  gl.drawArrays(gl.TRIANGLE_FAN, 42, 20);
  gl.drawArrays(gl.LINE_STRIP, 62, 5);
  gl.drawArrays(gl.LINE_STRIP, 67, 5);
  gl.drawArrays(gl.LINE_STRIP, 72, 9);
  gl.drawArrays(gl.LINE_STRIP, 82, 9);
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
