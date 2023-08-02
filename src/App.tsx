import { useEffect, useState } from 'react';
import { Card } from './components/Card';

type Card = {
  id: number;
  name: number;
};

const list: Card[] = [
  { id: 0, name: 1 },
  { id: 1, name: 2 },
  { id: 2, name: 3 },
  { id: 3, name: 4 },
  { id: 4, name: 5 },
  { id: 5, name: 1 },
  { id: 6, name: 2 },
  { id: 7, name: 3 },
  { id: 8, name: 4 },
  { id: 9, name: 5 },
];

const shuffle = list.sort(() => Math.random() - 0.5);

type Match = {
  a: Card;
  b: Card;
};

function App() {
  const [matches, setMatches] = useState<Card[]>([]);
  const [select, setSelect] = useState<Match>({
    a: { id: -1, name: 0 },
    b: { id: -1, name: 1 },
  });
  const cards = shuffle.map((card) => (
    <Card
      key={card.id}
      name={card.name}
      selected={select.a.id === card.id || select.b.id === card.id}
      matched={matches.filter((c) => c.id === card.id).length === 1}
      onClick={() => {
        const t = select;
        if (t.a.id === -1) t.a = card;
        else if (t.b.id === -1) t.b = card;
        else {
          t.a = card;
          t.b = { id: -1, name: 1 };
        }
        if (t.a.id !== -1 && t.b.id !== -1 && t.a.name === t.b.name)
          setMatches([...matches, t.a, t.b]);
        setSelect((select) => ({ ...select, ...t }));
        console.log('Selected:', card.id, card.name);
      }}
    />
  ));

  useEffect(() => {
    console.log('select:', select, 'matches:', matches);
  }, [select, matches]);

  return (
    <div className="p-2 grid grid-rows-[1fr_9fr] h-screen mx-auto container">
      <div className="text-center">
        <h1>Match Game</h1>
        <h2>Total: {matches.length / 2}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 place-content-stretch bg-green-500">
        {cards}
      </div>
    </div>
  );
}

export default App;
