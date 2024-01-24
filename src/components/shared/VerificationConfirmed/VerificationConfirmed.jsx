import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from '../../../assets/Logos/short-logo.png';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-toastify";

const VerificationConfirmed = () => {
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(59);
    const { verificationEmailSend, sending, errorEmailVerification } = useContext(AuthContext);
    const navigate = useNavigate();
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });

    useEffect(() => {
        let countdownInterval;

        if (disabled) {
            countdownInterval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [disabled]);

    useEffect(() => {
        if (countdown === 0) {
            setDisabled(false);
            setCountdown(59);
        }
    }, [countdown]);

    const handleClick = async () => {
        setDisabled(true);
        await verificationEmailSend();

        setTimeout(() => {
            if (disabled) {
                setDisabled(false);
            }
        }, 59 * 1000);
    };

    if (errorEmailVerification) {
        notifyError();
    }

    return (
        <div className="bg-[#fbfbfb] h-screen flex flex-col items-center justify-center px-2 sm:px-3 md:px-4 text-center">
            <Helmet>
                <title>Email verification - Royal Venture Limited</title>
            </Helmet>
            <div className='h-16 w-16 xs:h-24 xs:w-24 rounded-full bg-[#18181b] p-3'><img loading='lazy' className='w-full h-full' src={logo} alt="" /></div>
            {
                sending
                    ?
                    <span className="loading loading-bars loading-sm sm:loading-md lg:loading-lg mt-5 lg:mt-8"></span>
                    :
                    <div className="mt-5 lg:mt-8">
                        <p className="text-xs xxs:text-sm xs:text-base xl:text-lg 3xl:text-xl text-gray-900 font-semibold">A verifying email is sent to your provided address. Please check your inbox/spam to verify your email.</p>
                        <p className="text-red-500 mt-2 md:mt-3">This verification is mandatory.</p>
                    </div>
            }
            <div className="flex flex-col lg:flex-row mt-5 lg:mt-10">
                <button onClick={() => navigate('/')} className="btn btn-xs xxs:btn-sm lg:btn-wide lg:btn-md bg-primary hover:bg-secondary border-none text-gray-950">Go to home</button>
                {
                    disabled ?
                        <p className="mt-3 lg:ml-5 text-gray-900 font-semibold">Wait {countdown}s</p>
                        :
                        <button onClick={handleClick} disabled={disabled} className="text-blue-600 underline hover:no-underline mt-3 lg:ml-5">Send Confirmation email Again</button>
                }
            </div>
        </div>
    );
};

export default VerificationConfirmed;