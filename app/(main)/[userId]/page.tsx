"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot, Pencil, Mail, MapPin, NotepadText, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  // 未加载完成时显示loading
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(""); // ["admin", "user"]

  // 挂载完成后取消loading
  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "");
    setIsLoading(false);
  }, []);

  const [userInfo, setUserInfo] = useState({
    name: "",
    sex: "",
    phoneNumber: "",
    email: "",
    address: "",
    degree: "",
    major: "",
    school: "",
    award: "",
    skill: "",
    project: "",
  });

  useEffect(() => {
    const info = {
      name: localStorage.getItem("username") || "",
      sex: localStorage.getItem("sex") || "",
      phoneNumber: localStorage.getItem("phoneNumber") || "",
      email: localStorage.getItem("email") || "",
      address: localStorage.getItem("address") || "",
      degree: localStorage.getItem("degree") || "",
      major: localStorage.getItem("major") || "",
      school: localStorage.getItem("school") || "",
      award: localStorage.getItem("award") || "",
      skill: localStorage.getItem("skill") || "",
      project: localStorage.getItem("project") || "",
    };
    setUserInfo(info);
  }, []);

  const [bossInfo, setBossInfo] = useState({
    firstName: "",
    sex:"",
    companyName:"",
    position:"",
  });

  useEffect(() => {
    const info = {
      firstName: localStorage.getItem("firstName") || "",
      sex:localStorage.getItem("sex") || "",
      companyName:localStorage.getItem("companyName") || "",
      position:localStorage.getItem("position") || ""
    }
    setBossInfo(info);
  },[]);

  return (
    <div className="bg-zinc-100 min-h-screen py-20 dark:bg-zinc-800/50">
      {!isLoading && userType === "employee" && (
        <main className="bg-white dark:bg-zinc-900 mx-auto flex flex-col gap-4 cursor-default p-20 pb-28 rounded-3xl shadow-xl max-w-[1000px] min-w-[600px] ">
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <NotepadText />
              <p className="text-3xl font-bold">我的简历</p>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 rounded-lg transition hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none">
                编辑
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col gap-2 mt-4 items-center">
              <p className="font-bold text-3xl mb-1">{userInfo.name}</p>
              <div className="flex gap-3">
                <p>{userInfo.sex}</p>
                {/* <p>{userInfo.age}岁</p> */}
              </div>
              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <p className="">{userInfo.phoneNumber}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <p className="">{userInfo.email}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <p className="">{userInfo.address}</p>
              </div>
            </div>
            <Separator className="my-6 dark:bg-zinc-500" />
            <div className="flex w-full flex-col gap-3">
              <div className="flex gap-1 text-muted-foreground">
                <Dot />
                <p className="font-bold">教育经历</p>
              </div>
              <div className="flex gap-2 pl-7">
                {userInfo.degree}
                <p className="text-muted-foreground">毕业于</p>
                {userInfo.school} - {userInfo.major}
              </div>
              <div>
                <p className="text-muted-foreground font-bold mb-2">获奖情况</p>
                {/* <Textarea
                  className="text-[1rem] font-serif text-zinc-900"
                  value={userInfo.award || ""}
                /> */}
                <p>{userInfo.award}</p>
              </div>
            </div>
            <Separator className="my-6 dark:bg-zinc-500" />
            <div className="flex w-full flex-col gap-3">
              <div className="flex gap-1 text-muted-foreground">
                <Dot />
                <p className="font-bold">专业技能</p>
              </div>
              <p>
                {/* <Textarea
                  className="text-[1rem] font-serif text-zinc-900"
                  value={userInfo.skill || ""}
                /> */}
                {userInfo.skill}
              </p>
            </div>
            <Separator className="my-6 dark:bg-zinc-500" />
            <div className="flex w-full flex-col gap-3">
              <div className="flex gap-1 text-muted-foreground">
                <Dot />
                <p className="font-bold">项目经历</p>
              </div>
              <p>
                {/* <Textarea
                  className="text-[1rem] font-serif text-zinc-900"
                  value={userInfo.project || ""}
                /> */}
                {userInfo.project}
              </p>
            </div>
          </div>
        </main>
      )}

      {!isLoading && userType === "employer" && (
        <main className="bg-white dark:bg-zinc-900 mx-auto flex flex-col gap-4 cursor-default p-20 pb-28 rounded-3xl shadow-xl max-w-[1000px] min-w-[600px] ">
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <NotepadText />
              <p className="text-3xl font-bold">我的名片</p>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 rounded-lg transition hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none">
                编辑
              </button>
            </div>
          </div>
          <Separator className="my-3"/>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mt-8">
              <p className="font-bold text-3xl mb-1">{bossInfo.firstName}</p>
              <p className="font-bold text-3xl mb-1">{bossInfo.sex==="男" ? "先生" : "女士" }</p>
            </div>
            <div className="text-muted-foreground flex gap-2 mt-4">
              <p>{bossInfo.companyName}</p>
              <p>{bossInfo.position}</p>
            </div>
          </div>
        </main>
      )}

      {isLoading && (
        <div className="bg-white dark:bg-zinc-800 mx-auto flex flex-col gap-10 cursor-default p-10 pb-28 rounded-3xl shadow-xl max-w-[1000px] min-w-[600px] ">
          <Skeleton className="h-12 w-12" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[600px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
