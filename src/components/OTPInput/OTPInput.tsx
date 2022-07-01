import React from "react";
import { useRef, useState } from "react";
import "./styles.css";

export function OTPInput({ OTPLength }: any) {
	const [OTP, setOTP] = useState(() => new Array(OTPLength).fill(""));
	const inputRef = useRef<HTMLInputElement[]>([]);
	const addToref: (el: HTMLInputElement) => void = (el) => {
		if (el && !inputRef.current.includes(el)) {
			return inputRef.current.push(el);
		}
	};
	return (
		<div className="main">
			<p className="otp-txt">Please Enter your PinCode</p>
			<div className="inputs-card">
				{OTP.map((x, i): JSX.Element => {
					return (
						<input
							className="otp-inputs"
							key={i}
							onChange={(e) => {
								setOTP((OTP) => {
									const newOtp = [...OTP];
									newOtp[i] = e.target.value;
									return newOtp;
								});
								const nextIndex = e.target.value === "" ? i - 1 : i + 1;
								const selectedIndex = Math.max(
									Math.min(OTPLength - 1, nextIndex),
									0
								);
								const nextInput = inputRef.current[selectedIndex];
								nextInput.focus();
								nextInput.select();
							}}
							onPaste={(e) => {
								e.preventDefault();
								const pastedData = e.clipboardData
									.getData("text/plain")
									.trim()
									.slice(0, OTPLength - i)
									.split("");
								if (pastedData) {
									let nextFocusIndex = 0;
									const updatedOTPValues = [...OTP];
									updatedOTPValues.forEach((val, index) => {
										if (index >= i) {
											const changedValue = pastedData.shift() || val;
											if (changedValue) {
												updatedOTPValues[index] = changedValue;
												nextFocusIndex = index;
											}
										}
									});
									setOTP(updatedOTPValues);
									nextFocusIndex = Math.min(nextFocusIndex + 1, OTPLength - 1);
									const nextInput = inputRef.current[nextFocusIndex];
									nextInput.focus();
									nextInput.select();
								}
							}}
							onFocus={(event) => event.target.select()}
							value={x}
							ref={addToref}
							maxLength={1}
						/>
					);
				})}
			</div>
		</div>
	);
}
