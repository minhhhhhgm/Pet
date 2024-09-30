import { loadingKey, loadingSlice } from './loadingSlice';
import { loginKey, loginSlice } from './loginSlice';
import { profileKey, profileSlice } from './profileSlice';

type ReduxState = {
  [loadingKey]: typeof loadingSlice.reducer;
  [loginKey]: typeof loginSlice.reducer;
  [profileKey]: typeof profileSlice.reducer;
};

export const reducers: ReduxState = {
  [loadingKey]: loadingSlice.reducer,
  [loginKey]: loginSlice.reducer,
  [profileKey]: profileSlice.reducer,
};
