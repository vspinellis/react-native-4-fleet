import { useRef } from 'react';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import LicensePlateInput from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

export default function Departure() {
  const descriptionRef = useRef<TextInput>(null);
  const keyboardAvoidViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

  function handleDepartureRegister() {}

  return (
    <Container>
      <Header title='Saída' />
      <KeyboardAvoidingView behavior={keyboardAvoidViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
              returnKeyType='next'
              label='Placa do veículo'
              placeholder='BRA1234'
            />
            <TextAreaInput
              ref={descriptionRef}
              label='Finalidade'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              placeholder='vou utilizar o veículo para...'
            />
            <Button onPress={handleDepartureRegister} title='Registrar Saída' />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
