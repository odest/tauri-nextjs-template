import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { findNeighbour } from "fumadocs-core/page-tree";

export default async function Page(props: {
  params: Promise<{ slug?: string[]; locale: string }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.locale);
  if (!page) notFound();

  const MDX = page.data.body;
  const neighbours = findNeighbour(source.getPageTree(params.locale), page.url);

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: "clerk" }}
      footer={{
        items: { previous: neighbours.previous, next: neighbours.next },
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}
