import { useTheme } from 'styled-components';
import { IconBoxProps } from '../ButtonIcon';
import { Container, Title } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  icon?: IconBoxProps;
  title: string;
};

export function TopMessage({ title, icon: Icon }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Container style={{ paddingTop: insets.top + 5 }}>
      {Icon && <Icon size={18} color={theme.COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  );
}
