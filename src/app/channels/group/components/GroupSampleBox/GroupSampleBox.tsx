
import Image from "next/image"
import s from "./GroupSampleBox.module.scss"
import { MdArrowForwardIos } from "react-icons/md"

interface GroupSampleBoxProps {
    text: string
    img: string
}

export default function GroupSampleBox({text, img}: GroupSampleBoxProps) {
    return(
        <div className={s.container}>
            <div>
                <Image width={48} height={48} alt="sampleImg" src={img}></Image>
                <span>{text}</span>
            </div>
            <div style={{color: "#000"}}><MdArrowForwardIos /></div>
        </div>
    )
}