import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userRequest } from "../requestMethods";

import { useSelector } from "react-redux";

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const Token = currentUser?.accessToken;
  const headers="";
  const jsonObject="";
  console.log(currentUser);

  // useEffect(() => {
  //   // Replace 'YOUR_API_URL' with the actual API endpoint to fetch orders for the logged-in user
  //   const apiUrl = 'YOUR_API_URL';

  //   // Replace 'YOUR_AUTH_TOKEN' with the actual authentication token for the logged-in user
  //   const authToken = 'YOUR_AUTH_TOKEN';

  //   // Configuring the headers with the authentication token
  //   const headers = {
  //     Authorization: `Bearer ${authToken}`,
  //   };

  //   // Fetching orders data for the logged-in user from the API
  //   axios.get(apiUrl, { headers })
  //     .then(response => {
  //       setOrders(response.data); // Assuming the API response returns an array of orders for the user
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching orders:', error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    
    const createOrder = async () => {
      try {
        const res = await userRequest.get("/orders/find/"+currentUser._id,
        
        );
        console.log(currentUser._id);
        setOrders(JSON.stringify(res,null,2));
        console.log(res);
        console.log(orders);
        const jsonObject = JSON.parse(orders);

        // Extract the keys from the JavaScript object to use as table headers
        const headers = Object.keys(jsonObject);
      } catch {
          console.log("catch");
      }

    };
    createOrder();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <h2>Orders</h2>
  //     <h1>{}</h1>
  //     <ul>
  //       {orders.map(order => (
  //         <li key={order.id}>
  //           {/* Display order details based on the API response */}
  //           <p>Order ID: {order.id}</p>
  //           <p>Product: {order.product}</p>
  //           <p>Quantity: {order.quantity}</p>
  //           {/* Add more order details as needed */}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return(
  
    <div>
    <h1>JSON Table Example</h1>
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {headers.map(header => (
            <td key={header}>{jsonObject[header]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);
};


export default OrdersComponent;
