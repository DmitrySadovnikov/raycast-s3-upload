import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import { FileData } from "./types";
import { FileGrid } from "./FileGrid";
import { useS3Upload } from "./hooks/useS3Upload";
import { filePathsToFile } from "./utils";

const Command = () => {
  const { upload, uploading } = useS3Upload();

  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);

  const handleSubmit = async (values: { files: string[] }) => {
    if (values.files.length === 0) {
      showToast(Toast.Style.Failure, "Please select at least one file");
      return;
    }

    const files = await filePathsToFile(values.files);

    setUploadedFiles(await upload(files));
  };

  if (!uploading && uploadedFiles.length > 0) {
    return <FileGrid files={uploadedFiles} />;
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.FilePicker id="files" title="Select Files" />
    </Form>
  );
};

export default Command;
