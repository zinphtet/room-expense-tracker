import {Alert, Button, Text, View} from 'react-native';
import useGetSession from '../hooks/getSession';
import {supabase} from '../lib/supabase';
import {useState} from 'react';

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
      <Text>{session?.user.email}</Text>
      <Button
        onPress={() => logoutHandler()}
        disabled={isLoading}
        title={isLoading ? 'Loading ...' : 'Logout'}
      />
    </View>
  );
};
export default UserInfo;
