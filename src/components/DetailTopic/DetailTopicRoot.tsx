import { ReactNode } from 'react';

type DetailTopicRootProps = {
  children: ReactNode;
};

function DetailTopicRoot({ children }: DetailTopicRootProps) {
  return (
    <div className="w-11/12 mx-auto text-primary-black">
      { children }
    </div>
  );
}

export default DetailTopicRoot;
