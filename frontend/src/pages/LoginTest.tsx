import React, { useState } from 'react';
import Web3 from 'web3';
import axios from "axios";

interface Auth {
  accessToken: string;
}

interface Props {
	onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

export const Login = ({ onLoggedIn }: any): JSX.Element => {
	const [loading, setLoading] = useState(false); // Loading button state

	const handleAuthenticate = ({
		publicAddress,
		signature,
	}: {
		publicAddress: string;
		signature: string;
	}) =>
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_BACKEND_URL}/auth/signature`,
			params: {
				address: publicAddress,
				signature: signature
			}
		})
			.then(res => {
				localStorage.setItem("token", res.data.token)
				localStorage.setItem("expiration", res.data.expiration)
			})

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}: {
		publicAddress: string;
		nonce: string;
	}) => {
		try {
			const signature = await web3!.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

	const handleSignup = (publicAddress: string) =>
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_BACKEND_URL}/auth/signin`,
			params: {
				address: publicAddress,
			},
		})
			.then(res => res.data.nonce)






	// 전체
	const handleClick = async () => {
		// Check if MetaMask is installed
		if (!(window as any).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window as any).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window as any).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
		setLoading(true);

		let nonce
		
		// Look if user with current publicAddress is already present on backend
		const first = await axios({
			method: "GET",
			url: `${process.env.REACT_APP_BACKEND_URL}/auth/info/${publicAddress}`,
		})

		// 존재하면 exception의 에러메시지
		if (first.data.message !== "이미 가입된 지갑 주소입니다.") {
			nonce = await first.data.nonce[0]
		} else {
			nonce = await handleSignup(publicAddress)
		}
		
		// Popup MetaMask confirmation modal to sign message
		const third = await handleSignMessage(nonce)

		// Send signature to backend on the /auth route
		const forth = await handleAuthenticate(third)
		


		// Pass accessToken back to parent component (to save it in localStorage)
		try {
			await onLoggedIn(forth)
		} catch(err) {
			window.alert(err);
			setLoading(false);
		}
	};

	return (
		<div>
			<p>
				Please select your login method.
				<br />
				For the purpose of this demo, only MetaMask login is
				implemented.
			</p>
			<button className="Login-button Login-mm" onClick={handleClick}>
				{loading ? 'Loading...' : 'Login with MetaMask'}
			</button>
		</div>
	);
};

export default Login