import { useEffect, useState } from 'react';
import Card from './components/Card';
import { useStore, Card as CardType } from './store';
import Header from './components/Header';

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
      name={card.name}
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
          if (matches.length === 10)
            setTimeout(() => updateGameState('pendingNewGame'), 350);
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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Prevent color transition on first render
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('transition-colors', 'duration-1000');
    }, 100);
  }, []);

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
      <div className="relative mx-auto grid h-screen max-w-[75rem] grid-rows-[1fr_9fr] gap-3 p-3">
        <Header
          disableReset={matches.length === 0}
          resetGame={resetGame}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          darkMode={darkMode}
        />

        {/* Game grid */}
        {gameState !== 'pendingNewGame' ? (
          <div className="grid min-h-[35rem] grid-cols-3 place-content-stretch gap-1 md:grid-cols-4 md:gap-3">
            {cards}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3.5 font-[Langar] text-2xl">
            <h2 className="drop-shadow-md">Congrats! All matches found.</h2>
            <h2 className="drop-shadow-md">
              Click on the reset button to start a new game.
            </h2>
          </div>
        )}
      </div>

      <div
        className={`transition duration-[350ms] ${
          gameState === 'match' ? 'opacity-100' : 'opacity-0'
        } pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center bg-eggplant/25`}
      >
        <h1 className="text-5xl font-medium text-pink transition-colors [font-family:Langar] [text-shadow:_4px_4px_4px_rgb(0_0_0_/_75%)] dark:text-lightOrange sm:text-6xl">
          Match!!!
        </h1>
      </div>
    </>
  );
}

export default App;
