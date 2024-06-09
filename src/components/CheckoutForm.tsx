"use client";

import { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ book }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            //replace the url with your server endpoint
            const response = await axios.post('http://44.211.47.208:8080/api/payment/create-checkout-session', {
                userId: "123456",
                name: book.name,
                amount: book.price
            });

            const session = await response.data;

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                setError(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setError("Error creating checkout session");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" disabled={!stripe} className={styles.button}>
                Pay with Stripe
            </button>
        </form>
    );
};

export default CheckoutForm;
