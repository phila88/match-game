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
  { id: 5, name: 6 },
  { id: 6, name: 1 },
  { id: 7, name: 2 },
  { id: 8, name: 3 },
  { id: 9, name: 4 },
  { id: 10, name: 5 },
  { id: 11, name: 6 },
];

const shuffle = list.sort(() => Math.random() - 0.5);

type Match = {
  a: Card;
  b: Card;
};

function App() {
  const [state, setState] = useState<
    'pick1st' | 'pick2nd' | 'verify' | 'match'
  >('pick1st');
  const [matches, setMatches] = useState<Card[]>([]);
  const [pair, setPair] = useState<Match>({
    a: { id: -1, name: 0 },
    b: { id: -1, name: 1 },
  });
  const cards = shuffle.map((card) => (
    <Card
      key={card.id}
      name={card.name}
      selected={pair.a.id === card.id || pair.b.id === card.id}
      matched={matches.filter((c) => c.id === card.id).length === 1}
      onClick={() => {
        if (state === 'verify' || state === 'match' || card === pair.a) return;

        // Update pair
        const t = pair;
        if (state === 'pick1st') {
          t.a = card;
          setState('pick2nd');
        } else if (state === 'pick2nd') {
          t.b = card;
          setState('verify');
        }

        // Check match and allow animation
        if (state === 'pick2nd') {
          if (t.a.name === t.b.name) {
            setTimeout(() => {
              setState('match');
            }, 500);
            setTimeout(() => {
              setMatches([...matches, t.a, t.b]);
              setState('pick1st');
            }, 1300);
          } else if (t.a.id !== -1 && t.b.id !== -1) {
            setTimeout(() => {
              const reset = {
                a: { id: -1, name: 0 },
                b: { id: -1, name: 1 },
              };
              setPair((pair) => ({ ...pair, ...reset }));
              setState('pick1st');
            }, 1000);
          }
        }
        setPair((pair) => ({ ...pair, ...t }));
        console.log('Select:', card.id, card.name, state);
      }}
    />
  ));

  useEffect(() => {
    console.log('state:', state, 'pair:', pair, 'matches:', matches);
  }, [state, pair, matches]);

  return (
    <>
      <div className="relative p-2 grid gap-1 grid-rows-[1fr_9fr] h-screen mx-auto container">
        <div className="text-center">
          <h1>Match Game</h1>
          <h2>Total: {matches.length / 2}</h2>
          <h2>State: {state}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 place-content-stretch bg-green-500">
          {cards}
        </div>
      </div>

      <div
        className={`transition duration-[350ms] ${
          state === 'match' ? 'opacity-100' : 'opacity-0'
        } z-10 absolute inset-0 flex items-center justify-center select-none bg-black/10 pointer-events-none`}
      >
        <h1 className="text-5xl [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]">
          Match!!!
        </h1>
      </div>
    </>
  );
}

export default App;
