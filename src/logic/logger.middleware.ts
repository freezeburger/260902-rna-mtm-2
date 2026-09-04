import { Middleware } from "@reduxjs/toolkit";
import { logic } from "./root.store";

export const logMiddleware: Middleware<{}, any> =
    store => next => action => {

        console.log('Middleware State:', store.getState());
        console.log('Middleware Dispatching action:', action);

        next(action);

        if((action as any).type.includes('settings/')) {
            console.log('Middleware Action is related to settings:', action);

            store.dispatch(
                logic.notifications.actions.addNotification({
                    message: 'Settings have been updated.',
                    id: Date.now().toString(),
                })
            )
        }

        return ;
    };
