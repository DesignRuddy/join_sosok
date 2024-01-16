import Head from 'next/head'
import { Inter } from 'next/font/google'
import Checkout from '@/pages/Checkout'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { useState } from 'react'
import Loader from '@/component/Loader'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import ApplyForm from '@/component/ApplyForm'
// import { FormProvider } from '@/utills/FormContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ children }: any) {
  const [loading, setLoading] = useState(false);

  const theme = createTheme({
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: {
            // 모든 스텝 아이콘에 적용
            '&.Mui-completed': {
              color: 'primary', //스텝 아이콘
            },
            '&.Mui-active': {
              color: 'PRIMary', // 현재 활성화 스텝 아이콘 
            },
          },
        },
      },
    },
  });

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Head>
        <title>워케이션 신청하기</title>
        <meta name="description" content="워크 라이프 밸러는스는 역시 워케이션이죠 !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <FormProvider> */}
            <Checkout loading={loading} setLoading={setLoading} />
            {/* <ApplyForm /> */}
          {/* </FormProvider> */}
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}
