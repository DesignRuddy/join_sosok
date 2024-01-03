import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';

const ApplyForm = () => {
  // 폼에 필요한 state 변수들을 선언합니다.
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  // 추가적인 폼 데이터를 위한 state를 여기에 선언합니다.

  // 각 입력 필드와 select 필드의 변경 사항을 처리하는 함수들을 선언합니다.
  const handleHotelChange = (event:any) => {
    setType(event.target.value);
  };

  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    
    try{
        const result = await fetch('/api/result', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ name , type}),
        })
        if(result.ok){
            console.log((200), 'Data sent successfully');
            
        } else {
            console.error((403), 'Failed to send data');
        }
        return result;
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          워케이션 신청
        </Typography>
        {/* 폼 타이틀 아래 추가적인 설명이나 이미지가 들어갈 수 있습니다. */}
        
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-select-label">호텔선택 *</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              type='text'
              required
              label="호텔선택 *"
              onChange={handleHotelChange}
            >
              <MenuItem value="경원제 엠버서드">경원제 엠버서드</MenuItem>
              <MenuItem value="프리미어 오크우드">프리미어 오크우드</MenuItem>
              <MenuItem value="송도 하버파크">송도 하버파크</MenuItem>
              {/* 추가적인 옵션을 여기에 추가할 수 있습니다. */}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleNameChange}
          />
          {/* 여기에 추가적인 폼 입력 필드를 배치합니다. */}
          
          {/* 예: 체크박스 */}
          <FormControlLabel
            control={<Checkbox value="agree" color="primary" />}
            label="개인정보 수집 및 이용 동의"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            신청하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ApplyForm;
