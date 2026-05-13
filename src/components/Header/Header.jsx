import "./Header.css";
import avatar from "../../assets/avatar.png";
import Container from "../Container/Container";
import { useState } from "react";
import Sum from "../Sum/Sum";
import Button from "../Button/Button";

const Header = ({ attributes }) => {
  const [buildName, setBuildName] = useState("");

  return (
    <header className="header">
      <Container
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <img src={avatar} alt="avatar" id="avatar" />
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: ".7rem",
          }}
        >
          <input
            className="buildNameInput"
            type="text"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            placeholder="Build name"
          />
          <p className="buildLevel">
            Level: <Sum attributes={attributes} />
          </p>
        </Container>
      </Container>
      <Button className="exportButton hide-on-print">
        <span className="material-symbols-outlined">file_export</span>
        Download
      </Button>
    </header>
  );
};

export default Header;
