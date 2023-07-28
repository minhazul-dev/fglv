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
        fetch("http://localhost:5252/config").then(async (r) => {
            const { publishableKey } = await r.json();
            console.log(publishableKey);
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:5252/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (result) => {
            var { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, []);

    // const handleSubmitAmout = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const amount = form.name.value;
    //     const amountDetails = {
    //         amount,
    //     };
    //     console.log(amountDetails);

    //     fetch('http://localhost:9000/addPayment', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(amountDetails)
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             form.reset();
    //             Toast.success('Successful.');
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             Toast.error('An error occurred.');
    //         });
    // }
    return (
        <>
            <h3 className="mb-3">Welcome To  General Donation</h3>
            {/* <div>
                <form onSubmit={handleSubmitAmout}>
                    <div className="input-group input-group-sm">
                        <input name="name" type="text" className="form-control" placeholder="Enter Amount here..." />

                    </div>
                    * <button type="submit" class="btn btn-success">Add Payment</button> *
                </form >
            </div > */}
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
