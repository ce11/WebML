import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Cnn from '../ML/Cnn'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {DefaultNets} from '../ML/DefaultNets'
import {withStyles} from '@material-ui/core/styles';
import {Container} from '@material-ui/core'
import {NNViewer} from '../Workflow/NNViewer'
class NNBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            netType: "",
            batchSize: 320,
            validationSplit: 0.15,
            trainEpochs: 3
        }

        this.presetModels = {
            "conv2d": this.setConv2d,
            "dense": this.setDenseModel
        }
        this.setConv2d = this.setConv2d.bind(this);
        this.setNetType = this.setNetType.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this)
    }
    handleFieldUpdate = name => evt => {
        let obj = {}
        obj[name] = evt.target.value
        this.setState(obj)
    }
    setConv2d(data, batchSize, validationSplit, trainEpochs) {
        return new Cnn(DefaultNets.createConvNet(data.w, data.h), batchSize,
            validationSplit, trainEpochs);
    }
    setDenseModel(data, batchSize, validationSplit, trainEpochs) {
        return new Cnn(DefaultNets.createDenseNet(data.w, data.h),
            batchSize, validationSplit, trainEpochs);
    }
    setNetType(evt) {
        let model = this.presetModels[evt.target.value](this.props.data,
            this.state.batchSize, this.state.validationSplit,
            this.state.trainEpochs)
        this.setState({
            netType: evt.target.value,
            net: model.model
        })
        this.props.handleNetBuilt(model);

    }


    render() {
        const {classes} = this.props;

        return (
            <div>
            <Container className={classes.container}>
                <InputLabel>Select Net Type</InputLabel>
                <Select
                    className={classes.textField}
                    value={this.state.netType}
                    onChange={this.setNetType}
                    >
                    {Object.keys(this.presetModels).map(x => {return <MenuItem key={x} value={x} >{x}</MenuItem>})}
                </Select>
                <TextField
                   id="batchSize"
                   label="Batch Size"
                   value={this.state.batchSize}
                   onChange={this.handleFieldUpdate('batchSize')}
                   type="number"
                   className={classes.textField}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   margin="normal"
                 />
                 <TextField
                   id="validationSplit"
                   label="Validation Split"
                   inputProps={{ min: "0", max: "1", step: "0.05" }}
                   value={this.state.validationSplit}
                   onChange={this.handleFieldUpdate('validationSplit')}
                   type="number"
                   className={classes.textField}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   margin="normal"
                 />
                 <TextField
                   id="trainEpochs"
                   label="Train Epochs"
                   value={this.state.trainEpochs}
                   onChange={this.handleFieldUpdate('trainEpochs')}
                   type="number"
                   className={classes.textField}
                   InputLabelProps={{
                     shrink: true,
                   }}
                   margin="normal"
                 />
                 </Container>
                 <Container>
                    <NNViewer net = {this.state.net} />
                 </Container>
            </div>
        )
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
});

export default withStyles(styles)(NNBuilder);
