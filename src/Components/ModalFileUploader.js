import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone'

class ModalFileUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      uploading: false,
      items: 0
    }
    this.onImageDrop = this.onImageDrop.bind(this)
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
  onImageDrop(files){
    let a= 12;
  };

  render() {
   const { classes } = this.props;

   return (
     <div>
       <Button onClick={this.handleOpen}>Upload Files</Button>
       <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.state.open}
         disableBackdropClick="true"
         onClose={this.handleClose}
       >
         <div style={getModalStyle()} className={classes.paper}>
           <div className={classes.centerText}>
             <Typography variant="h6" id="modal-title" >
               Select images to upload
             </Typography>
           </div>
           <div className={classes.uploadZone}>
             <Dropzone
              accept="image/*"
              onDrop={(files) => this.onImageDrop(files)}>
              <div className={classes.centerText}>Drop an image or click to select a file to upload.</div>
             </Dropzone>
           </div>
           <div className={classes.bottomRow}>
             <Button variant="outlined" color="secondary" className={classes.button}>
               Cancel
             </Button>
             <Button variant="outlined" color="primary" className={classes.button}>
               Done
             </Button>
          </div>
         </div>
       </Modal>
     </div>
   );
 }

}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '70vw',
    height:'60vh',
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

  }
});

ModalFileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ModalFileUploaderWrapped = withStyles(styles)(ModalFileUploader);

export default ModalFileUploaderWrapped;
