import React, { Component } from 'react';
import Cnn from "./ML/Cnn"
import ModalFileUploaderWrapped from './Components/ModalFileUploader'
import ModalAvailableDatasetsWrapped from './Components/ModalAvailableDatasets'

class NN extends Component{
  constructor(props){
    super(props)
    this.state = {
      "status":"untrained"
    }
    this.trainModel = this.trainModel.bind(this);
  }
  trainModel(e){
    let cnn = new Cnn()
    cnn.init();
    this.setState({
      "status":"progress"
    })
    cnn.fit().then(()=>{
      let res = cnn.predict(null);
      res.data().then(res=>{
        this.setState({
          "status":"trained",
          "result": res[0]
        })
      })
    })
  }

  render() {
    let button = <h1>ERROR</h1>;
    if(this.state.status === "untrained"){
      button = <button onClick={this.trainModel}> Train the model </button>;
    }else if(this.state.status === "progress"){
      button = <h3>Training in progress</h3>;
    }else if(this.state.status === "trained"){
      button = <h3>{this.state.result}</h3>;
    }
    return(
      <div>
      <h1>Neural Nets</h1>
        {button}
        <div>
          <ModalFileUploaderWrapped/>
        </div>
        <div>
          <ModalAvailableDatasetsWrapped/>
        </div>
      </div>

    )
  }
}
export default NN;
