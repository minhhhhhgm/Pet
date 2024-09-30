import { createSlice } from '@reduxjs/toolkit';
import { IProfile } from 'types/profile.type';

export const profileKey = 'profile';

const initialState: IProfile = {
  affiliate_units: [
    {
      m_affiliate_id: 0,
      unit_id: 0,
      unit_name: '',
    },
  ],
  email: '',
  error: false,
  family_name: '',
  first_name: '',
  phone_no: '',
  roles: [
    {
      role_id: 0,
      role_name: '',
    },
  ],
  success: false,
};

export const profileSlice = createSlice({
  name: profileKey,
  initialState,
  reducers: {
    updateProfile: (state, action) => ({ ...state, ...action.payload }),
    clearProfileData: () => initialState,
  },
});

export const { updateProfile, clearProfileData } = profileSlice.actions;
