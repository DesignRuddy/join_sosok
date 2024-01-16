import React, { useEffect, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Review from '@/component/Review';
import Loader from '@/component/Loader';
import { useRouter } from 'next/router';
import OptionForm from '@/component/OptionForm';
import ApplyInfoForm from '@/component/ApplyInfoForm';
import { Grid } from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        bluefrog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type parentsProps = {
  setLoading: any,
  loading: any
}

export default function Checkout(props: parentsProps) {
  const { loading, setLoading } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: ''
  });

  const [infoData, setInfoData] = React.useState({
    hotel: '',
    roomType: '',
    companyName: '',
    position: '',
    department: '',
    addOption: ''
  });

  const router = useRouter();

  const updateFormData = (newData: { name?: string; phone?: string; email?: string; hotel?: string; roomType?:string; companyName?:string; position?: string; department?:string }) => {
    setFormData({ ...formData, ...newData });
    // setInfoData({...infoData, ...newData })
  };
  const updateInfoData = (newData: { hotel?: string; roomType?: string; companyName?:string; position?:string; department?:string;}) => {
    setInfoData({...infoData, ...newData })
  }

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const hotelRef = useRef<HTMLSelectElement>(null);
  const roomTypeRef = useRef<HTMLSelectElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);
  const addOptionRef = useRef<HTMLSelectElement>(null);

  const handleNext = () => {
    if (activeStep === 0) {

      if (!formData.name) {
        alert('이름은 필수 항목입니다.');
        nameInputRef.current?.focus();
        return; // 여기서 함수 실행을 중단합니다.
      }

      // 휴대폰 번호가 비어 있는 경우
      if (!formData.phone) {
        alert('휴대폰 번호는 필수 항목입니다.');
        phoneInputRef.current?.focus();
        return; // 여기서 함수 실행을 중단합니다.
      }

      // 이메일이 비어 있는 경우
      if (!formData.email) {
        alert('이메일은 필수 항목입니다.');
        emailInputRef.current?.focus();
        return; // 여기서 함수 실행을 중단합니다.
      }
    }else if(activeStep === 1) {

      // 호텔 선택이 되지않은경우
      if (!infoData.hotel) {
        alert("호텔 선택은 필수 입력항목입니다.")
        hotelRef.current?.focus();
      }
    } else if(activeStep === 2) {
      handleSubmit();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    const requestData = {
      ...formData,
      ...infoData
    };

    try {
      console.log("본문데이터", requestData);

      const result = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })
      const resultBody = await result.json();

      if (result.ok) {
        console.log('Data sent successfully', resultBody);
        alert('데이터 전송되었습니다.');
      } else {
        console.error((403), 'Failed to send data', result.status, resultBody);
        alert('데이터 전송에 실패했습니다.');
      }
      console.log('Full response:', resultBody);

      window.location.reload();

    } catch (e) {
      console.log(e);
      alert('오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (router.query.isAccepted) {
      setActiveStep(1);
      router.replace(router.pathname)
    }
  })

  const sendLms = async (data: any) => {
    try {
      const response = await fetch('/api/sendlms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send LMS:', error);
    }
  };

  const steps = ['신청정보', '옵션선택', '제출'];

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ApplyInfoForm
          formData={formData}
          updateFormData={updateFormData}
          nameInputRef={nameInputRef}
          phoneInputRef={phoneInputRef}
          emailInputRef={emailInputRef}
        />;
      case 1:
        return <OptionForm
          infoData={infoData}
          updateInfoData={updateInfoData}
          hotelRef={hotelRef}
          roomTypeRef={roomTypeRef}
          companyNameRef={companyNameRef}
          positionRef={positionRef}
          departmentRef={departmentRef}
          addOptionRef={addOptionRef}
        />;
      case 2:
        return <Review 
          infoData={infoData}
          formData={formData}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            부산 워케이션(이미지?)
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }} onSubmit={handleSubmit}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h5" align="center">
            Workation 신청서
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom align='center' sx={{ py: 5 }}>
                신청해 주셔서 감사합니다.
              </Typography>
              <Typography component="h6" variant="subtitle2" align='center' sx={{ whiteSpace: 'pre-line' }} >
                {"자세한 내용은 이메일을 확인해 주세요.\n 담당자 배정을 통해 상담을 도와드리겠습니다."}
              </Typography>
              <br />
              <Typography component="h6" variant='subtitle2' align='center'>
                자세한 사항은 &nbsp;
                <Link href="https://support.sosok.so" underline='none'>고객센터</Link>
                &nbsp; 로 문의 주시길 바랍니다.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    이전
                  </Button>
                )}
                <Button
                  variant="contained"
                  color='primary'
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? '제출하기' : '다음'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </React.Fragment>
  );
}