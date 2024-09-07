import React, {useState, useEffect} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import styled from 'styled-components/native';
import {validateEmail, validatePassword} from '../lib/helper';
import {screenNames} from '../constants';
import {StyledButton} from '../style';
import {supabase} from '../lib/supabase';

// @ts-ignore
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Check validation and update states
  useEffect(() => {
    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));
  }, [email, password]);

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setIsLoading(true);
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert(error.message);
      }
      // console.log("Logged In Successfully")
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const clickSignUp = () => {
    navigation.navigate(screenNames.signup);
  };

  return (
    <Container>
      <InputWrapper>
        <StyledTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          //   error={!emailValid && email.length > 0}
        />
        {/* {!emailValid && email.length > 0 && (
          <HelperText type="error" visible={!emailValid}>
            Please enter a valid email address.
          </HelperText>
        )} */}
        <StyledTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              // name={passwordVisible ? 'eye-off' : 'eye'}
              icon={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          //   error={!passwordValid && password.length > 0}
        />
        {/* {!passwordValid && password.length > 0 && (
          <HelperText type="error" visible={!passwordValid}>
            Password must be at least 6 characters long.
          </HelperText>
        )} */}
      </InputWrapper>
      <StyledButton
        mode="contained"
        onPress={handleLogin}
        disabled={!emailValid || !passwordValid || isLoading}>
        Login
      </StyledButton>

      <SimpleWrapper>
        <Text>Don't have an account ?</Text>
        <Pressable onPress={!isLoading ? clickSignUp : () => {}}>
          {!isLoading && <SingUpText>SignUp</SingUpText>}
          {isLoading && <SingUpText>Loading ... </SingUpText>}
        </Pressable>
      </SimpleWrapper>
    </Container>
  );
};

// Styled-components for styling
const SingUpText = styled.Text`
  text-decoration: underline;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #f5f5f5;
`;

const InputWrapper = styled.View`
  margin-bottom: 16px;
  gap: 10px;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 12px;
`;

const SimpleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  margin-top: 50px;
`;

export default LoginScreen;
