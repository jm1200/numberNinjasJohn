import { z } from "zod";
import { startOfDay } from "date-fns";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Input types
const CreateGameInput = z.object({
  playerName: z.string(),
  score: z.number(),
  time: z.number(),
  gameMode: z.string(),
  difficulty: z.string(),
});

const UpdateGameInput = z.object({
  id: z.string(),
  playerName: z.string().optional(),
  score: z.number().optional(),
  time: z.number().optional(),
  gameMode: z.string().optional(),
  difficulty: z.string().optional(),
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const gameRouter = createTRPCRouter({
  // Create a new game
  createGame: publicProcedure
    .input(CreateGameInput)
    .mutation(async ({ input }) => {
      const newGame = await prisma.game.create({
        data: input,
      });

      return newGame;
    }),

  // Get a single game by id
  getGameById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return prisma.game.findUnique({
        where: { id: input.id },
      });
    }),

  // Get all games
  getAllGames: publicProcedure.query(() => {
    return prisma.game.findMany();
  }),

  // Update a game by id
  updateGame: publicProcedure.input(UpdateGameInput).mutation(({ input }) => {
    return prisma.game.update({
      where: { id: input.id },
      data: input,
    });
  }),

  // Delete a game by id
  deleteGame: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const promise = prisma.game.delete({
        where: { id: input.id },
      });

      return await promise;
    }),

  getAllTopTenScores: publicProcedure.query(() => {
    const gameModes = ["add", "sub", "mul", "div"]; // Replace with actual game modes

    const promises = gameModes.map(async (mode) => {
      const scores = await prisma.game.findMany({
        where: {
          gameMode: mode,
          createdAt: {
            gte: startOfDay(new Date()), // Start of the current day
          },
        },
        orderBy: [{ score: "desc" }],
        take: 10,
        select: {
          gameMode: true,
          playerName: true,
          createdAt: true,
          score: true,
          difficulty: true,
          time: true,
        },
      });

      return { gameMode: mode, scores };
    });

    return Promise.all(promises);
  }),
});
