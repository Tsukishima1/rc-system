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

export function employerReg(data: any) {
  return myAxios({
    url: "/api/employer",
    method: "post",
    data
  });
}

// boss填写名片
export function employerCard(data: any) {
  return myAxios({
    url: "/api/bossCard",
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

// 获取岗位列表
export function getJobList() {
  return myAxios({
    url: "/api/job",
    method: "get"
  });
}

// 获取岗位详情
export function getJobDetail(id: string) {
  return myAxios({
    url: "/api/job",
    method: "get",
    params: {
      id
    }
  });
}

// 获取推荐简历列表
export function getRecommendResume() {
  return myAxios({
    url: "/api/resume",
    method: "get"
  });
}

// 获取简历详情
export function getResumeDetail(id: string) {
  return myAxios({
    url: "/api/resume",
    method: "get",
    params: {
      id
    }
  });
}

// 添加岗位
export function addJob(data: any) {
  return myAxios({
    url: "/api/job",
    method: "post",
    data
  });
}