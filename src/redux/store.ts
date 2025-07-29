import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/book/bookApi";
import { borrowApi } from "./api/book/borrowApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]:borrowApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(bookApi.middleware)
  .concat(borrowApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
