import { useAtom } from "jotai";
import { tasksAtomsAtom } from "@/store/data";
import { TaskComponent } from "./task";

export function Tasks({ state }: { state: string }) {
    const stateName = state;
    const [tasks] = useAtom(tasksAtomsAtom);
    const taskList = tasks.map((taskAtom) => {
        return <TaskComponent key={`${taskAtom}`}  taskAtom={taskAtom} stateName={stateName} />
    })

    return <>{taskList}</>
}