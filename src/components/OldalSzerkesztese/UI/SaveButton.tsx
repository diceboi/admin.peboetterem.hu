import { BiSave } from "react-icons/bi";

interface EditButtonProps {
    onClick: () => void;
  }

export default function SaveButton({ onClick }:any) {
  return (
    <BiSave onClick={onClick} className="w-7 h-7 p-1 rounded-md bg-green-700 hover:bg-green-900 text-white hover:shadow-box cursor-pointer transition-all"/>
  )
}
