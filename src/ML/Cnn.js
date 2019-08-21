import * as tf from '@tensorflow/tfjs';

class Cnn {
  constructor(arch, batchSize = 320, validationSplit = 0.15, trainEpochs = 3) {
    this.model = this.buildLayersToNet(arch)
    this.batchSize = batchSize;
    this.validationSplit = validationSplit;
    this.trainEpochs = trainEpochs;
  }

  buildLayersToNet(layers) {
      const model = tf.sequential();
      layers.forEach((layer) => {
          debugger;
          let type = layer.type;
          delete layer.type;
          model.add(tf.layers[type](layer))
      })
      model.compile({
          optimizer: 'rmsprop',
          loss: 'categoricalCrossentropy',
          metrics: ['accuracy'],
      });
      return model;
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
          if (batchEndCb.percentComplete) {
            batchEndCb.percentComplete((trainBatchCount / totalNumBatches * 100).toFixed(1))
          }
          if(batchEndCb.visual){
              batchEndCb.visual(batch, logs)
          }
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          if (epochEndCb.status) {
            epochEndCb.status({
              "acc": logs.val_acc,
              "loss": logs.val_loss
            })
          }
          if(epochEndCb.visual){
              epochEndCb.visual(epoch, logs);
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
}
export default Cnn;
