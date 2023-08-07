import { useEffect } from 'react';
import { Card } from './components/Card';
import { useStore, Card as CardType } from './store';

function App() {
  const gameState = useStore((state) => state.gameState);
  const updateGameState = useStore((state) => state.updateGameState);
  const resetGame = useStore((state) => state.resetGame);
  const matches = useStore((state) => state.matches);
  const setMatches = useStore((state) => state.matchFound);
  const pair = useStore((state) => state.currentPair);
  const updatePair = useStore((state) => state.updatePair);
  const resetPair = useStore((state) => state.resetPair);
  const list = useStore((state) => state.list);
  const cards = list.map((card) => (
    <Card
      key={card.id}
      name={card.name}
      selected={pair[0].id === card.id || pair[1].id === card.id}
      matched={matches.filter((c) => c.id === card.id).length === 1}
      onClick={() => selectCard(card)}
    />
  ));

  const selectCard = (card: CardType) => {
    if (gameState === 'verify' || gameState === 'match' || card === pair[0])
      return;

    // Update pair
    if (gameState === 'pick1st') {
      updatePair(card);
      updateGameState('pick2nd');
    } else if (gameState === 'pick2nd') {
      updatePair(card);
      updateGameState('verify');
    }

    // Check match and allow animation
    if (gameState === 'pick2nd') {
      if (pair[0].name === card.name) {
        setTimeout(() => {
          updateGameState('match');
        }, 500);
        setTimeout(() => {
          setMatches(pair[0], card);
          resetPair();
          updateGameState('pick1st');
        }, 1300);
      } else if (pair[0].id !== -1 && card.id !== -1) {
        setTimeout(() => {
          resetPair();
          updateGameState('pick1st');
        }, 1000);
      }
    }
    console.log('Select:', card.id, card.name, gameState);
  };

  useEffect(() => {
    console.log(
      'gameState:',
      gameState,
      'pair:',
      pair,
      'matches:',
      matches,
      'list:',
      list,
    );
  }, [gameState, pair, matches, list]);

  return (
    <>
      <div className="relative p-2 grid gap-1 grid-rows-[1fr_9fr] h-screen mx-auto container">
        <div className="text-center">
          <h1>Match Game</h1>
          <h2>Total: {matches.length / 2}</h2>
          <h2>State: {gameState}</h2>
          <button onClick={resetGame}>Reset</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 place-content-stretch bg-green-500">
          {cards}
        </div>
      </div>

      <div
        className={`transition duration-[350ms] ${
          gameState === 'match' ? 'opacity-100' : 'opacity-0'
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
