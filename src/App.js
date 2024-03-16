
import './App.css';
import { useState , useEffect } from 'react';

function App() {
  const [qdata , setQData] = useState([]);
  const [idx , setIdx] = useState(0);
  const [score , setScore] = useState(0);
  

  async function callApi(){

    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then((e)=>e.json())
    .then((e) =>{
      const ans = e.results.map((p) =>{
        return {
          question : p.question,
          ans :  p.incorrect_answers,
          correct_answer : p.correct_answer
        }
      })
      console.log("api call");
      console.log("api", e);
      localStorage.setItem("dhar" , JSON.stringify(ans));
      setQData(ans);
      setIdx(0);
      setScore(0);
    })
  }


  useEffect(()=>{

    const data = localStorage.getItem("dhar");
    if(!data){
        callApi()
    }
    else {
      setQData(JSON.parse(data));
    }
    console.log(qdata);

  } ,[])
    
  const next = (e)=>{
      
      if(e === qdata[idx]?.correct_answer){
        setScore(score+1);
      }
      if(idx === 10){
        callApi();
      }
      setIdx(idx+1);
  }

  return (
    <div className="App">
            <div>
                <h1>{qdata[idx]?.question}</h1>
                <p onClick={ e =>next(e.target.textContent)}>{qdata[idx]?.ans[0]}</p>
                <p  onClick={ e =>next(e.target.textContent)}>{qdata[idx]?.ans[1]}</p>
                <p  onClick={ e =>next(e.target.textContent)}>{qdata[idx]?.ans[2]}</p>
                <p  onClick={ e =>next(e.target.textContent)}>{qdata[idx]?.correct_answer}</p>
                <button onClick={next}>Next Question</button>
                <p>Your score:{score}/{idx}</p>
            </div>
    </div>
  );
}

export default App;
