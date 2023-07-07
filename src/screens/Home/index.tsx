import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CarStatus from '../../components/CarStatus';
import HomeHeader from '../../components/HomeHeader';
import { Container, Content, Label, Title } from './styles';
import { useQuery, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { Alert, FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';

export default function Home() {
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>();
  const historic = useQuery(Historic);
  const realm = useRealm();
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const navigation = useNavigation();
  function handleRegisterMoviment() {
    if (vehicleInUse?._id) {
      navigation.navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigation.navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered('status = "departure"')[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert('Veículo em uso', 'Erro ao buscar os veículos em uso');
      console.log(error);
    }
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, []);

  function fetchHistoric() {
    const response = historic.filtered('status = "arrival" SORT(created_at DESC)');
    try {
      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate.toUpperCase(),
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
          isSync: false
        };
      });
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico');
    }
  }

  function handleHistoricDetails(id: string) {
    navigation.navigate('arrival', { id });
  }

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMoviment}
        />
        <Title>Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum registro encontrado</Label>}
        />
      </Content>
    </Container>
  );
}
