import React, { useState } from "react";
import SignClient from "@walletconnect/sign-client";
import { WalletConnectModal } from "@walletconnect/modal";
import "./ConnectWallet.css";

const modal = new WalletConnectModal({
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  themeMode: "dark",
  chains: ["hedera:testnet"],
});

export default function ConnectWallet() {
  const [client, setClient] = useState(null);
  const [account, setAccount] = useState(null);
  const [session, setSession] = useState(null);

  const initClient = async () => {
    if (!client) {
      const signClient = await SignClient.init({
        projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: "My Hedera dApp",
          description: "Hedera dApp using WalletConnect",
          url: "https://mydapp.com",
          icons: ["https://walletconnect.com/walletconnect-logo.png"],
        },
      });
      setClient(signClient);
      return signClient;
    }
    return client;
  };

  const connectWallet = async () => {
    const wcClient = await initClient();

    try {
      const { uri, approval } = await wcClient.connect({
        requiredNamespaces: {
          hedera: {
            methods: [
              "hedera_signTransaction",
              "hedera_signMessage",
              "hedera_getAccount",
            ],
            chains: ["hedera:testnet"],
            events: [],
          },
        },
      });

      if (uri) modal.openModal({ uri });

      const session = await approval();
      modal.closeModal();

      const accountId = session.namespaces["hedera"].accounts[0].split(":")[2];
      setSession(session);
      setAccount(accountId);
    } catch (err) {
      console.error("❌ Connection failed:", err);
    }
  };

  const disconnectWallet = async () => {
    if (client && session) {
      try {
        await client.disconnect({
          topic: session.topic,
          reason: { code: 6000, message: "User disconnected" },
        });
      } catch (err) {
        console.error("❌ Disconnect failed:", err);
      }
    }
    setAccount(null);
    setSession(null);
  };

  return !account ? (
    <button onClick={connectWallet} className="connect-wallet-btn">
      Connect Wallet
    </button>
  ) : (
    <button onClick={disconnectWallet} className="disconnect-btn">
      Disconnect ({account})
    </button>
  );
}
