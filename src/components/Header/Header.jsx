import "./Header.css";
import avatar from "../../assets/avatar.png";
import Container from "../Container/Container";
import { useState } from "react";
import Sum from "../Sum/Sum";
import Button from "../Button/Button";

const Header = ({ attributes }) => {
  const [buildName, setBuildName] = useState("");
  const [discordName, setDiscordName] = useState("");

  return (
    <header className="header">
      <div className="leftSide">
        <img src={avatar} alt="avatar" id="avatar" />

        {/* Este bloco organiza os inputs verticalmente */}
        <div className="buildInfo">
          <input
            className="buildNameInput"
            type="text"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            placeholder="Build name..."
          />

          <input
            className="discordNameInput"
            type="text"
            value={discordName}
            onChange={(e) => setDiscordName(e.target.value)}
            placeholder="Discord name..."
          />

          <p className="buildLevel">
            Level: <Sum attributes={attributes} />
          </p>
        </div>
      </div>

      <Button className="exportButton hide-on-print">
        <span className="material-symbols-outlined">upload</span>
        Send to Discord
      </Button>
    </header>
  );
};

export default Header;
