import React from "react";
import { useState, useEffect } from "react";
// import { FrontEndUrl } from "../ApiUrl";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

function Checkout({}) {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      // redirect: "if_required",
      confirmParams: {
        return_url: `http://localhost:5173`,
      },
    });
    // if (result) {
    //   window.location.href = `${FrontEndUrl}`;
    // }
    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  return (
    <div>
      <div className="mainscreen">
        {/* <img src="https://image.freepik.com/free-vector/purple-background-with-neon-frame_52683-34124.jpg"  className="bgimg " alt=""> */}
        <div className="card">
          {/* <div className="leftside">
            <img
              src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
              className="product"
              alt="Shoes"
            />
          </div> */}
          <div className="rightside">
            <form
              className="form"
              onSubmit={handleSubmit}
              style={{
                padding: "120px 10px 80px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1>Set up your Credit/Debit card</h1>
              <PaymentElement class="StripeElement" />
              <button
                style={{
                  fontSize: "20px",
                  borderColor: "white",
                  backgroundColor: "#e50914",
                  color: "white",
                  marginTop: "30px",
                  padding: "10px 100px 10px 100px",
                  borderRadius: "5px",
                }}
                disabled={!stripe}
              >
                Submit
              </button>
              {/* <h2>Payment Information</h2>
              <p>Cardholder Name</p>
              <input type="text" className="inputbox" name="name" required />
              <p>Card Number</p>
              <input
                type="number"
                className="inputbox"
                name="card_number"
                id="card_number"
                required
              />

              <p>Card Type</p>
              <select
                className="inputbox"
                name="card_type"
                id="card_type"
                required
              >
                <option value="">--Select a Card Type--</option>
                <option value="Visa">Visa</option>
                <option value="RuPay">RuPay</option>
                <option value="MasterCard">MasterCard</option>
              </select>
              <div className="expcvv">
                <p className="expcvv_text">Expiry</p>
                <input
                  type="date"
                  className="inputbox"
                  name="exp_date"
                  id="exp_date"
                  required
                />

                <p className="expcvv_text2">CVV</p>
                <input
                  type="password"
                  className="inputbox"
                  name="cvv"
                  id="cvv"
                  required
                />
              </div>
              <p></p>
              <button type="submit" className="button">
                CheckOut
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
