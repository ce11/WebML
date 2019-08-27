var calcNetSize = function(net) {
    let netCopy = JSON.parse(JSON.stringify(net));
    // calculate number of nodes
    for (let i = 0; i < netCopy.length; i++) {
        if (!netCopy[i].units) {
            continue;
        }
        // find input size
        let inputShape;
        if (netCopy[i].inputShape) {
            inputShape = netCopy[i].inputShape
        } else if (netCopy[i - 1].units) {
            inputShape = netCopy[i - 1].units;
        } else {
            throw new Error('failed to get previous layer shape');
        }
        //get layer action to determine size
        // TODO: build for all conv types, should be same logic
        if (netCopy.type === 'conv2d') {
            let findConvSize = (volume, kernel, padding = 0, stride = 1) => {
                return (volume - kernel + 2 * padding) / stride + 1;
            }
            netCopy.units = inputShape.map(x => findConvSize(x, netCopy[i].kernel, netCopy[i].padding, netCopy[i].strides));
        } else if (netCopy.type === 'maxPooling2d') {
            let findMaxpoolSize = (volume, kernel, stride = 1) => {
                return (volume - kernel) / stride + 1;
            }
            netCopy.units = inputShape.map(x => findMaxpoolSize(x, netCopy[i].kernel, netCopy[i].strides));

        } else if (netCopy.type === 'flatten') {
            let currentValue = 1;
            inputShape.reduce((x, currentValue) => x * currentValue, 1);
            netCopy.units = [currentValue, 1];
        }
    }
}
module.exports.calcNetSize = calcNetSize
