import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionRichText } from "./NotionRichText"
import { cn } from "@/lib/utils"
import { notion, NOTION_COLOR } from "@/lib/notion"
import NotionBlockChildren from "./NotionBlockChildren"

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
        <h1 className="mt-8 mb-2 text-2xl md:text-3xl font-bold sticky top-[52px] bg-gray-100 z-20 min-h-[36px]">
          {block.heading_1.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </h1>
      )
    case "heading_2":
      if (block.heading_2.rich_text.length === 0) return <br />
      return (
        <h1 className="mt-2 mb-4 text-lg md:text-xl">
          {block.heading_2.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </h1>
      )
    case "heading_3":
      if (block.heading_3.rich_text.length === 0) return <br />
      return (
        <h1
          className={cn(
            "mt-3 mb-1 min-h-[50px] md:min-h-0 text-md md:text-lg sticky top-[88px] bg-gray-100 z-10",
            NOTION_COLOR[block.heading_3.color as keyof typeof NOTION_COLOR],
          )}
        >
          {block.heading_3.rich_text.map((richText, i) => (
            <NotionRichText key={i} richText={richText} />
          ))}
        </h1>
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
      return (
        <details open>
          <summary className="cursor-pointer leading-8">
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
