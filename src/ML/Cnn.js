import * as tf from '@tensorflow/tfjs';

class Cnn {
  constructor() {
    this.model = tf.sequential();
    this.batchSize = 320;
    this.validationSplit = 0.15;
    this.trainEpochs = 3;
  }

  init(w, h) {
    this.model = this.createConvModel(w, h);
  }

  fit(xs, ys, batchEndCb, epochEndCb) {
    var totalNumBatches = Math.ceil(xs.shape[0] * (1 - this.validationSplit) / this.batchSize) * this.trainEpochs;
    var trainBatchCount = 0;
    return this.model.fit(xs, ys, {
      batchSize: this.batchSize,
      validationSplit: this.validationSplit,
      epochs: this.trainEpochs,
      callbacks: {
        onBatchEnd: async (batch, logs) => {
          trainBatchCount++;
          // console.log((trainBatchCount / totalNumBatches * 100).toFixed(1) + " Complete")
          if(batchEndCb){
            batchEndCb((trainBatchCount / totalNumBatches * 100).toFixed(1))
          }
          // ui.logStatus(
          //     `Training... (` +
          //     `${(trainBatchCount / totalNumBatches * 100).toFixed(1)}%` +
          //     ` complete). To stop training, refresh or close page.`);
          // ui.plotLoss(trainBatchCount, logs.loss, 'train');
          // ui.plotAccuracy(trainBatchCount, logs.acc, 'train');
          // if (onIteration && batch % 10 === 0) {
          //   onIteration('onBatchEnd', batch, logs);
          // }
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          var valAcc = logs.val_acc;
          // console.log('loss: ', logs.val_loss)
          // console.log('acc: ', logs.val_acc)
          if(epochEndCb){
            epochEndCb({"acc":logs.val_acc, "loss":logs.val_loss})
          }
          await tf.nextFrame();
        }
      }
    });
  }
  predict(tensor) {
    // Use the model to do inference on a data point the model hasn't seen before:
    return this.model.predict(tensor);
    // return model.predict(tensor);
  }
  createDenseModel(w, h) {
    const model = tf.sequential();
    model.add(tf.layers.flatten({inputShape: [h, w, 1]}));
    model.add(tf.layers.dense({units: 42, activation: 'relu'}));
    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    return model;
  }

  createConvModel(w, h) {
    const model = tf.sequential();

    model.add(tf.layers.conv2d({
      inputShape: [h, w, 1],
      kernelSize: 3,
      filters: 16,
      activation: 'relu'
    }));

    model.add(tf.layers.maxPooling2d({
      poolSize: 2,
      strides: 2
    }));
    model.add(tf.layers.conv2d({
      kernelSize: 3,
      filters: 32,
      activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({
      poolSize: 2,
      strides: 2
    }));
    model.add(tf.layers.conv2d({
      kernelSize: 3,
      filters: 32,
      activation: 'relu'
    }));
    model.add(tf.layers.flatten({}));
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu'
    }));
    model.add(tf.layers.dense({
      units: 10,
      activation: 'softmax'
    }));
    model.compile({
      optimizer: 'rmsprop',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    return model;
  }
}
export default Cnn;
