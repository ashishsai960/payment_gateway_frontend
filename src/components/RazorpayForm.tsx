"use client";

import { useState } from "react";
import axios from "axios";
import styles from './RazorpayForm.module.css';

const RazorpayForm = ({ book }) => {
    const [error, setError] = useState(null);

    const handleRazorpayPayment = async () => {
        try {
            const orderUrl = "http://44.211.47.208:8080/api/payment/orders";
            //replace the orderurl with your server endpoint
            const { data } = await axios.post(orderUrl, { amount: book.price, userId: "123456" });
            const options = {
                key: "rzp_test_0pLj1oTm2LU4c9", // Your Razorpay keyid
                amount: data.data.amount,
                currency: data.data.currency,
                name: book.name,
                description: "Test Transaction",
                image: book.img,
                order_id: data.data.id,
                handler: async (response) => {
                    try {
                        const verifyUrl = "http://44.211.47.208:8080/api/payment/verify";
                        //replace the url with your server endpoint
                        const { data } = await axios.post(verifyUrl, response);
                        console.log(data);
                    } catch (error) {
                        console.log(error);
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log(error);
            setError("Error processing payment with Razorpay");
        }
    };

    return (
        <div>
            {error && <div className={styles.error}>{error}</div>}
            <button onClick={handleRazorpayPayment} disabled={book.price <= 0} className={styles.button}>
                Pay with Razorpay
            </button>
        </div>
    );
};

export default RazorpayForm;
