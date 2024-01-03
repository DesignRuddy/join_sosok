import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ApplyForm from '@/component/ApplyForm'
import { RootLayout } from '@/layout/layout'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>워케이션 신청하기</title>
        <meta name="description" content="워크 라이프 밸러는스는 역시 워케이션이죠 !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RootLayout>
        <ApplyForm/>
      </RootLayout>
    </>
  )
}
