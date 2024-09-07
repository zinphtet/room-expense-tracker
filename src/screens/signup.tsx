import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Pressable, Text, Alert} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validateEmail, validatePassword, validateUsername} from '../lib/helper';
import {screenNames} from '../constants';
import {StyledButton} from '../style';
import {supabase} from '../lib/supabase';

// @ts-ignore
const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // Validation functions

  // Check validation and update states
  useEffect(() => {
    setUsernameValid(validateUsername(username));
    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));

    setIsFormValid(usernameValid && emailValid && passwordValid);
  }, [username, email, password, usernameValid, emailValid, passwordValid]);

  const signUpWithEmail = async () => {
    setIsLoading(true);
    try {
      const {
        data: {session},
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
          data: {
            display_name: username,
          },
        },
      });

      if (error) Alert.alert(error.message);
      console.log('session', session);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const clickSignIn = () => {
    navigation.navigate(screenNames.login);
  };

  return (
    <Container>
      <InputWrapper>
        <StyledTextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          // error={!usernameValid && username.length > 0}
        />
        {/* {!usernameValid && username.length > 0 && (
          <HelperText type="error" visible={!usernameValid}>
            Username is required.
          </HelperText>
        )} */}
        <StyledTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          // error={!emailValid && email.length > 0}
        />
        {/* {!emailValid && email.length > 0 && (
          <HelperText type="error" visible={!emailValid}>
            Please enter a valid email address.
          </HelperText>
        )} */}
        <PasswordInputWrapper>
          <StyledTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            // error={!passwordValid && password.length > 0}
            right={
              <TextInput.Icon
                // name={passwordVisible ? 'eye-off' : 'eye'}
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </PasswordInputWrapper>
        {/* {!passwordValid && password.length > 0 && (
          <HelperText type="error" visible={!passwordValid}>
            Password must be at least 6 characters long.
          </HelperText>
        )} */}
      </InputWrapper>
      <StyledButton
        mode="contained"
        onPress={signUpWithEmail}
        disabled={!isFormValid || isLoading}>
        {isLoading ? 'Loading ...' : ' Signup'}
      </StyledButton>
      <SimpleWrapper>
        <Text>Already have an account ?</Text>
        <Pressable onPress={clickSignIn}>
          <SingUpText>SignIn</SingUpText>
        </Pressable>
      </SimpleWrapper>
    </Container>
  );
};

// Styled-components for styling
const SingUpText = styled.Text`
  text-decoration: underline;
`;
const SimpleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  margin-top: 50px;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #f5f5f5;
`;

const InputWrapper = styled.View`
  margin-bottom: 16px;
`;

const PasswordInputWrapper = styled.View`
  position: relative;
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 12px;
`;

export default SignUpScreen;
