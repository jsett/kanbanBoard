## todo
- make the add task work
- add a delete button for tasks
- make the current state update on the backend
- create a landing page for the user
- setup realtime updates
- make it so users are assignable

## Running development server

First, run the development server:

```bash
pnpm dev
```

## database management

```
pnpm exec prisma migrate dev --name init
pnpm exec prisma migrate reset

pnpm exec prisma db seed

pnpm exec prisma studio
```


## database structure

```
user:
    name: string
    email: string
    task : task[] <assigned tasks>
    bookmarks : bookmarks[] <users bookmarks>
    comments : comments[] <comments made by user>
    boards: boards[] <boards created by user>

bookmarks:
    board: board
    user: user

board:
    board_name
    states_list
    tasks: tasks[]
    user: user <owning user>
    bookmarked Bookmarks[]

tasks:
    state : string (open, research, in progress, in review, done)
    due_date : string<date>
    text : string
    taglist : tagsList[]
    board: board
    comments : comments[]
    user : user<assigned user>

tagsList:
    tasks: task
    tags: tags
    
tags:
    name : string
    tagList: tagsList[]
    
comments:
    text : string<markdown>
    user : user
    task : task
```
