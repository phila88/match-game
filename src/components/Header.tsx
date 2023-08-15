import sunUrl from '../assets/sun.svg';
import moonUrl from '../assets/moon.svg';

type Props = {
  disableReset: boolean;
  resetGame(): void;
  darkMode: boolean;
  toggleDarkMode(): void;
};

const Header = ({
  disableReset,
  resetGame,
  darkMode,
  toggleDarkMode,
}: Props) => {
  return (
    <header className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <h1 className="text-center text-5xl drop-shadow-md [font-family:Langar] md:text-6xl">
        Match Game
      </h1>
      <div className="flex w-full flex-col items-center justify-between gap-3 sm:w-auto sm:flex-row">
        <button
          disabled={disableReset}
          className="h-fit w-full rounded-md bg-blue p-2 font-semibold text-[#FFF] drop-shadow-md transition duration-300 hover:brightness-110 active:brightness-90 active:drop-shadow-none disabled:opacity-50 disabled:hover:brightness-100 dark:bg-cambridgeBlue sm:w-48"
          onClick={resetGame}
        >
          Reset
        </button>
        <button
          className="flex w-full items-center justify-center drop-shadow-md transition hover:brightness-110 sm:w-auto"
          onClick={toggleDarkMode}
        >
          <img
            width={24}
            height={24}
            src={darkMode ? sunUrl : moonUrl}
            alt={darkMode ? 'Toggle light mode' : 'Toggle dark mode'}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
