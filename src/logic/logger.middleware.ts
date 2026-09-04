import { Middleware } from "@reduxjs/toolkit";

export const logMiddleware: Middleware<{}, any> =
    store => next => action => {

        console.log('Middleware State:', store.getState());
        console.log('Middleware Dispatching action:', action);

        return next(action);
    };
