import DetailTopic from './DetailTopic';

type InstructionsProps = {
  instructions: string
};

function Instructions({ instructions }: InstructionsProps) {
  return (
    <DetailTopic.Root>
      <DetailTopic.Title>Instructions</DetailTopic.Title>
      <DetailTopic.Box>
        <p data-testid="instructions">
          {instructions}
        </p>
      </DetailTopic.Box>
    </DetailTopic.Root>
  );
}

export default Instructions;
