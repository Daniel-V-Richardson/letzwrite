import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
function Header() {

  const [session] = useSession()
  return (
    <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md
    bg-white">

      <Image
        className="items-center"
        src='https://res.cloudinary.com/newztrakerapplication/image/upload/v1671467316/logo_dvzqpm.png'
        alt="logo"
        width={40}
        height={40}
      />
      <h1 className=" md:inline-flex ml-2 text-gray-700
      text-2xl">
        LetzWrite
      </h1>
      <div className="mx-5 md:mx-20 flex flex-grow items-center
       px-5 py-2 bg-gray-100
      text-gray-600 rounded-lg 
      focus-within:text-gray-600 
       focus-within:shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#887A77]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5
        text-base bg-transparent outline-none" />
      </div>
      <div className="hidden md:inline-flex rounded-full text-2xl  bg-[#46b2e4]
       text-black px-2 py-1 items-center cursor-pointer mr-1">
        New
      </div>
      <img
      className="cursor-pointer h-11 w-11 rounded-full ml-2 mr-4 bg-[#bcadad]"
        loading="lazy"
        onClick={signOut}
        src={session?.user?.image}
        alt="AccountLogo"
      />
    </header>
  );
}

export default Header;
