class Shape {
  gl = null;
  constructor(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
  }
  //  horizontalDelta,
  // verticalDelta,
  drawA(
    type,
    vertices,
    rot,
    theta,
    horizontalDelta,
    verticalDelta,
    zDelta,
    scaleValue
  ) {
    var n = this.initBuffers(vertices);
    if (n < 0) {
      console.log("Failed to set the positions of the vertices");
      return;
    }

    for (let index = 0; index < n; index = index + 4) {
      this.gl.drawArrays(type, index, 4);
    }

    let yoddle = this.gl.getUniformLocation(this.shaderProgram, "uMatrix");
    var test = glMatrix.mat4.create(); // Membuat matriks identitas
    switch (rot) {
      case "rotx":
        glMatrix.mat4.rotateX(test, test, theta);
        break;
      case "roty":
        glMatrix.mat4.rotateY(test, test, theta);
        break;
      case "rotz":
        glMatrix.mat4.rotateZ(test, test, theta);
        break;
      case "translate":
        glMatrix.mat4.translate(test, test, [
          horizontalDelta,
          verticalDelta,
          zDelta,
        ]);
        break;
      case "scale":
        glMatrix.mat4.scale(test, test, [scaleValue, scaleValue, scaleValue]);
        break;
      default:
        break;
    }
    this.gl.uniformMatrix4fv(yoddle, false, test);
  }

  initBuffers(vertices) {
    var n = (vertices.length / 72) * 24;

    var vertexBuffer = this.gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    var aPosition = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
    if (aPosition < 0) {
      console.log("Failed to get the storage location of aPosition");
      return -1;
    }

    this.gl.vertexAttribPointer(
      aPosition,
      3,
      this.gl.FLOAT,
      false,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    this.gl.enableVertexAttribArray(aPosition);
    return n;
  }
}
