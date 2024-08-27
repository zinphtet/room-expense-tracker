import {supabase} from '../lib/supabase';

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
  // const {data, error} = await supabase
  //   .from('roomMembers')
  //   .insert([inputObj])
  //   .select('*');
  const {data, error} = await supabase
    .from('users')
    .update({room_id: inputObj.room_id})
    .eq('id', inputObj.user_id)
    .select('*');
  return {data, error};
};

export const getRoom = async (userId: string) => {
  // let {data, error} = await supabase
  //   .from('roomMembers')
  //   .select(`id,room(*)`)
  //   .eq('user_id', userId);
  let {data, error} = await supabase
    .from('users')
    .select(`id,room(*)`)
    .eq('id', userId);
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

export const getMembersByRoomId = async (id: string) => {
  let {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('room_id', id);

  return {data, error};
};

export const getUsersById = async (id: string) => {
  const {data, error} = await supabase.from('users').select('*').eq('id', id);

  return {data, error};
};

export const searchUsersByName = async (name: string) => {
  let {data, error} = await supabase
    .from('users')
    .select(`*`)
    .ilike('name', `%${name}%`);
  return {data, error};
};

export const removeUserFromRoom = async (userId: string) => {
  const {data, error} = await supabase
    .from('users')
    .update({room_id: null})
    .eq('id', userId)
    .select();
  return {data, error};
};

export const createMonth = async (createObj: CreateMonthType) => {
  const {data, error} = await supabase
    .from('month')
    .insert([createObj])
    .select();

  return {data, error};
};

export const updateMonth = async (updateObj: UpdateMonthType) => {
  const {data, error} = await supabase
    .from('month')
    .update(updateObj.data)
    .eq('id', updateObj.id)
    .select();

  return {data, error};
};

export const deleteMonth = async (id: string) => {
  const {error} = await supabase.from('month').delete().eq('id', id);
  return {error};
};

export const getMonthsByRoom = async (roomId: string) => {
  let {data, error} = await supabase
    .from('month')
    .select('*')
    .eq('room_id', roomId);

  return {data, error};
};

export const getActiveMonth = async () => {
  let {data, error} = await supabase
    .from('month')
    .select('*')
    .eq('is_active', true);
  return {data, error};
};
