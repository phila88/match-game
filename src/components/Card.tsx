type Props = {
  name: number;
  selected: boolean;
  matched: boolean;
  onClick(): void;
};

export const Card = ({ name, selected, matched, onClick }: Props) => {
  return (
    <div
      className={`transition duration-[350ms] ${
        matched
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      } rounded ${
        selected ? 'bg-blue-800 -scale-x-100' : 'bg-green-800 scale-100'
      }`}
      onClick={onClick}
    >
      <div className="-scale-x-100">
        <h1
          className={`transition ${
            selected && !matched
              ? 'duration-[850ms] visible'
              : 'duration-[350ms] opacity-0'
          }`}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};
