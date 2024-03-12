"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../modal/model-toggle";
import { CheckCheck } from "lucide-react";

const NavigationBar = () => {
  const router = useRouter();

  return (
    <div className="navigation-bar bg-zinc-100/70 p-4 flex items-center dark:bg-zinc-800 px-28">
      <div className="flex items-center">
        <CheckCheck />
        <h1 className="ml-2 font-semibold text-xl mr-8 cursor-default">
          智能求职推荐系统
        </h1>
        <div className="flex gap-8">
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            首页
          </Link>
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            能力评价
          </Link>
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            岗位推荐
          </Link>
          <Link
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition dark:focus:text-zinc-100 focus:text-zinc-8 text-sm"
            href="/"
          >
            招聘推荐
          </Link>
        </div>
      </div>
      <div className="flex flex-1 space-x-2 items-center justify-end gap-8">
        <Link
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-300 text-sm"
          href="/login"
        >
          登录/注册
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationBar;
