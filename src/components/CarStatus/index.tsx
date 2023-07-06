import { useTheme } from 'styled-components';
import { IconBox, Message, Container, TextHighlight } from './styles';
import { Key, Car } from 'phosphor-react-native';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  licensePlate?: string | null;
};

export default function CarStatus({ licensePlate = null, ...rest }: Props) {
  const Icon = licensePlate ? Key : Car;
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso`
    : `Nenhum veículo em uso. `;

  const status = licensePlate ? 'chegada' : 'saída';
  const theme = useTheme();
  return (
    <Container {...rest}>
      <IconBox>
        <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}
        <TextHighlight>Clique aqui para registrar a {status}</TextHighlight>
      </Message>
    </Container>
  );
}
