import * as tf from '@tensorflow/tfjs';

export class DefaultNetBuilder{
    static createDenseModel(w, h) {
      const model = tf.sequential();
      model.add(tf.layers.flatten({
        inputShape: [h, w, 1]
      }));
      model.add(tf.layers.dense({
        units: 42,
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

    static createConvModel(w, h) {
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
