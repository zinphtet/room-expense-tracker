import {Alert, Text, View} from 'react-native';
import useGetSession from '../hooks/getSession';
import {supabase} from '../lib/supabase';
import {useState} from 'react';
import {Container, FlexRight, TextBold} from '../style';
import {Button} from 'react-native-paper';

const UserInfo = () => {
  const [isLoading, setLoading] = useState(false);
  const {session} = useGetSession();
  const logoutHandler = async () => {
    try {
      setLoading(true);
      let {error} = await supabase.auth.signOut();
      if (error) {
        Alert.alert(error.message);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Container gap={10} vertical={50}>
        <TextBold size={30}>
          {session?.user.user_metadata.display_name}
        </TextBold>
        <Text>{session?.user.email}</Text>
      </Container>
      <Container vertical={20}>
        <FlexRight>
          <Button
            mode="contained"
            onPress={() => logoutHandler()}
            disabled={isLoading}>
            Logout
          </Button>
        </FlexRight>
      </Container>
    </View>
  );
};
export default UserInfo;
