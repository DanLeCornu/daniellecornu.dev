import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionRichText } from "./NotionRichText"
import { cn } from "@/lib/utils"
import { NOTION_COLOR } from "@/lib/notion"
import NotionBlockChildren from "./NotionBlockChildren"

const SKILL_BLOCK_TOGGLE_IDS = ["12c884ef-5c28-801d-b500-c7cbc7268b04", "12c884ef-5c28-801f-9b1e-fbdbaf425a70", "12c884ef-5c28-8005-9884-e099b79474c1"]

export default function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph":
      if (block.paragraph.rich_text.length === 0) return <br />
      return (
        <p
          className={cn(
            "mb-1 font-light text-md leading-normal",
            NOTION_COLOR[block.paragraph.color as keyof typeof NOTION_COLOR],
          )}
        >
          {block.paragraph.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </p>
      )
    case "heading_1":
      if (block.heading_1.rich_text.length === 0) return <br />
      return (
        <h2 className="mt-8 mb-2 text-2xl md:text-3xl font-bold sticky top-[58px] bg-gray-100 z-20 pb-1">
          {block.heading_1.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </h2>
      )
    // case "heading_2":
    //   if (block.heading_2.rich_text.length === 0) return <br />
    //   return (
    //     <h1 className="mt-2 mb-4 text-lg md:text-xl">
    //       {block.heading_2.rich_text.map((richText, i) => (
    //         <NotionRichText key={i} richText={richText} />
    //       ))}
    //     </h1>
    //   )
    case "heading_3":
      if (block.heading_3.rich_text.length === 0) return <br />
      return (
        <h3
          className={cn(
            "px-1 mt-3 mb-1 text-md md:text-lg bg-gray-100 z-10",
            NOTION_COLOR[block.heading_3.color as keyof typeof NOTION_COLOR],
          )}
        >
          {block.heading_3.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </h3>
      )
    case "divider":
      return <hr className="my-3 border-gray-300" />
    case "bulleted_list_item":
      if (block.bulleted_list_item.rich_text.length === 0) return <br />
      return (
        <li className="mb-2">
          {block.bulleted_list_item.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </li>
      )
    case "toggle": {
      if (block.toggle.rich_text.length === 0) return <br />
      const isOpen = SKILL_BLOCK_TOGGLE_IDS.includes(block.id)
      return (
        <details open={isOpen} id={block.id}>
          <summary className="cursor-pointer leading-8 hover:opacity-75">
            {block.toggle.rich_text.map((richText, i) => (
              <NotionRichText key={i} richText={richText} />
            ))}
          </summary>
          <ul className="pl-10 list-outside list-disc">
            <NotionBlockChildren blockId={block.id} />
          </ul>
        </details>
      )
    }
    default:
      return <p className="text-red-500">unhandled block type: {block.type}</p>
  }
}
