import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'

function bufferToHex (buffer) {
    return Array
        .from (new Uint8Array (buffer))
        .map (b => b.toString (16).padStart (2, "0"));
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
              var labels = bufferToHex(results[0]).slice(8); // removing magic number, nImgs
              var imageArr = bufferToHex(results[1]).slice(16); // removing maginc number, nImgs, rows, cols
              var imageSize = 784;
              var images = []
              for (var i=0; i<imageArr.length; i+=imageSize) {
                  images.push(imageArr.slice(i,i+imageSize));
              }
              resolve({
                "images":images,
                "labels":labels
              })
            }).catch(err=>{reject(err)});
          })
        })
      })
    }
  },
  {
    name: 'MNIST Clothes',
    urlData: '',
    urlIdx: '',
    getData: () => {    }
  }
];

export default datasources
