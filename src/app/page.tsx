"use client";

import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import RazorpayForm from "../components/RazorpayForm";
import styles from './page.module.css';

export default function Home() {
  const [job, setjob] = useState({
    name: "Razorpay Integration",
    author: "Ashish sai naik",
    img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
    price: 250,
  });

  return (
    <div className={styles.app}>
      
        <RazorpayForm job={job} />
      </div>
    
  )
};
