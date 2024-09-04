import {log} from '../lib/helper';
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
  if (error) {
    throw new Error('Error deleting category');
  }
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

export const getUsersById = async (ids: string[]) => {
  const {data, error} = await supabase.from('users').select('*').in('id', ids);
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

export const addRoomExpense = async (createObj: CreateRoomExpenseType) => {
  const {data, error} = await supabase
    .from('expense')
    .insert([createObj])
    .select();
  if (error) {
    log(error, 'error inserting');
    throw new Error(error.message);
  }
  return {data};
};

export const getAllExpenses = async (roomId: string, monthId: string) => {
  let {data, error} = await supabase
    .from('expense')
    .select(
      'id,created_at,expense_date,amount,created_user_id,to_room,category(name),description,is_room_money,member_ids,users(name)',
    )
    .eq('room_id', roomId)
    .eq('month_id', monthId)
    .order('expense_date', {ascending: false});

  return {data, error};
};

export const getCategoryExpense = async () => {
  const {data, error} = await supabase
    .from('expense')
    .select('category_id, amount, category(name)');

  if (error) {
    throw new Error('Error fetching expenses');
  }

  const grouupByExpId = data.reduce((acc, row) => {
    if (!acc[row.category_id]) {
      acc[row.category_id] = [];
    }
    acc[row.category_id].push(row);
    return acc;
  }, {} as Record<number, typeof data>);
  const keys = Object.keys(grouupByExpId);
  return {keys, expenseByCategoryId: grouupByExpId};
};

export const addToRoomMoney = async (createObj: AddRoomMoneyType) => {
  const {data, error} = await supabase
    .from('expense')
    .insert([
      {
        ...createObj,
        to_room: true,
        is_room_money: false,
        expense_date: new Date(),
      },
    ])
    .select();
  if (error) {
    log(error, 'error inserting money');
    throw new Error('Error adding money to room');
  }
  return {data};
};
