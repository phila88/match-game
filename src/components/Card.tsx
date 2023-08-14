type Props = {
  src: string;
  selected: boolean;
  matched: boolean;
  onClick(): void;
};

export const Card = ({ src, selected, matched, onClick }: Props) => {
  return (
    <div className="flex items-center justify-center p-1">
      <div className="h-full max-h-full w-full max-w-full [perspective:1920px] md:aspect-[5/7] md:w-auto">
        <div
          className={`relative h-full w-full drop-shadow-md transition duration-[350ms] [transform-style:preserve-3d] ${
            matched
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-auto opacity-100'
          } rounded-md ${
            selected || matched
              ? '[transform:rotate3d(0,1,0,180deg)]'
              : '[transform:rotate3d(0)]'
          }`}
          onClick={onClick}
        >
          {/* Back */}
          {/* Use z index transition to workaround Chrome's backface-visibility issue */}
          <div
            className={`absolute h-full w-full rounded-md border-4 border-cambridgeBlue bg-cambridgeBlue transition-all duration-[175ms] [transform:rotateY(180deg)] dark:border-blue dark:bg-blue sm:border-[6px] ${
              selected || matched ? 'z-10' : 'z-0'
            }`}
          >
            <img
              alt="Random image"
              src={src}
              className={`h-full w-full rounded-md object-cover transition
                ${
                  selected && !matched
                    ? 'opacity-100 duration-[850ms]'
                    : 'opacity-0 duration-[350ms]'
                }`}
            />
          </div>

          {/* Card depth outline */}
          <div
            className={`absolute top-[1px] h-full w-full rounded-md bg-gray-200 transition duration-[350ms] dark:bg-gray-500 ${
              selected || matched ? 'right-[1px]' : 'left-[1px]'
            }`}
          />

          {/* Front */}
          <div className="absolute h-full w-full transform rounded-md border-4 border-cambridgeBlue bg-cambridgeBlue transition-colors duration-1000 [backface-visibility:hidden] dark:border-blue dark:bg-blue sm:border-[6px]">
            <div className="h-full w-full rounded-md bg-cloud-pattern" />
          </div>
        </div>
      </div>
    </div>
  );
};
