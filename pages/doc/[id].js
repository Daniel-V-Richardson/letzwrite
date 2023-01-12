import { Button } from "@material-tailwind/react";
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import Image from "next/image";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/client";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";

function Doc() {
  const [session] = useSession();

  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            className="items-center"
            src="https://res.cloudinary.com/newztrakerapplication/image/upload/v1671467316/logo_dvzqpm.png"
            alt="logo"
            width={40}
            height={40}
          />
        </span>
        <div className="flex-grow px-2">
          <h2 className="">{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <h2 className="option">File</h2>
            <h2 className="option">Edit</h2>
            <h2 className="option">View</h2>
            <h2 className="option">Insert</h2>
            <h2 className="option">Format</h2>
            <h2 className="option">Tools</h2>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttontype="filled"
          size="regular"
          className="hidden md:!inline-flex h-10 items-center"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          SHARE
        </Button>

        <img
          src={session.user.image}
          className="rounded-full cursor-pointer h-10 w-10 ml-2 bg-deep-orange-200 "
        />
      </header>

      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
