import {FlatList, Pressable, Text, View} from 'react-native';
import {useGetCategoriesByRoom} from '../hooks/useQuery';
import styled from 'styled-components/native';
import {FlexCenter, ItemSeparator} from '../style';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
const CategoryItem: React.FC<CategoryType> = ({name}) => {
  return (
    <CategoryItemContainer>
      <FlexCenter>
        <Text>{name}</Text>
        <FlexCenter gap={10}>
          <Pressable>
            <Material
              name="square-edit-outline"
              size={25}
              color={theme.colors.primary}
            />
          </Pressable>
          <Pressable>
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
