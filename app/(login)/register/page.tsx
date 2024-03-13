"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronLeft, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import RegisterDataModal from "../_components/RegisterDataModal";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <Card className="w-[400px] p-5 dark:bg-zinc-800 shadow-md bg-zinc-100">
        <CardHeader>
          <div className="flex items-center">
            <div className="flex flex-1 gap-3 items-center justify-start cursor-default">
              <UserRoundPlus />
              <CardTitle>注册</CardTitle>
            </div>
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              onClick={() => {
                router.push("/");
              }}
            >
              <ChevronLeft />
              返回
            </Button>
          </div>
          <CardDescription>欢迎加入我们</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-2 mb-2">
              <label
                htmlFor="username"
                className="text-muted-foreground text-sm"
              >
                用户名
              </label>
              <Input
                type="text"
                id="username"
                className="dark:bg-zinc-700/40"
              />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label
                htmlFor="password"
                className="text-muted-foreground text-sm"
              >
                密码
              </label>
              <Input
                type="password"
                id="password"
                className="dark:bg-zinc-700/40"
              />
            </div>
            <Dialog>
              <DialogTrigger className="w-full">
                <Button className="w-full" onClick={() => {}}>
                  注册
                </Button>
              </DialogTrigger>
              <DialogContent onPointerDownOutside={(e)=>{
                e.preventDefault();
              } } className="max-w-[32rem]">
                <DialogHeader>
                  <DialogTitle>创建新用户</DialogTitle>
                  <DialogDescription>
                    恭喜您注册成功，进行下一步操作！
                  </DialogDescription>
                  <span className="h-[10px] w-full my-5"></span>
                  <RegisterDataModal />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="link"
            className="p-0"
            onClick={() => {
              router.push("/login");
            }}
          >
            已有账号？点击登录
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
