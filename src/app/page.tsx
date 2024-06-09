"use client";

import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import RazorpayForm from "../components/RazorpayForm";
import styles from './page.module.css';

export default function Home() {
  const [book, setBook] = useState({
    name: "Razorpay and Stripe Integration",
    author: "Ritvik",
    img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
    price: 250,
  });

  return (
    <div className={styles.app}>
      <div className={styles.bookContainer}>
        <img src={book.img} alt="book_img" className={styles.bookImg} />
        <p className={styles.bookName}>{book.name}</p>
        <p className={styles.bookAuthor}>By {book.author}</p>
        <p className={styles.bookPrice}>
          Price : <span>&#x20B9; {book.price}</span>
        </p>
        <Elements stripe={loadStripe("pk_test_51PMUE8JQvHmO1Z0X7o4R41cFYGKscBU3nBV8FyxF5HAbT5swoRLO4MsIgC7YLtGHnxcegOLTkt1O8Nt3TAbyFvH600uUhbyql1")}>
          {/* enter your publishable key  inside loadStripe("your publishable key")*/}
          <CheckoutForm book={book} />
        </Elements>
        <RazorpayForm book={book} />
      </div>
    </div>
  )
};
