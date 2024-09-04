import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import theme from '../constants/theme';
import {FlexCenter, WhiteText} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetActiveMonth, useGetAllExpenses} from '../hooks/useQuery';
import {useEffect} from 'react';
import {useMonthStore} from '../store/month';
import {formatPrice, log} from '../lib/helper';
const RoomCard: React.FC<RoomType> = room => {
  const {isError, isLoading, data} = useGetActiveMonth();
  const {data: expenses, isLoading: isLoadingExpenses} = useGetAllExpenses();
  const setMonth = useMonthStore(store => store.setMonth);
  const activeMonth = data?.data![0] as unknown as MonthType;
  useEffect(() => {
    if (activeMonth) {
      setMonth(activeMonth);
    }
  }, [activeMonth]);
  const collectedMoney = expenses?.data
    ?.filter(exp => exp.to_room === true)
    .reduce((acc, exp) => acc + parseInt(exp.amount), 0);
  const totalExpenses = expenses?.data
    ?.filter(exp => exp.to_room === false)
    .reduce((acc, exp) => acc + parseInt(exp.amount), 0);
  log(totalExpenses, 'total expense');
  return (
    <CardContainer>
      <RoomName>{room?.room?.name}</RoomName>
      <RoomInfo>
        <FlexCenter>
          <AntDesign name="pluscircleo" size={25} color={'#fff'} />
          <Money>{formatPrice(collectedMoney!)}</Money>
        </FlexCenter>
        <FlexCenter>
          <AntDesign name="minuscircleo" size={25} color={'#fff'} />
          <Money> {formatPrice(totalExpenses!)}</Money>
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
