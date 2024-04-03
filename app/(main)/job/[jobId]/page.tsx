"use client";

import { Separator } from "@/components/ui/separator";
import { getJobDetail } from "@/http/api/login";
import { Apple, MapPin, User } from "lucide-react";
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
        })
        setIsLoading(false);
    }, [jobId]);

    useEffect(() => {
        console.log(jobDetail);
    }, [jobDetail]);
    // params.jobId;

    return (
        <div>
            <div className="px-10 sm:px-28 py-10 flex flex-row flex-wrap gap-6 justify-center xl:px-64 items-center w-full">
                <div className="w-full bg-zinc-100/60 shadow-sm p-10 rounded-sm cursor-default flex flex-col dark:bg-zinc-800">
                    <div className="flex mb-2 items-center">
                        <p className="font-bold text-3xl mr-6">
                            {jobDetail?.title}
                        </p>
                        <p className="text-end text-3xl font-semibold text-zinc-500 dark:text-zinc-400">
                            {jobDetail?.salary}
                        </p>
                        <p className="bg-zinc-200 p-2 rounded-md ml-6 py-1 shadow-sm text-sm dark:bg-zinc-900 dark:text-zinc-200">
                            {jobDetail?.education}
                        </p>
                    </div>
                    <div className="flex gap-1 items-center mb-4">
                        <MapPin className="w-5 h-5"/>
                        <p className="">
                            {jobDetail?.address}
                        </p>
                        <p className="">
                            {jobDetail?.company}
                        </p>
                    </div>
                    <div className="">
                        <p className="text-muted-foreground">
                            {jobDetail?.description}
                        </p>
                    </div>
                    <Separator className="my-5 dark:bg-zinc-600"/>
                    <div className="flex items-center bg-zinc-200/50 p-5 rounded-md cursor-pointer dark:bg-zinc-900">
                        <div className="w-9 h-9 bg-zinc-300 rounded-full mr-2"></div>
                        <p className="text-[1.2rem]">
                            {jobDetail?.hiring_manager}
                        </p>
                        <p className="ml-4 text-sm text-muted-foreground">
                            {jobDetail?.last_active}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobPage;