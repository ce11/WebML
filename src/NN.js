import React, { Component } from 'react';
import Cnn from "./ML/Cnn"
import ModalFileUploaderWrapped from './Components/ModalFileUploader'
import ModalAvailableDatasetsWrapped from './Components/ModalAvailableDatasets'
import * as tf from '@tensorflow/tfjs';

class NN extends Component{
  constructor(props){
    super(props)
    this.state = {
      "status":"untrained",
      "data":null
    }
    this.trainModel = this.trainModel.bind(this);
    this.handleDataLoaded = this.handleDataLoaded.bind(this)
  }
  batchEndCb(percentComplete){
    console.log("completed: "+percentComplete + "%");
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
      // let res = cnn.predict(null);
      // res.data().then(res=>{
      //   this.setState({
      //     "status":"trained",
      //     "result": res[0]
      //   })
      // })
    })
  }

  handleDataLoaded(data){
    this.setState({
      data:data
    })
  }

  render() {
    let button = <h1>ERROR</h1>;
    if(this.state.status === "untrained"){
      button = <button  onClick={this.trainModel}> Train the model </button>;
    }else if(this.state.status === "progress"){
      button = <h3>Training in progress</h3>;
    }else if(this.state.status === "trained"){
      button = <h3>{this.state.result}</h3>;
    }

    return(
      <div>
      <h1>Neural Nets</h1>
        {this.state.data == null ?
          <div>
              <ModalFileUploaderWrapped/>
              <ModalAvailableDatasetsWrapped handleDataLoaded={this.handleDataLoaded}/>
          </div> : button}

      </div>

    )
  }
}
export default NN;
