import React, {useState, useEffect} from "react"
import CenterLayout from "../components/layout"
import "../styles/index.css"
import {RgbColorPicker} from 'react-colorful'

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
}

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const dotw = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let stimBucket = [];
let finalBucket = [];

// markup
const IndexPage = () => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    return renderPage(pageIndex);
  }, [pageIndex])

  function renderPage(page) {
    switch (page) {
      case 0:
        return <StartPage setPageIndex={setPageIndex}/>
      case 1:
        return <TestPage/>
      default:
        return <StartPage setPageIndex={setPageIndex}/>
    }
  }

  return (
    renderPage(pageIndex)
  );
}

const StartPage = ({setPageIndex}) => {
  const [letterActive, setLetterActive] = useState(0);
  const [numberActive, setNumberActive] = useState(0);
  const [dotwActive, setDotwActive] = useState(0);
  const [monthActive, setMonthActive] = useState(0);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if(letterActive || numberActive || dotwActive || monthActive){
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }, [letterActive, numberActive, dotwActive,monthActive]);

  function startClicked() {
    makeBucket();
    setPageIndex(1);
  }

  function makeBucket() {
    if(letterActive) {
      stimBucket.push(...letters);
    }
    if(numberActive) {
      stimBucket.push(...numbers);
    }
    if(dotwActive) {
      stimBucket.push(...dotw);
    }
    if(monthActive) {
      stimBucket.push(...months);
    }

    finalBucket.push(...shuffle(stimBucket));
    finalBucket.push(...shuffle(stimBucket));
    finalBucket.push(...shuffle(stimBucket));

    console.log(finalBucket);
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return (
    <main className="background">
      <title>SynTest</title>
      <AppJumbotron title={"Select Stimuli"}/>
      <div className="stimuli">
        <StimulusButton title="Letters" setStimActive={setLetterActive}/>
        <StimulusButton title="Numbers" setStimActive={setNumberActive}/>
        <StimulusButton title="Days of the Week" setStimActive={setDotwActive}/>
        <StimulusButton title="Months" setStimActive={setMonthActive}/>
      </div>
      <div id="startButton">
        <button onClick={() => startClicked()} style={{"display": display}}>Start Test</button>
      </div>
    </main>
  );
}

const StimulusButton = ({title, setStimActive}) => {
  const [active, toggleActive] = useState(false);
  const [color, setColor] = useState("cornflowerblue");

  useEffect(() => {
    active ? setColor("green") : setColor("cornflowerblue");
    setStimActive(active);
  }, [active]);

  return (
    <button style={{"backgroundColor": color}} className="stimulus" onClick={() => toggleActive(active => !active)}>
      {title}
    </button>
  );
}

const AppJumbotron = ({title}) => {
  return (
    <CenterLayout>
      <div className="jumbotron">
        <h2>{title}</h2>
      </div>
    </CenterLayout>
  );
}

const TestPage = () => {
  const [text, onTextChange] = useState("");
  const [color, setColor] = useState("#ffffff");

  return (
    <main>
      <title>SynTest</title>
      <AppJumbotron title={"Choose the color you associate with each stimulus"}/>
      <div className="container">
        <RgbColorPicker id="picker" color={color} className="picker" onChange={setColor}/>
        <div className="stimArea">
          <div className="stimDiv">
            <h1 className="stimulusText">{text}</h1>
          </div>
          <div className="color-box" style={{"backgroundColor": color}}/>
        </div>
      </div>
    </main>
  );
}

export default IndexPage
