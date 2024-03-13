import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const RegisterDataModal = () => {
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
  });
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
    },
  });
  const formForEmployer = useForm({
    resolver: zodResolver(formSchemaForEmployer),
    defaultValues: {
      firstName: "",
      sex: "",
      companyName: "",
      position: "",
    },
  });

  // 以下是为了让组件在挂载后再显示，避免出现闪烁
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const onSubmitForEEform = () => {
    // 列出表单数据
    console.log(formForEmployee.getValues());
  };
  const onSubmitForERform = () => {
    // 列出表单数据
    console.log(formForEmployer.getValues());
  };

  return (
    <Tabs defaultValue="employee" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="employee" className="w-full">
          我是求职者
        </TabsTrigger>
        <TabsTrigger value="employer" className="w-full">
          我是企业方
        </TabsTrigger>
      </TabsList>
      <TabsContent value="employee">
        <Card>
          <CardHeader>
            <CardTitle>同学，欢迎加入我们!</CardTitle>
            <CardDescription>
              请填写你的个人信息，这些信息将会在你的简历中展示。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...formForEmployee}>
              <form
                onSubmit={formForEmployee.handleSubmit(onSubmitForEEform)}
                className="flex flex-col gap-2"
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
                          <Input id="name" {...field} />
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
                          <Input id="phoneNumber" {...field} />
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
                          <Input id="email" {...field} />
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
                        <Input id="address" {...field} />
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
                          <Input id="school" {...field} />
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
                          <Input id="major" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full mt-8">保存</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="employer">
        <Card>
          <CardHeader>
            <CardTitle>您好，欢迎加入我们!</CardTitle>
            <CardDescription>
              请填写您的个人信息，这些信息将会在您的企业信息中展示。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...formForEmployer}>
              <form
                onSubmit={formForEmployer.handleSubmit(onSubmitForERform)}
                className="flex flex-col gap-2"
              >
                <div className="user flex items-end gap-3">
                  <FormField
                    control={formForEmployer.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          姓氏
                        </FormLabel>
                        <FormControl>
                          <Input id="name" {...field} className="w-[60px]"/>
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
                          <Select name={field.name} defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[90px]">
                              <SelectValue
                                placeholder="性别"
                                className="text-muted-foreground"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="male">先生</SelectItem>
                                <SelectItem value="female">女士</SelectItem>
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
                    control={formForEmployer.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          公司名称
                        </FormLabel>
                        <FormControl>
                          <Input id="companyName" {...field} />
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
                          <Input id="position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="w-full mt-8">保存</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RegisterDataModal;
