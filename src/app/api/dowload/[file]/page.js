// app/api/download/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileRef = searchParams.get("fileRef");
  const filename = searchParams.get("filename");
  console.log(searchParams);
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
    return new Response("Server misconfigured", { status: 500 });
  }

  try {
    const fileUrl = `https://cdn.sanity.io/files/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/${fileRef
      .replace("file-", "")
      .replace("-", ".")}`;

    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error(`Sanity responded with ${res.status}`);

    return new Response(res.body, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename || "download"}"`,
        "Content-Type":
          res.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: `Failed to fetch: ${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/${fileRef}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
