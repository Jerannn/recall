import { prisma } from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();


  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
