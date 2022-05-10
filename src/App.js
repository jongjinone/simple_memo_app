import './App.css';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [buttonState, setButtonState] = useState("green")
  const [memoList, setMemoList] = useState([])
  const [currentTab, setCurrentTab] = useState('write')

  const onTitleChange = (evt) => {
    console.log(evt.target.value)
    setTitle(evt.target.value)
  }

  const onContentChange = (evt) => {
    console.log(evt.target.value)
    setContent(evt.target.value)
  }


  const SaveData = () => {
    if (buttonState == "green") {
      setButtonState("yellow")
    } else {
      setButtonState("green")
    }

    const cp = [...memoList]
    cp.push({
      title: title,
      content: content,
      createdAt: "2020"
    })

    setMemoList(cp)
    alert("메모가 저장되었습니다.")
    setCurrentTab('list')


  }

  return (
    <div className="App">

      <div className="ChoiceButton">
        <div className={`TabBtn ${currentTab === "write" ? "active" : ""}`} onClick={(evt) => setCurrentTab('write')}>write</div>
        <div className={`TabBtn ${currentTab === "list" ? "active" : ""}`} onClick={(evt) => setCurrentTab('list')}> list </div>
      </div>

      {currentTab === "write" && <div>
        <input className="input" placeholder="title" onChange={(evt) => onTitleChange(evt)} />
        <input className="input" placeholder="content" onChange={(evt) => onContentChange(evt)} />
        <button className="button" onClick={(evt) => SaveData()}>save</button>
      </div>}

      {currentTab ==="list" &&
      <div>
      {memoList.map((obj) => {
        return (
          <div>
            <div >{obj.title}</div>
            <div>{obj.content}</div>
          </div>)
      }
      )}
    </div>
      }

    </div>
  );
}

export default App;
