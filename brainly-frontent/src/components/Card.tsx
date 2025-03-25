import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { TrashIcon } from "../icons/TrashIcon";
interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-md max-w-80 min-w-72 transition-all duration-200 hover:shadow-lg hover:border-gray-400">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          {/* Platform Icon */}
          {type === "youtube" ? (
            <YoutubeIcon className="text-red-500 w-6 h-6" />
          ) : (
            <TwitterIcon className="text-blue-500 w-6 h-6" />
          )}

          <h3 className="text-gray-800 font-semibold truncate max-w-48">{title}</h3>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 text-gray-500">
           {/* Delete Button */}
  <button className="cursor-pointer hover:text-red-600 transition">
    <TrashIcon />
  </button>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ShareIcon className="cursor-pointer hover:text-gray-700 transition" />
          </a>
        </div>
      </div>

      {/* Content Preview */}
      <div className="rounded-lg overflow-hidden bg-gray-100">
        {type === "youtube" ? (
          <iframe
            className="w-full h-40 rounded-lg"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet w-full">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
