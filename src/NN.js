import React, { Component } from 'react';
import ModalFileUploaderWrapped from './Components/ModalFileUploader'
import ModalAvailableDatasetsWrapped from './Components/ModalAvailableDatasets'
import NNBuilder from './Components/NNBuilder'
import * as tf from '@tensorflow/tfjs';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as tfVis from '@tensorflow/tfjs-vis'
class NN extends Component{
  constructor(props){
    super(props)
    this.state = {
      "status":"untrained",
      "data":null,
      "trainCompleted" : 0,
      "network": null
    }
    this.tfVis = tfVis;
    this.trainModel = this.trainModel.bind(this);
    this.handleDataLoaded = this.handleDataLoaded.bind(this);
    this.batchEndCb = this.batchEndCb.bind(this);
    this.handleToggleVisualizer = this.handleToggleVisualizer.bind(this)
  }
  batchEndCb(percentComplete){
    this.setState({"trainCompleted": percentComplete})

  }
  epochEndCb(status){
    console.log(status);
  }
  trainModel(e){
    let net = this.state.network;
    this.setState({
      "status":"progress"
    })
    let tensorXs = tf.tensor4d(
        this.state.data.inputs,
        [this.state.data.inputs.length / (this.state.data.h * this.state.data.w),
          this.state.data.h, this.state.data.w, 1]);
    let tensorYs = tf.tensor2d(
        this.state.data.labels, [this.state.data.labels.length, this.state.data.classes]);
    let batchEnd = {
        'percentComplete' : this.batchEndCb,
    };
    let epochEnd = {
        'status': this.epochEndCb,
    }
    if(this.tfVis.visor().isOpen()){
        const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
        const container = {
          name: 'show.fitCallbacks',
          tab: 'Training',
          styles: {
            height: '1000px'
          }
        };
        let callBacks = this.tfVis.show.fitCallbacks(container, metrics);
        batchEnd.visual = callBacks.onBatchEnd;
        epochEnd.visual = callBacks.onEpochEnd;
    }
    net.fit(tensorXs, tensorYs, batchEnd, epochEnd).then((res)=>{
      this.setState({"status":"trained", "result":JSON.stringify(res.history)})
    })
  }

  handleDataLoaded(data){
    this.setState({
      data:data
    })
  }
  handleNetBuilt(net){
    this.setState({network:net})
  }
  handleToggleVisualizer(){
      this.tfVis.visor();
      if(!this.tfVis.visor().isOpen()){
          this.tfVis.visor().open()
      }
  }
  render() {
    let button = <Typography  style={{textAlign: 'center'}} variant="subtitle1">ERROR</Typography>;
    if(this.state.status === "untrained"){
      button =  <div>
      <NNBuilder data={this.state.data} handleNetBuilt={net => this.handleNetBuilt(net)}/>
      <br></br>
      <Button disabled={!this.state.network} variant="contained" color="primary" onClick={this.trainModel}> Train the model </Button>
      <Button onClick={this.handleToggleVisualizer}> Visualize </Button>
      </div>
    }else if(this.state.status === "progress"){
      button =  <div><LinearProgress variant="determinate" value={parseInt(this.state.trainCompleted)} />
        <br></br>
        <h4>completed: {parseInt(this.state.trainCompleted)}%</h4>
        </div>;
    }else if(this.state.status === "trained"){
      button = <h3>{this.state.result}</h3>;
    }
    return(
      <div>
      <div style={{justifyContent: 'center', flex: 1}}><Typography style={{textAlign: 'center'}} variant="h3">Neural Nets</Typography><br></br></div>
        {this.state.data === null ?
          <div>
              <ModalAvailableDatasetsWrapped handleDataLoaded={data => {
                this.setState({data:data})
              }}/>
              <br></br>
              <ModalFileUploaderWrapped/>

          </div>
          : button}
      </div>
    )
  }
}
export default NN;
