"use client";

export default function DownloadButton({ file, dataset, projectId }) {
  const handleDownload = async () => {
    if (!file?.asset?._ref) {
      alert("File reference missing");
      return;
    }

    try {
      // Construct the file URL
      const fileRef = file.asset._ref;
      const [fileId, extension] = fileRef.replace("file-", "").split("-");
      const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`;
      console.log("Downloading from:", fileUrl);

      // Fetch the file
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element for downloading
      const a = document.createElement("a");
      a.href = url;
      a.download = file.originalFilename || "download";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (error) {
      console.error("Download error:", error);
      alert(`Download failed: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      {file.originalFilename || "Download File"}
    </button>
  );
}
