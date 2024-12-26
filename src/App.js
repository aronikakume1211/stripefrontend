import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import axios from "axios";
function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 100,
    productBy: "Facebook",
  });

  const makePayment = (token) => {
    try {
      const response = axios.post("http://localhost:8282/payment", {
        token,
        product,
      });

      console.log("Response Data:", response.data);
      console.log("Status Code:", response.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          className="App-link"
          stripeKey={process.env.REACT_APP_PUBLIC_KEY}
          token={(token) => makePayment(token)}
          name="Buy Book"
          amount={product.price * 100}
        >
          <button className="btn-large pink">
            {" "}
            But react is just ${product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
