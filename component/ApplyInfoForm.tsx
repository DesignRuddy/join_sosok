import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { useFormContext } from '@/utills/FormContext';
import { useRouter } from 'next/router';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { Email } from '@mui/icons-material';

type ApplyInfoFormProps = {
  formData: {
    name: string;
    phone: string;
    email: string;
    consent: string;
  };
  updateFormData: (newData: { name?: string; phone?: string; email?: string; consent?: string }) => void;
  nameInputRef: React.RefObject<HTMLInputElement>;
  phoneInputRef: React.RefObject<HTMLInputElement>;
  emailInputRef: React.RefObject<HTMLInputElement>;
};


export default function ApplyInfoForm({
  formData,
  updateFormData,
  nameInputRef,
  phoneInputRef,
  emailInputRef }: ApplyInfoFormProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const router = useRouter();
  // const [modalDateIsOpen, setModalDateIsOpen] = useState(false)
  // const [clickedInput, setClickedInput] = useState(null)

  // const handleDatePicker = (e: any) => {
  //   setClickedInput(e.target.id)
  //   setModalDateIsOpen(true)
  // }

  useEffect(() => {
    // URL 쿼리에서 isAccepted 값을 읽어옵니다.
    if (router.query.isAccepted) {
      setIsPolicyAccepted(router.query.isAccepted === 'true');
      updateFormData({ consent: 'o' })
  } else {
    router.push('/PrivacyPolicy')
  }
  }, [router.query.isAccepted]);


const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  let formattedValue = value.replace(/\D/g, ''); // 숫자만 추출
  // "01012341234" 형태의 숫자 문자열을 "010-1234-1234" 형태로 변환
  if (formattedValue.length > 3 && formattedValue.length <= 7) {
    formattedValue = formattedValue.replace(/^(\d{3})(\d+)/, "$1-$2");
  } else if (formattedValue.length > 7) {
    formattedValue = formattedValue.replace(/^(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
  }
  updateFormData({ phone: formattedValue });
};

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  // 입력 중에는 값을 업데이트만 하고, 형식을 검증하지 않습니다.
  updateFormData({ email: value });
};

const validateEmail = (event: React.FocusEvent<HTMLInputElement>) => {
  const { value } = event.target;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value) && value !== '') {
    alert('올바른 이메일 형식이 아닙니다.');
    // 이메일 형식이 잘못되었을 때 처리를 여기에 추가하세요.
  }
};

const handlePrivacyPolicyCheck = (status: any) => {
  router.push(`/PrivacyPolicy`);
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  updateFormData({ [name]: value });
  // const { name , phone , email } = event.target;
  // updateFormData({ [name, phone, email]: value });
}

return (
  <React.Fragment>
    <Grid
      item
      xs={12}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handlePrivacyPolicyCheck('A')}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 5 }}
    >
      {/* <Typography color={'green'}>
          [필수]
        </Typography> */}
      <Typography
        color={isPolicyAccepted ? "gray" : "gray"}
        variant="body2"
        sx={{
          fontWeight: isHovered ? 'bold' : 'normal',
        }}
      >
        {'개인정보 수집 및 이용에 대한 동의'}
      </Typography>
      <CheckCircleOutlineIcon
        color={isPolicyAccepted === true ? 'primary' : 'action'}
        sx={{
          ml: 1,
          fontSize: '1.2em',
          fontWeight: isHovered ? 'bold' : 'normal'
        }}
      />
    </Grid>

    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
      신청자 정보
    </Typography>
    <Grid container spacing={3} >
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="이름"
          name='name'
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            inputRef: nameInputRef,
          }}
          variant="outlined"
        />

      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="휴대폰번호"
          name='phone'
          value={formData.phone}
          onChange={handlePhoneChange}
          InputProps={{
            inputRef: phoneInputRef,
          }}
          variant="outlined"
        />
        {/* <Button variant='outlined' color='success' fullWidth sx={{ mt: 3 }}>
            인증하기
          </Button> */}
      </Grid>

      <Grid item xs={12} sx={{ mb: 5 }}>
        <TextField
          required
          fullWidth
          label="이메일"
          name='email'
          value={formData.email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
          InputProps={{
            inputRef: emailInputRef,
          }}
          variant="outlined"
        />
        {/* <Button variant='outlined' color='success' fullWidth sx={{ mt: 3 }}>
            인증하기
          </Button> */}
      </Grid>

    </Grid>
  </React.Fragment>
);
}