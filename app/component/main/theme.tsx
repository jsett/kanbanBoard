import { useRecoilState } from "recoil"
import { themeAtom } from "@/store/data";
import { useAtom } from "jotai";

export default function ThemeComponent({children}){
    const [theme, setTheme] = useAtom(themeAtom);
    return <div data-theme={theme}>
        {children}
    </div>
}