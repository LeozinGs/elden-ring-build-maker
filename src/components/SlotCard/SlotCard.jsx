// import { useState } from "react";
// import "./SlotCard.css";
// import weapons from "../../json/weapons.json";

// export default function SlotCard({ ...props }) {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [open, setOpen] = useState(false);
//   const items = ["Sword", "Shield", "Helmet", "Armor"];

//   function handleSelect(item) {
//     setSelectedItem(item);
//     setOpen(false);
//   }

//   function handleRemove() {
//     setSelectedItem(null);
//     setOpen(false);
//   }

//   return (
//     <>
//       <div className="slotCard" {...props} onClick={() => setOpen(true)}>
//         {selectedItem || "Selecionar Item"}
//       </div>

//       {open && (
//         <div className="modalOverlay" onClick={() => setOpen(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modalHeader">Selecionar Item</div>

//             <div className="modalContent">
//               {items.map((item) => (
//                 <button
//                   key={item}
//                   className="itemButton"
//                   onClick={() => handleSelect(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>

//             {selectedItem && (
//               <button className="removeModalButton" onClick={handleRemove}>
//                 Remover item selecionado ({selectedItem})
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useMemo, useState } from "react";
import "./SlotCard.css";

export default function SlotCard({
  items = [],
  ashItems = [],
  className = "",
  ...props
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAsh, setSelectedAsh] = useState(null);

  const [open, setOpen] = useState(false);
  const [ashOpen, setAshOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [ashSearch, setAshSearch] = useState("");

  function handleSelect(item) {
    setSelectedItem(item);
    setOpen(false);
    setSearch("");
  }

  function handleAshSelect(item) {
    setSelectedAsh(item);
    setAshOpen(false);
    setAshSearch("");
  }

  function handleRemove(e) {
    e.stopPropagation();
    setSelectedItem(null);
    setSelectedAsh(null);
    setOpen(false);
  }

  function handleRemoveAsh() {
    setSelectedAsh(null);
    setAshOpen(false);
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  const filteredAshes = useMemo(() => {
    return ashItems.filter((item) =>
      item.name.toLowerCase().includes(ashSearch.toLowerCase()),
    );
  }, [ashItems, ashSearch]);

  return (
    <>
      <div
        className={`slotCard ${className}`}
        {...props}
        onClick={() => setOpen(true)}
      >
        {selectedItem ? (
          <div className="selectedContent">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="slotImage"
            />

            <span className="slotName">{selectedItem.name}</span>

            {ashItems.length > 0 && (
              <div
                className="ashSlot"
                onClick={(e) => {
                  e.stopPropagation();
                  setAshOpen(true);
                }}
              >
                {selectedAsh ? (
                  <img
                    src={selectedAsh.image}
                    alt={selectedAsh.name}
                    className="ashImage"
                  />
                ) : (
                  "+"
                )}
              </div>
            )}
          </div>
        ) : (
          <span className="placeholderText">+</span>
        )}
      </div>

      {open && (
        <div className="modalOverlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">Choose one Item</div>

            <div className="searchContainer">
              <input
                type="text"
                placeholder="Search item..."
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="modalContent">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="itemCard"
                  onClick={() => handleSelect(item)}
                >
                  <img src={item.image} alt={item.name} className="cardImage" />

                  <span className="cardName">{item.name}</span>
                </div>
              ))}
            </div>

            {selectedItem && (
              <button className="removeModalButton" onClick={handleRemove}>
                Remove: {selectedItem.name}
              </button>
            )}
          </div>
        </div>
      )}

      {ashOpen && (
        <div className="modalOverlay" onClick={() => setAshOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">Choose Ash of War</div>

            <div className="searchContainer">
              <input
                type="text"
                placeholder="Search ash..."
                className="searchInput"
                value={ashSearch}
                onChange={(e) => setAshSearch(e.target.value)}
              />
            </div>

            <div className="modalContent">
              {filteredAshes.map((item) => (
                <div
                  key={item.id}
                  className="itemCard"
                  onClick={() => handleAshSelect(item)}
                >
                  <img src={item.image} alt={item.name} className="cardImage" />

                  <span className="cardName">{item.name}</span>
                </div>
              ))}
            </div>

            {selectedAsh && (
              <button className="removeModalButton" onClick={handleRemoveAsh}>
                Remove: {selectedAsh.name}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
