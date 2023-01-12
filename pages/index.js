import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import { db } from "../firebase";
import firebase from "firebase";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { getSession, useSession } from "next-auth/client";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [session] = useSession();

  if (!session) return <Login />;

  const handleOpen = () => setOpen(!open);

  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setOpen(false);
  };
  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  return (
    <div>
      <Head>
        <title>LetzWrite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#887A77] cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
          <div>
            <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
              <Image
                src="https://res.cloudinary.com/newztrakerapplication/image/upload/v1671471118/docs-blank-googlecolors_nihpp0.png" 
                layout='fill'
                onClick={handleOpen}
                alt=""
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader> Create a new Document</DialogHeader>
        <DialogBody divider>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="outline-none w-full"
            placeholder="Enter name of document..."
            onKeyDown={(e) => e.key === "Enter" && createDocument()}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={createDocument}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
