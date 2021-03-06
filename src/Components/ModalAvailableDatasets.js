import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import datasources from "../ML/Datasources";

class ModalAvailableDatasets extends Component{
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedSet: "",
      loading: false
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    var res = {
      open: false,
      loading: false
    }
    if(!this.state.loaded){
      res.selectedSet = "";
    }

    this.setState(res);
  };

  load = () =>{
    this.setState({
      loading: true,
    });
    var datasource= datasources.find(x=> x.name === this.state.selectedSet);
    datasource.getData().then(res=>{
      this.setState({ loaded: true })
      this.props.handleDataLoaded(res)
      // this.handleClose();
    }, err=>{
      alert('failed to load data')
      this.handleClose();

    })
  }
  handleItemSelect = event => {
    this.setState({ selectedSet: event.target.value });
  }

  datasourceItems () {
    return datasources.map( datasource => {return <MenuItem value={datasource.name} key={datasource.name}>{datasource.name}</MenuItem>})
  }

  render() {
    const { classes } = this.props;

    return(<div>
      <Button variant="contained" color="primary" onClick={this.handleOpen}>Select from Available Datasets</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        disableBackdropClick={this.state.loading}
      >
        <div className={classes.paper}>
          <div className={classes.centerText}>
            <Typography variant="subtitle1" id="modal-title" >
              Select Dataset
            </Typography>
          </div>
          {!this.state.loading ?
          <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Dataset">Data Set</InputLabel>
                <Select
                  value={this.state.selectedSet}
                  onChange={this.handleItemSelect}
                >
                {this.datasourceItems()}
                </Select>
          </FormControl> :
          <div className={classes.lpb}>
          <br></br>
            <LinearProgress />
          </div>
        }
          <div className={classes.bottomRow}>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outlined" color="primary"
              disabled = {this.state.selectedSet === "" || this.state.loading}
              className={classes.button} onClick={this.load}>
              Load
            </Button>
         </div>
        </div>
      </Modal>
    </div>)
  }
}

const styles = theme => ({
  paper: {
    top:'40%',
    left:'25%',
    position: 'absolute',
    width: '25vw',
    height: '10vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    'justify-content': 'space-between',
    'flex-direction': 'column',
    'display': 'flex'
  },
  button: {
    marginLeft: theme.spacing(1),
    display: 'flex'
  },
  bottomRow:{
    'justify-content': 'flex-end',
    'display': 'flex'
  },
  centerText:{
    'text-align': 'center'
  },
  uploadZone:{
    'align-items': 'center',
    'justify-content': 'center',
    'display':'flex'

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  lpb: {
    flexGrow: 1,
  },
});


ModalAvailableDatasets.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ModalAvailableDatasetsWrapped = withStyles(styles)(ModalAvailableDatasets);

export default ModalAvailableDatasetsWrapped;
