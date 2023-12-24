import { TbSquarePlus } from "react-icons/tb";

interface AddButtonProps {
    onClick: () => void;
    buttontxt: String;
  }

export default function AddButton({ onClick, buttontxt }:any) {
  return (
    <button onClick={onClick} className="flex flex-nowrap justify-center items-center gap-2 px-2 py-1 rounded-md border border-neutral-300 hover:border-green-700 hover:bg-green-700 text-black hover:text-white hover:shadow-box cursor-pointer transition-all max-w-fit h-fit">
      <TbSquarePlus className="w-5 h-5 "/>
      {buttontxt}
    </button>
    
  )
}
