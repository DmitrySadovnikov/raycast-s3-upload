import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { FileData } from "./types";

export const filePathsToFile = async (filePaths: string[]): Promise<FileData[]> =>
  await Promise.all(
    filePaths.map(async (file) => {
      const filepath = file.startsWith("file://") ? fileURLToPath(file) : file;

      const name = basename(filepath);

      const data = await readFile(filepath);

      return {
        name,
        data,
      };
    }),
  );
