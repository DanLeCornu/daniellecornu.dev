import { Client } from "@notionhq/client"
import { NOTION_SECRET } from "./config"

export const notion = new Client({ auth: NOTION_SECRET })

type NotionColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background"

export const NOTION_COLOR: { [key in NotionColor]: string } = {
  default: "text-default",
  gray: "text-gray-400",
  brown: "text-brown-400",
  orange: "text-orange-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  red: "text-red-400",
  gray_background: "bg-gray-100",
  brown_background: "bg-brown-100",
  orange_background: "bg-orange-100",
  yellow_background: "bg-yellow-100",
  green_background: "bg-green-100",
  blue_background: "bg-blue-100",
  purple_background: "bg-purple-100",
  pink_background: "bg-pink-100",
  red_background: "bg-red-100",
}
