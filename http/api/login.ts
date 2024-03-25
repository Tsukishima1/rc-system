import myAxios from "../axios";

export function employeeLogin(data: any) {
  return myAxios({
    url: "/api/employee",
    method: "post",
    data
  });
}

export function employeeReg(data: any) {
  return myAxios({
    url: "/api/employee",
    method: "post",
    data
  });
}

export function employerLogin(data: any) {
  return myAxios({
    url: "/api/employer",
    method: "post",
    data
  });
}

// 注册后上传简历
export function uploadResume(data: any) {
  return myAxios({
    url: "/api/resume",
    method: "post",
    data
  });
}

// 读取简历内容