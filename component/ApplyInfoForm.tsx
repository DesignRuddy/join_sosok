import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { useFormContext } from '@/utills/FormContext';
// import { Email } from '@mui/icons-material';

type ApplyInfoFormProps = {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  updateFormData: (newData: { name?: string; phone?: string; email?: string }) => void;
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
  // const [modalDateIsOpen, setModalDateIsOpen] = useState(false)
  // const [clickedInput, setClickedInput] = useState(null)

  // const handleDatePicker = (e: any) => {
  //   setClickedInput(e.target.id)
  //   setModalDateIsOpen(true)
  // }

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateFormData({ [name]: value });
    // const { name , phone , email } = event.target;
    // updateFormData({ [name, phone, email]: value });
  }

  return (
    <React.Fragment>
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

        <Grid item xs={12}>
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