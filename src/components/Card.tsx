type Props = {
  name: number;
  selected: boolean;
  matched: boolean;
  onClick(): void;
};

export const Card = ({ name, selected, matched, onClick }: Props) => {
  return (
    <div
      className={`transition ${matched ? 'invisible' : 'visible'} rounded ${
        selected ? 'bg-blue-800' : 'bg-green-800'
      }`}
      onClick={onClick}
    >
      <h1
        className={`transition ${
          selected && !matched ? 'visible' : 'invisible'
        }`}
      >
        {name}
      </h1>
    </div>
  );
};
