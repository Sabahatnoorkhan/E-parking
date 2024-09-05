import React from 'react';
import { render } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('EmptyState Component', () => {
  it('Should match the snapshot', () => {
    const { asFragment } = render(<EmptyState />);
    expect(asFragment()).toMatchSnapshot();
  });
});