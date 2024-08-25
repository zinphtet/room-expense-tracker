import {View, Text, FlatList} from 'react-native';
import {useMembersByRoom} from '../hooks/useQuery';
import MemberCard from './member-card';

const RoomMembers = () => {
  const {data, isLoading} = useMembersByRoom();
  const idArrs = data?.data as unknown as Member[];
  return (
    <View>
      <Text> {isLoading && 'Loading ...'}</Text>
      <FlatList
        data={idArrs}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => <MemberCard {...item} />}
        ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
      />
    </View>
  );
};
export default RoomMembers;
