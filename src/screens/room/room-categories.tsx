import {Text} from 'react-native-paper';
import {Container} from '../../style';
import CategoryLists from '../../components/categories-list';
import CreateCategoryForm from '../../components/create-category';

const RoomCategories = () => {
  return (
    <Container horizontal={20} vertical={20} gap={20}>
      <CreateCategoryForm />
      <Text variant="titleLarge">Categories</Text>
      <CategoryLists />
    </Container>
  );
};

export default RoomCategories;
