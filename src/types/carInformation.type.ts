export type CarInformation = {
  katashiki_num: string; // 型式指定番号
  ruibetsu_kbn: string; // 類別区分番号
  inspection_limit: string; // 有効期限満了日(車検期限)
  first_registration_year: number; // 初年度登録年
  first_registration_month: string; // 初年度登録月
  first_registration?: string; // 初年度登録
  model_code: string; // 型式
  transport_bu_name: string; // 陸運支局
  class_no: string; // クラス番号
  hiragana: string; // ひらがな
  registry_no: string; // 登録番号
  vin: string; // 車台番号
  motor_model: string; // 原動機型式
  registry_no_erased: number; // 抹消
  user_name?: string; // 使用者氏名
  user_address?: string; // 使用者住所
  businesswork_flg?: number | null; // 自家用・事業用の別
};

export type SocketQRData = {
  token: string;
  syubetsu_flg: 0 | 1; // 車種(1: 普通車, 0: 軽自動車)
  erased: 0 | 1; // 抹消有無(0: なし, 1: あり)
  kei_qr_count: string;
};
