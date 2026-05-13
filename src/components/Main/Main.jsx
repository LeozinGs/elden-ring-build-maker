import { useState } from "react";
import SlotCard from "../SlotCard/SlotCard";
import "./Main.css";
import weapons from "../../json/weapons.json";
import armors from "../../json/armor_pieces.json";
import consumables from "../../json/consumables.json";
import talismans from "../../json/talismans.json";
import ashes from "../../json/ashes_of_war.json";
import crystalTears from "../../json/crystal_tears.json";
import magics from "../../json/sorceries_incantations.json";
import spirits from "../../json/spirit_ashes.json";

const Main = ({ attributes, setAttributes }) => {
  const headItems = armors.filter((item) => item.type === "helm");
  const chestItems = armors.filter((item) => item.type === "chest armor");
  const handsItems = armors.filter((item) => item.type === "gauntlets");
  const legsItems = armors.filter((item) => item.type === "leg armor");

  // Estado local apenas para a descrição
  const [description, setDescription] = useState("");

  // Função que atualiza o estado global recebido via props
  const handleAttributeChange = (attr, value) => {
    setAttributes((prev) => ({
      ...prev,
      [attr]: value === "" ? "" : parseInt(value, 10) || 0,
    }));
  };

  return (
    <main className="main">
      <div className="one">
        {Array.from({ length: 6 }).map((_, index) => (
          <SlotCard
            key={index}
            items={weapons}
            ashItems={ashes}
            className="weaponCard"
          />
        ))}
      </div>

      <div className="two">
        <SlotCard items={headItems} className="armorcard" />
        <SlotCard items={chestItems} className="armorcard" />
        <SlotCard items={handsItems} className="armorcard" />
        <SlotCard items={legsItems} className="armorcard" />
      </div>

      <div className="three">
        {Array.from({ length: 4 }).map((_, index) => (
          <SlotCard key={index} items={talismans} className="talismanscard" />
        ))}
      </div>

      <div className="four">
        {Array.from({ length: 10 }).map((_, index) => (
          <SlotCard
            key={index}
            items={consumables}
            className="consumablescard"
          />
        ))}
      </div>

      <div className="five">
        {Array.from({ length: 2 }).map((_, index) => (
          <SlotCard key={index} items={crystalTears} className="crystalscard" />
        ))}
      </div>

      <div className="six">
        {Array.from({ length: 8 }).map((_, index) => (
          <SlotCard key={index} items={magics} className="magicscard" />
        ))}
      </div>

      <div className="seven">
        {Array.from({ length: 1 }).map((_, index) => (
          <SlotCard key={index} items={spirits} className="spiritscard" />
        ))}
      </div>

      {/* Seção Oito: Descrição */}
      <div className="eight">
        <textarea
          placeholder="Describe your build..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-input"
        />
      </div>

      {/* Seção Nove: Atributos em uma única coluna */}
      <div className="nine">
        <div className="attributes-grid">
          {Object.keys(attributes).map((attr) => (
            <div key={attr} className="attribute-field">
              <label htmlFor={`attr-${attr}`}>{attr}</label>
              <input
                id={`attr-${attr}`}
                type="number"
                min="1"
                max="99"
                value={attributes[attr]}
                onChange={(e) => handleAttributeChange(attr, e.target.value)}
                className="attribute-input"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Main;
