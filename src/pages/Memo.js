import './Memo.css';
import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function Memo() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentTab, setCurrentTab] = useState('write')
  const [memoList, setMemoList] = useState(()=>{
    const saved = localStorage.getItem("memoList")             //localStorage는 브라우저에 기록을 저장하는 역할. "A"(key) : "B"(value)의 형태로 저장함. getItem("A")실행 시 "B" 형태로 문자열을 가져옴.
    return JSON.parse(saved) || []            // saved는 배열안에 객체들이 나열된 형태의 문자열로 저장되어 있음. ex) "[{a:"A"},{b:"B"}, ...]" 따라서 이 문자열을 parse해주면 객체화가 되어. 바깥쪽의 ""가 사라짐.
  })

  const onTitleChange = (evt) => {
    setTitle(evt.target.value)
  }

  const onContentChange = (evt) => {
    setContent(evt.target.value)
  }

  const SaveData = () => {
    const now = new Date()
    const saved = localStorage.getItem("memoList")
    const currentMemoList = JSON.parse(saved) || []

    if (content === "") {
      alert("내용을 입력해주세요.")                     // content의 내용이 없는 경우 알림창과 함께 저장하지 못하도록 바로 돌아간다.
      return
    }

    else if (title === "") {
      currentMemoList.push({                             // content의 내용은 있지만 제목이 없는 경우
        title: "제목 없음",
        content: content,
        createdAt: now.toLocaleString(),
        id: parseInt(Math.random() * 10000)
      })
    }

    else {
      currentMemoList.push({                             // currentMemoList는 현재 객체들이 나열되어있는 배열
        title: title,
        content: content,
        createdAt: now.toLocaleString(),
        id: parseInt(Math.random() * 10000)
      })
    }
    localStorage.setItem("memoList", JSON.stringify(currentMemoList))         // key를 "memoList"의 문자열로 정하고, 다시 객체가 나열된 배열을 string 객체로 변환해줌

    alert("메모가 저장되었습니다.")
    setCurrentTab('list')
  }

  const list = JSON.parse(localStorage.getItem("memoList"))

  const Reset = () => {
    setTitle("")
    setContent("")
  }

  const ModifyData = (id) => {
    navigate("/modify/" + id)
  }

  const DeletData = (id) => {
    const arr = JSON.parse(localStorage.getItem("memoList"))
    const idx = arr.findIndex((x)=>x.id == id)
    arr.splice(idx, 1)
    localStorage.setItem("memoList", JSON.stringify(arr))
    setMemoList(arr)
  }

  const ResetAll = () => {
    localStorage.setItem("memoList", JSON.stringify([]))
    setMemoList([])
  }

  const [openS, setOpenS] = React.useState(false);
  const [openR, setOpenR] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpenS(true);
  };

  const handleClose1 = () => {
    setOpenS(false);
  }

  const handleClickOpen2 = () => {
    setOpenR(true);
  };

  const handleClose2 = () => {
    setOpenR(false);
  }

  return (
    <div className="App">
      <div className="ChoiceButton">
        <ButtonGroup sx={{ width: 300, mb: 2, }} size="large" variant="outlined" aria-label="outlined primary button group">
          <Button className={`TabBtn ${currentTab === "write" ? "active" : ""}`} onClick={(evt) => { setCurrentTab('write'); Reset() }}>Write</Button>  {/* className 조건에 따른 active 활용법 */}
          <Button className={`TabBtn ${currentTab === "list" ? "active" : ""}`} onClick={(evt) => setCurrentTab('list')}>Your List</Button>
        </ButtonGroup>
      </div>
      {currentTab === "write" && <div className='writing'>                                                     {/* &&연산자는 if문과 같이 사용할 수 있다. */}
        <Box sx={{ width: 500, maxWidth: '100%' }}>
          <TextField fullWidth label="Title" className="inputTitle" placeholder="title" onChange={(evt) => onTitleChange(evt)} value={title} />
        </Box>
        <Box sx={{ mt:3, width: 1000, maxWidth: '100%', }}>
          <TextField multiline fullWidth label="Content" className="textContent" placeholder="content" onChange={(evt) => onContentChange(evt)} value={content} />
        </Box>

        <div className='Buttons'>
          <Button variant="outlined" onClick={handleClickOpen1}>
            Save
          </Button>
          <Dialog open={openS} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Save"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to save your memo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => { SaveData(); handleClose1() }} autoFocus>Yes</Button>
              <Button onClick={handleClose1}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className='Buttons'>
          <Button variant="outlined" onClick={handleClickOpen2}>
            reset
          </Button>
          <Dialog open={openR} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Reset"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to reset your memo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => { Reset(); handleClose2() }} autoFocus>Yes</Button>
              <Button onClick={handleClose2}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </div>}
      {currentTab === "list" &&
        <div className='container'>
          {list.map((obj) => {
            {/* map의 사용방법은 변수.mpa( ()=>{} ) 형태를 활용 */ }
            return (<>

              <div className='record'>



                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography><div className='posting'><h3>{obj.title}</h3></div></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div className='posting'>{obj.content}</div>
                        <div className='posting'><b>{obj.createdAt}</b></div>
                        <button className="button" onClick={(evt) => ModifyData(obj.id)}>modify</button>
                        <button className="button" onClick={(evt) => DeletData(obj.id)}>delete</button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>

            </>)
          }
          )}
          <div className='Button'>
          <Button variant="outlined" onClick={handleClickOpen2}>
            reset
          </Button>
          <Dialog open={openR} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Reset"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to reset your records?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => { ResetAll(); handleClose2() }} autoFocus>Yes</Button>
              <Button onClick={handleClose2}>
                No
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        </div>
      }
    </div>
  );
}
export default Memo;
