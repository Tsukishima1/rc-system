"use client";

import { ModeToggle } from "@/components/modal/model-toggle";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobList } from "@/http/api/login";
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

export default function Home() {
  const router = useRouter();
  const [jobList, setJobList] = useState<jobListProps[]>([]);
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
  }, []);

  const openJobDetail = (id:string) => {
    const jobId = id;
    router.push(`/job/${jobId}`);
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
        {userType === "boss" && !isLoading && (
          <>
            <p className="text-[30px] font-bold text-zinc-600 dark:text-zinc-100 w-full text-center">
              推 荐 简 历
            </p>
          </>
        )}
        {isLoading && (
          <div className="bg-white dark:bg-zinc-800 mx-auto flex flex-col gap-6 cursor-default pt-5 rounded-3xl shadow-sm w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[600px]" />
          </div>
        )}
      </div>
    </div>
  );
}
