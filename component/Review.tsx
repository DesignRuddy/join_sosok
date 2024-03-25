import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { useFormContext } from '@/utills/FormContext';

const products = [
  { name: '아트홀 뮤지엄패스', desc: '', price: '기본제공혜택' },
  { name: '시티투어 패스', desc: '', price: '추가 옵션혜택' },
  { name: '소속 온천패스', desc: '', price: '이벤트 추가혜택' }
];

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
    addOption: string;
    checkIn: string;
    checkOut: string;
    optionPrice: number;
  };
}

export default function Review({ formData, infoData }: ReviewProps) {
  // const { formData } = useFormContext();

  let price;

  switch (infoData.hotel) {

    case '[HOTEL] 브라운도트':
      price = infoData.optionPrice;
      break;

    case '[HOTEL] 그랜드베른':
      price = infoData.optionPrice;
      break;
    case '[HOTEL] 크라운하버':
      price = infoData.optionPrice;
      break;
    case '[HOTEL] 스탠포드':
      price = infoData.optionPrice;
      break;
    case '[HOTEL] 포레더스파':
      price = infoData.optionPrice;
      break;
    case '[HOTEL] 토요코인':
      price = infoData.optionPrice;
      break;
    default:
      price = '0';
  }

  const addresses = [infoData.companyName, infoData.department, infoData.position]
  // console.log("reviewData", infoData);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        최종 신청정보
      </Typography>
      <List disablePadding>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={'부산 워케이션 호텔'} />
          <Typography variant="h6" fontWeight={900}>{infoData.hotel}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={'선택 호텔 룸타입'} />
          <Typography variant="body2" fontWeight={700}>{infoData.roomType}</Typography>
        </ListItem>

        <Divider sx={{ py: 1 }} />

        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2" fontWeight={700}>{product.price}</Typography>
          </ListItem>
        ))}

        <Divider sx={{ py: 1 }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="선택 추가옵션 : " />
          <Typography variant="subtitle1">
            {infoData.addOption}
          </Typography>
        </ListItem>

        <Divider sx={{ py: 1 }} />
        <ListItem sx={{ pt: 2, px: 0 }}>
          <ListItemText primary="신청비용 : " />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {price.toLocaleString()} 원
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
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
            ※워케이션 신청 상세내용입니다.<br />
              신청 이후 담당자와 상의후 결제가 진행됩니다.
              
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}