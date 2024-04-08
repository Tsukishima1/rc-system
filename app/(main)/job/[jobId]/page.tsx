"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobDetail } from "@/http/api/login";
import { ChevronLeft, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface jobDetailProps {
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

const JobPage = () => {
    const params = useParams();
    const jobId = params.jobId.toString();

    const [jobDetail, setJobDetail] = useState<jobDetailProps>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsMounted(true);
        getJobDetail(jobId).then(({ data }) => {
            data = JSON.parse(data);
            setJobDetail(data[0]);
            setIsLoading(false);
        })
    }, [jobId]);

    return (
        <div className="px-10 sm:px-28 py-10 flex flex-row flex-wrap justify-center xl:px-64 items-center w-full">
            <div className="w-full bg-zinc-100/60 shadow-sm rounded-md cursor-default flex flex-col dark:bg-zinc-800 overflow-hidden">
                <div className="flex mb-5 justify-center-center bg-zinc-700 relative p-10 flex-col pb-8 dark:bg-zinc-900">
                    {isLoading && (
                        <div>
                            <Skeleton className="h-4 w-full bg-zinc-600 mb-4" />
                            <Skeleton className="h-4 w-full bg-zinc-600 mb-4" />
                        </div>
                    )}
                    {!isLoading && (
                        <>
                            <Button
                                variant="ghost"
                                className="absolute bg-zinc-100 hover:bg-zinc-200  transition right-20 dark:text-black"
                                onClick={() => window.history.back()}
                            >
                                <ChevronLeft />
                                <p className="text-[1rem] mr-2">返回</p>
                            </Button>
                            <div className="flex mb-3 items-center">
                                <p className="font-bold text-3xl mr-6 text-white">
                                    {jobDetail?.title}
                                </p>
                                <p className="text-end text-3xl font-semibold text-zinc-300 ">
                                    {jobDetail?.salary}
                                </p>
                                <p className="bg-zinc-200 p-2 rounded-md ml-6 py-1 shadow-sm text-sm dark:text-black">
                                    {jobDetail?.education}
                                </p>
                            </div>
                            <div className="flex gap-1 items-center text-zinc-200">
                                <MapPin className="w-5 h-5" />
                                <p className="text-[1.1rem] mr-1">
                                    {jobDetail?.address}
                                </p>
                                <p className="text-[1.1rem]">
                                    {jobDetail?.company}
                                </p>
                                <a className="text-zinc-400 ml-3 underline underline-offset-4 transition hover:text-zinc-300" href={jobDetail?.link}>{jobDetail?.link}</a>
                            </div>
                        </>
                    )}
                </div>
                <div className="px-10 pb-10">
                    {isLoading && (
                        <div className="mt-5">
                            <Skeleton className="h-4 w-full bg-zinc-200 mb-4 dark:bg-zinc-700" />
                            <Skeleton className="h-4 w-full bg-zinc-200 mb-4 dark:bg-zinc-700" />
                            <Skeleton className="h-4 w-[60%] bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                    )}
                    {!isLoading && (
                        <>
                            <p className="font-bold text-xl mb-2">职位要求</p>
                            <div className="">
                                <p className="text-zinc-700 dark:text-zinc-200">
                                    {jobDetail?.description}
                                </p>
                            </div>
                            <Separator className="my-5 dark:bg-zinc-600" />
                            <div className="flex items-center bg-zinc-200/50 p-5 rounded-md dark:bg-zinc-900 relative">
                                <div className="w-9 h-9 bg-zinc-300 rounded-full mr-2"></div>
                                <p className="text-[1.2rem]">
                                    {jobDetail?.hiring_manager}
                                </p>
                                <p className="ml-4 text-sm text-muted-foreground">
                                    {jobDetail?.last_active}
                                </p>
                                <Button
                                    className="absolute right-10"
                                >
                                    立即沟通
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="bg-zinc-100/40 w-[90%] p-5 rounded-b-md shadow-sm px-10">
                <p>岗位匹配度</p>
            </div>
        </div>
    );
}

export default JobPage;