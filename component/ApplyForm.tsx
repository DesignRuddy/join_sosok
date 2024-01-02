import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const ApplyForm = () => {
    const [category, setCategory] = useState('');

    const handleChange = (event:any) => {
        setCategory(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    워케이션 신청
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    워케이션 신청 사항 및 모집 안내 페이지입니다.
                </Typography>
                {/* ... Additional content */}
            </Box>
            <Box component="form" noValidate autoComplete="off">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">호텔선택 *</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="카테고리 *"
                        value={category}
                        onChange={handleChange}
                    >
                        <MenuItem value='경원제 엠버서드'>경원제 엠버서드</MenuItem>
                        <MenuItem value='프리미어 오크우드'>프리미어 오크우드</MenuItem>
                        <MenuItem value='송도 하버파크'>송도 하버파크</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="이름"
                    margin="normal"
                />

                {/* ... More form fields ... */}

                <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                    신청하기
                </Button>
            </Box>
        </Container>
    );
};

export default ApplyForm;