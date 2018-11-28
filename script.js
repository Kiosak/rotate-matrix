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

//var model={primaryMatrix:[],newMatrix:[],matrixRotated:!1,generateMatrix:function(c){model.primaryMatrix=[];for(var d=0;d<c;d++){model.primaryMatrix[d]=Array(c);for(var e=0;e<c;e++)model.primaryMatrix[d][e]=d+''+e}this.matrixRotated=!1,this.tableCreate(c),view.showHiddenText()},tableCreate:function(c){var d=document.getElementById('before'),e=document.getElementById('after'),f=document.createElement('tbody'),g=document.createElement('tbody');d.innerHTML='',e.innerHTML='';for(var h=0;h<c;h++)for(var l=f.insertRow(),m=g.insertRow(),n=0;n<c;n++){var o=l.insertCell(),q=document.createElement('th');m.appendChild(q)}d.appendChild(f),e.appendChild(g),view.displayPrimaryMatrix(model.primaryMatrix)}},view={displayPrimaryMatrix:function(c){for(var d=document.getElementsByTagName('td'),e=0,f=0;f<c.length;f++)for(var g=0;g<c.length;g++)d[e].innerHTML=c[f][g],e++},showHiddenText:function(){for(var c=document.getElementsByClassName('hidden'),d=c.length-1;0<=d;d--)c[d].setAttribute('class','show')},displayResult:function(c){for(var d=document.getElementsByTagName('th'),e=0,f=0;f<c.length;f++)for(var g=0;g<c.length;g++)d[e].innerHTML=c[f][g],e++;model.newMatrix=c}},controller={onGenerateButtonClick:function(){for(var c=document.getElementById('generateMatrix'),d=c.children,e=0;e<d.length;e++)d[e].onclick=function(){var g=d[e].value;model.generateMatrix(g),event.preventDefault()}},rotate:function(c,d){model.matrixRotated=!0;for(var e=[],f=0,g=d.length-1;f<d.length,0<=g;f++,g--){e[f]=Array(d.length);for(var h=0,l=d.length-1;h<d.length,0<=l;h++,l--)'right'===c?e[f][h]=d[l][f]:'left'===c?e[f][h]=d[h][g]:console.log('Something going wrong!')}view.displayResult(e),event.preventDefault()},rotateLeft:function(){var c=document.getElementById('rotateLeft');c.onclick=function(){var d='left';model.matrixRotated?controller.rotate(d,model.newMatrix):controller.rotate(d,model.primaryMatrix)}},rotateRight:function(){var c=document.getElementById('rotateRight');c.onclick=function(){var d='right';model.matrixRotated?controller.rotate(d,model.newMatrix):controller.rotate(d,model.primaryMatrix)}}};function init(){controller.onGenerateButtonClick(),controller.rotateLeft(),controller.rotateRight()}window.onload=init;