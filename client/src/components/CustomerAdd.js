import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Dialog  from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({
    hidden: {
        display:'none'
    }
})

const CustomerAdd = props => {

    const {classes} = props;

    const [formdata, setFormdata] = useState( {file:null, fileName:'', name:'' , birthday:'', gender:'', job:''} )
    const [open, setOpen] = useState(false);

    

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("handleSubmit");

        const url = "/api/customers";
        const formData = new FormData();
        formData.append('image', formdata.file);
        formData.append('name', formdata.name);
        formData.append('birthday', formdata.birthday);
        formData.append('gender', formdata.gender);
        formData.append('job', formdata.job);

        const config = { headers: { 'content-type': 'multipart/form-data'} }
        const result = await axios.post( url, formData, config);

        setFormdata( {file:null, fileName:'', name:'' , birthday:'', gender:'', job:''} )
        console.log("result", result);

        props.onRefresh();
        handleModalClose();
    }
    const handleFileChange = e => {
        setFormdata( { ...formdata, file: e.target.files[0], fileName: e.target.value })

    }
    const handleValueChange = e => {
        setFormdata( {...formdata, [e.target.name]: e.target.value} );
    }

    


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleModalOpen}>
                고객 추가하기
            </Button>
            <Dialog open={open} onClose={handleModalClose} >
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" 
                            file={formdata.file} value={formdata.fileName}  onChange={handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary"  component="span" name="file">
                                {
                                    formdata.fileName === "" ? "선택화일이없어요" :  formdata.fileName
                                }
                            </Button>
                        </label>
                        <br/>
                        <TextField  label="name" name="name" value={formdata.name} onChange={handleValueChange}/><br/>
                        <TextField  label="birthday" name="birthday" value={formdata.birthday} onChange={handleValueChange}/><br/>
                        <TextField  label="성별" name="gender" value={formdata.gender} onChange={handleValueChange}/><br/>
                        <TextField  label="직업" name="job" value={formdata.job} onChange={handleValueChange}/><br/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit} >추가</Button>
                    <Button variant="contained" color="secondary" onClick={handleModalClose} >취소</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}


export default  withStyles(styles)( CustomerAdd );