import { useNavigation } from '@react-navigation/native';
import CarStatus from '../../components/CarStatus';
import HomeHeader from '../../components/HomeHeader';
import { Container, Content } from './styles';

export default function Home() {
  const navigation = useNavigation();
  function handleRegisterMoviment() {
    navigation.navigate('departure');
  }

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
