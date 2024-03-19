import myAxios from "../axios";

export function employeeLogin(data: any) {
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