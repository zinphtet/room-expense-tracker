import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import {screenNames} from '../constants';

const Menus = [
  {
    name: 'clipboard-list-outline',
  },
  {
    name: 'account-group',
  },
  {
    name: 'speaker-wireless',
  },
  {
    name: 'account-plus-outline',
  },
  {
    name: 'card-plus-outline',
    to: screenNames.add_room_category,
  },
];

const RoomMenus: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <RoomMenusContainer>
      {Menus.map(mu => {
        return (
          <Pressable onPress={() => navigation.push(mu.to || '')}>
            <MenuIconContainer key={mu.name}>
              <Material name={mu.name} size={30} />
            </MenuIconContainer>
          </Pressable>
        );
      })}
    </RoomMenusContainer>
  );
};

export default RoomMenus;

const MenuIconContainer = styled.View`
  width: 80px;
  height: 80px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const RoomMenusContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  width: fit-content;
`;
