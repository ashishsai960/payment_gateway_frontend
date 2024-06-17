"use client";

import { useState } from "react";
import axios from "axios";
import styles from './RazorpayForm.module.css';

const RazorpayForm = ({ job }) => {
    const [error, setError] = useState(null);

    const handleRazorpayPayment = async () => {
        try {
            const orderUrl = "http://51.20.106.102:9000/api/payment/orders";
            //replace the orderurl with your server endpoint
            const { data } = await axios.post(orderUrl, { amount: job.price, userId: "123456" });
            const options = {
                key: "rzp_test_0pLj1oTm2LU4c9", // Your Razorpay keyid
                amount: data.data.amount,
                currency: data.data.currency,
                name: job.name,
                description: "Test Transaction",
                image: job.img,
                order_id: data.data.id,
                handler: async (response) => {
                    try {
                        const verifyUrl = "http://51.20.106.102:9000/api/payment/verify";
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
    const [jobs, setjob] = useState({
        name: "Razorpay Integration",
        author: "Ashish sai naik",
        img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
        price: 250,
      });

    return (
        <div>
            {error && <div className={styles.error}>{error}</div>}
            <button onClick={handleRazorpayPayment} disabled={jobs.price <= 0} className={styles.button}>
                Pay <span>&#x20B9; {jobs.price}</span> with Razorpay
            </button>
        </div>
    );
};

export default RazorpayForm;
