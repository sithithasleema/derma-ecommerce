import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { Controller } from "react-hook-form";

const ImageUploader = ({ control, name }) => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = (
    file: Blob | ArrayBuffer | Uint8Array<ArrayBufferLike>
  ) => {
    return new Promise((resovle, reject) => {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        reject,
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resovle(url);
        }
      );
    });
  };

  return (
    // Controller
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        // Value is an array of image URLs
        const onFilesSelected = async (e: { target: { files: any } }) => {
          const files = e.target.files;

          if (!files.length) return;

          setUploading(true);

          const urls = [...(value || [])];

          for (const file of files) {
            try {
              const url = await uploadFile(file);
              urls.push(url);
            } catch (e) {
              console.error("Error Uploading files", e);
            }
          }

          onChange(urls);
          setUploading(false);
        };

        //   Removing images
        const removeImage = (index: number) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newUrls = value.filter((_: any, i: number) => i !== index);
          onChange(newUrls);
        };

        return (
          <div className="border-2 border-dashed p-4 rounded-lg">
            <label htmlFor="">Images</label>

            <label
              htmlFor="ImageUpload"
              className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center w-20 h-20 text-gray-500 hover:border-pink-500 transition mt-4"
              aria-disabled={uploading}
            >
              <span className="text-xl">+</span>
              <span className="text-sm">Upload</span>
            </label>

            <input
              type="file"
              id="ImageUpload"
              accept="image/*"
              multiple
              onChange={onFilesSelected}
              disabled={uploading}
              className="hidden"
            />

            {uploading && <p className="mt-4">Uploading..</p>}

            <div className="flex flex-wrap gap-2 mt-4">
              {value?.map((url: string, i: number) => (
                <div key={i} className="relative">
                  <Image
                    src={url}
                    alt={`upload-${i}`}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-spacing-3"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default ImageUploader;
