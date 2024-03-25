import React, { useEffect, useState } from 'react';
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
    FormControlLabel,
    Divider
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
// import DatePicker from '@mui/lab/DatePicker';
// import TimePicker from '@mui/lab/TimePicker';

const ApplyForm = () => {
    // 폼에 필요한 state 변수들을 선언합니다.
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [companyRank, setCompanyRank] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [detailType, setDetailType] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    // const [source, setSource] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [supporttype, setSupporttype] = useState('');

    const handleHotelChange = (event: any) => {
        setType(event.target.value);
    };

    const handleSupportChange = (event: any) => {
        setSupporttype(event.target.value);
    };

    const handleCompanyRankChange = (event: any) => {
        setCompanyRank(event.target.value);
    };
    const handleDetaillChange = (event: any) => {
        setDetailType(event.target.value);
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleaffiliChange = (event: any) => {
        setAffiliation(event.target.value);
    };

    const handlePositionChange = (event: any) => {
        setPosition(event.target.value);
    };

    const handleCheckInDateChange = (event: any) => {
        setCheckInDate(event);
    };

    const handleCheckOutDateChange = (event: any) => {
        setCheckOutDate(event);
    };

    // const handleSourceChange = (event: any) => {
    //     setSource(event.target.value);
    // };

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    // 폼 제출을 처리하는 함수
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const requestData = {
            name,
            type,
            position,
            companyRank,
            phone,
            email,
            detailType,
            // source,
            affiliation,
            supporttype
        };

        try {
            // console.log(requestData);

            const result = await fetch('/api/result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            })
            const resultBody = await result.json();

            if (result.ok) {
                // console.log('Data sent successfully', resultBody);
                alert('데이터 전송되었습니다.');
            } else {
                // console.error((403), 'Failed to send data', result.status, resultBody);
                alert('데이터 전송에 실패했습니다.');
            }
            // console.log('Full response:', resultBody);

            window.location.reload();

        } catch (e) {
            // console.log(e);
            alert('오류가 발생했습니다. 고객센터로 문의 바랍니다.');
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit} >
                <Typography component="h1" variant="h5">
                    워케이션 신청
                </Typography>
                {/* 폼 타이틀 아래 추가적인 설명이나 이미지가 들어갈 수 있습니다. */}

                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <Box component="form" noValidate sx={{ mt: 1 }}>
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

                    {/* <DatePicker
                        label="체크인 날짜"
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                        renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                    />

                    <TimePicker
                        label="체크인 시간"
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                        renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                    />

                    <DatePicker
                        label="체크아웃 날짜"
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                        renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                    />

                    <TimePicker
                        label="체크아웃 시간"
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                        renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
                    /> */}

                    {/* <FormControl fullWidth margin="normal">
                        <InputLabel id="source-select-label">가입경로</InputLabel>
                        <Select
                            labelId="source-select-label"
                            id="source-select"
                            value={source}
                            label="가입경로"
                            onChange={handleSourceChange}
                        >
                            <MenuItem value="인터넷 검색">인터넷 검색</MenuItem>
                            <MenuItem value="소셜 미디어">소셜 미디어</MenuItem>
                            <MenuItem value="추천">추천</MenuItem>
                        </Select>
                    </FormControl> */}

                    <Divider sx={{ marginY: 3 }} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="이름"
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        variant='standard'
                        value={name}
                        onChange={handleNameChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="휴대폰 번호"
                        id="phone"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                        variant='standard'
                        value={phone}
                        onChange={handlePhoneChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        id="email"
                        name="email"
                        autoComplete="email"
                        variant='standard'
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <Divider sx={{ my: 3 }} />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="직책"
                        id="position"
                        name="position"
                        autoComplete="position"
                        value={position}
                        onChange={handlePositionChange}
                        sx={{
                            width: "50%",
                            pr: 1
                        }}
                    />

                    <FormControl fullWidth margin="normal" sx={{ width: "50%", pr: 1 }}>
                        <InputLabel id="type-select-label">기업분류 *</InputLabel>
                        <Select
                            labelId="type-select-label"
                            id="type-select"
                            value={companyRank}
                            type='text'
                            label="기업분류 *"
                            onChange={handleCompanyRankChange}
                        >
                            <MenuItem value="대기업">대기업</MenuItem>
                            <MenuItem value="중견기업">중견기업</MenuItem>
                            <MenuItem value="중소기업">중소기업</MenuItem>
                            <MenuItem value="소기업">소기업</MenuItem>
                            {/* 추가적인 옵션을 여기에 추가할 수 있습니다. */}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="소속"
                        id="affiliation"
                        name="affiliation"
                        autoComplete="affiliation"
                        value={affiliation}
                        onChange={handleaffiliChange}
                        sx={{
                            width: "50%",
                            pr: 1
                        }}
                    />

                    <FormControl fullWidth margin="normal" sx={{ width: "50%" }}>
                        <InputLabel id="type-select-label">지원 타입 *</InputLabel>
                        <Select
                            labelId="type-select-label"
                            id="type-select"
                            value={supporttype}
                            type='text'
                            label="지원 타입 *"
                            onChange={handleSupportChange}
                        >
                            <MenuItem value="option_1">option_1</MenuItem>
                            <MenuItem value="option_2">option_2</MenuItem>
                            <MenuItem value="option_3">option_3</MenuItem>
                            <MenuItem value="option_4">option_4</MenuItem>
                            <MenuItem value="option_5">option_5</MenuItem>
                            {/* 추가적인 옵션을 여기에 추가할 수 있습니다. */}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="type-select-label">추가하실 옵션을 선택해 주세요. *</InputLabel>
                        <Select
                            labelId="type-select-label"
                            id="type-select"
                            value={detailType}
                            type='text'
                            label="추가하실 옵션을 선택해 주세요. *"
                            onChange={handleDetaillChange}
                        >
                            <MenuItem value="option_1">option_1</MenuItem>
                            <MenuItem value="option_2">option_2</MenuItem>
                            <MenuItem value="option_3">option_3</MenuItem>
                            <MenuItem value="option_4">option_4</MenuItem>
                            <MenuItem value="option_5">option_5</MenuItem>
                            <MenuItem value="option_6">option_6</MenuItem>
                            <MenuItem value="option_7">option_7</MenuItem>
                            {/* 추가적인 옵션을 여기에 추가할 수 있습니다. */}
                        </Select>
                    </FormControl>
                    {/* 여기에 추가적인 폼 입력 필드를 배치합니다. */}

                    <FormControlLabel
                        control={<Checkbox value="agree" color="primary" />}
                        label="개인정보 수집 및 이용 동의"
                        required
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
            <ToastContainer autoClose={1} />
        </Container>
    );
};

export default ApplyForm;
