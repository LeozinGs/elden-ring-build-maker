import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";

const App = () => {
  // Estado global dos atributos compartilhado entre Header e Main
  const [attributes, setAttributes] = useState({
    Vigor: 10,
    Mind: 10,
    Endurance: 10,
    Strength: 10,
    Dexterity: 10,
    Intelligence: 10,
    Faith: 10,
    Arcane: 10,
  });

  return (
    <>
      <Header attributes={attributes} />
      <Main attributes={attributes} setAttributes={setAttributes} />
    </>
  );
};

export default App;
