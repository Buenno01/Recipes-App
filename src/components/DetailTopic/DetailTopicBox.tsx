import { ReactNode } from 'react';

type DetailTopicBoxProps = {
  children: ReactNode;
};

function DetailTopicBox({ children }: DetailTopicBoxProps) {
  return (
    <div
      className="flex flex-col gap-1 px-3 border
    border-gray-300 rounded-lg py-2"
    >
      { children }
    </div>
  );
}

export default DetailTopicBox;
