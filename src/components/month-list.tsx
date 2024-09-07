import {Alert, FlatList, Pressable, Text, View} from 'react-native';
import {
  useDeleteCategory,
  useDeleteMonth,
  useGetCategoriesByRoom,
  useGetMonthsByRoom,
} from '../hooks/useQuery';
import styled from 'styled-components/native';
import {FlexCenter, FlexRight, ItemSeparator} from '../style';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import {useState} from 'react';
import ConfirmDialog from './confirm-modal';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import CategoryCreateForm from './category-form';
import MonthForm from './month-form';
import {Button} from 'react-native-paper';
import {useMonthStore} from '../store/month';

const MonthItem: React.FC<MonthType> = month => {
  const {name, id, is_active} = month;
  const {isError, isPending, mutate: deleteCategory} = useDeleteMonth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setCurrentMonth = useMonthStore(store => store.setMonth);
  const currentMonth = useMonthStore(store => store.month);
  const queryClient = useQueryClient();
  const toast = useToast();
  const isLoading = isPending;
  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
  };
  const showConfirmDialogHandler = () => {
    setShowConfirmDialog(true);
  };
  const deleteCategoryHanlder = (id: string) => {
    // @ts-ignore
    deleteCategory(id, {
      onSuccess: () => {
        closeConfirmDialog();
        toast.show('Successfully deleted', {
          type: 'success',
        });
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast.show('Error deleting category', {
          type: 'error',
        });
      },
    });
  };
  const setCurrentMonthHandler = (month: MonthType) => {
    setCurrentMonth(month);
    queryClient.invalidateQueries();
    queryClient.refetchQueries();
  };
  return (
    <MonthItemContainer>
      <ConfirmDialog
        show={showConfirmDialog}
        isLoading={isLoading}
        closeFn={closeConfirmDialog}
        asyncFn={() => deleteCategoryHanlder(id)}
      />
      <FlexCenter>
        <Text>{name}</Text>
        {is_active && <Button mode="contained">Active </Button>}
        <FlexCenter gap={20}>
          <MonthForm
            key={name}
            isUpdate={true}
            updateObject={{id: id, data: {name: name}}}
          />
          <Pressable onPress={showConfirmDialogHandler}>
            <Material
              name="delete-circle-outline"
              size={25}
              color={theme.colors.destructive}
            />
          </Pressable>
        </FlexCenter>
      </FlexCenter>
      <BtnContainer>
        {id !== currentMonth?.id && (
          <Button mode="outlined" onPress={() => setCurrentMonthHandler(month)}>
            Set Current
          </Button>
        )}
        {id === currentMonth?.id && (
          <Button
            mode="contained"
            onPress={() => setCurrentMonthHandler(month)}>
            Current
          </Button>
        )}
      </BtnContainer>
    </MonthItemContainer>
  );
};

const MonthLists = () => {
  const {data, isLoading} = useGetMonthsByRoom();
  if (isLoading) return <Text>Loading ...</Text>;
  const categories = (data?.data as unknown as MonthType[]) || [];

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MonthItem {...item} />}
        ItemSeparatorComponent={() => <ItemSeparator height={15} width={10} />}
      />
    </View>
  );
};
export default MonthLists;

const MonthItemContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  background: #fff;
`;

const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px 0px 0px;
  justify-content: flex-end;
`;
