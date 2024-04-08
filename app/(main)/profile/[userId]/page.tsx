"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot, Pencil, Mail, MapPin, NotepadText, Phone, Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
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
    age: "",
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
      name: localStorage.getItem("name") || "",
      sex: localStorage.getItem("sex") || "",
      age: localStorage.getItem("age") || "",
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
    sex: "",
    companyName: "",
    position: "",
  });

  useEffect(() => {
    const info = {
      firstName: localStorage.getItem("firstName") || "",
      sex: localStorage.getItem("sex") || "",
      companyName: localStorage.getItem("companyName") || "",
      position: localStorage.getItem("position") || ""
    }
    setBossInfo(info);
  }, []);

  const handleClickEdit = () => {
    router.push("/guide");
  }

  return (
    <div className="py-10 px-48 xl:px-64 sm:px-28 dark:bg-zinc-800/50">
      {!isLoading && userType === "employee" && (
        <main className="bg-zinc-100/60 dark:bg-zinc-900 mx-auto flex flex-col gap-4 cursor-default px-16 py-10 pb-14 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <NotepadText />
              <p className="text-2xl font-bold">我的简历</p>
            </div>
            <div className="flex justify-end">
              <Button className="px-4 py-2 bg-zinc-200/50 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 rounded-lg transition hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none" onClick={handleClickEdit}>
                重新编辑
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col gap-2 mt-4 items-center">
              <p className="font-bold text-3xl mb-1">{userInfo.name}</p>
              <div className="flex gap-3">
                <p>{userInfo.sex}</p>
                <p>{userInfo.age}岁</p>
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
              {/* <div className="flex gap-2 items-center">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <p className="">{userInfo.address}</p>
              </div> */}
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
                <div className="flex gap-1 text-muted-foreground mb-2">
                  <Dot />
                  <p className="font-bold">获奖情况</p>
                </div>
                <p className="pl-7">{userInfo.award}</p>
              </div>
            </div>
            <Separator className="my-6 dark:bg-zinc-500" />
            <div className="flex w-full flex-col gap-3">
              <div className="flex gap-1 text-muted-foreground">
                <Dot />
                <p className="font-bold">专业技能</p>
              </div>
              <p className="pl-7">
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
              <p className="pl-7">
                {/* <Textarea
                  className="text-[1rem] font-serif text-zinc-900"
                  value={userInfo.project || ""}
                /> */}
                {userInfo.project}
              </p>
            </div>
          </div>
          <footer className="bg-zinc-200/60 p-8 shadow-md rounded-3xl rounded-ss-none dark:bg-zinc-800">
            <div className="flex gap-2 font-bold mb-4">
              <Bot className=""/>
              <p>简历分析</p>
            </div>
            <div className="text-muted-foreground text-wrap">
            张三的简历展示了他具备一定的前端开发技能，尤其在HTML、CSS和JavaScript方面。这是非常重要的基础技能，对于一个前端开发实习生来说，这些技能是必不可少的。然而，项目经验相对较少可能会在一定程度上影响他的竞争力。建议张三在简历中更加详细地描述他参与过的项目，包括项目的规模、使用的技术、自己的贡献以及遇到的挑战和解决方案。这样可以让招聘者更好地了解他的实际经验和能力。<br></br><br></br>
            另外，张三获得了两项奖项，这是他简历中的一大亮点。这显示了他在学术或者实践方面的卓越表现，能够吸引招聘者的眼球。建议张三在简历中进一步展开这些奖项，说明获得奖项的原因以及背后的故事，以展示他的能力、才华和奖励的价值。<br></br><br></br>
            综上所述，张三的简历显示了他在前端开发方面的基本技能和一定的成就，但也有提升的空间，特别是在项目经验的展示上。随着他在实习过程中的不断学习和积累经验，相信他会成为一名优秀的前端开发工程师。
            </div>
          </footer>
        </main>
      )}

      {!isLoading && userType === "employer" && (
        <main className="bg-white dark:bg-zinc-900 mx-auto flex flex-col gap-4 cursor-default p-20 pb-28 rounded-3xl shadow-sm max-w-[1000px] min-w-[600px] ">
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <NotepadText />
              <p className="text-3xl font-bold">我的名片</p>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 rounded-lg transition hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none" onClick={handleClickEdit}>
                重新编辑
              </button>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mt-8">
              <p className="font-bold text-3xl mb-1">{bossInfo.firstName}</p>
              <p className="font-bold text-3xl mb-1">{bossInfo.sex === "男" ? "先生" : "女士"}</p>
            </div>
            <div className="text-muted-foreground flex gap-2 mt-4">
              <p>{bossInfo.companyName}</p>
              <p>{bossInfo.position}</p>
            </div>
          </div>
        </main>
      )}

      {isLoading && (
        <div className="bg-white dark:bg-zinc-800 mx-auto flex flex-col gap-10 cursor-default p-10 pb-28 rounded-3xl shadow-sm max-w-[1000px] min-w-[600px] ">
          <Skeleton className="h-12 w-12 dark:bg-zinc-600" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-full dark:bg-zinc-700" />
            <Skeleton className="h-4 w-full dark:bg-zinc-700" />
            <Skeleton className="h-4 w-full dark:bg-zinc-700" />
            <Skeleton className="h-4 w-[600px] dark:bg-zinc-700" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
