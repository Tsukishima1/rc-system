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
import { useEffect, useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { employeeReg, employerReg } from "@/http/api/login";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (!isMounted) return null;

  const handleEmployeeRegister = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("用户名或密码不能为空");
      return;
    }

    employeeReg({ username, password }).then(
      ({ data }) => {
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.id);
        toast.success("注册成功");
        router.push("/guide");
        localStorage.setItem("userType", "employee");
        // 清空输入框
        usernameRef.current!.value = "";
        passwordRef.current!.value = "";
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleBossRegister = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("用户名或密码不能为空");
      return;
    }

    employerReg({ username, password }).then(
      ({ data }) => {
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userType", "employer");
        toast.success("注册成功");
        router.push("/guide");
        // 清空输入框
        usernameRef.current!.value = "";
        passwordRef.current!.value = "";
      },
      (err) => {
        console.log(err);
      }
    );
  };

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
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="username" className="text-muted-foreground text-sm">
              用户名
            </label>
            <Input
              type="text"
              id="username"
              ref={usernameRef}
              className="dark:bg-zinc-700/40"
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="password" className="text-muted-foreground text-sm">
              密码
            </label>
            <Input
              type="password"
              id="password"
              ref={passwordRef}
              className="dark:bg-zinc-700/40"
            />
          </div>
          <Button
            className="w-full mb-3 bg-slate-600 hover:bg-slate-600/90 dark:bg-slate-300 dark:hover:bg-slate-300/90"
            onClick={() => {
              handleEmployeeRegister();
            }}
          >
            我是求职者
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              handleBossRegister();
            }}
          >
            我是企业方
          </Button>
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
