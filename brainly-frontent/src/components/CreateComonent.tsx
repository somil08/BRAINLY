import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateComponent({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please enter both Title and Link.");
      return;
    }

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  return (
    open && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gradient-to-br from-gray-50 to-gray-200 backdrop-blur-lg">
        {/* Modal Box */}
        <div className="relative bg-white shadow-xl border border-gray-300 rounded-3xl px-12 py-14 w-[450px] 
          transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:border-gray-400 hover:scale-105">
          
          {/* Close Button */}
          <div className="absolute top-4 right-4 cursor-pointer p-2 hover:bg-gray-200 rounded-full transition" onClick={onClose}>
            <CrossIcon />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add New Content</h2>

          {/* Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Title</label>
              <Input reference={titleRef} placeholder="Enter content title" className="py-3 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-xl transition-all" />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-2">Link</label>
              <Input reference={linkRef} placeholder="Enter content link" className="py-3 text-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-xl transition-all" />
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="mt-5">
            <h3 className="text-gray-700 font-medium mb-2">Select Type</h3>
            <div className="flex gap-3">
              <Button
                text="YouTube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
                className="w-1/2"
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
                className="w-1/2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button onClick={addContent} variant="primary" text="Submit" className="w-full py-3 text-lg rounded-xl" />
          </div>
        </div>
      </div>
    )
  );
}
