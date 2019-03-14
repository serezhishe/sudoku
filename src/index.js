module.exports = function solveSudoku(matrix) {
  let bool1 = 1;
  var variants = [[],[],[],[],[],[],[],[],[]];
  for (let i = 0; i < 9; i++) 
    for (let j = 0; j < 9; j++) 
      if (!matrix[i][j]) 
        variants[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
while (bool1) {
  bool1 = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!matrix[i][j]) {
        for (let k = 0; k < 9; k++) {
          if (matrix[i][k] > 0 && variants[i][j].indexOf(matrix[i][k]) > -1) { variants[i][j].splice(variants[i][j].indexOf(matrix[i][k]), 1); }
          if (matrix[k][j] > 0 && variants[i][j].indexOf(matrix[k][j]) > -1) { variants[i][j].splice(variants[i][j].indexOf(matrix[k][j]), 1); }        
          if (matrix[i - (i % 3) + Math.floor(k / 3)][j - (j % 3) + (k % 3)] && (variants[i][j].indexOf(matrix[i - (i % 3) + Math.floor(k / 3)][j - (j % 3) + (k % 3)]) > -1)) {variants[i][j].splice(variants[i][j].indexOf(matrix[i - (i % 3) + Math.floor(k / 3)][j - (j % 3) + (k % 3)]), 1); }
        }
      if (variants[i][j].length == 0) console.log("SDADA")
      if (variants[i][j].length === 1) { 
        matrix[i][j] = variants[i][j][0];
        bool1 = 1;
        delete variants[i][j];
      }
    }
  }
}
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      if (!matrix[i][j]) {  
        let n = 0;
        for (let k = 0; k < 9; k++) {
          if (variants[i][k] != undefined && variants[i][j].join() == variants[i][k].join())  n++;
        }
        if (n == variants[i][j].length) {
          for (let l = 0; l < 9; l++) {
            if (variants[i][l] != undefined && variants[i][l].join() != variants[i][j].join()) {
              for (let k = 0; k < variants[i][j].length; k++)
              if (variants[i][l].indexOf(variants[i][j][k]) > -1) variants[i][l].splice(variants[i][l].indexOf(variants[i][j][k]), 1)
            }
          }
        }


        n = 0;
        for (let k = 0; k < 9; k++) {
          if (variants[k][j] != undefined && variants[i][j].join() == variants[k][j].join())  n++;
        }
        if (n == variants[i][j].length) {
          for (let l = 0; l < 9; l++) {
            if (variants[l][j] != undefined && variants[l][j].join() != variants[i][j].join()) {
              for (let k = 0; k < variants[i][j].length; k++)
              if (variants[l][j].indexOf(variants[i][j][k]) > -1) variants[l][j].splice(variants[l][j].indexOf(variants[i][j][k]), 1)
            }
          }
        }

        n = 0;
        for (let k = 0; k < 9; k++) {
          if (variants[i - (i % 3) + Math.floor(k / 3)][j - (j % 3) + (k % 3)] != undefined && variants[i][j].join() == variants[i - (i % 3) + Math.floor(k / 3)][j - (j % 3) + (k % 3)].join())  n++;
        }
        if (n == variants[i][j].length) {
          for (let l = 0; l < 9; l++) {
            if (variants[i - (i % 3) + Math.floor(l / 3)][j - (j % 3) + (l % 3)] != undefined && variants[i - (i % 3) + Math.floor(l / 3)][j - (j % 3) + (l % 3)].join() != variants[i][j].join()) {
              for (let k = 0; k < variants[i][j].length; k++)
              if (variants[i - (i % 3) + Math.floor(l / 3)][j - (j % 3) + (l % 3)].indexOf(variants[i][j][k]) > -1) variants[i - (i % 3) + Math.floor(l / 3)][j - (j % 3) + (l % 3)].splice(variants[i - (i % 3) + Math.floor(l / 3)][j - (j % 3) + (l % 3)].indexOf(variants[i][j][k]), 1)
            }
          }
        }

      }
    }
  }
}

if (!bool1) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let k = 0;
      if (variants[i][j] != undefined && variants[i][j].length == 2) {
      while (!matrix[i][j] && k < variants[i][j].length) {
        matrix[i][j] = variants[i][j][k];
        if (solveSudoku(matrix)) return solveSudoku(matrix);
        k++;
      }
    }
  }
}
}
  return matrix;
}