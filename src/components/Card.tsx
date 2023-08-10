type Props = {
  src: string;
  selected: boolean;
  matched: boolean;
  onClick(): void;
};

export const Card = ({ src, selected, matched, onClick }: Props) => {
  return (
    <div className="[perspective:1920px]">
      <div
        className={`relative h-full w-full drop-shadow-md transition duration-[350ms] [transform-style:preserve-3d] ${
          matched
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100'
        } rounded-md ${
          selected || matched ? '[transform:rotateY(180deg)]' : 'transform'
        }`}
        onClick={onClick}
      >
        {/* Back */}
        <div className="absolute h-full w-full rounded-md border-4 border-purple bg-purple transition-colors duration-[1500ms] [transform:rotateY(180deg)] dark:border-orange dark:bg-orange sm:border-[6px]">
          <img
            src={src}
            className={`h-full w-full rounded-md object-cover transition
              ${
                selected && !matched
                  ? 'visible duration-[850ms]'
                  : 'opacity-0 duration-[350ms]'
              }`}
          />
        </div>

        {/* Front */}
        <div className="absolute h-full w-full transform items-center rounded-md border-4 border-purple bg-purple transition-colors duration-[1500ms] [backface-visibility:hidden] dark:border-orange dark:bg-orange sm:border-[6px]">
          <div className="bg-red-500 h-full w-full">
            <div className="h-full w-full rounded-md bg-red">
              <div className="h-full w-full rounded-md bg-cloud-pattern" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
