import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/slice";
import { authReducer } from "./users/slice";

import {
  persistStore,
  //   persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const authConfig = {
//   key: "authKey",
//   storage,
//   whitelist: ["token"], // blacklist: ["showProfilesList"]
// };

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer, //(authConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
