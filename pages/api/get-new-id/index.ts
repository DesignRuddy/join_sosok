// // pages/api/get-new-id.js

// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { JWT } from 'google-auth-library';
// import { NextApiRequest, NextApiResponse } from 'next';

// // 환경변수에서 필요한 정보를 파싱하는 함수
// function parsePrivateKey(key:any) {
//   if (!key) throw new Error('The GOOGLE_PRIVATE_KEY environment variable is not set.');
//   return key.replace(/\\n/g, '\n');
// }

// // Google Doc을 로드하는 함수
// async function loadGoogleDoc() {
//   try {
//     // JWT를 사용하여 서비스 계정 인증 정보를 생성합니다.
//     const serviceAccountAuth = new JWT({
//       email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       key: parsePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     });

//     // GoogleSpreadsheet 인스턴스를 생성하고 문서 정보를 로드합니다.
//     const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID ||"",
//         serviceAccountAuth
//     );
    
//     await doc.loadInfo();
//     return doc;
//   } catch (error) {
//     console.error('Error in loadGoogleDoc', error);
//     throw error;
//   }
// }

// export default async function getNewId(req:NextApiRequest, res:NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const doc = await loadGoogleDoc();
//       const sheet = doc.sheetsByTitle['워케이션']; // 해당 시트를 선택합니다.
//       if (!sheet) {
//         return res.status(404).json({ ok: false, error: "Sheet not found." });
//       }
      
//       const rows = await sheet.getRows();
//       const lastRow = rows[rows.length - 1];
//       const lastId = lastRow ? parseInt(lastRow.get('관리번호'), 10) : 0;
//       const newId = lastId + 1; // 새로운 관리번호를 생성합니다.

//       // 새로운 관리번호를 클라이언트에 반환합니다.
//       res.status(200).json({ ok: true, newId });
//     } catch (error) {
//       console.error('Error: ', error);
//       res.status(500).json({ error: 'Error generating new ID', details: error });
//     }
//   } else {
//     // GET 요청이 아닌 경우에는 메소드 허용 안함 응답을 보냅니다.
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
