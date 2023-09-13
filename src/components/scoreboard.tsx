import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table"; // Replace with your import
import { api } from "../utils/api";
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

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center rounded-lg bg-gray-200 p-2">
      <p className="mb-4 w-full text-center text-2xl font-bold">
        Today&apos;s Top Scores
      </p>
      <div className="md:flex">
        {data.map((modeData) => (
          <div
            key={modeData.gameMode}
            className="mb-8 rounded-lg bg-gray-300 p-4"
          >
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
