import { CarInformation } from 'types/carInformation.type';

export const read5QrNormalCar = (
  erased: boolean,
  freeabled: boolean,
  qr: string[]
): CarInformation => {
  let qr1 = null;
  let qr2 = null;
  if (Number(erased) === 1 && freeabled === true) {
    // 抹消有りかつQRコードリーダー無料版使用フラグがたっている場合
    qr1 = qr[4]; // 最後を読み込む時は全て読み込む時のため、最後を指定
    let qr2_split1 = qr[0].split('/');
    let qr2_split2 = qr[1].split('/');
    if (qr2_split1.length < 6 && qr2_split2.length < 6) {
      qr2 = qr[0] + qr[1].replace('\x00', '');
    } else if (qr2_split1.length < 6) {
      qr2 = qr[1];
    } else {
      qr2 = qr[0];
    }
  } else if (freeabled === true) {
    // 抹消無しかつQRコードリーダー無料版使用フラグがたっている場合
    qr1 = qr[2]; // 最後を読み込む時は全て読み込む時のため、最後を指定
    let qr2_split1 = qr[3].split('/');
    let qr2_split2 = qr[4].split('/');
    if (qr2_split1.length < 6 && qr2_split2.length < 6) {
      qr2 = qr[3] + qr[4].replace('\x00', '');
    } else if (qr2_split1.length < 6) {
      qr2 = qr[4];
    } else {
      qr2 = qr[3];
    }
  } else if (Number(erased) === 1) {
    // 抹消有りかつQRコードリーダー有料版使用の場合
    qr1 = qr[2] + qr[3] + qr[4];
    qr2 = qr[0] + qr[1];
  } else {
    // 抹消無しかつQRコードリーダー有料版使用の場合
    qr1 = qr[0] + qr[1] + qr[2];
    qr2 = qr[3] + qr[4];
  }
  var code1 = qr1.split('/');
  var code2 = qr2.split('/');
  const currentDate: Date = new Date();
  const now = `${currentDate.getFullYear()}`;
  /*
  https://www.denshishakensho-portal.mlit.go.jp/assets/files/Two-dimensional_code_item_definition.pdf
  if car doesn't have inspection_limit, qr code value will be 999999. So we need to check it, if it is 999999, we will set it to empty
  */
  let inspection_limit = '';
  if (code1[3] && code1[3] !== '999999') {
    inspection_limit =
      (Number('20' + code1[3].slice(0, 2) <= now + 4) ? '20' : '19') +
      (code1[3].slice(0, 2) + '/' + code1[3].slice(2, 4) + '/' + code1[3].slice(4, 6));
  }

  const first_registration_year =
    Number('20' + code1[4].slice(0, 2)) <= currentDate.getFullYear()
      ? Number('20' + code1[4].slice(0, 2))
      : Number('19' + code1[4].slice(0, 2));

  const first_registation_month = code1[4].slice(2, 4);

  const info: CarInformation = {
    katashiki_num: code1[2].slice(0, 5), // 型式指定番号
    ruibetsu_kbn: code1[2].slice(5, 9), // 類別区分番号
    inspection_limit: inspection_limit,
    first_registration_year: first_registration_year,
    first_registration_month: first_registation_month, // 月
    first_registration: first_registration_year + '-' + first_registation_month + '-01', // 初年度登録（年月）
    model_code: code1[5], // 型式

    transport_bu_name: code2[1].slice(0, 4).trim(), // transport_bu_name
    class_no: code2[1].slice(4, 7).replace(/\s+/g, ''), // class_no
    hiragana: code2[1].slice(7, 8), // hiragana
    registry_no: code2[1].slice(8, 12), // registry_no
    vin: code2[3], // vin
    motor_model: code2[4], // 原動機型式
    registry_no_erased: code2[5] === '2' || code2[5] === '4' ? 1 : 0, // 抹消
  };
  return info;
};

export const read3QrLightCar = (qr: string[]) => {
  // var code1 = qr[2];// コード２と同じデータが入っている。
  var code2 = qr[1].split('/');
  var code3 = qr[0].split('/');
  const currentDate: Date = new Date();

  const first_registration_year =
    Number('20' + code3[5].slice(0, 2)) <= currentDate.getFullYear()
      ? Number('20' + code3[5].slice(0, 2))
      : Number('19' + code3[5].slice(0, 2));

  const first_registation_month = code3[5].slice(2, 4);

  // 不要データはコメントアウト
  const info: CarInformation = {
    transport_bu_name: code2[2].slice(0, 4), // 陸運支局
    class_no: code2[2].slice(4, 7).replace(/\s+/g, ''), // クラス番号
    hiragana: code2[2].slice(7, 8), // ひらがな
    registry_no: code2[2].slice(8, 12), // 登録番号
    vin: code2[4], // 車台番号
    motor_model: code2[5], // 原動機型式
    katashiki_num: code3[3].slice(0, 5), // 型式指定番号
    ruibetsu_kbn: code3[3].slice(5, 9), // 類別区分番号
    // 有効期限満了日(車検期限)
    inspection_limit:
      (Number('20' + code3[4].slice(0, 2)) <= currentDate.getFullYear() + 4 ? '20' : '19') +
      (code3[4].slice(0, 2) + '/' + code3[4].slice(2, 4) + '/' + code3[4].slice(4, 6)),
    // 初年度登録
    first_registration_year: first_registration_year,
    first_registration_month: first_registation_month, // 月
    first_registration: first_registration_year + '-' + first_registation_month + '-01', // 初年度登録（年月）
    model_code: code3[6], // 型式（最大２０桁）
    registry_no_erased: code2[6] === '2' || code2[6] === '4' ? 1 : 0, // 抹消
  };
  return info;
};

export const read6QrLightCar = (qr: string[]) => {
  var code2 = qr[4].split('/');
  var code3 = qr[3].split('/');
  var code4 = qr[2].split('/');
  var code5 = qr[1].split('/');
  var code6 = qr[0].split('/');
  const currentDate: Date = new Date();

  const first_registration_year =
    Number('20' + code3[5].slice(0, 2)) <= currentDate.getFullYear()
      ? Number('20' + code3[5].slice(0, 2))
      : Number('19' + code3[5].slice(0, 2));

  const first_registation_month = code3[5].slice(2, 4);

  const info: CarInformation = {
    transport_bu_name: code2[2].slice(0, 4), // transport_bu_name
    class_no: code2[2].slice(4, 7).replace(/\s+/g, ''), // class_no
    hiragana: code2[2].slice(7, 8), // hiragana
    registry_no: code2[2].slice(8, 12), // registry_no
    vin: code2[4], // 車台番号
    motor_model: code2[5], // 原動機型式
    katashiki_num: code3[3].slice(0, 5), // 型式指定番号
    ruibetsu_kbn: code3[3].slice(5, 9), // 類別区分番号
    inspection_limit:
      (Number('20' + code3[4].slice(0, 2)) <= currentDate.getFullYear() + 4 ? '20' : '19') +
      (code3[4].slice(0, 2) + '/' + code3[4].slice(2, 4) + '/' + code3[4].slice(4, 6)),
    first_registration_year: first_registration_year,
    first_registration_month: first_registation_month, // 月
    first_registration: first_registration_year + '-' + first_registation_month + '-01', // 初年度登録（年月）
    model_code: code3[6], // 型式（最大２０桁）
    user_name: code4[2], // 使用者氏名
    user_address: code5[2], // 使用者住所
    businesswork_flg: code6[4] ? (code6[4] === '自家用' ? 0 : 1) : null, // 自家用・事業用の別
    registry_no_erased: code2[6] === '2' || code2[6] === '4' ? 1 : 0, // 抹消
  };
  return info;
};
