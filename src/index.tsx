import React from "react";
import { OTPInput } from "./components/OTPInput/OTPInput";

const Inputs = ({ LengthInputs }: any) => {
	return <OTPInput OTPLength={LengthInputs} />;
};

export default Inputs;
