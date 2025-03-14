import React from 'react';

import { render } from '@testing-library/react';

import Grid from '../grid/grid';
import GridItem from './grid-item';

describe('GridItem', () => {
  it('should throw error without Grid parent', () => {
    try {
      render(<GridItem></GridItem>);
    } catch (error: any) {
      expect(error.message).toBe('GridItem must be used within a Grid');
    }
  });

  it('should render regular grid item', () => {
    const result = render(
      <Grid>
        <GridItem></GridItem>
      </Grid>,
    );
    expect(result).toBeTruthy();
  });
});

describe('Irregular grid', () => {
  it('should render irregular grid', async () => {
    const result = render(
      <Grid irregular>
        <GridItem></GridItem>
      </Grid>,
    );
    expect(result).toBeTruthy();
  });

  it('should render irregular grid with column', async () => {
    const result = render(
      <Grid irregular column={2}>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>,
    );
    expect(result).toBeTruthy();
  });
});

describe('Irregular grid with notGuaranteeOrder', () => {
  it('should render irregular grid with notGuaranteeOrder', async () => {
    const result = render(
      <Grid irregular notGuaranteeOrder>
        <GridItem></GridItem>
      </Grid>,
    );
    expect(result).toBeTruthy();
  });
});
