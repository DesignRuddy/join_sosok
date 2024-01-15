import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { useFormContext } from '@/utills/FormContext';

const products = [
  {
    name: '부산 온천장 호텔이름',
    desc: '소속 혜택팩',
    price: '320,000 ₩',
  },
  {
    name: '부산 혁신관광 지원센터',
    desc: '부산광역시',
    price: '-150,000 ₩',
  },
  {
    name: '소속 만능 패키지',
    desc: 'sosok !',
    price: '-50,000 ₩',
  },
  {
    name: '부산 사상 아트홀 뮤지엄패스',
    desc: '',
    price: 'Free',
  },
  { name: '소속 누들패스', desc: '', price: 'Free' },
];

const addresses = ['블루프로그', '대외협력팀', '이사'];

// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

type ReviewProps = {
  formData: {
    name: string;
    phone: string;
    email: string;
  },
  infoData: {
    hotel: string;
    roomType: string;
    companyName: string;
    department: string;
    position: string;
  };
}

export default function Review({ formData, infoData }: ReviewProps) {
  // const { formData } = useFormContext();

  const handleSubmit = async () => {
    //로직 아직
    const requestData = {
      ...formData,
      ...infoData,
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        최종 신청정보
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <Divider sx={{ py: 1 }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="총 합계" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            59,000 ₩
          </Typography>
        </ListItem>
      </List>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            워케이션 신청인
          </Typography>
          <Typography variant="subtitle2" gutterBottom>{addresses.join(' | ')}</Typography>
          <Typography variant="subtitle2" gutterBottom>{`${formData.name} 님`}</Typography>
          {/* <Typography variant="subtitle2" gutterBottom>{`${formData.phone}`}</Typography>
          <Typography variant="subtitle2" gutterBottom>{`${formData.email}`}</Typography> */}
        </Grid>

        {/* 하단 우측 정보 */}
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}