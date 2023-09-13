import Head from "next/head";
import MathGame from "../components/mathgame";
import Navbar from "../components/navbar";
import { useState } from "react";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [playerName, setPlayerName] = useState("");

  return (
    <>
      <Head>
        <title>Number Ninjas</title>
        <meta name="description" content="Math Games for Kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between  p-2 sm:p-5 md:p-20">
          <div className="w-full">
            <MathGame playerName={playerName} setPlayerName={setPlayerName} />
          </div>
        </div>
      </div>
    </>
  );
}
