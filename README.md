# CommunityApp
The idea of the app is to create a community where people can engage in various topics through different rooms.

The user is able to create a room (chat, meeting, sells), and then all the other users is able to see it and react on it.

The users also have a profile page where they can comment on each other profile.

# Launch the project

```
pnpm install
pnpm run dev
```

You need to fill out the .env files (in server and client folder)
#### Server env file
```
PORT=
CLIENT_URL=
JWT_SECRET=
DATABASE_URL=
```

#### Client env file
```
NUXT_PUBLIC_API_URL=
```

And if the prisma files are not present you need to generate them
```
cd server
npx prisma generate
npx prisma migrate dev --name init
```
