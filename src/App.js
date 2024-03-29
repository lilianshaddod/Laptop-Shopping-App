import React, { useEffect } from "react";
import "./App.css";
// import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      // send state as a send request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning"
      }));
      const res = await fetch("https://redux-http-c7955-default-rtdb.firebaseio.com/cartItems.json",
      {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      // send state as request is successful
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Send Request to Database Successfuly',
        type: "success"
      }))
    };
    sendRequest().catch(err => {
      // send state as error
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending Request Failed',
        type: "error"
      }))
    });
  }, [cart]);
  return (
    <div className="App">
      {/* <Auth /> */}
      {notification && <Notification type={notification.type} message={notification.message}/>}
       <Layout />
    </div>
  );
}

export default App;
