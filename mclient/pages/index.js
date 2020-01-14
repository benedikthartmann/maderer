import React, { useState } from "react";
import Head from 'next/head'
import Nav from '../components/nav'
import AddressList from '../components/AddressList'
import useSWR from "swr";
import fetcher from "../lib/fetcher";



const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
    </Head>
    <Nav />
    <AddressList />
    MAPIURL_ADDRESSLIST: {process.env.MAPIURL_ADDRESSLIST}
  </div>
)
    //<AddressList />
export default Home
