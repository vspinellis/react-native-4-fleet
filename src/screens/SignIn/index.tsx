import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { Container, Slogan, Title } from './styles';
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Realm, useApp } from '@realm/react';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const app = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  });

  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== 'success') {
        setIsAuthenticating(false);
      }
    });
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        // fetch(
        //   `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`
        // )
        //   .then((response) => response.json())
        //   .then(console.log);

        const credencials = Realm.Credentials.jwt(response.authentication.idToken);
        app.logIn(credencials).catch((err) => {
          setIsAuthenticating(false);
          Alert.alert('Conta não foi conectada');
          console.log(err);
        });
      } else {
        setIsAuthenticating(false);
        Alert.alert('Conta não foi conectada');
      }
    }
  }, [response]);

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
        title='Entrar com Google'
      />
    </Container>
  );
}
