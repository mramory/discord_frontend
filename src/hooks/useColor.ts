import { useLayoutEffect, useState } from "react";
import useImageColor from "use-image-color";


export const useColor = (img: string) => {
    const { colors } = useImageColor(img, { cors: true });
    const [color, setColor] = useState<string>("");

    useLayoutEffect(() => {
        if (colors?.length > 0) {
            setColor(colors[0]);
        }
    }, [colors]);

    return color
}