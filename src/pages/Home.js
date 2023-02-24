import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../components/app-header";
import { AccountInfo } from "../components/account-info";
import { CredentialsInfo } from "../components/credentials";
import { useNavigate } from "react-router-dom";
import { ExtensionService } from "../services/Extension.service";
export const Home = (props) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [credentials, setCredentials] = useState([]);
  let _accounts = props.account.toString();

  useEffect(() => {
	  window.addEventListener('storage', () => {
		  console.log("Change to local storage!");
		  let accounts = JSON.parse(localStorage.getItem('accounts'));
		  setAccounts(accounts);
		
	  })
	  let _accounts = JSON.parse(localStorage.getItem('accounts'));
	  console.log('ACCOUNTS', _accounts, _accounts.length);
	  if(_accounts.length <= 0) {
		  navigate('/welcome');
	  } else {
		  setAccounts(_accounts);
	  }
	  getCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCredentials = async () => {
    const { credWallet } = await ExtensionService.init();
	// todo find by query
    const credentials = await credWallet.list();
    setCredentials(credentials);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
	  { accounts.length <=0 && <p>Redirecting...</p> }
	  { accounts.length > 0 && <div>
        <HeaderComponent account={_accounts} />
        <AccountInfo account={_accounts} />
        <CredentialsInfo credentials={credentials} />
	  </div>
	  }
    </div>
  );
};
