import { getAllProjects } from "@/api/project";
import Link from "next/link";

export default async function Project() {
  const res = await getAllProjects();
  const projects = res.data.projectCollection.items;
  console.log("🚀 ~ Project ~ projects:", projects)

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project:any) => (
        <article key={project.sys.id} className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden">
          <picture>
            <img
              alt="placeholder"
              className="object-cover w-full"
              height="263"
              src={project.image.url}
              width="350"
            />
          </picture>
          <div className="flex-1 p-6">
            <Link href={`/articles/${project.slug}`}>
              <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
                {project.title}
              </h3>
            </Link>
            <div className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-800">
              {project.description}
            </div>
            <div className="flex justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center text-sm font-medium"
                href={`/articles/${project.link}`}
              >
                Read More →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
