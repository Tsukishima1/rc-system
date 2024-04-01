"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/modal/model-toggle";
import { CheckCheck, User } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const router = useRouter();
  // let isLogin;
  // if (typeof window !== "undefined") isLogin = localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogin(localStorage.getItem("isLogin") ?? "");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isLogin");
    router.push("/login");

    // 清除所有localStorage
    localStorage.clear();
  }

  const handleClickProfile = () => {
    // 跳转到用户id对应的个人资料页面
    router.push(`/profile/${localStorage.getItem("userId")}`);
  }

  return (
    <div className="navigation-bar bg-zinc-100/70 py-8 sm:py-4 flex items-center dark:bg-zinc-800 px-10 sm:px-28 xl:px-64">
      <div className="flex items-center">
        <CheckCheck />
        <a className="ml-2 font-semibold text-xl cursor-pointer" href="/">
          智能求职推荐系统
        </a>
        <Separator
          orientation="vertical"
          className="w-[1px] h-10 mx-8 hidden bg-zinc-300 sm:block"
        />
        <div className=" ml-3 gap-8 hidden sm:flex">
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            首页
          </Link>
          {/* <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            能力评价
          </Link> */}
        </div>
      </div>
      <div className="flex flex-1 space-x-2 items-center justify-end gap-4">
        {isLogin && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Button
                variant="default"
                className="w-10 h-10 p-0 rounded-full border-2"
              >
                {localStorage.getItem("username")?.charAt(0).toUpperCase() ?? "X"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-0 text-muted-foreground">
              <DropdownMenuItem
                onClick={handleClickProfile}
              >个人资料</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
              >退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!isLogin && (
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 text-sm"
            href="/login"
          >
            登录/注册
          </Link>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;
