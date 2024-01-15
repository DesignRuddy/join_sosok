// pages/api/sendLms.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, contentType, countryCode, from, subject, content, messages, files, reserveTime, reserveTimeZone } = req.body;

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json; charset=utf-8'
          };
    
          if (process.env.NCP_APIGW_TIMESTAMP) {
            headers['x-ncp-apigw-timestamp'] = process.env.NCP_APIGW_TIMESTAMP;
          }
          if (process.env.NCP_IAM_ACCESS_KEY) {
            headers['x-ncp-iam-access-key'] = process.env.NCP_IAM_ACCESS_KEY;
          }
          if (process.env.NCP_APIGW_SIGNATURE_V2) {
            headers['x-ncp-apigw-signature-v2'] = process.env.NCP_APIGW_SIGNATURE_V2;
          }

      const response = await fetch(`https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SERVICE_ID}/messages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          type,
          contentType,
          countryCode,
          from,
          subject,
          content,
          messages,
          files,
          reserveTime,
          reserveTimeZone
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error:messages });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
