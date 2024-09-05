import React from 'react';
import { render } from '@testing-library/react';
import LoadingState from '../LoadingState';

describe('LoadingState Component', () => {
  it('Should match the snapshot', () => {
    const { asFragment } = render(<LoadingState/>);
    expect(asFragment()).toMatchSnapshot();
  });
});