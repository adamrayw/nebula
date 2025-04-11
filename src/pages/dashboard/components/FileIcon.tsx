import React from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileVideo,
  FaFile,
  FaFileAudio,
} from "react-icons/fa";
import { FileIconProps } from "@/types/IFile";

const FileIcon: React.FC<FileIconProps> = ({
  url,
  color = "#000",
  size = 6,
}) => {
  // Normalize the extension to lowercase for comparison
  const extMatch = url.split(".").pop()?.toLowerCase();
  const ext = extMatch ? extMatch.split("?")[0] : "";

  // Map file types to icons
  const iconMap: { [key: string]: JSX.Element } = {
    pdf: <FaFilePdf className={`h-${size} w-${size} text-gray-400`} color="#d9534f" />, // Red color for PDF
    doc: <FaFileWord className={`h-${size} w-${size} text-gray-400`} color="#007bff" />,
    docx: <FaFileWord className={`h-${size} w-${size} text-gray-400`} color="#007bff" />,
    xls: <FaFileExcel className={`h-${size} w-${size} text-gray-400`} color="#28a745" />,
    xlsx: <FaFileExcel className={`h-${size} w-${size} text-gray-400`} color="#28a745" />,
    ppt: <FaFilePowerpoint className={`h-${size} w-${size} text-gray-400`} color="#f0ad4e" />,
    pptx: <FaFilePowerpoint className={`h-${size} w-${size} text-gray-400`} color="#f0ad4e" />,
    jpg: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    jpeg: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    png: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    gif: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    svg: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    webp: <FaFileImage className={`h-${size} w-${size} text-gray-400`} color="#6f42c1" />,
    mp4: <FaFileVideo className={`h-${size} w-${size} text-gray-400`} color="#ffc107" />,
    mov: <FaFileVideo className={`h-${size} w-${size} text-gray-400`} color="#ffc107" />,
    mp3: <FaFileAudio className={`h-${size} w-${size} text-gray-400`} color="#17a2b8" />,
  };

  // Return the matched icon or a default file icon
  return iconMap[ext] || <FaFile className="h-6 w-6 text-gray-400" color={color} />;
};

export default FileIcon;
