import { TbEdit } from "react-icons/tb";

export default function EditButton({ onClick }:any) {
  return (
    <TbEdit onClick={onClick} className="w-7 h-7 p-1 rounded-md border border-transparent text-black hover:border hover:border-neutral-300 hover:shadow-box cursor-pointer transition-all"/>
  )
}
