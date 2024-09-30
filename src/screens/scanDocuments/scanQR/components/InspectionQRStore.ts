// import { create } from 'zustand';

// /*
//     車検証QR読み込みストア
//  */
// /**
//  * 車検証QRのフォーマットと解析について
//  *
//  * 車検証QRは軽自動車と普通自動車の２種類がある。
//  *
//  * 普通車車検証の仕様書：
//  * https://www.denshishakensho-portal.mlit.go.jp/assets/files/Two-dimensional_code_item_definition.pdf
//  *
//  * 軽自動車のQRは、
//  * コード２、コード３があり、それぞれ分割されずに一つのQRコードとなっている。
//  *
//  * 普通自動車のQRは、
//  * ３つのQRに分割された２次元コード３と
//  * ２つのQRに分割された２次元コード２がある。
//  *
//  * QRコードには / で区切られたShiftJISコードの文字列が格納されている。
//  *
//  * 軽自動車QRは、先頭が 'K/数字２桁/'
//  * となっており、先頭を見るだけで判別できる。
//  * ２桁の数字は、１桁目はコード番号、２桁目は改定番号となっており、
//  * 本アプリでは、コード番号が２と３の２つを抽出する。
//  *
//  * 普通自動車の２次元コード２のフォーマット
//  *
//  * ２次元コード２の１は、
//  * 先頭の２文字が '2/' となっており、その後ろに全角文字が続く。
//  * そのパターンを検出すれば２次元コード２の１と確定できる。
//  * ２次元コード２の２は、
//  * ２次元コード２の１の後に文字列を連結し、
//  * 各フィールドの長さが '1,12,1,可変23,可変24,1'
//  * となっておれば、 ２次元コード２の２と確定できる。
//  *
//  * 普通自動車の２次元コード３のフォーマット
//  *
//  * 各フィールド長は、'1,3,可変10,6,4,可変17,4,4,4,4,2,3,1,1,1,4,5,6,2'
//  *
//  * 最大で区切り文字含めて101文字、最小で74文字となる。
//  * QRの分割方法は国土交通省の仕様書に定義されていないが、均等に３分割していると思われる。
//  * 先頭からのフィールド長のパターンが、1,3?,6 であれば２次元コード３の１と確定される。
//  * 末尾のフィールド長のパターンが、6,2 であれば２次元コード３の３と確定される。
//  * QRで読み込んだ文字列を２次元コード３の１と２次元コード３の３で挟んで
//  * 各フィールド長が、'1,3,可変10,6,4,可変17,4,4,4,4,2,3,1,1,1,4,5,6,2'
//  * になっていれば、２次元コード３の２と確定される。
//  *
//  */
// // ストア定義
// type InspectionQRCode = {
//   // 状態の定義
//   // 普通自動車車検QR
//   code2_1: string | undefined;
//   code2_2: string | undefined;
//   code3_1: string | undefined;
//   code3_2: string | undefined;
//   code3_3: string | undefined;

//   // 軽自動車車検QR
//   kei2: string | undefined;
//   kei3: string | undefined;
//   other: string | undefined;

//   // Actions の定義
//   initQRState: () => void;
//   recognizeQR: (qr: string) => void;
// };

// export const useInspectionQRCode = create<InspectionQRCode>(set => ({
//   // 普通自動車車検QR
//   code2_1: undefined,
//   code2_2: undefined,
//   code3_1: undefined,
//   code3_2: undefined,
//   code3_3: undefined,

//   // 軽自動車車検QR
//   kei2: undefined,
//   kei3: undefined,
//   other: undefined,

//   initQRState: () => {
//     QRAnalyzer.setQrString('');
//     set({
//       // 普通自動車車検QR
//       code2_1: undefined,
//       code2_2: undefined,
//       code3_1: undefined,
//       code3_2: undefined,
//       code3_3: undefined,

//       // 軽自動車車検QR
//       kei2: undefined,
//       kei3: undefined,
//     });
//   },
//   recognizeQR: (qr: string) => {
//     switch (QRAnalyzer.setQrString(qr)) {
//       case CODE2_1:
//         set({ code2_1: qr });
//         break;
//       case CODE2_2:
//         set({ code2_2: qr });
//         break;
//       case CODE3_1:
//         set({ code3_1: qr });
//         break;
//       case CODE3_2:
//         set({ code3_2: qr });
//         break;
//       case CODE3_3:
//         set({ code3_3: qr });
//         break;
//       case KEI2:
//         set({ kei2: qr });
//         break;
//       case KEI3:
//         set({ kei3: qr });
//         break;
//       case OTHER:
//         set({ other: qr });
//         break;
//     }
//   },
// }));

// // 普通自動車車検QR
// const CODE2_1 = 1;
// const CODE2_2 = 2;
// const CODE3_1 = 3;
// const CODE3_2 = 4;
// const CODE3_3 = 5;

// // 軽自動車車検QR
// const KEI2 = 6;
// const KEI3 = 7;

// const OTHER = -1;

// // QR 検出用ワーク
// let work3_1: string = '';
// let work3_3: string = '';
// let work2_1: string = '';

// const QRAnalyzer: {
//   setQrString: (s: string) => number;
// } = {
//   setQrString: (s: string) => {
//     if (!s) {
//       // ワーク初期化
//       work3_1 = '';
//       work3_3 = '';
//       work2_1 = '';
//       return OTHER;
//     }

//     if (s.startsWith('1////')) {
//       // 紙車検証の左端を弾く
//       return OTHER;
//     }

//     const pattern = qrStringPattern(s);
//     if (pattern.length < 2) {
//       return OTHER;
//     }
//     if (pattern[0].str === 'K' && pattern[1].len === 2) {
//       // 軽自動車の車検証
//       if (s.startsWith('K/2')) {
//         // 'K/2?/〜' のパターン
//         return KEI2;
//       }
//       if (s.startsWith('K/3')) {
//         // 'K/3?/〜' のパターン
//         return KEI3;
//       }
//       return OTHER;
//     }
//     // 軽自動車以外の車検証
//     if (s.startsWith('2/')) {
//       // 先頭が 2/
//       const c = s.substring(2, 3);
//       if (c.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)) {
//         // 次の文字が全角なら CODE2_1
//         work2_1 = s;
//         return CODE2_1;
//       }
//       if (pattern[0].len === 1 && pattern[1].len === 3 && pattern[3].len === 6) {
//         // フィールド長が 1,3,?,6 のパターン
//         work3_1 = s;
//         return CODE3_1;
//       }
//     }
//     if (work2_1) {
//       const s2 = work2_1 + s;
//       const s2pattern = qrStringPattern(s2);
//       // 各フィールドの長さが '1,12,1,可変23,可変24,1' なら CODE2_2
//       if (
//         s2pattern.length === 6 &&
//         s2pattern[0].len === 1 &&
//         s2pattern[1].len === 12 &&
//         s2pattern[2].len === 1 &&
//         s2pattern[5].len === 1
//       ) {
//         return CODE2_2;
//       }
//     }
//     const patternLen = pattern.length;
//     if (patternLen > 3) {
//       if (pattern[patternLen - 2].len === 6 && pattern[patternLen - 1].len === 2) {
//         // 末尾のフィールド長が 6,2 のパターン
//         work3_3 = s;
//         return CODE3_3;
//       }
//     }
//     if (work3_1 && work3_3) {
//       const s2 = work3_1 + s + work3_3;
//       const s2pattern = qrStringPattern(s2);
//       // 各フィールド長が'1,3,可変10,6,4,可変17,4,4,4,4,2,3,1,1,1,4,5,6,2' ならCODE2_2
//       if (
//         s2pattern.length === 19 &&
//         s2pattern[0].len === 1 &&
//         s2pattern[1].len === 3 &&
//         s2pattern[3].len === 6 &&
//         s2pattern[4].len === 4 &&
//         s2pattern[6].len === 4 &&
//         s2pattern[7].len === 4 &&
//         s2pattern[8].len === 4 &&
//         s2pattern[9].len === 4 &&
//         s2pattern[10].len === 2 &&
//         s2pattern[11].len === 3 &&
//         s2pattern[12].len === 1 &&
//         s2pattern[13].len === 1 &&
//         s2pattern[14].len === 1 &&
//         s2pattern[15].len === 4 &&
//         s2pattern[16].len === 5 &&
//         s2pattern[17].len === 6 &&
//         s2pattern[18].len === 2
//       ) {
//         return CODE3_2;
//       }
//     }
//     return OTHER;
//   },
// };

// function qrStringPattern(s: string): { str: string; len: number }[] {
//   const ss: string[] = s.split('/');
//   return ss.map(item => {
//     return {
//       str: item,
//       len: item.length,
//     };
//   });
// }
