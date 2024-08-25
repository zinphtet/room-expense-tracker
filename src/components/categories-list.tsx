import {Alert, FlatList, Pressable, Text, View} from 'react-native';
import {useDeleteCategory, useGetCategoriesByRoom} from '../hooks/useQuery';
import styled from 'styled-components/native';
import {FlexCenter, ItemSeparator} from '../style';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import {useState} from 'react';
import ConfirmDialog from './confirm-modal';
import {useToast} from 'react-native-toast-notifications';
import {useQueryClient} from '@tanstack/react-query';
import CategoryCreateForm from './category-form';

const CategoryItem: React.FC<CategoryType> = ({name, id}) => {
  const {isError, isPending, mutate: deleteCategory} = useDeleteCategory(id);
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
    <CategoryItemContainer>
      <ConfirmDialog
        show={showConfirmDialog}
        isLoading={isLoading}
        closeFn={closeConfirmDialog}
        asyncFn={() => deleteCategoryHanlder(id)}
      />
      <FlexCenter>
        <Text>{name}</Text>
        <FlexCenter gap={20}>
          <CategoryCreateForm
            key={name}
            isUpdate={true}
            updateObject={{id: id, name: name}}
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
    </CategoryItemContainer>
  );
};

const CategoryLists = () => {
  const {data, isLoading} = useGetCategoriesByRoom();
  if (isLoading) return <Text>Loading ...</Text>;
  const categories = (data?.data as unknown as CategoryType[]) || [];

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CategoryItem {...item} />}
        ItemSeparatorComponent={() => <ItemSeparator height={15} width={10} />}
      />
    </View>
  );
};
export default CategoryLists;

const CategoryItemContainer = styled.View`
  padding: 20px;
  border-radius: 10px;
  background: #fff;
`;
