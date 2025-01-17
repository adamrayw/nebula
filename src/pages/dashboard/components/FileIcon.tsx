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
  size = 24,
  color = "#000",
}) => {
  // Normalize the extension to lowercase for comparison
  const extMatch = url.split(".").pop()?.toLowerCase();
  const ext = extMatch ? extMatch.split("?")[0] : "";

  // Map file types to icons
  const iconMap: { [key: string]: JSX.Element } = {
    pdf: <FaFilePdf size={size} color="#d9534f" />, // Red color for PDF
    doc: <FaFileWord size={size} color="#007bff" />,
    docx: <FaFileWord size={size} color="#007bff" />,
    xls: <FaFileExcel size={size} color="#28a745" />,
    xlsx: <FaFileExcel size={size} color="#28a745" />,
    ppt: <FaFilePowerpoint size={size} color="#f0ad4e" />,
    pptx: <FaFilePowerpoint size={size} color="#f0ad4e" />,
    jpg: <FaFileImage size={size} color="#6f42c1" />,
    jpeg: <FaFileImage size={size} color="#6f42c1" />,
    png: <FaFileImage size={size} color="#6f42c1" />,
    gif: <FaFileImage size={size} color="#6f42c1" />,
    svg: <FaFileImage size={size} color="#6f42c1" />,
    webp: <FaFileImage size={size} color="#6f42c1" />,
    mp4: <FaFileVideo size={size} color="#ffc107" />,
    mov: <FaFileVideo size={size} color="#ffc107" />,
    mp3: <FaFileAudio size={size} color="#17a2b8" />,
  };

  // Return the matched icon or a default file icon
  return iconMap[ext] || <FaFile size={size} color={color} />;
};

export default FileIcon;
