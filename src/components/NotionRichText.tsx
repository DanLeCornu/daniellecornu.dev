import type { MentionRichTextItemResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function NotionRichText({ richText, className }: { richText: RichTextItemResponse; className?: string }) {
  if (richText.type === "text") {
    return richText.text.link ? (
      <a
        href={richText.text.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-block underline opacity-75 leading-8 font-semibold",
          className,
          richText.annotations.bold && "font-bold",
        )}
      >
        {richText.text.content}
      </a>
    ) : (
      <span
        className={cn(
          "",
          className,
          richText.annotations.bold && "font-bold",
          richText.annotations.italic && "italic",
          richText.annotations.strikethrough && "line-through",
          richText.annotations.underline && "underline",
          richText.annotations.code && "bg-gray-200 rounded-md px-1",
        )}
      >
        {richText.text.content}
      </span>
    )
  }

  // @ts-ignore
  if (richText.type === "mention" && richText.mention.type === "custom_emoji") {
    return (
      <Image
        // @ts-ignore
        src={richText.mention.custom_emoji.url}
        // @ts-ignore
        alt={richText.mention.custom_emoji.name}
        width={16}
        height={16}
        className="inline-block mb-[1px]"
      />
    )
  }
  return null
}
