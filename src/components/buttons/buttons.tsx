export function SmallButton({ content }: { content: string }) {


    return (
        <div className="px-2 m-2 font-roboto text-xs text-black bg-white border-2 p-0.5 rounded  hover:scale-105">
            {content}
        </div>
    )
}

export function MainButton({ content }: { content: string }) {


    return (
        <div className="rounded border-2 bg-white px-2 font-poppins w-fit hover:scale-105">
            {content}
        </div>
    )
}
