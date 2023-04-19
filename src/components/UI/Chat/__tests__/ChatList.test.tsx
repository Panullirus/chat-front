import React from 'react';
import { render } from '@testing-library/react';
import ChatList from '../ChatList';

describe('ChatList component', () => {
  const users = [
    {
      id: 1,
      nombre: 'Usuario 1',
      last_connection: true,
    },
    {
      id: 2,
      nombre: 'Usuario 2',
      last_connection: false,
    },
    {
      id: 3,
      nombre: 'Usuario 3',
      last_connection: true,
    },
  ];

  it('renders the correct number of ChatUserList components', () => {
    const { container } = render(<ChatList users={users} getUserFromList={function (items: []): void {
        throw new Error('Function not implemented.');
    } } />);
    const chatUserListComponents = container.querySelectorAll('.chat-user-list');
    expect(chatUserListComponents.length).toBe(users.length);
  });

  it('renders the ChatUserList component with the correct props', () => {
    const { container } = render(<ChatList users={users} getUserFromList={function (items: []): void {
        throw new Error('Function not implemented.');
    } } />);
    users.forEach((user, index) => {
      const chatUserListComponent = container.querySelectorAll('.chat-user-list')[index];
      expect(chatUserListComponent).toHaveAttribute('name', user.nombre);
      expect(chatUserListComponent).toHaveAttribute('index', user.id.toString());
      expect(chatUserListComponent).toHaveAttribute('last_connection', user.last_connection.toString());
    });
  });
});
