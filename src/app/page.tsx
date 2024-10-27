import NotionBlock from "@/components/NotionBlock"
import { notion } from "@/lib/notion"
import type { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const PAGE_ID = "12c884ef5c28803eba6ffc20593c850a"
const COLUMN_1_BLOCK_ID = "12c884ef5c2880a392f0e35dc32b60f7"
const COLUMN_2_BLOCK_ID = "12c884ef5c2880639580dc87a87f2cde"
const FOOTER_BLOCK_ID = "12c884ef5c28805bb302eb19f052a7b6"

export default async function Home() {
  const page = (await notion.pages.retrieve({ page_id: PAGE_ID })) as PageObjectResponse
  // @ts-ignore
  const heading = page.properties.title.title?.[0]?.plain_text
  const col1Blocks = await notion.blocks.children.list({ block_id: COLUMN_1_BLOCK_ID })
  const col1Results = col1Blocks.results as BlockObjectResponse[]
  const col2Blocks = await notion.blocks.children.list({ block_id: COLUMN_2_BLOCK_ID })
  const col2Results = col2Blocks.results as BlockObjectResponse[]
  const footerBlocks = await notion.blocks.children.list({ block_id: FOOTER_BLOCK_ID })
  const footerResults = footerBlocks.results as BlockObjectResponse[]

  console.log(col2Results)
  // const childBlocks = await Promise.all(
  //   blocksWithChildren.map(async (block) => {
  //     const childBlock = await notion.blocks.retrieve({ block_id: block.id })
  //     return childBlock
  //   }),
  // )
  // console.log(childBlocks)

  return (
    <div className="bg-gray-100">
      <div className="px-24 py-44 text-default flex flex-col gap-8 max-w-[1280px] mx-auto">
        <p className="text-5xl font-bold sticky top-0 bg-gray-100 z-10 pt-2">{heading}</p>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-2/3">
            {col1Results.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
          </div>
          <div className="w-full md:w-1/3">
            {col2Results.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
          </div>
        </div>
        {footerResults.map((block) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
