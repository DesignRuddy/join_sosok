"use strict";
const nodemailer = require('nodemailer');
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const documentID = "1A-xjbzcsqi9bkGExxMl1SoKViy-4IrGZaKck72dvB9s";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const doc = await loadGoogleDoc();
            if (!doc) {
                return res.status(500).json({ ok: false, error: "Unable to load the document" });
            }
            let sheet = doc.sheetsByTitle["workation"];
            await sheet.loadHeaderRow(3);

            if (!sheet) {
                return res.status(404).json({ ok: false, error: "Sheet not found." });
            }

            const rows = await sheet.getRows();
            let targetRow = rows.find(row => !row.get('신청일자'));

            if (targetRow) {
            const { requestData, hotelName, userEmail, hotelType, selectedOptions} = req.body;

            const name = requestData.name;
            const roomType = requestData.roomType;
            const checkIn = requestData.checkIn;
            const checkOut = requestData.checkOut;
            const position = requestData.position;
            const companyName = requestData.companyName;
            const optionPrice = requestData.optionPrice;
            // 이메일 전송을 위한 transporter 설정
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER_ID,
                    pass: process.env.EMAIL_USER_PW
                },
            });

            const info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: userEmail,
                subject: "부산 온천장 워케이션 x 'sosok' 온천패스 신청결과",
                text: `${companyName} | ${name}${position}님 안녕하세요 
먼저 앞서 워케이션 신청에 감사드리고 더 나은 서비스를 위해 노력하겠습니다.
${name}님의 신청정보는 아래와 같습니다.

                [ 신청정보 ]
                신청자 : ${name} 님
                신청 호텔 : ${hotelName}
                호텔 : ${hotelType}
                룸 타입 : ${roomType}  
                추가 선택옵션 : ${selectedOptions}
                신청 비용 : ${optionPrice}

고객님이 신청하신 해당호텔의 체크인,아웃 시간은 
${checkIn} ~ ${checkOut}입니다.

부산 온천장워케이션 운영팀
[ 고객센터 ] 
TEL    : 032-715-5633
E-MAIL : contact@bluefrog.co.kr
Kakao  : 'sosok'
인천광역시 연수구 송도과학로 70, 업무동 1307~8호
(송도동, 송도 AT 센터)
`,
            });
        }

            // 이메일 내용 설정
            // const mailOptions = {
            //     from: process.env.EMAIL_FROM,
            //     to: userEmail,
            //     subject: `부산 온천장 워케이션 ${hotelName} 신청정보`,
            //     text: `
            //   호텔 신청정보입니다. ${hotelName}!

            //   Reservation Details:
            //   고객님의 선택하신 Hotel Type: ${hotelType}
            //   Selected Options: ${selectedOptions}
            //   ...
            //   `
            // };

            // // 이메일 전송
            // const info = await transporter.sendMail(mailOptions);

            // console.log('Email sent:', info);

            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}