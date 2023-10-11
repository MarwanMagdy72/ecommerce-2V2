import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "reactjs-popup/dist/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserTokenProvider } from "./Context/UserToken";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartContextProvider } from "./Context/CartContext";
import { Offline} from "react-detect-offline";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <>


    <UserTokenProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartContextProvider>
    </UserTokenProvider>
    

    <Offline>
      <div className="bottom-0 p-2 rounded-3 start-0 bg-dark text-white position-fixed">
        Oops .. You're Offline Now
      </div>
    </Offline>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
