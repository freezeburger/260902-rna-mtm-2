import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Component usage:
 *
 * const notifications = useSelector(selectNotifications);
 * const notification = useSelector((state) => selectNotificationById(state, notificationId));
 * const dispatch = useDispatch<AppDispatch>();
 * dispatch(addNotification({ id: 'notification-1', message: 'Order placed.' }));
 *
 * Non-React subscription:
 *
 * const unsubscribe = rootStore.subscribe(() => {
 *   console.log(selectNotifications(rootStore.getState()));
 * });
 * unsubscribe();
 */
export type Notification = {
  id: string;
  message: string;
};

export type NotificationsState = {
  items: Notification[];
};

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.push(action.payload);
    },
    updateNotification(state, action: PayloadAction<Notification>) {
      const notification = state.items.find((item) => item.id === action.payload.id);

      if (notification) {
        notification.message = action.payload.message;
      }
    },
    removeNotification(state, action: PayloadAction<Notification['id']>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  selectors: {
    selectNotifications: (state) => state.items,
    selectNotificationById: (state, notificationId: Notification['id']) =>
      state.items.find((item) => item.id === notificationId),
  },
});

export const { addNotification, updateNotification, removeNotification } = notificationsSlice.actions;

export const { selectNotifications, selectNotificationById } = notificationsSlice.selectors;

export default notificationsSlice.reducer;


