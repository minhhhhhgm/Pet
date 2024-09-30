import { createSlice } from '@reduxjs/toolkit';

export const loginKey = 'login';

export type LoginState = {
  auth: {
    token: string;
    staff_id: number;
  };
};

const initialState: LoginState = {
  auth: {
    token: '',
    staff_id: -1,
  },
};

export const loginSlice = createSlice({
  name: loginKey,
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.auth = action.payload;
      return state;
    },
    clearLoginData: state => {
      state = initialState;
      return state;
    },
  },
});

export const { loginSuccess, clearLoginData } = loginSlice.actions;
