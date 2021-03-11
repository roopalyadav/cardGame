import React, { useEffect, useState } from "react";
import "./App.css";

const url = "https://pokeres.bastionbot.org/images/pokemon";

export default function App() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);

  const pokemons = [
    { id: 1, name: "balbasaur" },
    { id: 8, name: "wartotle" },
    { id: 9, name: "blastoise" },
    { id: 6, name: "charizard" }
  ];

  useEffect(() => {
    var id = setInterval(() => {
      setTime(time+1);
      
    }, 1*1000);

    if(matched.length===4)
    {
      clearInterval(id);
      alert(`Congratulation and time taken is ${time}sec`);
    }
    return () => {
      clearInterval(id)
    }
  }, [time, matched])

  const pairOfPokemons = [...pokemons, ...pokemons];

  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfPokemons[openedCard[0]];
    const secondMatched = pairOfPokemons[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedCard]);

  return (
    <div className="App">
      <div className="cards">
        {pairOfPokemons.map((pokemon, index) => {
          //lets flip the card

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;
          return (
            <div
              className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={`${url}/${pokemon.id}.png`}
                    alt="pokemon-name"
                    width="100"
                  />
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
