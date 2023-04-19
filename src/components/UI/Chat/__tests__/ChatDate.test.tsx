import React from 'react';
import ChatWithDaySeparator from '../ChatDate';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ChatWithDaySeparator', () => {
  it('renders the date', () => {
    const date = '13/03/2023';
    const { getByText } = render(<ChatWithDaySeparator date={date} />);
    expect(getByText(date)).toBeInTheDocument();
  });
});
