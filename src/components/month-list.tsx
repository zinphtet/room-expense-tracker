import {Alert, FlatList, Pressable, Text, View} from 'react-native';
import {
  useDeleteCategory,
  useDeleteMonth,
  useGetCategoriesByRoom,
  useGetMonthsByRoom,
} from '../hooks/useQuery';
import styled from 'styled-components/native';
import {FlexCenter, ItemSeparator} from '../style';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import {useState} from 'react';
import ConfirmDialog from './confirm-modal';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import CategoryCreateForm from './category-form';
import MonthForm from './month-form';

const MonthItem: React.FC<MonthType> = ({name, id}) => {
  const {isError, isPending, mutate: deleteCategory} = useDeleteMonth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
