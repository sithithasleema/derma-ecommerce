import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

type ImageUploaderProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
};

const ImageUploader = <TFieldValues extends FieldValues>({
  control,
  name,
}: ImageUploaderProps<TFieldValues>) => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        reject,
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        },
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const onFilesSelected = async (
          e: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;

          setUploading(true);

          const urls: string[] = Array.isArray(value) ? [...value] : [];

          for (const file of Array.from(files)) {
            try {
              const url = await uploadFile(file);
              urls.push(url);
            } catch (err) {
              console.error("Error uploading file", err);
            }
          }

          onChange(urls);
          setUploading(false);
        };

        const removeImage = (index: number) => {
          const urls: string[] = Array.isArray(value) ? value : [];
          const newUrls = urls.filter((_, i) => i !== index);
          onChange(newUrls);
        };

        return (
          <div className="border-2 border-dashed p-4 rounded-lg">
            <label>Images</label>

            <label
              htmlFor="ImageUpload"
              className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center w-20 h-20 text-gray-500 hover:border-pink-500 transition mt-4"
              aria-disabled={uploading ? "true" : "false"}
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
              {Array.isArray(value) &&
                value.map((url: string, i: number) => (
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
