var model = {
  primaryMatrix: [],
  newMatrix: [],
  matrixRotated: false,

  generateMatrix: function (buttonValue) {

    model.primaryMatrix = [];
    for (let row = 0; row < buttonValue; row++) {
      model.primaryMatrix[row] = new Array(buttonValue);
      for (let col = 0; col < buttonValue; col++) {
        model.primaryMatrix[row][col] = row + '' + col;
      };
    };
    this.matrixRotated = false;
    this.tableCreate(buttonValue);
    view.showHiddenText();
  },

  tableCreate: function (buttonValue) {
    var beforeTable = document.getElementById('before'),
      afterTable = document.getElementById('after'),
      tblBefore = document.createElement('tbody'),
      tblAfter = document.createElement('tbody');
    beforeTable.innerHTML = '';
    afterTable.innerHTML = '';

    for (var i = 0; i < buttonValue; i++) {
      var trBefore = tblBefore.insertRow();
      var trAfter = tblAfter.insertRow();

      for (var j = 0; j < buttonValue; j++) {
        var td = trBefore.insertCell();
        var th = document.createElement('th');
        trAfter.appendChild(th);
      }
    }
    beforeTable.appendChild(tblBefore);
    afterTable.appendChild(tblAfter);
    view.displayPrimaryMatrix(model.primaryMatrix);
  }
};

var view = {
  displayPrimaryMatrix: function (matrix) {
    const elementTD = document.getElementsByTagName('td');
    let countD = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let k = 0; k < matrix.length; k++) {
        elementTD[countD].innerHTML = matrix[i][k];
        countD++;
      }
    }
  },

  showHiddenText: function () {
    var showText = document.getElementsByClassName('hidden');
    for (let p = showText.length - 1; p >= 0; p--) {
      showText[p].setAttribute('class', 'show');
    }
  },

  displayResult: function (matrix) {
    const elementTH = document.getElementsByTagName('th');
    let countH = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let k = 0; k < matrix.length; k++) {
        elementTH[countH].innerHTML = matrix[i][k];
        countH++;
      }
    }
    model.newMatrix = matrix;
  }
};

var controller = {
  onGenerateButtonClick: function () {
    var getGenerateField = document.getElementById('generateMatrix'),
      generateButton = getGenerateField.children;

    for (let i = 0; i < generateButton.length; i++) {
      generateButton[i].onclick = function buttonValueFunc() {
        var buttonValue = generateButton[i].value;
        model.generateMatrix(buttonValue);
        event.preventDefault();
      }
    }
  },

  rotate: function (direction, matrix) {
    model.matrixRotated = true;
    let newMatrix = [];

    for (let i = 0, j = matrix.length - 1; i < matrix.length, j >= 0; i++ , j--) {
      newMatrix[i] = new Array(matrix.length);
      for (let a = 0, b = matrix.length - 1; a < matrix.length, b >= 0; a++ , b--) {
        if (direction === "right") {
          newMatrix[i][a] = matrix[b][i];
        }
        else if (direction === "left") {
          newMatrix[i][a] = matrix[a][j];
        }
        else {
          console.log("Something going wrong!");
        }
      }
    }
    view.displayResult(newMatrix);
    event.preventDefault();
  },

  rotateLeft: function () {
    const rotateLeft = document.getElementById('rotateLeft');
    rotateLeft.onclick = function () {
      const left = "left";
      if (model.matrixRotated) {
        controller.rotate(left, model.newMatrix);
      }
      else {
        controller.rotate(left, model.primaryMatrix);
      }
    }
  },

  rotateRight: function () {
    const rotateRight = document.getElementById('rotateRight');
    rotateRight.onclick = function () {
      const right = "right";
      if (model.matrixRotated) {
        controller.rotate(right, model.newMatrix);
      }
      else {
        controller.rotate(right, model.primaryMatrix);
      }
    }
  }
};

function init() {
  controller.onGenerateButtonClick();
  controller.rotateLeft();
  controller.rotateRight();
}

window.onload = init;