import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChatInput from '../ChatInput';
import '@testing-library/jest-dom';

describe('ChatInput', () => {
  it('should render input and icon button', () => {
    const onChange = jest.fn();
    const onPress = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(<ChatInput value="" onChange={onChange} onPress={onPress} currentUser={undefined} />);
    
    expect(getByPlaceholderText('Escribe un mensaje...')).toBeInTheDocument();
    expect(getByTestId('send-button')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const onChange = jest.fn();
    const onPress = jest.fn();
    const { getByPlaceholderText } = render(<ChatInput value="" onChange={onChange} onPress={onPress} currentUser={undefined} />);

    const input = getByPlaceholderText('Escribe un mensaje...');
    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'Test message' }) }));
  });

  it('should call onPress when icon button is clicked', () => {
    const onChange = jest.fn();
    const onPress = jest.fn();
    const { getByTestId } = render(<ChatInput value="" onChange={onChange} onPress={onPress} currentUser={undefined} />);

    const iconButton = getByTestId('send-button');
    fireEvent.click(iconButton);

    expect(onPress).toHaveBeenCalled();
  });
});
