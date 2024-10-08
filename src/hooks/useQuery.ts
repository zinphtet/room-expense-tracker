import {useMutation, useQuery} from '@tanstack/react-query';
import keys from '../constants/query-keys';
import {
  addMemberToRoom,
  addRoomExpense,
  addToRoomMoney,
  createCategory,
  createMonth,
  createNewRoom,
  deleteCategory,
  deleteExepnseById,
  deleteMonth,
  getActiveMonth,
  getAllExpenses,
  getCategoriesByRoomId,
  getCategoryExpense,
  getMembersByRoomId,
  getMonthsByRoom,
  getRecentExpenes,
  getRoom,
  getUsersById,
  removeUserFromRoom,
  updateCategory,
  updateMonth,
  updateRoomExpense,
  updateUserInfo,
} from '../api';
import {useUserStore} from '../store/user';
import {useRoomStore} from '../store/room';
import {useMonthStore} from '../store/month';

export const useGetRecentExpenses = () => {
  const {user} = useUserStore();

  console.log('userid', user?.user.id);

  const userId = user?.user.id!;

  const {isError, data, isLoading} = useQuery({
    queryKey: [keys.recent_expenses, `${userId}`],
    queryFn: () => getRecentExpenes(userId),
  });

  return {isError, data, isLoading};
};

export const useCreateForm = () => {
  const {data, isError, isPending, mutate} = useMutation({
    mutationFn: createNewRoom,
  });
  return {data, isError, isPending, mutate};
};

export const useUpdateUserInfo = () => {
  const {error, data, mutate, isPending} = useMutation({
    mutationFn: updateUserInfo,
  });
  return {error, data, mutate, isPending};
};

export const useAddMemberToRoom = () => {
  const {isError, isPending, data, mutate} = useMutation({
    mutationFn: addMemberToRoom,
  });
  return {isError, isPending, data, mutate};
};

export const useGetRoom = () => {
  const user = useUserStore(store => store.user);
  const userId = user?.user.id!;
  console.log('USE GET ROOM WORKING');
  console.log('userId: ' + userId);
  const {data, isError, isLoading, isFetching} = useQuery({
    queryFn: () => getRoom(userId),
    queryKey: [keys.user_room],
    refetchOnMount: true,
  });
  console.log('USE GET ROOM DATA', JSON.stringify(data, null, 2));
  return {data, isError, isLoading, isFetching};
};

export const useGetCategoriesByRoom = () => {
  const room = useRoomStore(state => state.room);
  const {isError, data, isLoading} = useQuery({
    queryKey: [keys.room_categories],
    queryFn: () => getCategoriesByRoomId(room?.room.id!),
  });

  return {isLoading, isError, data};
};

export const useCreateCategory = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: createCategory,
  });
  return {isError, isPending, mutate};
};

export const useDeleteCategory = (id: string) => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: () => deleteCategory(id),
  });
  return {isError, isPending, mutate};
};

export const useUpdateCategory = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: updateCategory,
  });
  return {isError, isPending, mutate};
};

export const useGetMembersByRoom = () => {
  const room = useRoomStore(state => state.room);
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getMembersByRoomId(room?.room.id!),
    queryKey: [keys.room_members],
  });

  return {isError, isLoading, data};
};

export const useGetUserById = (ids: string[]) => {
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getUsersById(ids),
    queryKey: [keys.user, JSON.stringify(ids)],
  });
  return {isError, isLoading, data};
};

export const useRemoveUserFromRoom = () => {
  const {data, isError, isPending, mutate} = useMutation({
    mutationFn: removeUserFromRoom,
  });
  return {isError, isPending, data, mutate};
};

export const useGetMonthsByRoom = () => {
  const room = useRoomStore(state => state.room?.room);
  const {isError, isLoading, data} = useQuery({
    queryKey: [keys.months],
    queryFn: () => getMonthsByRoom(room?.id!),
  });
  return {isError, isLoading, data};
};

export const useCreateMonth = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: createMonth,
  });
  return {isError, isPending, mutate};
};

export const useDeleteMonth = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: deleteMonth,
  });
  return {isError, isPending, mutate};
};

export const useUpdateMonth = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: updateMonth,
  });
  return {isError, isPending, mutate};
};

export const useGetActiveMonth = () => {
  const {isError, isLoading, data} = useQuery({
    queryKey: [keys.active_month],
    queryFn: getActiveMonth,
  });
  return {isError, isLoading, data};
};

export const useCreateRoomExpense = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: addRoomExpense,
  });
  return {isError, isPending, mutate};
};

export const useGetAllExpenses = () => {
  const month = useMonthStore(store => store.month);
  const room = useRoomStore(store => store.room?.room);
  const {data, isError, isLoading} = useQuery({
    queryKey: [keys, `${month?.id}/${room?.id}`],
    queryFn: () => getAllExpenses(room?.id!, month?.id!),
  });
  return {data, isError, isLoading};
};

export const useGetExpenseByCategory = () => {
  const month = useMonthStore(store => store.month);
  const room = useRoomStore(store => store.room?.room);
  const {data, isError, isLoading} = useQuery({
    queryKey: [keys.expenses_cateogry, `${month?.id}/${room?.id}`],
    queryFn: () => getCategoryExpense(room?.id!, month?.id!),
  });
  return {data, isError, isLoading};
};

export const useCreateAddToRoom = () => {
  const {isError, isPending, mutate} = useMutation({
    mutationFn: addToRoomMoney,
  });
  return {isError, isPending, mutate};
};

export const useDeleteExpense = () => {
  const {isPending, mutate} = useMutation({
    mutationFn: deleteExepnseById,
  });
  return {mutate, isPending};
};

export const useUpdateRoomExpense = () => {
  const {isPending, mutate} = useMutation({
    mutationFn: updateRoomExpense,
  });
  return {isPending, mutate};
};
