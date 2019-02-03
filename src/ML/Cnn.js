
import * as tf from '@tensorflow/tfjs';

class Cnn {
  constructor() {
    this.model = tf.sequential();
  }
  init(){
    this.model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  }

  fit(){
    // Generate some synthetic data for training.
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    return this.model.fit(xs, ys, {epochs: 100});
  }
  predict(tensor){
      // Use the model to do inference on a data point the model hasn't seen before:
      return this.model.predict(tf.tensor2d([5], [1, 1]));
      // return model.predict(tensor);
  }
}
export default Cnn;
