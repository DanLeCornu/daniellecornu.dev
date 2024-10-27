import { notion } from "@/lib/notion"
import NotionBlock from "./NotionBlock"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export default async function NotionBlockChildren({ blockId }: { blockId: string }) {
  const children = await notion.blocks.children.list({ block_id: blockId })
  return children.results.map((block) => <NotionBlock key={block.id} block={block as BlockObjectResponse} />)
}
