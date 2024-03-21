"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useRef } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

const RegisterEmployee = () => {
  const [status, setStatus] = useState("undefined");
  const [file, setFile] = useState<File | null>(null);

  const formSchemaForEmployee = z.object({
    name: z.string().min(1, {
      message: "姓名是必填项",
    }),
    sex: z.string().min(1, {
      message: "性别是必填项",
    }),
    phoneNumber: z.string().refine((value) => value.length === 11, {
      message: "请输入正确的电话号码",
    }),
    email: z.string().email({
      message: "请输入正确的邮箱地址",
    }),
    address: z.string().min(1, {
      message: "家庭住址是必填项",
    }),
    degree: z.string().min(1, {
      message: "学历必填",
    }),
    school: z.string().min(1, {
      message: "毕业院校是必填项",
    }),
    major: z.string().min(1, {
      message: "专业名称是必填项",
    }),
    award: z.string().min(1, {
      message: "奖项是必填项",
    }),
    project: z.string().min(1, {
      message: "项目经历是必填项",
    }),
    skill: z.string().min(1, {
      message: "技能是必填项",
    }),
  });

  const formForEmployee = useForm({
    resolver: zodResolver(formSchemaForEmployee),
    defaultValues: {
      name: "",
      sex: "",
      phoneNumber: "",
      email: "",
      address: "",
      degree: "",
      school: "",
      major: "",
      award: "",
      project: "",
      skill: "",
    },
  });

  const fileScheme = z.object({
    file: z
      .string()
      .min(1, {
        message: "该文件不能为空",
      })
      // 后缀名校验
      .regex(/\.(pdf|doc|docx)$/i, {
        message: "文件格式不正确",
      }),
  });
  const formForFile = useForm({
    resolver: zodResolver(fileScheme),
    defaultValues: {
      file: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };
  const onSubmitForFile = () => {
    const data = new FormData();
    data.append("file", file as Blob);
  };

  const onSubmitForEEform = () => {
    // 列出表单数据
    console.log(formForEmployee.getValues());
  };

  return (
    <div className="min-h-screen p-20 bg-zinc-100 cursor-default">
      <main className="mx-auto p-20 shadow-md rounded-3xl flex flex-col items-center bg-white max-w-[1000px] min-w-[600px] relative">
        <div className="w-full">
          <p className="text-3xl font-bold mb-2">欢迎加入我们，新同学！</p>
          <p className="text-muted-foreground">请在下方填写你的个人信息</p>
        </div>
        <Separator className="my-10" />
        {status === "undefined" && (
          <div className="flex gap-10">
            <Button
              variant="outline"
              className="rounded-3xl text-md p-8 h-50 border-dashed border-2 text-muted-foreground hover:border-double"
              onClick={() => setStatus("online")}
            >
              填写在线简历
            </Button>
            <Button
              variant="outline"
              className="rounded-3xl text-md p-8 h-50 border-dashed border-2 text-muted-foreground hover:border-double"
              onClick={() => setStatus("file")}
            >
              上传简历文件
            </Button>
          </div>
        )}

        {status === "online" && (
          <>
            <Button
              className="absolute top-24 right-24"
              onClick={() => setStatus("undefined")}
            >
              上一步
            </Button>
            <div className="w-full">
              <Form {...formForEmployee}>
                <form
                  onSubmit={formForEmployee.handleSubmit(onSubmitForEEform)}
                  className="flex flex-col gap-3 px-3"
                >
                  <div className="flex gap-3 items-end">
                    <FormField
                      control={formForEmployee.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            姓名
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              {...field}
                              className="text-[1rem] w-28"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              name={field.name}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-[90px]">
                                <SelectValue
                                  placeholder="性别"
                                  className="text-muted-foreground"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="male">男</SelectItem>
                                  <SelectItem value="female">女</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-3">
                    <FormField
                      control={formForEmployee.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            电话号码
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="phoneNumber"
                              {...field}
                              className="text-[1rem]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            邮箱地址
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              {...field}
                              className="text-[1rem] w-80"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formForEmployee.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          家庭住址
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="address"
                            {...field}
                            className="text-[1rem]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="edu flex gap-3 w-full items-end">
                    <FormField
                      control={formForEmployee.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground"></FormLabel>
                          <FormControl>
                            <Select
                              name={field.name}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-[80px]">
                                <SelectValue
                                  placeholder="学历"
                                  className="text-muted-foreground"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="technicalSchool">
                                    中专
                                  </SelectItem>
                                  <SelectItem value="juniorCollege">
                                    大专
                                  </SelectItem>
                                  <SelectItem value="undergraduate">
                                    本科
                                  </SelectItem>
                                  <SelectItem value="master">硕士</SelectItem>
                                  <SelectItem value="phd">博士</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            毕业院校
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="school"
                              {...field}
                              className="text-[1rem]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            专业名称
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="major"
                              {...field}
                              className="text-[1rem]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formForEmployee.control}
                    name="award"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          获奖情况
                        </FormLabel>
                        <FormControl>
                          <Textarea id="award" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formForEmployee.control}
                    name="skill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          专业技能
                        </FormLabel>
                        <FormControl>
                          <Textarea id="skill" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formForEmployee.control}
                    name="project"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          项目经历
                        </FormLabel>
                        <FormControl>
                          <Textarea id="project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full mt-8">下一步</Button>
                </form>
              </Form>
            </div>
          </>
        )}

        {status === "file" && (
          <>
            <Button
              className="absolute top-24 right-24"
              onClick={() => setStatus("undefined")}
            >
              上一步
            </Button>
            <Form {...formForFile}>
              <form
                className="flex flex-col gap-3 px-3"
                onSubmit={formForFile.handleSubmit(onSubmitForFile)}
              >
                <FormField
                  control={formForFile.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        上传简历文件
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="file"
                          type="file"
                          {...field}
                          className="cursor-pointer"
                          onChange={(event) => {
                            handleFileChange(event), field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-8">下一步</Button>
              </form>
            </Form>
          </>
        )}
      </main>
    </div>
  );
};

export default RegisterEmployee;
