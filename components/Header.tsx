import { FaHome } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Header({title} : {title : string} ){
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-transparent ">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-400 rounded-xl">
          <IoIosMail size={24} color="white" />
        </div>
        <div>
          <h1 className=" font-semibold">{title}</h1>
          <p className="text-gray-500 text-sm">List of {title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <FaHome />
        <span className="mx-2">/</span>
        <span>Constant Management</span>
        <span className="mx-2">/</span>
        <span className="text-black">{title}</span>
      </div>
    </div>
    )
}