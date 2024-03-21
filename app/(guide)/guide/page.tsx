"use client";

import RegisterBoss from "../../(login)/_components/RegisterBoss";
import RegisterEmployee from "../../(login)/_components/RegisterEmployee";

const guidePage = () => {

  let userType;
  if (typeof window !== 'undefined') {
    userType = localStorage.getItem("userType");
  }

  return ( 
    <div>
      {userType === "employer" ? (
        <RegisterBoss />
      ) : (
        <RegisterEmployee />
      )}
    </div>
   );
}
 
export default guidePage;