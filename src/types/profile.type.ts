export interface IProfile {
  affiliate_units: IUnits[];
  email: string;
  error: boolean;
  family_name: string;
  first_name: string;
  phone_no?: string;
  roles: [
    {
      role_id: number;
      role_name: string;
    }
  ];
  success: boolean;
}

export interface IUnits {
  m_affiliate_id: number;
  unit_id: number;
  unit_name: string;
}
