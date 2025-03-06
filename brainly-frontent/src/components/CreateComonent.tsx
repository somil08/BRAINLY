import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react"; 
enum contentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreatecComponent({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState(contentType.Youtube);
  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
  }
  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen bg-slate-500 fixed top-0 left-0 
        opacity-60 flex justify-center"
        >
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input reference={titleRef} placeholder={"Title"} />
                <Input reference={linkRef} placeholder={"Link"} />
              </div>
              <div>
                <h1>Type</h1>
                <div className="flex gap-1 p-4">
                  <Button
                    text="Youtube"
                    variant={
                      type === contentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(contentType.Youtube);
                    }}
                  ></Button>
                  <Button
                    text="Twitter"
                    variant={
                      type === contentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(contentType.Twitter);
                    }}
                  ></Button>
                  <Button
                    text="Twitter"
                    variant={
                      type === contentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(contentType.Twitter);
                    }}
                  ></Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
// function usestate(Youtube: contentType): [any, any] {
//   throw new Error("Function not implemented.");
// }

