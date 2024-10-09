import { faker } from '@faker-js/faker';
import prisma from "@/lib/db";
import { Board, Tags, Tasks, User } from '@prisma/client';

async function createBoard(name: string,userID: number){
  
  const board = await prisma.board.create({
      data: {
          boardName: name,
          states: '["open","in progress", "review","done"]',
          user: {
            connect: {
              id: userID
            }
          }
      },
  })
  return board;
}

async function createBoards(users: User[]) {
  let boards = []
  for (let i = 0; i < 10; i++) {
    const owningUser = users[Math.floor(Math.random()*users.length)].id;

    const board = await createBoard(`Board ${i}`, owningUser)
    boards.push(board)
  }
  return boards;
}

async function createUser(){
    const firstName = faker.person.firstName()
    const lastName = faker.person.middleName()
    const fullName = `${firstName} ${lastName}`
    const img = faker.image.avatar()
    const email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'example.com' })
    const user = await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
            name: fullName,
            email: email,
            image: img
        },
    })
    return user;
}

async function createUsers(){
  let users = []
  for (let i = 0; i < 10; i++) {
    const user = await createUser()
    users.push(user)
  }
  return users;
}

async function giveUserBookmark(user: User,boards: Board[]) {
  const boardID = boards[Math.floor(Math.random()*boards.length)].id
  const userID = user.id
  const bookmark = await prisma.bookmark.create({
    data: {
        board: {
          connect: {
            id: boardID
          }
        },
        user: {
          connect: {
            id: userID
          }
        }
    },
  })
}

async function giveUsersBookmarks(users: User[], boards: Board[]) {
  for (const user of users) {
    await giveUserBookmark(user, boards)
    await giveUserBookmark(user, boards)
  }
}

async function addTask(text: string, board: Board, users: User[], tags: Tags[]) {
  const states = ["open","in progress", "review","done"]
  const state = states[Math.floor(Math.random()*states.length)]
  const userId = users[Math.floor(Math.random()*users.length)].id
  const tagId = tags[Math.floor(Math.random()*tags.length)].id

  const task = await prisma.tasks.create({
    data: {
      state: state,
      dueDate: "Unknown",
      text: text,
      board: {
        connect: {
          id: board.id
        }
      },
      user: {
        connect: {
          id: userId
        }
      },
      tagslist: {
        create: {
          tag: {
            connect: {
              id: tagId
            }
          }
        }
      },
    },
  })
  return task
}

async function addTasks(users: User[], boards: Board[], tags: Tags[]) {
  let tasks: Tasks[] = [] ;
  const taskNums = ["1","2","3","4","5","6","7","8","9"];
  for (const board of boards) {
    for (const taskNum of taskNums) {
      tasks.push(await addTask(`Task ${taskNum}`, board, users, tags))
    }
  }
  // await boards.forEach(async (board, i) => {
  //   await ["1","2","3","4","5","6","7","8","9"].forEach(async (taskNum) =>{
  //     tasks.push(await addTask(`Task ${taskNum}`, board, users, tags))
  //   })
  // })
  return tasks;
}

async function createTag(name: string) {
  const tag = await prisma.tags.upsert({
    where: {
      name: name
    },
    update: {},
    create: {
        name: name
    },
  })
  return tag
}

async function createTags() {
  let returntags: Tags[] = [];
  const tagNames = ["Design", "Coding","UI","Backend", "Bugfix"];
  for (const name of tagNames) {
    returntags.push(await createTag(name));
  }
  return returntags;
}

async function createComment(users: User[], task: Tasks) {
  const userId = users[Math.floor(Math.random()*users.length)].id
  const texts = ["Nice", "Cool","Keepup the good work","Great", "Awsome"]
  const text = texts[Math.floor(Math.random()*texts.length)]
  const taskId = task.id

  const comment = await prisma.comments.create({
    data: {
        text: text,
        user: {
          connect: {
            id: userId
          }
        },
        tasks: {
          connect: {
            id: taskId
          }
        }
    },
  })
  return comment
}

async function createComments( users: User[], tasks: Tasks[] ) {
  for (const task of tasks) {
    await createComment( users, task);
  }
}

async function main() {
    const users = await createUsers();
    const boards = await createBoards(users);
    await giveUsersBookmarks(users, boards);
    const tags = await createTags();
    const tasks = await addTasks(users, boards, tags);
    await createComments(users, tasks);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })