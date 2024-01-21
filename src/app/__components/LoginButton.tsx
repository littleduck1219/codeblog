// import React, { useEffect, useRef, useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { toast } from "react-toastify";
//
// function LoginButton() {
//   const [profileModal, setProfileModal] = useState(false);
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { data: session } = useSession();
//
//   const onClickLogin = async () => {
//     setProfileModal(false);
//     await signIn("google", { callbackUrl: "/" });
//   };
//   const onClickLogout = async () => {
//     setProfileModal(false);
//     await signOut({ callbackUrl: "/" });
//     toast.success("로그아웃 되었습니다.");
//   };
//
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//         setProfileModal(false);
//       }
//     };
//
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [modalRef, profileModal]);
//
//   return (
//     <>
//       <div className="Header__profile">
//         {session && session ? (
//           <div className="Header__profile--item" onClick={onClickLogout}>
//             로그아웃
//           </div>
//         ) : (
//           <div className="Header__profile--item" onClick={onClickLogin}>
//             로그인
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
//
// export default LoginButton;
