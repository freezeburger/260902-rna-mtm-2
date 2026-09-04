import {
    configureStore,
    type Middleware,
    type Reducer,
} from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

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


const logMiddleware: Middleware<{}, NotificationState> =
    store => next => action => {

        console.log('Middleware State:', store.getState());
        console.log('Middleware Dispatching action:', action);

        return next(action);
    };


export const notificationStore = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logMiddleware),
    devTools:false,

    // npx expo install redux-devtools-expo-dev-plugin
    // npx redux-devtools-expo-dev-plugin
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),

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