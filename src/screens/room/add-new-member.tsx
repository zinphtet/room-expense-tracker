import {FlatList, Text, View} from 'react-native';
import {Container} from '../../style';
import {Searchbar} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {searchUsersByName} from '../../api';
import {useDebounce} from 'use-debounce';
import {TextCenter} from '../../components/confirm-modal';
import AddMemberCard from '../../components/add-member-item';

const AddNewMemberScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [value] = useDebounce(searchQuery, 300);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Member[] | null>(null);
  const fetchMemners = () => {
    setIsFetching(true);
    searchUsersByName(searchQuery)
      .then(data => setData(data?.data))
      .catch(err => console.log(err))
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    if (!searchQuery.trim()) return;
    fetchMemners();
  }, [value]);

  return (
    <Container horizontal={20} vertical={20} gap={20}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {isFetching && (
        <Container vertical={20}>
          <TextCenter>Loading ...</TextCenter>
        </Container>
      )}
      {data?.length === 0 && (
        <Container vertical={20}>
          <TextCenter>No users with this name</TextCenter>
        </Container>
      )}
      {!isFetching && (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <AddMemberCard {...item} />}
        />
      )}
    </Container>
  );
};

export default AddNewMemberScreen;
