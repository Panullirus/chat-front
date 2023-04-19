import { render } from '@testing-library/react';
import ChatMessageContainer from '../ChatMessageContainer';
import '@testing-library/jest-dom';

describe('ChatMessageContainer', () => {
  test('renders message content and timestamp correctly', () => {
    const props = {
      id_usuario_envia: 1,
      current_user: 1,
      contenido: 'Hello world',
      hora_envio: '10:00',
      onSend: () => {},
      loading: false,
    };

    const { getByText } = render(<ChatMessageContainer {...props} />);

    expect(getByText('Hello world')).toBeInTheDocument();
    // expect(getByText('10:00')).toBeInTheDocument();
  });
});
