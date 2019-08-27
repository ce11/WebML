export class DefaultNets {
    static createDenseNet(h, w) {
        return [{
            type: 'flatten',
            inputShape: [h, w, 1]
        }, {
            type: 'dense',
            units: 42,
            activation: 'relu'
        }, {
            type: 'dense',
            units: 10,
            activation: 'softmax'
        }]
    }

    static createConvNet(h, w) {
        return [{
                type: 'conv2d',
                inputShape: [h, w, 1],
                kernelSize: 3,
                filters: 16,
                activation: 'relu'
            }, {
                type: 'maxPooling2d',
                poolSize: 2,
                strides: 2
            }, {
                type: 'conv2d',
                kernelSize: 3,
                filters: 32,
                activation: 'relu'
            }, {
                type: 'maxPooling2d',
                poolSize: 2,
                strides: 2
            },
            {
                type: 'conv2d',
                kernelSize: 3,
                filters: 32,
                activation: 'relu'
            }, {
                type: 'flatten'
            },
            {
                type: 'dense',
                units: 64,
                activation: 'relu'
            },
            {
                type: 'dense',
                units: 10,
                activation: 'softmax'
            }
        ]

    }

}
