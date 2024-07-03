import { useCallback, useState } from "react";
import { getPreferenceValues } from "@raycast/api";
import { FileData } from "../types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extname } from "node:path";
import { v4 as uuidv4 } from "uuid";

export const useS3Upload = () => {
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string>();

  const { bucket, region, accessKeyId, secretAccessKey } = getPreferenceValues<Preferences.UploadFiles>();

  const upload = useCallback(
    async (files: FileData[]) => {
      setUploading(true);

      const client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });

      const res = await Promise.all(
        files.map(async (file) => {
          const key = `${uuidv4()}${extname(file.name)}`;

          const command = new PutObjectCommand({
            ACL: "public-read",
            Bucket: bucket,
            Key: key,
            Body: file.data,
          });

          try {
            await client.send(command);

            return {
              ...file,
              url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`,
            };
          } catch (err) {
            setError(err.message);
            return file;
          }
        }),
      );
      setUploading(false);
      return res;
    },
    [bucket],
  );

  return {
    upload,
    uploading,
    error,
  };
};
