import './App.css';
import { useState , useEffect, useRef } from 'react';

function App() {
  const [qdata , setQData] = useState([]);
  const [idx , setIdx] = useState(0);
  const [score , setScore] = useState(0);
  const [ansId , setAnsId] = useState(0);
  const [wrong , setWront] = useState([]);

  const ans0 = useRef(null);
  const ans1 = useRef(null);
  const ans2 = useRef(null);
  const ans3 = useRef(null);
  

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
      setWront([]);
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


  //  set random correct anser

  const setAnser = () => {

    const anserNumber = '0123';
    const anserid = Math.floor(Math.random() * anserNumber.length);

    setAnsId(3 - anserid);

    qdata[idx  + 1]?.ans.push(qdata[idx + 1].correct_answer);


    for(let i = 0; i < anserid; i++){
        
        let ans =  qdata[idx  + 1]?.ans.shift();

        console.log(ans);

        qdata[idx  + 1]?.ans.push(ans);

      }

  }


  // show correct anser by changing background color

  const correctAnserShow = () => {

    if(ansId == 0){
      ans0.current.style.backgroundColor = 'rgb(128,255,149)';
    }
    else if(ansId == 1){
      ans1.current.style.backgroundColor = 'rgb(128,255,149)';
    }
    else if(ansId == 2){
      ans2.current.style.backgroundColor = 'rgb(128,255,149)';
    }
    else  if(ansId == 3){
      ans3.current.style.backgroundColor = 'rgb(128,255,149)';
    }

  }
    
   // chacking anser is correct or not 


  const next = (e , ref)=>{

    if(ref)ref.current.style.backgroundColor = 'rgb(255,102,102)'

    if(idx !== 10){
      
      correctAnserShow()
      setAnser();
    }
    console.log(e);
      if(e === qdata[idx]?.correct_answer){
        setScore(score+1);
      }
      else {
        const a = {
          q:qdata[idx]?.question,
          a:qdata[idx]?.correct_answer,
        }
        setWront([...wrong , a]);
        console.log(wrong);
      }
      if(idx === 10){
        callApi();
      }
      // Delay the increase of idx by 2 seconds
  setTimeout(() => {
    setIdx(idx + 1);
    ans3.current.style.backgroundColor = 'white';
    ans1.current.style.backgroundColor = 'white';
    ans2.current.style.backgroundColor = 'white';
    ans0.current.style.backgroundColor = 'white';
  }, 2000);
  }

  return (
    <div className="App flex items-center justify-center mt-64">
            <div className=' shadow-md p-16' >
                
                  
                
                
                { idx!==10 ? <div>

                  <h1 className=' text-2xl font-semibold mb-5'>Q. :- {qdata[idx]?.question}</h1>
                
                {/* {
                qdata[idx]?.ans?.map((e) =>  {return(
                    <p  onClick={ e =>next(e.target.textContent)}>{e}</p>
                )})
                } */}

                <div className=' flex items-center justify-center'>
                  <div>
                    <div className=' shadow-lg px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500' ref={ans0} onClick={ e =>next(e.target.textContent , ans0)}>
                      <span>{qdata[idx]?.ans[0]}</span>
                    </div>
                  <p className=' shadow-lg px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500' ref={ans1}  onClick={ e =>next(e.target.textContent , ans1)}>{qdata[idx]?.ans[1]}</p>
                  </div>
                  <div>
                  <p  className=' shadow-lg px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500' ref={ans2} onClick={ e =>next(e.target.textContent , ans2)}>{qdata[idx]?.ans[2]}</p>
                  <p  className=' shadow-lg px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500' ref={ans3} onClick={ e =>next(e.target.textContent , ans3)}>{qdata[idx]?.ans[3] ? qdata[idx]?.ans[3] : qdata[idx]?.correct_answer}</p>
                  </div>

                  </div>

                  <button className=' text-xl font-semibold px-8 py-3 my-6 bg-blue-400 rounded-md ' onClick={next}>Next Question</button>
                  </div> : <div>
                  {
                    wrong.map((e)=>{return(
                      <div className='shadow-lg'>
                            <p className=' font-semibold text-xl px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500'>Q:- {e.q}</p>
                            <p className='  px-8 py-3 text-lg mx-3 my-6 min-w-72 cursor-pointer hover:bg-orange-300 duration-500'>Ans:- {e.a}</p>
                            <hr />
                      </div>
                    )})
                  }
                  <button className=' text-xl font-semibold px-8 py-3 my-16 bg-blue-400 rounded-md ' onClick={()=> callApi()}>Next Game</button>
                  </div>}
                <p className=' text-xl font-semibold px-8 py-3 ' >Your score:{score}/{idx}</p>
            </div>
    </div>
  );
}

export default App;
