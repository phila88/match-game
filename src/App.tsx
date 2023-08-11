import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { useStore, Card as CardType } from './store';

function App() {
  const [darkMode, setDarkMode] = useState(true);
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
      src={card.src}
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
    <div className={`${darkMode && 'dark'}`}>
      <div className="h-[100dvh] w-screen bg-white text-black transition-colors duration-[1500ms] dark:bg-black dark:text-white">
        <div className="relative mx-auto grid h-screen max-w-[75rem] grid-rows-[1fr_9fr] gap-3 p-3">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <h1 className="text-center text-5xl drop-shadow-md md:text-6xl">
              Match Game
            </h1>
            {/* <h2>Total: {matches.length / 2}</h2> */}
            {/* <h2>State: {gameState}</h2> */}
            <div className="flex w-full flex-col items-center justify-between gap-3 sm:w-auto sm:flex-row">
              <button
                disabled={matches.length === 0}
                className="h-fit w-full rounded-md bg-purple p-2 font-semibold text-[#FFF] drop-shadow-md transition duration-1000 hover:brightness-110 active:brightness-90 disabled:opacity-75 disabled:hover:brightness-100 sm:w-48"
                onClick={resetGame}
              >
                Reset
              </button>
              <button
                className="flex w-full items-center justify-center drop-shadow-md transition hover:brightness-110 sm:w-auto"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                <img
                  src={
                    darkMode ? './src/assets/sun.svg' : './src/assets/moon.svg'
                  }
                  alt={darkMode ? 'Toggle light mode' : 'Toggle dark mode'}
                />
              </button>
            </div>
          </div>
          <div className="grid min-h-[35rem] grid-cols-3 place-content-stretch gap-1 md:grid-cols-4 md:gap-3">
            {cards}
          </div>
        </div>
        <div
          className={`transition duration-[350ms] ${
            gameState === 'match' ? 'opacity-100' : 'opacity-0'
          } pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center bg-black/25`}
        >
          <h1 className="text-5xl font-semibold text-orange transition-colors [text-shadow:_4px_4px_4px_rgb(0_0_0_/_75%)] dark:text-white sm:text-6xl">
            Match!!!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
