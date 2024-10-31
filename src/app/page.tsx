import NotionBlock from "@/components/NotionBlock"
import { notion } from "@/lib/notion"
import type { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { DownloadIcon } from "lucide-react"

const PAGE_ID = "12c884ef5c28803eba6ffc20593c850a"
const COLUMN_1_BLOCK_ID = "12c884ef5c2880a392f0e35dc32b60f7"
const COLUMN_2_BLOCK_ID = "12c884ef5c2880639580dc87a87f2cde"
const FOOTER_BLOCK_ID = "12c884ef5c28805bb302eb19f052a7b6"

export default async function Home() {
  const page = (await notion.pages.retrieve({ page_id: PAGE_ID })) as PageObjectResponse
  // @ts-ignore
  const title = page.properties.title.title?.[0]?.plain_text
  const col1Blocks = await notion.blocks.children.list({ block_id: COLUMN_1_BLOCK_ID })
  const col1Results = col1Blocks.results as BlockObjectResponse[]
  const col2Blocks = await notion.blocks.children.list({ block_id: COLUMN_2_BLOCK_ID })
  const col2Results = col2Blocks.results as BlockObjectResponse[]
  const footerBlocks = await notion.blocks.children.list({ block_id: FOOTER_BLOCK_ID })
  const footerResults = footerBlocks.results as BlockObjectResponse[]

  return (
    <div className="bg-gray-100">
      <div className="px-8 md:px-24 py-16 md:py-44 text-default flex flex-col gap-8 max-w-[1280px] mx-auto relative">
        <a
          href="https://public-4.s3.eu-central-1.amazonaws.com/Daniel_Le_Cornu.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline w-fit absolute left-8 md:left-auto md:right-24 top-8 md:top-24 hover:opacity-75 z-40"
        >
          <DownloadIcon className="w-5 h-5 mr-1 mb-1 inline-block" />
          Download PDF
        </a>
        <h1 className="text-4xl md:text-5xl font-bold sticky top-0 h-[58px] bg-gray-100 z-30 pt-2">{title}</h1>
        <div className="flex flex-col gap-8 md:flex-row">
          <section className="w-full md:w-2/3">
            {col1Results.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
          </section>
          <section className="w-full md:w-1/3">
            {col2Results.map((block) => (
              <NotionBlock key={block.id} block={block} />
            ))}
            <div className="sticky top-[58px] bg-gray-100 h-[40px] z-30" />
          </section>
        </div>
        <section>
          {footerResults.map((block) => (
            <NotionBlock key={block.id} block={block} />
          ))}
        </section>
      </div>
    </div>
  )
}
