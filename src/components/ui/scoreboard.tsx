import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table"; // Replace with your import
import { api } from "../../utils/api";
import { format } from "date-fns";
import { FaPlus, FaMinus, FaTimes, FaDivide } from "react-icons/fa";

const Leaderboard = () => {
  const { data, error } = api.game.getAllTopTenScores.useQuery();

  const returnIcon = (gameMode: string) => {
    switch (gameMode) {
      case "add":
        return <FaPlus />;
      case "sub":
        return <FaMinus />;
      case "mul":
        return <FaTimes />;
      case "div":
        return <FaDivide />;

      default:
        break;
    }
  };

  console.log("scoreboard.tsx 16 data:", data, error);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg bg-gray-200 p-2">
      <p className="mb-4 w-full text-center text-2xl font-bold">
        Today&apos;s Top Scores
      </p>
      <div className="flex">
        {data.map((modeData) => (
          <div key={modeData.gameMode} className="mb-8">
            <h2 className="flex   justify-center  text-2xl">
              {returnIcon(modeData.gameMode)}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player Name</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modeData.scores.map((score) => (
                  <TableRow key={score.createdAt.toString()}>
                    <TableCell>{score.playerName}</TableCell>

                    <TableCell>{score.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
