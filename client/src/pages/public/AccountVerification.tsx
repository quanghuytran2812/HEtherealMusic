import { apiVerifyAccount } from "@/apis/auth";
import { LoadingPage } from "@/components/loadings";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";


const AccountVerification = () => {
  // take value email and token from url
  const [searchParams] = useSearchParams();
  const { email, token } = Object.fromEntries([...searchParams]);

  // Tạo một biến state để biết được là đã verify tài khoản thành công hay chưa
  const [verified, setVerified] = useState(false);

  // Gọi api verify tài khoản
  useEffect(() => {
    if (email && token) {
      apiVerifyAccount({ email, token }).then(() => setVerified(true));
    }
  }, [email, token]);

  // Nếu url có vấn đề, không tồn tại 1 trong 2 giá trị email hoặc token thì đá ra trang 404 luôn
  if (!email || !token) { 
    return <Navigate to={'/404'} />
  }

  // Nếu chưa verify xong thì hiện loading
  if (!verified) {
    return <LoadingPage caption="Verifying your account" />
  }

  // Nếu không gặp vấn đề gì và verify thành công thì điều hướng về trang login cùng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`}/>
}

export default AccountVerification