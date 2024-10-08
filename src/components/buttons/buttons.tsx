export function SmallButton({ content }: { content: string }) {


    return (
        <div className="px-2 m-2 font-roboto text-xs text-black bg-white border-2 p-0.5 rounded border-black hover:bg-black hover:text-white">
            {content}
        </div>
    )
}

export function MainButton({ content }: { content: string }) {


    return (
        <div className="rounded border-2 border-black bg-white px-2 font-roboto w-fit hover:bg-black hover:text-white">
            {content}
        </div>
    )
}
