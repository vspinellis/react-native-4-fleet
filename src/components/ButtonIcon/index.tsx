import { IconProps } from 'phosphor-react-native';
import { TouchableOpacityProps } from 'react-native';
import { Container } from './styles';
import { useTheme } from 'styled-components';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxProps;
};

export default function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const colors = useTheme();
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Icon size={24} color={colors.COLORS.BRAND_MID} />
    </Container>
  );
}
