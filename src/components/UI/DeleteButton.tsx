import { TbTrash } from "react-icons/tb";

interface DeleteButtonProps {
    onClick: () => void;
    buttontxt: String;
  }

export default function DeleteButton({ onClick, buttontxt }:any) {
  return (
    <button onClick={onClick} className="flex flex-nowrap justify-center items-center gap-2 px-2 py-1 rounded-md bg-red-700 hover:bg-red-900 text-white hover:shadow-box cursor-pointer transition-all max-w-fit">
      <TbTrash className="w-5 h-5 "/>
      {buttontxt}
    </button>
    
  )
}
