import React, {useState} from 'react'


import Dialog  from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



export default function CustomerDelete(props) {

    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }



    const {customer, onRefresh} = props;
    const handleDelete = async () => {
        const url = "/api/customers/" + customer.id;
        await fetch(url, {method:'DELETE'});

        console.log("url", url);

        onRefresh();

    }
    return (
        <div>
            <Button varaiant="outlined" color="secondary" onClick={handleModalOpen}>삭제하기</Button>
            <Dialog open={open} onClose={handleModalClose} >
                <DialogTitle>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 것이 삭제됩니다.
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={() => { handleDelete(); handleModalClose();}}> 삭제</Button>
                    <Button variant="outlined" color="secondary" onClick={handleModalClose}> 닫기</Button>

                </DialogActions>
            </Dialog>

            
        </div>
    )
}
