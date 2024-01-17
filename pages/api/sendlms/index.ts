// pages/api/sendLms.js
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // const { timestamp, type, contentType, countryCode, from, subject, content, messages, files, reserveTime, reserveTimeZone } = req.body;

    console.log(process.env.NCP_ACCESS_KEY);
    
    try {
      const { recipientPhone, messageContent } = req.body;

      const timestamp = Date.now().toString();
      const method = 'POST'
      const space = ' ';
      const newLine = '\n';
      const serviceId = process.env.NCP_SERVICE_ID;
      const accessKey = process.env.NCP_IAM_ACCESS_KEY;
      const secretKey = process.env.NCP_SECRET_KEY;
      const uri = `/sms/v2/services/${serviceId}/messages`;

      if(!secretKey) {
        throw new Error('Secret key is undefined. Check your .env file.');;
      }
      const hmac = crypto.createHmac('sha256', secretKey)
        .update(method + space + uri + newLine + timestamp + newLine + accessKey)
        .digest('base64');

      const apiurl = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;

      const response = await fetch(apiurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': timestamp,
          'x-ncp-iam-access-key': accessKey || '',
          'x-ncp-apigw-signature-v2': hmac.toString()
        },
        body: JSON.stringify({
          type: "LMS",
          contentType: "COMM",
          // subject:"부산 온천장 워케이션",
          countryCode: "82",
          from: "0327155634",
          // content: messageContent,
          messages: [{
            to: recipientPhone,
            subject:"부산 온천장 워케이션",
            content: messageContent
          }],
        })
      })
      // if (!response.ok) {
      //   const errorBody = await response.text();
      //   console.error(`Error Response: ${errorBody}`);
      //   throw new Error(`Error: ${response.status}`);
      // }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
