import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import {FlexCenter, WhiteText} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetActiveMonth} from '../hooks/useQuery';
const RoomCard: React.FC<RoomType> = room => {
  const {isError, isLoading, data} = useGetActiveMonth();
  const activeMonth = data?.data![0] as unknown as MonthType;
  return (
    <CardContainer>
      <RoomName>{room?.room?.name}</RoomName>
      <RoomInfo>
        <FlexCenter>
          <AntDesign name="pluscircleo" size={25} color={'#fff'} />
          <Money>12500 MMK</Money>
        </FlexCenter>
        <FlexCenter>
          <AntDesign name="minuscircleo" size={25} color={'#fff'} />
          <Money>13000 MMK</Money>
        </FlexCenter>
        <FlexCenter>
          <MaterialCommunity
            name="calendar-month-outline"
            size={30}
            color={'#fff'}
          />
          <Money>{activeMonth?.name}</Money>
        </FlexCenter>
      </RoomInfo>
    </CardContainer>
  );
};
export default RoomCard;

const CardContainer = styled.View`
  padding: 20px;
  background-color: ${theme.colors.primary};
  color: #fff;
  border-radius: 15px;
`;

const RoomName = styled(WhiteText)`
  font-size: 25px;
  text-align: center;
`;

const Money = styled(WhiteText)`
  font-size: 20px;
`;
const RoomInfo = styled.View`
  padding: 20px;
  gap: 15px;
  /* max-width: 30px; */
`;
