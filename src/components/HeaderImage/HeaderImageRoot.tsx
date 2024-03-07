import { ReactNode } from 'react';

type HeaderImageRootProps = {
  name: string;
  thumb: string;
  children: ReactNode;
};

function HeaderImageRoot({ name, thumb, children }: HeaderImageRootProps) {
  return (
    <div className="relative w-screen h-56 overflow-hidden">
      <div className="absolute z-0 left-0 right-0 top-0 bottom-0 bg-black">
        <img
          className="absolute left-0 right-0 bottom-0 opacity-50"
          data-testid="recipe-photo"
          src={ thumb }
          alt={ name }
        />
        <span
          className="absolute top-0 bottom-0 left-0
      right-0 flex justify-center items-center"
        >
          <h2
            className="text-white text-4xl font-bold
            text-center"
            data-testid="recipe-title"
          >
            {name}
          </h2>
        </span>
      </div>
      { children }
    </div>
  );
}

export default HeaderImageRoot;
