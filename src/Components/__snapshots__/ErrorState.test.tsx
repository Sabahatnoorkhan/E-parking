import React from 'react';
import { render } from '@testing-library/react';
import ErrorState from '../ErrorState';

describe('ErrorState Component', () => {
  it('Should match the snapshot', () => {
    const { asFragment } = render(<ErrorState errorHandler={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});