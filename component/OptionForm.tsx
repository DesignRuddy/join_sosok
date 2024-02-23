import React, { ChangeEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';


// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouter } from 'next/router';
import { Autocomplete, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Image } from '@mui/icons-material';
// import Image from 'next/image';
// import { now } from '@/utills/formatDateISO';

type OptionFormProps = {
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

    updateInfoData: (newData: {
        hotel?: string;
        roomType?: string;
        companyName?: string;
        position?: string;
        department?: string;
        addOption?: string;
        checkIn?: string;
        checkOut?: string;
        optionPrice?: number;
    }) => void;
    hotelRef: React.RefObject<HTMLSelectElement>;
    roomTypeRef: React.RefObject<HTMLSelectElement>;
    companyNameRef: React.RefObject<HTMLInputElement>;
    positionRef: React.RefObject<HTMLInputElement>;
    departmentRef: React.RefObject<HTMLInputElement>;
    addOptionRef: React.RefObject<HTMLSelectElement>;
    checkInRef?: React.RefObject<HTMLInputElement>;
    checkOutRef?: React.RefObject<HTMLInputElement>;
};

const OptionForm = ({
    infoData,
    updateInfoData,
    hotelRef,
    roomTypeRef,
    companyNameRef,
    positionRef,
    departmentRef,
    addOptionRef,
    checkInRef,
    checkOutRef
}: OptionFormProps) => {

    type HotelInfo = {
        [key: string]: {
            image: string;
            price: number;
            description: string;
            typeOptions: { name: string; price: number; }[];
        }
    }
    const hotelsInfo: HotelInfo = {
        '[HOTEL] 브라운도트': {
            image: '/images/BROWNDOT HOTEL.jpg',
            price: 50000,
            description: `
            취소수수료 \n
                - 체크인 5일전 / 무료취소 / 호텔로 예약 확정 시
                - 체크인 4일전 / 결제금액 90%의 환불 / 호텔로 예약 확정 시
                - 체크인 3일전 / 결제금액 70%의 환불 / 호텔로 예약 확정 시
                - 체크인 2일전 / 결제금액 50%의 환불 / 호텔로 예약 확정 시
                - 체크인 1일전 / 환불 불가 / 호텔로 예약 확정 시
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '브라운도트 스탠다드', price: 50000 },
                { name: '브라운도트 디럭스', price: 60000 },
                { name: '브라운도트 테라스 디럭스', price: 70000 },
                { name: '브라운도트 테라스 트윈', price: 880000 },
            ]
        },
        '[HOTEL] 그랜드베른': {
            image: '/images/Grand Bern.jpg',
            price: 50000,
            description: `
                
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '브라운도트 호텔의 옵션 1 입니다.', price: 15500 },
                { name: '브라운도트 호텔의 옵션 2 입니다.', price: 20000 }
            ]
        },
        '[HOTEL] 크라운하버': {
            image: '/images/CROWN HARBOR-1.jpg',
            price: 50000,
            description: `
                
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '브라운도트 호텔의 옵션 1 입니다.', price: 15500 },
                { name: '브라운도트 호텔의 옵션 2 입니다.', price: 20000 }
            ]
        },
        '[HOTEL] 스탠포드': {
            image: '/images/STANFORD_HOTEL.jpg',
            price: 50000,
            description: `
            제공옵션 \n
                - Emoi : 조식, 중식, 석식 / 10% 할인 제공 / 할인권 1박당 1매 제공
                - 엘리체크인 : 1시간 얼리체크인 무료 제공
            취소수수료 \n
                - 체크인 5일전 / 무료취소 / 호텔로 예약 확정 시
                - 체크인 4일전 / 결제금액 90%의 환불 / 호텔로 예약 확정 시
                - 체크인 3일전 / 결제금액 70%의 환불 / 호텔로 예약 확정 시
                - 체크인 2일전 / 결제금액 50%의 환불 / 호텔로 예약 확정 시
                - 체크인 1일전 / 환불 불가 / 호텔로 예약 확정 시
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '브라운도트 스탠다드(더블)', price: 180000 },
                { name: '브라운도트 스탠다드(트윈)', price: 190000 }
            ]
        },
        '[HOTEL] 포레더스파': {
            image: '/images/FORETHESPA.jpg',
            price: 50000,
            description: `
            제공옵션 \n
                - 카페 스탠포드 조식 : 13,000원 -> 11,000원에 할인요금 제공
                - 카페 스탠포드 카페 : 1,000원 할인쿠폰 제공
                - 무료 주차권 제공
            취소수수료 \n
                - 체크인 7일전 / 결제금액 30%의 수수료 / 호텔로 예약 확정 시
                - 체크인 2일전 ~ 당일 / 100% 수수료 / 1박치 부과
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '포레더스파 스탠다드(더블)', price: 80000 },
                { name: '포레더스파 디럭스(더블)', price: 110000 },
                { name: '포레더스파 디럭스 패밀리(트윈)', price: 140000 },
                { name: '포레더스파 디럭스 히노끼(더블)', price: 150000 },
                { name: '포레더스파 디럭스 히노끼 패밀리(트윈)', price: 150000 },
            ]
        },
        '[HOTEL] 토요코인': {
            image: '/images/TOYOKOINN.png',
            price: 50000,
            description: `
            제공옵션 \n
                - 2층 조식당 : 조식 무료 제공 / 숙박 시 무료제공
                - 안마의자 : 2,000원(10분) 1회 무료 제공 / 숙박 시 할인제공
            취소수수료 \n
                - 체크인 7일전 / 결제금액 30%의 수수료 / 호텔로 예약 확정 시
                - 체크인 1일전 / 결제금액 50%의 수수료 / 호텔로 예약 확정 시
                - 체크인 당일 / 결제금액 100% / 호텔로 예약 확정 시
            `,
            typeOptions: [
                { name: '-- 옵션을 선택해주세요.', price: 0 },
                { name: '토요코인 싱글', price: 62000 },
                { name: '토요코인 미니더블', price: 73000 },
                { name: '토요코인 더블 / 트윈', price: 84000 },
                { name: '토요코인 디럭스 더블', price: 97000 },
            ]
        },
    }


    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedHotelInfo, setSelectedHotelInfo] = useState<{ image: string; price: number; description: string; } | null>(null);
    const [typeOptions, setTypeOptions] = useState<{ name: string; price: number; }[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ name: string; price: number; } | null>(null);
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
        const selectedOption = typeOptions.find(option => option.name === selectedRoomType);
        setSelectedOption(selectedOption || null);
        updateInfoData({ roomType: selectedRoomType })
    }

    const handleOptionChange = (selectedOptionPrice: number) => {
        updateInfoData({ ...infoData, optionPrice: selectedOptionPrice });
    }

    const handleaddOptionChange = (event: SelectChangeEvent) => {
        const selectedaddOption = event.target.value as string;
        updateInfoData({ addOption: selectedaddOption })
    }

    const handleFieldChange = (field: string) => (event: any) => {
        let value;

        if (field === 'checkIn' || field === 'checkOut') {

            // const date = new Date(event);

            // value = date.toISOString().split('T')[0];
            // console.log(value);
            const date = event;

            if (date.isValid()) { // moment 객체가 유효한 날짜인지 확인
                value = date.format('YYYY-MM-DD'); // ISO 형식의 날짜 문자열로 변환
            }
            console.log(value);

        } else {
            value = event.target.value;
        }
        updateInfoData({ [field]: value });
    };

    useEffect(() => {
        if (typeOptions.length > 0) {
            setSelectedOption(typeOptions[0]);
        } else {
            setSelectedOption(null);
        }
    }, [typeOptions])

    useEffect(() => {
        if (selectedHotelInfo && selectedOption) {
            const newTotalPrice = selectedHotelInfo.price + selectedOption.price;
            updateInfoData({ ...infoData, optionPrice: newTotalPrice });
        }
    }, [selectedHotelInfo, selectedOption]);

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
                        </Select>
                    </FormControl>
                </Grid>

                {selectedHotelInfo && (
                    <Grid item xs={12} sx={{ my: 3, border: "1px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={selectedHotelInfo.image} alt='호텔 대표이미지' style={{ width: '80%', height: '90%' }} />
                        <Typography variant='h6' align='center' sx={{ mt: 6, mb: 2, display: 'flex', flexDirection: 'row' }}>2인기준 : &nbsp;
                            <Typography variant='h5' fontWeight={700}>
                                {(selectedHotelInfo.price + (selectedOption ? selectedOption.price : 0)).toLocaleString()}
                            </Typography>
                            &nbsp; 원
                        </Typography>

                        {selectedHotelInfo.description.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line.includes('취소수수료') || line.includes('제공옵션') ? (
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold', lineHeight: '1.2', display: 'block' }}>
                                        {line}
                                    </Typography>
                                ) : (
                                    <Typography component="span" variant="body1" sx={{mb: 1,  lineHeight: '1.2', display: 'block', textAlign: 'left' }}>
                                        {line}
                                    </Typography>
                                )
                                }
                                {/* <br /> */}
                            </React.Fragment>
                        ))}
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
                    <DatePicker
                        label="Check In"
                        value={infoData.checkIn}
                        onChange={handleFieldChange('checkIn')}
                        inputRef={checkInRef}
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="Check Out"
                        value={infoData.checkOut}
                        onChange={handleFieldChange('checkOut')}
                        inputRef={checkOutRef}
                        sx={{
                            width: "100%",
                        }}
                    />
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
                                inputRef={roomTypeRef}
                            >
                                {typeOptions.map((typeOption, index) => (
                                    <MenuItem key={index} value={typeOption.name}>{typeOption.name}</MenuItem>
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

                <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
                    <FormControl fullWidth>
                        <InputLabel id="addOption-select-label">추가 옵션</InputLabel>
                        <Select
                            labelId="addOption-select-label"
                            id="addOption"
                            label="추가 옵션"
                            value={infoData.addOption}
                            onChange={handleaddOptionChange}
                            inputRef={addOptionRef}
                        >
                            <MenuItem value="option1">option1</MenuItem>
                            <MenuItem value="option2">option2</MenuItem>
                            <MenuItem value="option3">option3</MenuItem>
                            {/* 여기에 더 많은 호텔 옵션을 추가할 수 있습니다 */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}
        </>
    );
}

export default OptionForm;