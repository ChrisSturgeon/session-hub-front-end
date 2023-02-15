import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ValidationError from './ValidationError';

describe('Validation Error', () => {
  it('Renders on props', () => {
    render(<ValidationError isVisible={true} />);
    expect(screen.getByTestId('validation-error')).toBeInTheDocument();
  });

  it('Does not render on props', () => {
    render(<ValidationError isVisible={false} />);
    expect(screen.queryByTestId('validation-error')).not.toBeInTheDocument();
  });

  it('Renders with props message', () => {
    render(<ValidationError isVisible={true} message={'Required*'} />);
    expect(screen.getByTestId('validation-error')).toHaveTextContent(
      'Required*'
    );
  });
});
