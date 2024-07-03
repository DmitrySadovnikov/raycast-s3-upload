import { Action, ActionPanel, Grid } from "@raycast/api";
import { FileData } from "./types";

export const FileGrid = ({ files }: { files: FileData[] }) => {
  return (
    <Grid>
      {files.map((file) => (
        <Grid.Item
          key={file.name}
          content={file.url!}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in Browser" url={file.url!} />
              <Action.CopyToClipboard title="Copy URL" content={file.url!} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
};
