import { ReactNode } from 'react';

type DetailTopicTitleProps = {
  children: ReactNode;
};

function DetailTopicTitle({ children }: DetailTopicTitleProps) {
  return (
    <h2 className="pl-2 mt-6 mb-2 text-2xl font-semibold">{children}</h2>
  );
}

export default DetailTopicTitle;
