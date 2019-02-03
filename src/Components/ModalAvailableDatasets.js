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
// import axios from 'axios';
import datasources from "../ML/Datasources";

class ModalAvailableDatasets extends Component{
  constructor(props) {
    console.log(datasources)
    super(props)
    this.state = {
      open: false,
      selectedSet: null,
      uploading: false
    }
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  load = () =>{
    this.setState({
      uploading: true,
    });
    // axios.get('https://api.github.com/users/maecapozzi').then(response => console.log(response))

  }
  handleItemSelect = event => {
    console.log(event.target)
    this.setState({ selectedSet: event.target.value });
  }

  function datasourceItem () {
    return datasources.map((datasource)=>{<MenuItem value={datasource}>{datasource.name}</MenuItem>})
  }
  render() {
    const { classes } = this.props;

    return(<div>
      <Button onClick={this.handleOpen}>Select from Available Datasets</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        disableBackdropClick={this.state.uploading}

      >
        <div className={classes.paper}>
          <div className={classes.centerText}>
            <Typography variant="h6" id="modal-title" >
              Select Dataset
            </Typography>
          </div>
          {!this.state.uploading ?
          <FormControl className={classes.formControl}>
                <InputLabel htmlFor="Dataset">Data Set</InputLabel>
                <Select
                  value={this.state.selectedSet}
                  onChange={this.handleItemSelect}
                  inputProps={{
                    name: 'dateset',
                    id: 'dataset',
                  }}
                >
                </Select>
          </FormControl> :
          <div className={classes.lpb}>
            <h3>Loading....</h3>
            <LinearProgress />
          </div>
        }
          <div className={classes.bottomRow}>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="outlined" color="primary"
              disabled = {this.state.selectedSet == null || this.state.uploading}
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
    padding: theme.spacing.unit * 4,
    'justify-content': 'space-between',
    'flex-direction': 'column',
    'display': 'flex'
  },
  button: {
    margin: theme.spacing.unit,
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
    margin: theme.spacing.unit,
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
