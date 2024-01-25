import { Metadata } from "next";
import { MySidebar } from "../components/MySidebar/MySidebar";
import { RightMySidebar } from "../components/RightMySidebar/RightMySidebar";
import Header from "./components/Header/Header";
import s from "./page.module.scss"


export const metadata: Metadata = {
    title: "Me",
    description: "Me",
  };
  
  export default async function MeLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return(
        <>
            <MySidebar />
            <div className={s.container}>
              <Header />
              <div className={s.pageContainer}>
                {children}
              </div>
            </div>
            <RightMySidebar />
        </>
    ) 
  }