import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import topSalesReducer from "../slices/topSalesSlice";
import categoriesReducer from "../slices/categoriesSlice";
import catalogReducer from "../slices/catalogSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
