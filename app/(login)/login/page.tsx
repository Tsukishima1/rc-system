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
import { Input } from "@/components/ui/input";
import { ChevronLeft, LogIn } from "lucide-react";

import { employeeLogin, employerLogin } from "@/http/api/login";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  // 使用ref获取input的值
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const afterLogin = () => {
    router.push("/");
    toast.success("登录成功!");

    localStorage.setItem("isLogin", "true");

    usernameRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  const employeeLog = () => {
    employeeLogin({
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }).then((res) => {
      console.log(res);
      
      afterLogin();
      localStorage.setItem("userId", res.data.id);
    });
  };

  const employerLog = () => {
    employerLogin({
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }).then((res) => {
      afterLogin();
      localStorage.setItem("userId", res.data.id);
    });
  };

  return (
    <div>
      <Card className="w-[400px] p-5 dark:bg-zinc-800 shadow-md bg-zinc-100">
        <CardHeader>
          <div className="flex items-center">
            <div className="flex flex-1 gap-3 items-center justify-start cursor-default">
              <LogIn />
              <CardTitle>登录</CardTitle>
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
          <CardDescription>欢迎回来</CardDescription>
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
                ref={usernameRef}
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
                ref={passwordRef}
                type="password"
                id="password"
                className="dark:bg-zinc-700/40"
              />
            </div>
            <Button
              className="w-full mb-3 bg-slate-600 hover:bg-slate-600/90 dark:bg-slate-300 dark:hover:bg-slate-300/90"
              onClick={employeeLog}
            >
              我是求职者
            </Button>
            <Button className="w-full" onClick={employerLog}>
              我是企业方
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <div className="w-full">
            <Button variant="link" className="p-0 justify-start">
              忘记密码
            </Button>
          </div>
          <Button
            variant="link"
            className="p-0"
            onClick={() => {
              router.push("/register");
            }}
          >
            没有账号？点击注册
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
