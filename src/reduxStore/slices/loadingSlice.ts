import { createSlice } from '@reduxjs/toolkit';

export const loadingKey = 'loading';

export type LoadingState = {
  loading: boolean;
};

const initialState: LoadingState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: loadingKey,
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setGlobalLoading } = loadingSlice.actions;
