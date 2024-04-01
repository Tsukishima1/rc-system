"use client";

import { getJobDetail } from "@/http/api/login";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface jobDetailProps {
    id: string;
    jobName: string;
    companyName: string;
    salary: string;
    address: string;
}

const JobPage = () => {
    const params = useParams();
    const jobId = params.jobId.toString();

    const [jobDetail, setJobDetail] = useState<jobDetailProps>();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setIsMounted(true);
        getJobDetail(jobId).then(({data})=>{
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
            this is job page
        </div>
     );
}
 
export default JobPage;