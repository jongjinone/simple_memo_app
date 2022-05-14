import { useParams } from "react-router-dom"
import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import './Modify.css';

const MemoModify = () => {
    let { id } = useParams()
    const navigate = useNavigate()

    const tmp1 = localStorage.getItem("memoList")
    const tmp2 = JSON.parse(tmp1)
    const target = tmp2.find((x) => x.id == id)
    const idx = tmp2.findIndex((x)=>x.id==id)

    const [title, setTitle] = useState(target.title)
    const [content, setContent] = useState(target.content)

    const onTitleChange = (evt) => {
        setTitle(evt.target.value)
    }

    const onContentChange = (evt) => {
        setContent(evt.target.value)
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    }

    const GoBack = () => {
        navigate("/")
    }

    const Save = () => {
        const now = new Date()

        if (content === "") {
            alert("내용을 입력해주세요.")                    
            return
        }

        else if (title === "") {
            tmp2[idx]={                            
                title: "제목 없음",
                content: content,
                createdAt: now.toLocaleString()+"(수정됨)",
                id: parseInt(id)
            }
            
        }

        else {
            tmp2[idx]={                            
                title: title,
                content: content,
                createdAt: now.toLocaleString()+"(수정됨)",
                id: parseInt(id)
            }
        }
        localStorage.setItem("memoList", JSON.stringify(tmp2))         // key를 "memoList"의 문자열로 정하고, 다시 객체가 나열된 배열을 string 객체로 변환해줌

        alert("메모가 수정되었습니다.")
    }


    return (
        <div className="Container">
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                <TextField fullWidth label="Title" className="inputTitle" placeholder="title" onChange={(evt) => onTitleChange(evt)} value={title} />
            </Box>
            <Box sx={{ mt: 3, width: 1000, maxWidth: '100%', }}>
                <TextField multiline fullWidth label="Content" className="textContent" placeholder="content" onChange={(evt) => onContentChange(evt)} value={content} />
            </Box>
            <div className="Buttons">
            <Button sx={{ mt: 3 }} variant="outlined" onClick={handleClickOpen}>
                Modify
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Modify"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to modify your memo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => { Save(); handleClose(); GoBack() }} autoFocus>Yes</Button>
                    <Button onClick={handleClose}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Button sx={{ mt: 3, ml:3 }} variant="outlined" onClick={handleClickOpen2}>
                Go Back
            </Button>
            <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Go Back"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to Go Back to your memo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => {handleClose2(); GoBack() }} autoFocus>Yes</Button>
                    <Button onClick={handleClose2}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        </div>
    )
}

export default MemoModify