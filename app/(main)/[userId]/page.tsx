import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dot, Pencil, Mail, MapPin, NotepadText, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const profilePage = () => {
  const userInfo = {
    name: "张晓恒",
    sex: "男",
    age: "22",
    phone: "12345678901",
    email: "1721214644@qq.com",
    address: "广东省广州市天河区",
    degree: "本科",
    major: "软件工程",
    school: "华南理工大学",
  };

  return (
    <div className="bg-zinc-100 min-h-screen py-20 dark:bg-zinc-800/50">
      <main className="bg-white dark:bg-zinc-800 mx-auto flex flex-col gap-4 cursor-default p-10 pb-28 rounded-3xl shadow-xl max-w-[1000px] min-w-[600px] ">
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
              <p>{userInfo.age}岁</p>
            </div>
            <div className="flex gap-8">
              <div className="flex gap-2 items-center">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <p className="">{userInfo.phone}</p>
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
            <div className="flex gap-3 text-muted-foreground relative flex-col">
              <div className="flex gap-1">
                <Dot />
                <p className="font-bold mr-2">在校获奖情况</p>
                <button>
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <Textarea className="text-[1rem] font-serif text-zinc-900"/>
            </div>
          </div>
          <Separator className="my-6 dark:bg-zinc-500" />
          <div className="flex w-full flex-col gap-3">
            <div className="flex gap-1 text-muted-foreground">
              <Dot />
              <p className="font-bold">专业技能</p>
            </div>
          </div>
          <Separator className="my-6 dark:bg-zinc-500" />
          <div className="flex w-full flex-col gap-3">
            <div className="flex gap-1 text-muted-foreground">
              <Dot />
              <p className="font-bold">项目经历</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default profilePage;
