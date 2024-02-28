import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export const renderWithContext = (ui: ReactElement) => {
  return render(ui);
};
