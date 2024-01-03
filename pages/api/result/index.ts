import { GoogleSpreadsheet } from "google-spreadsheet"; // google-spreadsheet를 불러옵니다.
import { JWT } from "google-auth-library"; // Google에 JWT 인증을 위해 google-auth-library를 불러옵니다.
import credential from "@/lib/key.json"; // 다운로드한 인증 key.json을 불러옵니다.
import { NextApiRequest, NextApiResponse } from "next";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]; // 해당 API로 sheets를 손대겠다는 범위 설정입니다.
const documentID = "1A-xjbzcsqi9bkGExxMl1SoKViy-4IrGZaKck72dvB9s"; // Sheet의 고유 문서 ID입니다.
// const jwt = new JWT({ ...});

function parsePrivateKey(key: any) {
    if (!key) throw new Error('The GOOGLE_PRIVATE_KEY environment variable is not set.');
    return key.replace(/\\n/g, '\n');
}

async function loadGoogleDoc() {
    try {
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
        console.log('Error in loadGoogleDoc', error);
    }
}

export default async function googlesheet(req: NextApiRequest, res: NextApiResponse) {
    // POST 요청만을 처리합니다.
    if (req.method === 'POST') {
        try {
            const doc = await loadGoogleDoc();
            if (!doc) {
                return res.status(500).json({ ok: false, error: "Unable to load the document" })
            }

            let sheet = doc.sheetsByTitle["workation"];
            await sheet.loadHeaderRow(3)

            if (!sheet) {
                return res.status(404).json({ ok: false, error: "sheet not found." });
            }

            const rows = await sheet.getRows();
            let targetRow = rows.find(row => !row.get('신청일자'));

            if (targetRow) {
                targetRow.set('이름', req.body.name);
                targetRow.set('전화번호', req.body.phone);
                targetRow.set('이메일', req.body.email);
                targetRow.set('참가호텔', req.body.type);
                targetRow.set('기업명', req.body.companyRank);
                targetRow.set('가입경로', req.body.source);
                targetRow.set('소속', req.body.affiliation);
                targetRow.set('지원', req.body.supporttype);
                targetRow.set('선택옵션', req.body.detailType);
                targetRow.set('신청일자', new Date().toLocaleDateString('ko-KR')); // Example date format
                await targetRow.save();
            } else {
                await sheet.addRow({ 
                    '이름': req.body.name,
                    '참가호텔': req.body.type,
                    '전화번호': req.body.phone, 
                    '이메일': req.body.email,
                    '기업명': req.body.companyRank,
                    '가입경로': req.body.source,
                    '소속': req.body.affiliation,
                    '지원': req.body.supporttype,
                    '선택옵션': req.body.detailType,
                    '신청일자': new Date().toLocaleDateString('ko-KR') })
            }

            // const rows = await sheet.getRows();
            // let emptyRowIndex: number = rows.length + 1;

            // for (let row of rows) {
            //     if (!row.get('신청일자') && row.rowNumber >= 4) {
            //         emptyRowIndex = row.rowNumber;
            //         break;
            //     }
            // }

            // await sheet.addRow({
            //     '이름': req.body.name,
            //     '선택옵션': req.body.type,
            // }
            // );
            res.status(201).json({ ok: true, message: 'Data added successfully.' });
            // return doc;
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ message: 'Error adding data to the spreadsheet', error });
        }
    } else {
        // POST 요청이 아닌 경우에는 메소드 허용 안함 응답을 보냅니다.
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
