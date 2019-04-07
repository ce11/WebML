import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'

function bufferToHex(buffer) {
  return Array
    .from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0")).join('');
}
function oneHot(data, classes){
  let res = Array(data.length)
  data.forEach((elem, idx) =>{
    let temp = Array(classes).fill(0)
    temp[elem] = 1
    res[idx] = temp
  })
  return res;
}
var datasources = [{
    name: 'MNIST',
    urlData: 'http://localhost:8080/t10k-mnist.zip',
    getData: (data) => {
      return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent('http://localhost:8080/t10k-mnist.zip', (err, data) => {
          if (err) {
            reject(err);
          }
          JSZip.loadAsync(data).then((unzipped) => {
            Promise.all([unzipped.file('labels').async('nodebuffer'), unzipped.file('images').async('nodebuffer')])
              .then(function(results) {
                var nImages = parseInt(bufferToHex(results[0].slice(4,8)),16)
                var nRows = parseInt(bufferToHex(results[1].slice(8,12)), 16);
                var nCols = parseInt(bufferToHex(results[1].slice(12,16)), 16);
                var imageSize = nRows * nCols;
                results[0] = results[0].slice(8) // reoving magic number & nImages
                results[1] = results[1].slice(16) // reoving magic number, rows, cols, nImages

                resolve({
                  "inputs": results[1],
                  "labels": oneHot(results[0], 10),
                  "w": nCols,
                  "h": nRows,
                  "classes":10
                })
              }).catch(err => {
                reject(err)
              });
          })
        })
      })
    }
  },
  {
    name: 'MNIST Clothes',
    urlData: '',
    urlIdx: '',
    getData: () => {}
  }
];

export default datasources
