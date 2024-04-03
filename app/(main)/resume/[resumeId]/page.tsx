"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getResumeDetail } from "@/http/api/login";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const ResumePage = () => {
    const params = useParams();
    const resumeId = params.resumeId.toString();

    const [resumeDetail, setResumeDetail] = useState<resumeListProps>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsMounted(true);
        getResumeDetail(resumeId).then(({ data }) => {
            data = JSON.parse(data);
            setResumeDetail(data[0]);
            setIsLoading(false);
        })
    }, [resumeId]);

    return (
        <div className="px-10 sm:px-28 py-10 flex flex-row flex-wrap gap-6 justify-center xl:px-64 items-center w-full">
            <div className="w-full bg-zinc-100/60 shadow-sm rounded-md cursor-default flex flex-col dark:bg-zinc-800 overflow-hidden">
                <div className="flex mb-5 justify-center-center bg-zinc-700 relative p-10 flex-col pb-8 dark:bg-zinc-900">
                    {isLoading && (
                        <div>
                            <Skeleton className="h-4 w-full bg-zinc-600 mb-4" />
                            <Skeleton className="h-4 w-full bg-zinc-600 mb-4" />
                        </div>
                    )}
                    {!isLoading && (<>
                        <Button
                            variant="ghost"
                            className="absolute bg-zinc-100 hover:bg-zinc-200  transition right-10 dark:text-black top-10"
                            onClick={() => window.history.back()}
                        ><ChevronLeft />
                            <p className="text-[1rem] mr-2">返回</p>
                        </Button>
                        <div className="mb-3">
                            <p className="text-3xl text-white font-bold">{resumeDetail?.name}</p>
                        </div>
                        <div className="flex items-center text-zinc-300 gap-2">
                            <p className="py-[0.1rem] px-2 dark:bg-zinc-700 shadow-sm rounded-sm text-[0.9rem] bg-zinc-800">{resumeDetail?.degree}</p>
                            <p>{resumeDetail?.school}</p>
                            <p>{resumeDetail?.major}</p>
                        </div>
                    </>)}
                </div>
                <div className="px-10 pb-10 flex flex-col gap-4">
                    {isLoading && (
                        <div className="mt-5">
                            <Skeleton className="h-4 w-full bg-zinc-200 mb-4 dark:bg-zinc-700" />
                            <Skeleton className="h-4 w-full bg-zinc-200 mb-4 dark:bg-zinc-700" />
                            <Skeleton className="h-4 w-[60%] bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                    )}
                    {!isLoading && (<>
                        <div>
                            <p className="font-bold text-xl mb-2">联系方式</p>
                            <div className="flex gap-8">
                                <p className="text-muted-foreground">电话号码：{resumeDetail?.phoneNumber}</p>
                                <p className="text-muted-foreground">邮箱地址：{resumeDetail?.email}</p>
                            </div>
                        </div>
                        <Separator className="my-3 dark:bg-zinc-600" />
                        <div>
                            <p className="font-bold text-xl mb-2">获奖经历</p>
                            <div className="flex gap-8">
                                <p className="">{resumeDetail?.award}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-xl mb-2">专业技能</p>
                            <div className="flex gap-8">
                                <p className="">{resumeDetail?.skill}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-xl mb-2">项目经历</p>
                            <div className="flex gap-8">
                                <p className="">{resumeDetail?.project}</p>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default ResumePage;