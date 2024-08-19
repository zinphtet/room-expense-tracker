import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Menu, Provider } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  category: string;
  description: string;
  members: string;
};

const MyForm = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [membersMenuVisible, setMembersMenuVisible] = useState(false);

  // Sample Data
  const categories = ['Health', 'Education', 'Finance'];
  const membersList = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Provider>
      <View style={{ padding: 16 }}>
        {/* Select Category Input */}
        <Controller
          control={control}
          name="category"
          render={({ field: { onBlur, value } }) => (
            <Menu
              visible={categoryMenuVisible}
              onDismiss={() => setCategoryMenuVisible(false)}
              anchor={
                <TextInput
                  label="Select Category"
                  value={value}
                  onFocus={() => setCategoryMenuVisible(true)}
                  onBlur={onBlur}
                  style={{ marginBottom: 16 }}
                  editable={false}
                />
              }
            >
              {categories.map((cat, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setValue('category', cat);
                    setCategoryMenuVisible(false);
                  }}
                  title={cat}
                />
              ))}
            </Menu>
          )}
        />

        {/* Description Input */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Description"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{ marginBottom: 16 }}
              multiline
            />
          )}
        />

        {/* Select Members Input */}
        <Controller
          control={control}
          name="members"
          render={({ field: { onBlur, value } }) => (
            <Menu
              visible={membersMenuVisible}
              onDismiss={() => setMembersMenuVisible(false)}
              anchor={
                <TextInput
                  label="Select Members"
                  value={value}
                  onFocus={() => setMembersMenuVisible(true)}
                  onBlur={onBlur}
                  style={{ marginBottom: 16 }}
                  editable={false}
                />
              }
            >
              {membersList.map((member, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setValue('members', member);
                    setMembersMenuVisible(false);
                  }}
                  title={member}
                />
              ))}
            </Menu>
          )}
        />

        {/* Submit Button */}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </View>
    </Provider>
  );
};

export default MyForm;
