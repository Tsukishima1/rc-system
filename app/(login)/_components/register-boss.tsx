import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterBoss = () => {
  const router = useRouter();

  const formSchemaForEmployer = z.object({
    firstName: z.string().min(1, {
      message: "姓氏是必填项",
    }),
    sex: z.string().min(1, {
      message: "性别是必填项",
    }),
    companyName: z.string().min(1, {
      message: "公司名称是必填项",
    }),
    position: z.string().min(1, {
      message: "职务是必填项",
    }),
  });

  const formForEmployer = useForm({
    resolver: zodResolver(formSchemaForEmployer),
    defaultValues: {
      firstName: "",
      sex: "",
      companyName: "",
      position: "",
    },
  });

  const onSubmitForERform = () => {
    // 列出表单数据
    console.log(formForEmployer.getValues());
    toast.success("注册成功，请重新登录!");
    router.push("/login");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>您好，欢迎加入我们!</CardTitle>
        <CardDescription>
          请填写您的个人信息，这些信息将会在您的企业信息中展示。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...formForEmployer}>
          <form
            onSubmit={formForEmployer.handleSubmit(onSubmitForERform)}
            className="flex flex-col gap-2"
          >
            <div className="user flex items-end gap-3">
              <FormField
                control={formForEmployer.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      姓氏
                    </FormLabel>
                    <FormControl>
                      <Input id="name" {...field} className="w-[60px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formForEmployer.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        name={field.name}
                        defaultValue={field.value}
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
                            <SelectItem value="male">先生</SelectItem>
                            <SelectItem value="female">女士</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <FormField
                control={formForEmployer.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      公司名称
                    </FormLabel>
                    <FormControl>
                      <Input id="companyName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formForEmployer.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      您的职务
                    </FormLabel>
                    <FormControl>
                      <Input id="position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-8">保存</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterBoss;
