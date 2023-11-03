"use client";

import { UploadButton } from "@uploadthing/react";

import { OurFileRouter } from "../../app/api/uploadthing/core";

import { useState } from "react";
import Link from "next/link";

export default function UploadButtonImg() {
  const [image, setImage] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  return (
    <main>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImage(res);
            const json = JSON.stringify(res);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <ul>
        {image.map((image) => (
          <li key={image.fileUrl} className="mt-2">
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
