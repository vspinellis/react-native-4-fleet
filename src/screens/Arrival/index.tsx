import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  Container,
  Content,
  Label,
  LicensePlate,
  Description,
  Footer,
  AsyncMessage
} from './styles';
import Header from '../../components/Header';
import { Button } from '../../components/Button';
import ButtonIcon from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';
import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncStorage';

export default function Arrival() {
  const realm = useRealm();
  const [dataNotSync, setDataNotSync] = useState(false);
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<ParamListBase> & { params: { id: string } }>();
  const historic = useObject(Historic, new BSON.UUID(params.id) as unknown as string);
  const title = historic?.status === 'arrival' ? 'Saída' : 'Detalhes';

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() }
    ]);
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    navigation.goBack();
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Error', 'Erro ao registrar a chegada do veículo');
      }
      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Chegada', 'Chegada registrada com sucesso');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'não foi possível registrar a chegada do veículo');
    }
  }

  useEffect(() => {
    getLastAsyncTimestamp().then((lastSync) =>
      setDataNotSync(historic!.updated_at.getTime() > lastSync)
    );
  }, []);

  return (
    <Container>
      <Header title={title} />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>
      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon onPress={handleRemoveVehicleUsage} icon={X} />
          <Button title='Registrar chegada' onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSync && (
        <AsyncMessage>
          Sincronização da {historic?.status === 'departure' ? 'partida ' : 'chegada '}
          pendente
        </AsyncMessage>
      )}
    </Container>
  );
}
