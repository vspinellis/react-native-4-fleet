import { useRef, useState } from 'react';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);
  const keyboardAvoidViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert('Placa inválida', 'Informe uma placa com o padrão correto');
    }

    if (description.trim().length === 0) {
      descriptionRef.current?.focus();
      return Alert.alert('Finalizade', 'Informe a finalidade');
    }

    try {
      setIsLoading(true);

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate,
            description
          })
        );

        Alert.alert('Saída', 'Saída do veículo registrada com sucesso');
        navigation.goBack();
      });
    } catch (error) {
      console.log(error);
      return Alert.alert('Erro', 'Não foi posível registrar a saída do veículo');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header title='Saída' />
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidViewBehavior}> */}
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
              autoCapitalize='characters'
              returnKeyType='next'
              label='Placa do veículo'
              placeholder='BRA1234'
              onChangeText={setLicensePlate}
            />
            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              placeholder='vou utilizar o veículo para...'
              onChangeText={setDescription}
            />
            <Button
              isLoading={isLoading}
              onPress={handleDepartureRegister}
              title='Registrar Saída'
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
}
