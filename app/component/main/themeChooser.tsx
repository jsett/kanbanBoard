import { themeAtom } from "@/store/data"
import { useAtom } from "jotai"

export default function ThemeChooser(){
    const [theme, setTheme] = useAtom(themeAtom)

    const themesList = ["light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset"]

    const themeChooser = themesList.map(val => {
        return <option key={`theme-${val}`} value={val}>{val}</option>
    })

    return <>
        <select defaultValue="Set Theme" className="select select-secondary w-full max-w-xs" onChange={e => setTheme(e.target.value)}>
            <option disabled>Set Theme</option>
            {themeChooser}
        </select>
    </>
}