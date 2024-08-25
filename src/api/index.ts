import {supabase} from '../lib/supabase';
import {useRoomStore} from '../store/room';

const RecentHistoryLimit = 5;

export const getRecentExpenes = async (userId: string) => {
  console.log('userid', userId);

  try {
    let {error, data} = await supabase
      .from('expense')
      .select('id,amount,category(name), expense_date, created_at')
      .eq('created_user_id', userId)
      .limit(RecentHistoryLimit);
    return {error, data};
  } catch (err) {
    console.log('Error getting expense by user');
  }
};

// create New Room

export const createNewRoom = async (createInput: CreateNewRoomInputType) => {
  try {
    const {data, error} = await supabase
      .from('room')
      .insert([createInput])
      .select('*');
    return {data, error};
  } catch (err) {
    console.log('Error creating new room');
  }
};

export const updateUserInfo = async ({
  updateObj,
  userId,
}: UpdateUserInfoType) => {
  const {data, error} = await supabase
    .from('auth.users') // 'users' is your custom table, not auth.users
    .update(updateObj)
    .eq('id', userId);

  return {data, error};
};

export const addMemberToRoom = async (inputObj: AddMemberInputType) => {
  const {data, error} = await supabase
    .from('roomMembers')
    .insert([inputObj])
    .select('*');

  return {data, error};
};

export const getRoom = async (userId: string) => {
  let {data, error} = await supabase
    .from('roomMembers')
    .select(`id,room(*)`)
    .eq('user_id', userId);
  return {data, error};
};

export const getCategoriesByRoomId = async (roomId: string) => {
  let {data, error} = await supabase
    .from('category')
    .select('id,name,created_user_id')
    .eq('room_id', roomId);
  return {data, error};
};

export const createCategory = async (inputObj: CreateCategroyInputType) => {
  const {data, error} = await supabase
    .from('category')
    .insert([{name: inputObj.name, room_id: inputObj.roomId}])
    .select('id,name,created_user_id');

  return {data, error};
};

export const deleteCategory = async (id: string) => {
  const {error} = await supabase.from('category').delete().eq('id', id);

  return {error};
};

export const updateCategory = async (inputObj: UpdateCategoryInputType) => {
  const {data, error} = await supabase
    .from('category')
    .update({name: inputObj.name})
    .eq('id', inputObj.id)
    .select();

  return {data, error};
};
