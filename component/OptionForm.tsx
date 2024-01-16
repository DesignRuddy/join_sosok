import React, { ChangeEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouter } from 'next/router';
import { Autocomplete, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Image from 'next/image';
// import { now } from '@/utills/formatDateISO';

type OptionFormProps = {
    infoData: {
        hotel: string;
        roomType: string;
        companyName: string;
        department: string;
        position: string;
    };
    
    updateInfoData: (newData: {
        hotel?: string;
        roomType?: string;
        companyName?: string;
        position?: string;
        department?: string;
    }) => void;
    hotelRef: React.RefObject<HTMLSelectElement>;
    roomTypeRef: React.RefObject<HTMLSelectElement>;
    companyNameRef: React.RefObject<HTMLInputElement>;
    positionRef: React.RefObject<HTMLInputElement>;
    departmentRef: React.RefObject<HTMLInputElement>;
};

const OptionForm = ({
    infoData,
    updateInfoData,
    hotelRef,
    roomTypeRef,
    companyNameRef,
    positionRef,
    departmentRef
}: OptionFormProps) => {

    type HotelInfo = {
        [key: string]: {
            image: string;
            price: string;
            typeOptions: string[];
        }
    }
    const hotelsInfo: HotelInfo = {
        '호텔A': {
            image: '/images/testImage.png',
            price: '10000',
            typeOptions: [
                '호텔A의 옵션 1 입니다.',
                '호텔A의 옵션 2 입니다.',
                '호텔A의 옵션 3 입니다.'
            ]
        },
        '호텔B': {
            image: '/images/testImage2.png',
            price: '20000',
            typeOptions: [
                '호텔B의 옵션 1 입니다.',
                '호텔B의 옵션 2 입니다.',
                '호텔B의 옵션 3 입니다.'
            ]
        },
        '호텔C': {
            image: '/images/testImage3.png',
            price: '30000',
            typeOptions: [
                '호텔C의 옵션 1 입니다.',
                '호텔C의 옵션 2 입니다.',
                '호텔C의 옵션 3 입니다.'
            ]
        },
    }

    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedHotelInfo, setSelectedHotelInfo] = useState<{ image: string; price: string; } | null>(null);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleHotelChange = (event: SelectChangeEvent) => {
        const selectedHotel = event.target.value as string;
        updateInfoData({ hotel: selectedHotel });
        setSelectedHotelInfo(hotelsInfo[selectedHotel]);
        setTypeOptions(hotelsInfo[selectedHotel].typeOptions);
    };

    // const handleTypeOPtion = (selectedHotel: string) => {
    //     if(hotelsInfo[selectedHotel]) {
    //         setTypeOptions(hotelsInfo[selectedHotel].typeOptions);
    //     } else {
    //         setTypeOptions([]);
    //         updateInfoData({ roomType: '' })
    //     }
    // }
    const handleRoomTypeChange = (event: SelectChangeEvent) => {
        const selectedRoomType = event.target.value as string;
        updateInfoData({ roomType: selectedRoomType })
    }

    const handleFieldChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        updateInfoData({ [field]:value });
    };

    const handlePrivacyPolicyCheck = (status: any) => {
        router.push(`/PrivacyPolicy`);
    };

    useEffect(() => {
        // URL 쿼리에서 isAccepted 값을 읽어옵니다.
        if (router.query.isAccepted) {
            setIsPolicyAccepted(router.query.isAccepted === 'true');
        }
    }, [router.query.isAccepted]);

    console.log(infoData);
    
    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                옵션선택
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="hotel-select-label">호텔</InputLabel>
                        <Select
                            labelId="hotel-select-label"
                            id="hotel"
                            label="호텔"
                            value={infoData.hotel}
                            inputRef={hotelRef}
                            onChange={handleHotelChange}
                        >
                            {Object.keys(hotelsInfo).map((key) => (
                                <MenuItem key={key} value={key}>
                                    {key}
                                </MenuItem>
                            ))}
                            {/* <MenuItem value="호텔A">호텔A</MenuItem>
                            <MenuItem value="호텔B">호텔B</MenuItem>
                            <MenuItem value="호텔C">호텔C</MenuItem> */}
                            {/* 여기에 더 많은 호텔 옵션을 추가할 수 있습니다 */}
                        </Select>
                    </FormControl>
                </Grid>

                {selectedHotelInfo && (
                    <Grid item xs={12} sx={{ my: 3, border: "1px" }}>
                        <Image src={selectedHotelInfo.image} alt='호텔 대표이미지' width="500" height="350" />
                        <Typography align='center' sx={{ my: 2 }}>2인기준 : {selectedHotelInfo.price}</Typography>
                    </Grid>
                )}

                <Grid item xs={12} sm={6}>
                    {/* <DatePicker
                        dateFormat='yyyy.MM.dd' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                        selected={selectedDate}
                        onChange={(date:any) => setSelectedDate(date)}
                    /> */}
                    <DatePicker label="Check In" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <DatePicker label="Check Out" />
                </Grid>

                {selectedHotelInfo && (
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="Type-select-label">Room Type</InputLabel>
                            <Select
                                labelId="Type-select-label"
                                id="roomType"
                                label="Room Type"
                                value={infoData.roomType}
                                onChange={handleRoomTypeChange}
                            >
                                {typeOptions.map((typeOption, index) => (
                                    <MenuItem key={index} value={typeOption}>{typeOption}</MenuItem>
                                ))}
                                {/* <MenuItem value="Type A">Type A</MenuItem>
                                <MenuItem value="Type B">Type B</MenuItem>
                                <MenuItem value="Type C">Type C</MenuItem> */}
                                {/* 여기에 더 많은 호텔 옵션을 추가할 수 있습니다 */}
                            </Select>
                        </FormControl>
                    </Grid>
                )}

                <Grid item xs={12} sx={{ mt: 3 }}>
                    <TextField
                        required
                        id="firstName"
                        name="companyName"
                        label="회사명"
                        fullWidth
                        value={infoData.companyName}
                        onChange={handleFieldChange('companyName')}
                        inputRef={companyNameRef}
                        // autoComplete="given-name"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="department"
                        label="부서"
                        fullWidth
                        value={infoData.department}
                        onChange={handleFieldChange('department')}
                        inputRef={departmentRef}
                        // autoComplete="shipping address-line1"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="position"
                        name="position"
                        label="직책"
                        fullWidth
                        value={infoData.position}
                        onChange={handleFieldChange('position')}
                        inputRef={positionRef}
                        // autoComplete="family-name"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sx={{ mt: 5 }}>
                    <FormControl fullWidth>
                        <InputLabel id="option-select-label">추가 옵션</InputLabel>
                        <Select
                            labelId="option-select-label"
                            id="option"
                            label="추가 옵션"
                        // value={infoData.option}
                        // onChange={handleHotelChange}
                        >
                            <MenuItem value="option1">option1</MenuItem>
                            <MenuItem value="option2">option2</MenuItem>
                            <MenuItem value="option3">option3</MenuItem>
                            {/* 여기에 더 많은 호텔 옵션을 추가할 수 있습니다 */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 2 }} />

            <Grid
                item
                xs={12}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => handlePrivacyPolicyCheck('A')}
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
                <Typography color={'green'}>
                    [필수]
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        ml: 1,
                        fontWeight: isHovered ? 'bold' : 'normal'
                    }}
                >
                    {'개인정보 수집 및 이용에 대한 동의'}
                </Typography>
                <CheckCircleOutlineIcon
                    color={isPolicyAccepted ? "primary" : "action"}
                    sx={{
                        ml: 1,
                        fontSize: '1.2em',
                        fontWeight: isHovered ? 'bold' : 'normal'
                    }}
                />
            </Grid>
        </>
    );
}

export default OptionForm;