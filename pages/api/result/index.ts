// pages/api/result.js

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';

function parsePrivateKey(key:any) {
    if (!key) throw new Error('The GOOGLE_PRIVATE_KEY environment variable is not set.');
    return key.replace(/\\n/g, '\n');
  }

async function loadGoogleDoc() {
    try {
        // const formattedKey = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.replace(/\\n/g, "\n");

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: parsePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets'
            ],
        });

        const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID || "",
            serviceAccountAuth
        );
        await doc.loadInfo();
        return doc;
    } catch (error) {
        console.log('Error in loadGoogleDoc',error);
    }
}

export default async function googlesheet(req: NextApiRequest, res: NextApiResponse) {
    // POST 요청만을 처리합니다.
    if (req.method === 'POST') {
        try {
            const doc = await loadGoogleDoc();
            if (!doc)
                return res
                    .status(200)
                    .json({ ok: false, error: "send your memory" })

            let sheet = doc.sheetsByTitle["워케이션"];
         
            if(!sheet) {
                return res.status(200).json({ ok: false,  error: "sheet not found." });
            }
            
            await sheet.addRow({
                '이름' : req.body.name,
                '선택옵션' : req.body.type,
            });
            res.status(201).json({ ok: true, message: 'Data added to the spreadsheet successfully.' });
          
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Error adding data to the spreadsheet', error });
        }
    } else {
        // POST 요청이 아닌 경우에는 메소드 허용 안함 응답을 보냅니다.
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
