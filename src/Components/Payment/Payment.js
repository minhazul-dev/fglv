import { useEffect, useState } from "react";
import "./Paymentcss/payment.css"
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { Toast } from "bootstrap";

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://foodgenixpayment.onrender.com/config").then(async (r) => {
            const { publishableKey } = await r.json();
            console.log(publishableKey);
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch("https://foodgenixpayment.onrender.com/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (result) => {
            var { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, []);


    return (
        <>
            <h3 className="mb-3">Welcome To  General Donation</h3>

            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )
            }
        </>
    );
}

export default Payment;
