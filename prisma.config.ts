import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Tells Prisma to create and read a local file named dev.db for storage
    url: "file:./dev.db", 
  },
});
