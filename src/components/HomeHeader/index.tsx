import { TouchableOpacity } from 'react-native';
import { Container, Greeting, Message, Name, Picture } from './styles';
import { Power } from 'phosphor-react-native';
import theme from '../../theme';
import { useUser, useApp } from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeHeader() {
  const user = useUser();
  const app = useApp();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut();
  }
  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder='L18419kCbIof00ayjZay~qj[ayj@'
      />
      <Greeting>
        <Message>Olá</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>
      <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
