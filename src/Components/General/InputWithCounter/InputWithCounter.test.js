import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputWithCounter from './InputWithCounter';

describe('Input With Counter', () => {
  it('Is of "text" input type', () => {
    render(<InputWithCounter value={''} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('Has name from props', () => {
    render(<InputWithCounter value={''} name={'My-very-special-input'} />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'name',
      'My-very-special-input'
    );
  });

  it('Has id from props', () => {
    render(<InputWithCounter value={''} id={'location'} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'location');
  });

  it('Has class from props', () => {
    render(<InputWithCounter value={''} className={'myClass'} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('class', 'myClass');
  });

  it('Has min length from props', () => {
    render(<InputWithCounter value={''} minLength={20} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '20');
  });

  it('Has max length from props', () => {
    render(<InputWithCounter value={''} minLength={56} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '56');
  });

  it('Has placeholder from props on render', () => {
    render(
      <InputWithCounter value={''} placeholder={'Start typing here...'} />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Start typing here...'
    );
  });

  it('Displays given value', () => {
    render(<InputWithCounter value={'Session Hub'} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Session Hub');
  });

  it('Displays correct max length counter on render', () => {
    render(<InputWithCounter value="" maxLength={47} />);
    expect(screen.getByTestId('counter').textContent).toBe('0 / 47');
  });

  it('Displays correct count for given input on render', () => {
    render(<InputWithCounter value="Session Hub" maxLength={100} />);
    expect(screen.getByTestId('counter').textContent).toBe('11 / 100');
  });

  it('On change function is called on typing', () => {
    const onChangeMock = jest.fn();

    render(<InputWithCounter value="" onChange={onChangeMock} />);
    const input = screen.getByRole('textbox');
    userEvent.type(input, 'Session Hub');
    expect(onChangeMock).toBeCalledTimes(11);
  });
});
