import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../utils/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wipe = api.game.wipeTable.useMutation();
  wipe.mutate();
  res.status(200).end("table wiped");
}
