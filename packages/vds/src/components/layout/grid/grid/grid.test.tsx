import { render } from '@testing-library/react';

import Grid from './grid';

describe('Grid', () => {
  it('should render without crashing', () => {
    const result = render(<Grid></Grid>);
    expect(result).toBeTruthy();
  });
});
