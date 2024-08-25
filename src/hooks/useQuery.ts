import {useMutation, useQuery} from '@tanstack/react-query';
import keys from '../constants/query-keys';
import {
  addMemberToRoom,
  createCategory,
  createNewRoom,
  deleteCategory,
  getCategoriesByRoomId,
  getMembersByRoomId,
  getRecentExpenes,
  getRoom,
  getUsersById,
  removeUserFromRoom,
  updateCategory,
  updateUserInfo,
} from '../api';
import {useUserStore} from '../store/user';
import {useRoomStore} from '../store/room';

export const useGetRecentExpenses = () => {
  const {user} = useUserStore();
  console.log('userid', user?.user.id);

  const userId = user?.user.id!;

  const {isError, data, isLoading} = useQuery({
    queryKey: [keys.recent_expenses],
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

export const useMembersByRoom = () => {
  const room = useRoomStore(state => state.room);
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getMembersByRoomId(room?.room.id!),
    queryKey: [keys.room_members],
  });

  return {isError, isLoading, data};
};

export const useGetUserById = (id: string) => {
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getUsersById(id),
    queryKey: [keys.user, id],
  });
  return {isError, isLoading, data};
};

export const useRemoveUserFromRoom = () => {
  const {data, isError, isPending, mutate} = useMutation({
    mutationFn: removeUserFromRoom,
  });
  return {isError, isPending, data, mutate};
};
