import {
    atom,
    selector,
    selectorFamily
  } from 'recoil';

export const textState = atom({
    key: 'textState', 
    default: 'hello state',
  });

export const themeState = atom({
    key: 'themeState', 
    default: 'garden',
});

  export const boardState = atom({
    key: 'boardState',
    default: {},
  });

  export const tasksInStateQuery = selectorFamily({
    key: 'tasksInStateQuery',
    get: stateName => async ({get}) => {
        const board = get(boardState);
        if (board.hasOwnProperty("tasks")) {
          const res = board.tasks.filter((task) => {
              return task.state == stateName
          })
          return res;
        } else {
          return []
        }
    },
  });

  export const taskByIDQuery = selectorFamily({
    key: 'taskByIDQuery',
    get: taskID => ({get}) => {
        const board = get(boardState);
        if (board.hasOwnProperty("tasks")) {
          const res = board.tasks.filter((x) => x.id == taskID)[0]
          return res;
        } else {
          return {}
        }
    },
    set: taskID => ({get, set, },newValue) => {
      console.log("setting value")
      console.log(newValue)
      set(boardState, (oldvalue) => {
        const itemIndex = oldvalue.tasks.findIndex((x) => x.id == taskID)
        const item = { ...oldvalue.tasks[itemIndex], ...newValue }
        const item_list = [...oldvalue.tasks.slice(0, itemIndex), item, ...oldvalue.tasks.slice(itemIndex + 1)]
        const ret = { ...oldvalue, tasks: item_list}
        return ret
      })
    }
  });


  export const currentUserState = atom({
    key: 'currentUser',
    default: 0,
  });