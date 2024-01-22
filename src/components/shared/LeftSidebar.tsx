import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constant";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src="/public/assets/images/logodemoo.png"
            height={55}
            width={55}
            alt="logo"
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/public/assets/images/profile.png"}
            alt="profile"
            className="rounded-full w-14 h-14"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3 ">@${user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={` group-hover:invert-white
                  ${isActive && "invert-white"}
                  `}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shard-button_ghost hover:bg-primary-500 group "
        onClick={() => signOut()}
      >
        <img
          src="/public/assets/icons/logout.svg"
          alt="logout"
          className="group-hover:invert-white"
        />
        <p className="small-medium lg:base-medium px-2">Log Out</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
