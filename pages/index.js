import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
    const [userInput, setUserInput] = useState('');
    const onUserChangedText = (event) => {
      console.log(event.target.value);
      setUserInput(event.target.value);
    };
    const [apiOutput, setApiOutput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const callGenerateEndpoint = async () => {
      setIsGenerating(true);
      console.log(JSON.stringify({userInput}))
              console.log(userInput)



  console.log("Calling OpenAI...")
        const usrinput ="recommend the most efficient tax saving schemes and breakdown of his salary and taxes and all other deductions for a salaried employee based on the his given salary , country , martial status, age and please do output the result in his language of preference. Make sure its accurate."
            +userInput

        // const input = {userInput : "recommend the most efficient tax saving schemes and breakdown of his salary and taxes and all other deductions for a salaried employee based on the his given \n" +
        //     "salary , country , martial status, age and please do output the result in his language of preference. Make sure its accurate. \n" +
        //     "salary : 140000 ; country: Germany;  age: 27 ; martial status: single; \n" +
        //     "language: English"}
        console.log(JSON.stringify({usrinput}))

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({usrinput}),
  });
  const data = await response.json();
  const { output } = data;
console.log(output)
  console.log("OpenAI replied...", output.text2)
console.log(output.text+output.text2)
  setApiOutput(`${output.text}+${output.text2}`);
  setIsGenerating(false);
}
  return (
    <div className="root">
      <Head>
        <title>IncomePal</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>IncomePal</h1>
          </div>
          <div className="header-subtitle">
            <h2>Personalized Tax saving tips and Net income calculator in your preferred language </h2>
              <h4> Example: salary :100000 ; country: India;  Age: 32; martial status: single; language: English </h4>
          </div>
        </div>
          <div className="prompt-container">
              <textarea
                  className="prompt-box"
                  placeholder="Please provide your
                  Salary,
                  Country,
                  Age,
                  Martial status,
                  Preferred Language"
                  value={userInput}
                  onChange={onUserChangedText}
              />;
            <div className="prompt-buttons">
              <a
                className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
          </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          {/*<div className="badge">*/}
          {/*  <Image src={buildspaceLogo} alt="buildspace logo" />*/}
          {/*  <p>build with buildspace</p>*/}
          {/*</div>*/}
        </a>
      </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;
