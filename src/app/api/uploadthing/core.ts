import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" ,maxFileCount: 1} })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await getServerSession()
      
      const user = await db.user.findFirst({
        where:{
          //@ts-expect-error no tak
          id: session?.user?.id
        }
      })
      if (!user) throw new Error("Unauthorized");

      return {
        userId: user.id
      }
    })


    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      await db.user.update({
        where:{
          id: metadata.userId
        },
        data:{
          image: file.url,
        }
      })

      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;