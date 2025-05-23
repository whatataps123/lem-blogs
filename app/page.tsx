import { BlogpostCard } from "@/components/general/BlogpostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";

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

export function BlogPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gray-200 rounded-full h-10 w-10 animate-pulse"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-24 animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-5 w-full animate-pulse"></div>
              <div className="bg-gray-200 h-5 w-3/4 animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-1/2 animate-pulse"></div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="bg-gray-200 h-4 w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}