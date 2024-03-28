"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { employerCard } from "@/http/api/login";
import { useRouter } from "next/navigation";

const RegisterBoss = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const storedFirstName = localStorage.getItem("firstName");
    const storedSex = localStorage.getItem("sex");
    const storedCompanyName = localStorage.getItem("companyName");
    const storedPosition = localStorage.getItem("position");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
    if (storedSex) {
      setSex(storedSex);
    }
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
    if (storedPosition) {
      setPosition(storedPosition);
    }
  }, []);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const formSchemaForEmployer = z.object({
    firstName: z.string().min(1, {
      message: "姓氏是必填项",
    }),
    sex: z.string().min(1, {
      message: "性别是必填项",
    }),
    companyName: z.string().min(1, {
      message: "公司名称是必填项",
    }),
    position: z.string().min(1, {
      message: "职务是必填项",
    }),
  });
  const formForEmployer = useForm({
    resolver: zodResolver(formSchemaForEmployer),
    defaultValues: {
      firstName: localStorage.getItem("firstName") || "",
      sex: localStorage.getItem("sex") || "",
      companyName: localStorage.getItem("companyName") || "",
      position: localStorage.getItem("position") || "",
    },
  });
  const onSubmitForERform = () => {
    console.log(formForEmployer.getValues());
    employerCard({ ...formForEmployer.getValues(), userId }).then(
      ({ data }) => {
        console.log(data.id);
        localStorage.setItem("isLogin", "true");

        // 将表单所有数据压缩存入localStorage
        const formValues = formForEmployer.getValues();
        for (const key in formValues) {
          localStorage.setItem(key, formValues[key as keyof typeof formValues]);
        }

        router.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="min-h-screen p-20 bg-zinc-100 cursor-default">
      <main className="mx-auto p-20 shadow-md rounded-3xl flex flex-col items-center bg-white max-w-[1000px] min-w-[600px] relative">
        <div className="w-full">
          <p className="text-3xl font-bold mb-2">
            欢迎加入我们，寻找更多人才！
          </p>
          <p className="text-muted-foreground">请在下方填写你的个人信息</p>
        </div>
        <Separator className="my-10" />
        <div className="w-full">
          <Form {...formForEmployer}>
            <form
              onSubmit={formForEmployer.handleSubmit(onSubmitForERform)}
              className="flex flex-col gap-4"
            >
              <div className="user flex items-end gap-5">
                <FormField
                  control={formForEmployer.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        姓氏
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
                          className="text-[1.1rem] h-[3rem] w-[70px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formForEmployer.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          name={field.name}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[90px] h-[3rem] text-[1rem]">
                            <SelectValue
                              placeholder="性别"
                              className="text-muted-foreground"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="男">先生</SelectItem>
                              <SelectItem value="女">女士</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <FormField
                  control={formForEmployer.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        公司名称
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="companyName"
                          {...field}
                          className="text-[1.1rem] h-[3rem]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formForEmployer.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        您的职务
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="position"
                          {...field}
                          className="text-[1.1rem] h-[3rem]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full mt-8">保存</Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default RegisterBoss;
