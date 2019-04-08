import React, { Component } from 'react';
import Cnn from "./ML/Cnn"
import ModalFileUploaderWrapped from './Components/ModalFileUploader'
import ModalAvailableDatasetsWrapped from './Components/ModalAvailableDatasets'
import * as tf from '@tensorflow/tfjs';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NN extends Component{
  constructor(props){
    super(props)
    this.state = {
      "status":"untrained",
      "data":null,
      "trainCompleted" : 0
    }
    this.trainModel = this.trainModel.bind(this);
    this.handleDataLoaded = this.handleDataLoaded.bind(this);
    this.batchEndCb = this.batchEndCb.bind(this);
  }
  batchEndCb(percentComplete){
    this.setState({"trainCompleted": percentComplete})
  }
  epochEndCb(status){
    console.log(status);
  }
  trainModel(e){
    let cnn = new Cnn()
    cnn.init(this.state.data.w, this.state.data.h);
    this.setState({
      "status":"progress"
    })
    let tensorXs = tf.tensor4d(
        this.state.data.inputs,
        [this.state.data.inputs.length / (this.state.data.h * this.state.data.w),
          this.state.data.h, this.state.data.w, 1]);
    let tensorYs = tf.tensor2d(
        this.state.data.labels, [this.state.data.labels.length, this.state.data.classes]);
    cnn.fit(tensorXs, tensorYs, this.batchEndCb, this.epochEndCb).then((res)=>{
      this.setState({"status":"trained", "result":"done"})
    })
  }

  handleDataLoaded(data){
    this.setState({
      data:data
    })
  }

  render() {
    let button = <Typography  style={{textAlign: 'center'}} variant="subtitle1">ERROR</Typography>;
    if(this.state.status === "untrained"){
      button = <Button variant="contained" color="primary" onClick={this.trainModel}> Train the model </Button>;
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
