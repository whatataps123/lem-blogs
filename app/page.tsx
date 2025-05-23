import { BlogpostCard } from "@/components/general/BlogpostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";
import { BlogPostsSkeleton } from "@/components/general/BlogPostsSkeleton";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageURL: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

    return data;
}


export default function Home() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>
    
      <Suspense fallback={<BlogPostsSkeleton />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogpostCard data={item} key={item.id} />
      ))}
    </div>
  );
}