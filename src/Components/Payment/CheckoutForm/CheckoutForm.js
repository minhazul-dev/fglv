import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "../Paymentcss/payment.css"
import { Toast } from "bootstrap";
import dayjs from "dayjs";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const amount = form.name.value;
        const name = form.donorName.value;
        const category = form.anonymous.value;
        const date = new Date();
        dayjs('2005-12-03T18:30:00.000Z').format('DD/MM/YYYY')
        const amountDetails = {
            amount,
            name,
            category,
            date
        };
        console.log(amountDetails);

        fetch('https://foodgenix01.onrender.com/addPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(amountDetails)
        })
            .then(res => res.json())
            .then(result => {
                form.reset();
                Toast.success('Successful.');
            })
            .catch(error => {
                console.error('Error:', error);
                Toast.error('An error occurred.');
            });
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);


    };


    return (
        <div className="bodypart">

            <form id="payment-form" onSubmit={handleSubmit}>
                <div className="input-group input-group-sm">
                    <input name="name" type="number" className="form-control" placeholder="Enter Amount here..." />
                    <input name="donorName" type="text" placeholder="Enter name here..." />
                    <div className="col-lg-12">
                        <div className="form-group">
                            <select name="anonymous" id="donation">
                                <option value>Want to pay anonymously?</option>
                                <option name="anonymous">Anonymous</option>

                            </select>
                        </div>
                    </div>



                </div>
                <PaymentElement id="payment-element" />
                <button disabled={isProcessing || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
