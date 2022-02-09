import React from "react";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import AppWalletProvider from "contexts/AppContext";
import { ToastListener, ToastsProvider } from "contexts/ToastContext";
import store from "state";
import ModalProvider from "components/widgets/Modal/ModalContext";
import { RefreshContextProvider } from "contexts/RefreshContext";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomePage from "views/Home";
import NotFound from "views/NotFound";
import { getLibrary } from "utils/web3React";
import Stake from "views/Stake";
import Referrals from "views/Referrals";


function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <BrowserRouter>
          <AppWalletProvider>
            <ToastsProvider>
              <ToastListener />
              <RefreshContextProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stake" element={<Stake />} />
                    <Route path="/referrals" element={<Referrals />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ModalProvider>
              </RefreshContextProvider>
            </ToastsProvider>
          </AppWalletProvider>
        </BrowserRouter>
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
