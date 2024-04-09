"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { addJob, getJobList, getRecommendResume } from "@/http/api/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface jobListProps {
  id: string;
  title: string;
  company: string;
  salary: string;
  address: string;
  education: string;
  description: string;
  hiring_manager: string;
  last_active: string;
  link: string;
}
interface resumeListProps {
  id: string;
  name: string;
  sex: string;
  age: string;
  desiredPosition: string[];
  phoneNumber: string;
  email: string;
  address: string;
  degree: string;
  school: string;
  major: string;
  award: string;
  project: string;
  skill: string;
}

export default function Home() {
  const router = useRouter();
  const [jobList, setJobList] = useState<jobListProps[]>([]);
  const [resumeList, setResumeList] = useState<resumeListProps[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "");
    setIsMounted(true);
    getJobList().then(({ data }) => {
      data = JSON.parse(data);
      setJobList(data);
      setIsLoading(false);
    });
    getRecommendResume().then(({ data }) => {
      data = JSON.parse(data);
      setResumeList(data);
      setIsLoading(false);
    });
  }, []);

  const openJobDetail = (id: string) => {
    const jobId = id;
    router.push(`/job/${jobId}`);
  };
  const openResumeDetail = (id: string) => {
    const resumeId = id;
    router.push(`/resume/${resumeId}`);
  };

  const formSchemaForAddJob = z.object({
    title: z.string().min(1, {
      message: "标题是必填项",
    }),
    company: z.string().min(1, {
      message: "公司是必填项",
    }),
    salary: z.string().min(1, {
      message: "薪资是必填项",
    }),
    address: z.string().min(1, {
      message: "地址是必填项",
    }),
    education: z.string().min(1, {
      message: "学历是必填项",
    }),
    description: z.string().min(1, {
      message: "描述是必填项",
    }),
    hiring_manager: z.string().min(1, {
      message: "招聘经理是必填项",
    }),
    last_active: z.string().min(1, {
      message: "最后活跃是必填项",
    }),
    link: z.string().min(1, {
      message: "链接是必填项",
    }),
  });

  const formForAddJob = useForm({
    resolver: zodResolver(formSchemaForAddJob),
    defaultValues: {
      title: "",
      company: "",
      salary: "",
      address: "",
      education: "",
      description: "",
      hiring_manager: "",
      last_active: "",
      link: "",
    },
  });

  const onSubmitForAddJob = () => {
    console.log(formForAddJob.getValues());
    addJob(formForAddJob.getValues()).then(
      ({ data }) => {
        // localStorage.setItem("isLogin", "true");

        // 将表单所有数据压缩存入localStorage
        /*         const formValues = formForAddJob.getValues();
                for (const key in formValues) {
                  localStorage.setItem(key, formValues[key as keyof typeof formValues]);
                } */

        // router.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <div className="">
      <div className="px-10 sm:px-28 py-10 flex flex-row flex-wrap gap-6 justify-center xl:px-64 items-center w-full">
        <div className="flex w-full gap-5">
          {userType === "employee" && !isLoading && (
            <>
              <Input className="h-14 text-xl" placeholder="搜索更多岗位信息" />
              <Button className="p-0 w-14 h-14">
                <Search className="w-6 h-6" />
              </Button></>
          )}
          {userType === "employer" && !isLoading && (
            <>
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="w-full h-16 text-xl">
                    <CirclePlus className="mr-3" />
                    发 布 岗 位 信 息
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-[600px] p-10">
                  <DialogHeader><DialogTitle>请您在下方填写岗位详细信息</DialogTitle></DialogHeader>
                  <Form {...formForAddJob}>
                    <form
                      onSubmit={formForAddJob.handleSubmit(onSubmitForAddJob)}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={formForAddJob.control}
                        name="title"
                        render={({ field }) => (
                          <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="w-[100px] text-muted-foreground">职位名称</label>
                            <Input id="title" {...field} className="w-[200px]" />
                          </div>
                        )}
                      />
                      <div className="flex gap-6">
                        <FormField
                          control={formForAddJob.control}
                          name="company"
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <label htmlFor="company" className="w-[100px] text-muted-foreground">公司名称</label>
                              <Input id="company" {...field} className="w-[200px]" />
                            </div>
                          )}
                        />
                        <FormField
                          control={formForAddJob.control}
                          name="address"
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <label htmlFor="address" className="w-[100px] text-muted-foreground">公司地址</label>
                              <Input id="address" {...field} className="w-[200px]" />
                            </div>
                          )}
                        />
                      </div>
                      <FormField
                        control={formForAddJob.control}
                        name="link"
                        render={({ field }) => (
                          <div className="flex flex-col gap-2">
                            <label htmlFor="link" className="w-[100px] text-muted-foreground">官网链接</label>
                            <Input id="link" {...field} />
                          </div>
                        )}
                      />
                      <div className="flex gap-5">
                        <FormField
                          control={formForAddJob.control}
                          name="salary"
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <label htmlFor="salary" className="w-[100px] text-muted-foreground">预计薪资</label>
                              <Input id="salary" {...field} className="w-[200px]" />
                            </div>
                          )}
                        />
                        <FormField
                          control={formForAddJob.control}
                          name="education"
                          render={({ field }) => (
                            <div className="flex flex-col gap-2">
                              <label htmlFor="education" className="w-[100px] text-muted-foreground">学历要求</label>
                              <Input id="education" {...field} className="w-[200px]" />
                            </div>
                          )}
                        />
                      </div>
                      <FormField
                        control={formForAddJob.control}
                        name="description"
                        render={({ field }) => (
                          <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="w-[100px] text-muted-foreground">职位描述</label>
                            <Textarea id="description" {...field} />
                          </div>
                        )}
                      />
                      <Button>
                        点击上传
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
        <Separator />
        {userType === "employee" && !isLoading && (
          <>
            <p className="text-[30px] font-bold text-zinc-600 dark:text-zinc-100 w-full text-center">
              推 荐 岗 位
            </p>
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 w-full">
              {jobList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-zinc-50 flex flex-col p-5 py-7 rounded-md shadow-xs cursor-pointer gap-2 w-full hover:bg-zinc-100/80 border-1 dark:bg-zinc-800 hover:dark:bg-zinc-900/70 transition"
                    onClick={() => openJobDetail(item.id)}
                  >
                    <div className="flex w-full">
                      <div className="flex-1 font-bold">{item.title}</div>
                      <div className="text-muted-foreground">
                        {item.salary}
                      </div>
                    </div>
                    <div className="flex w-full ">
                      <div className="w-full font-bold text-muted-foreground text-sm">
                        {item.company}
                      </div>
                      <div className="text-end w-full text-muted-foreground text-sm">
                        {item.address}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {userType === "employer" && !isLoading && (
          <>
            <p className="text-[30px] font-bold text-zinc-600 dark:text-zinc-100 w-full text-center">
              推 荐 简 历
            </p>
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 w-full">
              {resumeList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-zinc-50 flex flex-col p-5 py-7 rounded-md shadow-xs cursor-pointer gap-2 w-full hover:bg-zinc-100/80 border-1 dark:bg-zinc-800 hover:dark:bg-zinc-900/70 transition"
                    onClick={() => openResumeDetail(item.id)}
                  >
                    <div className="flex gap-3 items-center">
                      <p className="text-xl font-bold">{item.name}</p>
                      <p className="text-zinc-600 dark:text-zinc-400">{item.desiredPosition.join(" ")}</p>
                    </div>
                    <div className="flex gap-2 text-muted-foreground items-center">
                      <p className="py-[0.1rem] px-2 bg-zinc-200/60 shadow-sm rounded-sm text-[0.9rem] dark:bg-zinc-900 ">{item.degree}</p>
                      <p>{item.school}</p>
                      <p>{item.major}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {isLoading && (
          <div className="mx-auto flex flex-col gap-6 cursor-default pt-5 rounded-3xl shadow-sm w-full">
            <Skeleton className="h-4 w-full dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full dark:bg-zinc-600" />
            <Skeleton className="h-4 w-full dark:bg-zinc-600" />
            <Skeleton className="h-4 w-[600px] dark:bg-zinc-600" />
          </div>
        )}
      </div>
    </div>
  );
}
