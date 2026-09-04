import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Component usage with the async thunk:
 *
 * const notifications = useSelector(selectNotifications);
 * const requestStatus = useSelector(selectNotificationRequestStatus);
 * const dispatch = useDispatch<AppDispatch>();
 * await dispatch(postNotification({ message: 'Order placed.' })).unwrap();
 *
 * Non-React subscription:
 *
 * const unsubscribe = rootStore.subscribe(() => {
 *   console.log(selectNotifications(rootStore.getState()));
 * });
 * rootStore.dispatch(postNotification({ message: 'Order placed.' }));
 * unsubscribe();
 */
export type Notification = {
  id: string;
  message: string;
};

export type CreateNotification = Omit<Notification, 'id'>;
export type NotificationRequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type NotificationsState = {
  items: Notification[];
  requestStatus: NotificationRequestStatus;
  error: string | undefined;
};

const initialState: NotificationsState = {
  items: [],
  requestStatus: 'idle',
  error: undefined,
};

const NOTIFICATIONS_URL = 'http://localhost:8080/notifications';

function isNotification(value: unknown): value is Notification {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const notification = value as Record<string, unknown>;
  return typeof notification.id === 'string' && typeof notification.message === 'string';
}

export const postNotification = createAsyncThunk<
  Notification,
  CreateNotification,
  { rejectValue: string }
>('notifications/postNotification', async (notification, { rejectWithValue }) => {
  const response = await fetch(NOTIFICATIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    return rejectWithValue(`Unable to post notification (${response.status}).`);
  }

  const responseBody: unknown = await response.json();

  if (!isNotification(responseBody)) {
    return rejectWithValue('The notifications API returned an invalid response.');
  }

  return responseBody;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(postNotification.pending, (state) => {
        state.requestStatus = 'loading';
        state.error = undefined;
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.requestStatus = 'succeeded';
      })
      .addCase(postNotification.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Unable to post notification.';
      });
  },
  selectors: {
    selectNotifications: (state) => state.items,
    selectNotificationById: (state, notificationId: Notification['id']) =>
      state.items.find((item) => item.id === notificationId),
    selectNotificationRequestStatus: (state) => state.requestStatus,
    selectNotificationError: (state) => state.error,
  },
});

export const { addNotification, updateNotification, removeNotification } = notificationsSlice.actions;

export const {
  selectNotifications,
  selectNotificationById,
  selectNotificationRequestStatus,
  selectNotificationError,
} = notificationsSlice.selectors;

export default notificationsSlice.reducer;

