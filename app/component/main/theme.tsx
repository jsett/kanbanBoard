import { useRecoilState } from "recoil"
import { themeState } from "./state/atoms"

export default function ThemeComponent({children}){
    const [theme, setTheme] = useRecoilState(themeState);
    return <div data-theme={theme}>
        {children}
    </div>
}