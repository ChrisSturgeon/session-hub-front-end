import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('General Button', () => {
  it('Has correct class', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toHaveAttribute('class', 'btn');
  });

  it('Matches snapshot', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it('Has text from props', () => {
    render(<Button label="myBtn" />);
    expect(screen.getByRole('button')).toHaveTextContent('myBtn');
  });

  it('Fires on click function', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(onClickMock).toBeCalled();
  });

  it('Fires on click multiple times', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    expect(onClickMock).toBeCalledTimes(3);
  });
});
