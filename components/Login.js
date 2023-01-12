import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image 
        className="items-center"
        src="https://res.cloudinary.com/newztrakerapplication/image/upload/v1671467316/logo_dvzqpm.png"
        alt="logo"
        width="160"
        objectFit="contain"
        height="130"
      />
      <h1 className="text-gray-700 text-4xl mt-5">LetzWrite</h1>
      <Button  
      className="w-44 mt-10"
      color="blue"
      buttonType="filled"
      ripple="light"
      onClick={signIn}
      >LOGIN</Button>
    </div>
  );
}

export default Login;
