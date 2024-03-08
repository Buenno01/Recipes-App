import { ReactNode } from 'react';

type HeaderImageTopInfoWrapperProps = {
  children: ReactNode;
};

function HeaderImageTopInfoWrapper({ children }: HeaderImageTopInfoWrapperProps) {
  return (
    <div
      className="z-20 absolute left-0 right-0 flex
    justify-between top-0 py-2 px-3 text-primary-yellow"
    >
      {children}
    </div>
  );
}

export default HeaderImageTopInfoWrapper;
