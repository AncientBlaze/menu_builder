import axios from "axios";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("/api/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.url;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || "Upload failed";
    throw new Error(message);
  }
}
