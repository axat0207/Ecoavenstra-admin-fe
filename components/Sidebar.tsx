'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCog, FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoIosMail, IoIosSettings } from "react-icons/io";
import { MdOutlineDashboard, MdWebhook } from "react-icons/md";

export default function Sidebar() {
  const router = useRouter();
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isWebsiteSetupOpen, setIsWebsiteSetupOpen] = useState(false);
  const [isConstantManagementOpen, setIsConstantManagementOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleManage = () => setIsManageOpen(!isManageOpen);
  const toggleWebsiteSetup = () => setIsWebsiteSetupOpen(!isWebsiteSetupOpen);
  const toggleConstantManagement = () => setIsConstantManagementOpen(!isConstantManagementOpen);

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    router.push(`${path}`);
  };

  const getClassName = (path: string) => 
    `flex gap-3 items-center w-fit px-6 cursor-pointer hover:text-white ${activeItem === path ? 'text-red-500' : ''}`;

  return (
    <div className="fixed  top-[12vh] left-0 bg-slate-800 h-[88vh] w-64">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center gap-5 mt-6 text-gray-300">
          <div className={getClassName('dashboard')} onClick={() => handleNavigation('dashboard')}>
            <MdOutlineDashboard size={19} />
            Dashboard
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center px-6 cursor-pointer hover:text-white" onClick={toggleManage}>
              <div className="flex gap-3 items-center">
                <IoIosSettings size={19} />
                Manage
              </div>
              {isManageOpen ? <FaCaretDown size={19} /> : <FaCaretRight size={19} />}
            </div>
            {isManageOpen && (
              <div className="flex flex-col gap-3 pt-2 text-sm pl-16">
                <div className={getClassName('article')} onClick={() => handleNavigation('/manage/article')}>Article</div>
                <div className={getClassName('service')} onClick={() => handleNavigation('/manage/service')}>Service</div>
                <div className={getClassName('jobs')} onClick={() => handleNavigation('/manage/jobs')}>Jobs</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center px-6 cursor-pointer hover:text-white" onClick={toggleWebsiteSetup}>
              <div className="flex gap-3 items-center">
                <MdWebhook size={19} />
                Website Setup
              </div>
              {isWebsiteSetupOpen ? <FaCaretDown size={19} /> : <FaCaretRight size={19} />}
            </div>
            {isWebsiteSetupOpen && (
              <div className="flex flex-col gap-3 pt-2 text-sm pl-16">
                <div className={getClassName('header')} onClick={() => handleNavigation('header')}>Header</div>
                <div className={getClassName('footer')} onClick={() => handleNavigation('footer')}>Footer</div>
                <div className={getClassName('title')} onClick={() => handleNavigation('title')}>Title</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center px-6 cursor-pointer hover:text-white" onClick={toggleConstantManagement}>
              <div className="flex gap-3 items-center">
                <IoIosMail size={19} />
                Constant Management
              </div>
              {isConstantManagementOpen ? <FaCaretDown size={19} /> : <FaCaretRight size={19} />}
            </div>
            {isConstantManagementOpen && (
              <div className="flex flex-col gap-3 pt-2 text-sm pl-16">
                <div className={getClassName('master-content')} onClick={() => handleNavigation('master-content')}>Master Content</div>
                <div className={getClassName('master-category')} onClick={() => handleNavigation('master-category')}>Master Category</div>
              </div>
            )}
          </div>
          <div className={getClassName('user-enquiry')} onClick={() => handleNavigation('user-enquiry')}>
            <FaUserCog size={19} />
            User Enquiry
          </div>
        </div>
      </div>
    </div>
  );
}
