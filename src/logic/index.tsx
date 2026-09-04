import {
    configureStore,
    type Middleware,
    type Reducer,
} from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { logMiddleware } from './logger.middleware';

const notificationState = {
    messages: '',
    notifications: [
        {
            id: '1',
            message: 'Notification 1',
        },
    ],
};

type NotificationState = typeof notificationState;

type NotificationItem =
    NotificationState['notifications'][number];

type NotificationMessage = NotificationItem['message'];
type NotificationID = NotificationItem['id'];

type NotificationAction =
    | { type: 'ADD_NOTIFICATION'; payload: NotificationMessage }
    | { type: 'REMOVE_NOTIFICATION'; payload: NotificationID }
    | { type: 'CLEAR_NOTIFICATIONS' };


const reducer: Reducer<NotificationState, NotificationAction> =
    (state = notificationState, action) => {
      console.log('Reducer called with action:',  action);
        return state;
    };




export const notificationStore = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logMiddleware),
    devTools:false,

    // npx expo install redux-devtools-expo-dev-plugin
    // In expo cli more tools (shift+m) > Open redux-devtools-expo-dev-plugin
    //enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),

});

export type RootState =  ReturnType<typeof notificationStore.getState>;

export type AppDispatch = typeof notificationStore.dispatch;

export const useNotificationStore = () => {

    const [state, setState] = useState( notificationStore.getState() )

    useEffect(() => {
        return notificationStore.subscribe(() => setState(notificationStore.getState()));
    }, []);

    return {
        state,
        dispatch: notificationStore.dispatch,
    }
}