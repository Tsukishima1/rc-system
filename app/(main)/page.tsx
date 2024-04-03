"use client";

import { ModeToggle } from "@/components/modal/model-toggle";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobList, getRecommendResume } from "@/http/api/login";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

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
  desiredPosition: string;
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

  return (
    <div className="">
      <div className="px-10 sm:px-28 py-10 flex flex-row flex-wrap gap-6 justify-center xl:px-64 items-center w-full">
        <div className="flex w-full gap-5">
          <Input className="h-14 text-xl" placeholder="搜索更多岗位信息" />
          <Button className="p-0 w-14 h-14">
            <Search className="w-6 h-6" />
          </Button>
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
                      <p className="text-zinc-600 dark:text-zinc-400">{item.desiredPosition}</p>
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
