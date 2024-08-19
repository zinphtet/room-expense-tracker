type GreetUser = {
  display_name: string;
};

type Category = {
  name: string;
};

type Expense = {
  id: string;
  amount: number;
  expense_date: string; // ISO string for date
  created_at: string; // ISO string for date
  category: Category;
};

type ScreenProps = {
  navigation: any;
};

type CreateNewRoomInputType = {
  [key: string]: string | number;
};

type ObjectType = {
  [key: string]: string | number;
};

type UpdateUserInfoType = {
  userId: string;
  updateObj: ObjectType;
};

type AddMemberInputType = {
  user_id: string;
  room_id: string;
};

type RoomType = {
  id: string;
  room: {
    id: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    created_user_id: string;
  };
};

type CategoryType = {
  id: string;
  name: string;
  created_user_id: string;
};
