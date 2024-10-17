import { boardState, tasksInStateQuery } from "./state/atoms";
import { useRecoilValue } from "recoil";
import { TaskComponent } from "./task";

export default function Tasks({ state }: { state: string }) {
    const stateName = state;
    const tasks = useRecoilValue(tasksInStateQuery(stateName));
    const taskList = tasks.map((task: Tasks, idx: number) => {
        return <TaskComponent key={`task-${task.id}`} id={`${task.id}`} task={task} idx={idx}/>
    })
    return <>{taskList}</>
}