"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { uploadResume } from "@/http/api/login";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Jobs from "./data";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const RegisterEmployee = () => {
  const router = useRouter();
  const [status, setStatus] = useState("undefined");
  const [file, setFile] = useState<File | null>(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [award, setAward] = useState("");
  const [project, setProject] = useState("");
  const [skill, setSkill] = useState("");
  const [desiredPosition, setDesiredPosition] = useState<string[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedSex = localStorage.getItem("sex");
    const storedAge = localStorage.getItem("age");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedEmail = localStorage.getItem("email");
    const storedAddress = localStorage.getItem("address");
    const storedDegree = localStorage.getItem("degree");
    const storedSchool = localStorage.getItem("school");
    const storedMajor = localStorage.getItem("major");
    const storedAward = localStorage.getItem("award");
    const storedProject = localStorage.getItem("project");
    const storedSkill = localStorage.getItem("skill");
    const storedDesiredPosition = localStorage.getItem("desiredPosition");

    if (storedName) {
      setName(storedName);
    }
    if (storedSex) {
      setSex(storedSex);
    }
    if (storedAge) {
      setAge(storedAge);
    }
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedAddress) {
      setAddress(storedAddress);
    }
    if (storedDegree) {
      setDegree(storedDegree);
    }
    if (storedSchool) {
      setSchool(storedSchool);
    }
    if (storedMajor) {
      setMajor(storedMajor);
    }
    if (storedAward) {
      setAward(storedAward);
    }
    if (storedProject) {
      setProject(storedProject);
    }
    if (storedSkill) {
      setSkill(storedSkill);
    }
    if (storedDesiredPosition) {
      setDesiredPosition(storedDesiredPosition.split(","));
    }
  }, []);

  const formSchemaForEmployee = z.object({
    name: z.string().min(1, {
      message: "姓名是必填项",
    }),
    sex: z.string().min(1, {
      message: "性别是必填项",
    }),
    age: z.string().min(1, {
      message: "年龄是必填项",
    }),
    desiredPosition: z.array(z.string()).min(1, {
      message: "期望岗位是必填项",
    }),
    phoneNumber: z.string().refine((value) => value.length === 11, {
      message: "请输入正确的电话号码",
    }),
    email: z.string().email({
      message: "请输入正确的邮箱地址",
    }),
    address: z.string().min(1, {
      message: "家庭住址是必填项",
    }),
    degree: z.string().min(1, {
      message: "学历必填",
    }),
    school: z.string().min(1, {
      message: "毕业院校是必填项",
    }),
    major: z.string().min(1, {
      message: "专业名称是必填项",
    }),
    award: z.string().min(1, {
      message: "奖项是必填项",
    }),
    project: z.string().min(1, {
      message: "项目经历是必填项",
    }),
    skill: z.string().min(1, {
      message: "技能是必填项",
    }),
  });

  const formForEmployee = useForm({
    resolver: zodResolver(formSchemaForEmployee),
    defaultValues: {
      name: typeof window !== 'undefined' ? localStorage.getItem("name") || "" : "",
      sex: typeof window !== 'undefined' ? localStorage.getItem("sex") || "" : "",
      age: typeof window !== 'undefined' ? localStorage.getItem("age") || "" : "",
      desiredPosition: typeof window !== 'undefined' ? localStorage.getItem("desiredPosition") || "" : "",
      phoneNumber: typeof window !== 'undefined' ? localStorage.getItem("phoneNumber") || "" : "",
      email: typeof window !== 'undefined' ? localStorage.getItem("email") || "" : "",
      address: typeof window !== 'undefined' ? localStorage.getItem("address") || "" : "",
      degree: typeof window !== 'undefined' ? localStorage.getItem("degree") || "" : "",
      school: typeof window !== 'undefined' ? localStorage.getItem("school") || "" : "",
      major: typeof window !== 'undefined' ? localStorage.getItem("major") || "" : "",
      award: typeof window !== 'undefined' ? localStorage.getItem("award") || "" : "",
      project: typeof window !== 'undefined' ? localStorage.getItem("project") || "" : "",
      skill: typeof window !== 'undefined' ? localStorage.getItem("skill") || "" : "",
    },
  });

  const fileScheme = z.object({
    file: z
      .string()
      .min(1, {
        message: "该文件不能为空",
      })
      // 后缀名校验
      .regex(/\.(pdf|doc|docx)$/i, {
        message: "文件格式不正确",
      }),
  });
  const formForFile = useForm({
    resolver: zodResolver(fileScheme),
    defaultValues: {
      file: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };
  const onSubmitForFile = () => {
    const data = new FormData();
    data.append("file", file as Blob);
  };

  const onSubmitForEEform = () => {
    // 列出表单数据
    console.log(formForEmployee.getValues());

    uploadResume({ ...formForEmployee.getValues(), userId }).then(
      ({ data }) => {

        localStorage.setItem("isLogin", "true");

        // 将表单所有数据压缩存入localStorage
        const formValues = formForEmployee.getValues();
        for (const key in formValues) {
          localStorage.setItem(key, formValues[key as keyof typeof formValues]);
        }

        router.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="min-h-screen p-20 bg-zinc-100 dark:bg-zinc-800 cursor-default">
      <main className="mx-auto p-20 shadow-md rounded-3xl flex flex-col items-center bg-white dark:bg-zinc-900 max-w-[1000px] min-w-[600px] relative">
        <div className="w-full">
          <p className="text-3xl font-bold mb-2">欢迎加入我们，新同学！</p>
          <p className="text-muted-foreground">请在下方填写你的个人信息</p>
        </div>
        <Separator className="my-10" />
        {status === "undefined" && (
          <div className="flex gap-10">
            <Button
              variant="outline"
              className="rounded-3xl text-md p-8 h-50 border-dashed border-2 text-muted-foreground hover:border-double"
              onClick={() => setStatus("online")}
            >
              填写在线简历
            </Button>
            <Button
              variant="outline"
              className="rounded-3xl text-md p-8 h-50 border-dashed border-2 text-muted-foreground hover:border-double"
              onClick={() => setStatus("file")}
            >
              上传简历文件
            </Button>
          </div>
        )}

        {status === "online" && (
          <>
            <Button
              className="absolute top-24 right-24"
              onClick={() => setStatus("undefined")}
            >
              上一步
            </Button>
            <div className="w-full">
              <Form {...formForEmployee}>
                <form
                  onSubmit={formForEmployee.handleSubmit(onSubmitForEEform)}
                  className="flex flex-col gap-3 px-3"
                >
                  <div className="flex gap-5 items-end">
                    <FormField
                      control={formForEmployee.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            姓名
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              {...field}
                              className="text-[1rem] w-28"
                              value={name}
                              onChange={(e) => { setName(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              name={field.name}
                              defaultValue={sex || field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-[90px]">
                                <SelectValue
                                  placeholder="性别"
                                  className="text-muted-foreground"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="男">男</SelectItem>
                                  <SelectItem value="女">女</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            年龄
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="age"
                              {...field}
                              className="text-[1rem] w-28"
                              value={age}
                              onChange={(e) => { setAge(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="desiredPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                >
                                  {desiredPosition.length === 0 ? (
                                    <>选择期望岗位</>
                                  ) : (
                                    <>{desiredPosition.join(", ")}</>
                                  )}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>期望岗位</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-3">
                                  <Label className="text-muted-foreground">计算机类</Label>
                                  <div>
                                    {Jobs.computer.map((job, index) => (
                                      <Button
                                        variant="outline"
                                        className={cn("mr-2 mb-2",
                                          desiredPosition.includes(job) ? "text-black bg-zinc-200/80" : "text-muted-foreground/60"
                                        )}
                                        key={index}
                                        onClick={() => {
                                          if (desiredPosition.includes(job)) {
                                            // 如果 job 已经被选中，那么我们将它从数组中删除
                                            setDesiredPosition(desiredPosition.filter(item => item !== job));
                                          } else {
                                            // 如果 job 没有被选中，那么我们将它添加到数组中
                                            setDesiredPosition([...desiredPosition, job]);
                                          }
                                          field.onChange(job);
                                        }}
                                      >
                                        {job}
                                      </Button>
                                    ))}
                                  </div>
                                  <Label className="text-muted-foreground">电子类</Label>
                                  <div>
                                    {Jobs.electronics.map((job, index) => (
                                      <Button
                                        variant="outline"
                                        className={cn("mr-2 mb-2",
                                          desiredPosition.includes(job) ? "text-black bg-zinc-200/80" : "text-muted-foreground/60"
                                        )}
                                        key={index}
                                        onClick={() => {
                                          if (desiredPosition.includes(job)) {
                                            setDesiredPosition(desiredPosition.filter(item => item !== job));
                                          } else {
                                            setDesiredPosition([...desiredPosition, job]);
                                          }
                                          field.onChange(job);
                                        }}
                                      >
                                        {job}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button
                                      className="mt-1 w-full"
                                      onClick={() => {
                                        field.onChange(desiredPosition);
                                      }}
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      确定
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>

                            </Dialog>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-3">
                    <FormField
                      control={formForEmployee.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            电话号码
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="phoneNumber"
                              {...field}
                              className="text-[1rem]"
                              value={phoneNumber}
                              onChange={(e) => { setPhoneNumber(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            邮箱地址
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              {...field}
                              className="text-[1rem] w-80"
                              value={email}
                              onChange={(e) => { setEmail(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formForEmployee.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          家庭住址
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="address"
                            {...field}
                            className="text-[1rem]"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value), field.onChange(e) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="edu flex gap-3 w-full items-end">
                    <FormField
                      control={formForEmployee.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground"></FormLabel>
                          <FormControl>
                            <Select
                              name={field.name}
                              defaultValue={degree || field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-[80px]">
                                <SelectValue
                                  placeholder="学历"
                                  className="text-muted-foreground"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="本科">本科</SelectItem>
                                  <SelectItem value="硕士">硕士</SelectItem>
                                  <SelectItem value="博士">博士</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            毕业院校
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="school"
                              {...field}
                              className="text-[1rem]"
                              value={school}
                              onChange={(e) => { setSchool(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForEmployee.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            专业名称
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="major"
                              {...field}
                              className="text-[1rem]"
                              value={major}
                              onChange={(e) => { setMajor(e.target.value), field.onChange(e) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formForEmployee.control}
                    name="award"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          获奖情况
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="award"
                            {...field}
                            value={award}
                            onChange={(e) => { setAward(e.target.value), field.onChange(e) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formForEmployee.control}
                    name="skill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          专业技能
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="skill"
                            {...field}
                            value={skill}
                            onChange={(e) => { setSkill(e.target.value), field.onChange(e) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formForEmployee.control}
                    name="project"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          项目经历
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="project"
                            {...field}
                            value={project}
                            onChange={(e) => { setProject(e.target.value), field.onChange(e) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full mt-8">下一步</Button>
                </form>
              </Form>
            </div>
          </>
        )}

        {status === "file" && (
          <>
            <Button
              className="absolute top-24 right-24"
              onClick={() => setStatus("undefined")}
            >
              上一步
            </Button>
            <Form {...formForFile}>
              <form
                className="flex flex-col gap-3 px-3"
                onSubmit={formForFile.handleSubmit(onSubmitForFile)}
              >
                <FormField
                  control={formForFile.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        上传简历文件
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="file"
                          type="file"
                          {...field}
                          className="cursor-pointer"
                          onChange={(event) => {
                            handleFileChange(event), field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-8">下一步</Button>
              </form>
            </Form>
          </>
        )}
      </main>
    </div>
  );
};

export default RegisterEmployee;
