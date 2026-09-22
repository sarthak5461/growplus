import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

function configuredCloudinary() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) return false;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return true;
}

export async function saveUpload(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const originalName = file.name || "upload";
  const mime = file.type || "application/octet-stream";

  if (configuredCloudinary()) {
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "growplus", resource_type: "auto" },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      stream.end(buffer);
    });
    return {
      url: uploaded.secure_url,
      filename: originalName,
      mime,
      size: buffer.length,
      publicId: uploaded.public_id,
      provider: "cloudinary",
    };
  }

  const safe = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safe), buffer);
  return {
    url: `/uploads/${safe}`,
    filename: originalName,
    mime,
    size: buffer.length,
    provider: "local",
  };
}
