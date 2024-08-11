export function SmallButton({ content }: { content: string }) {


    return (
        <div className="px-2 m-2 font-radley tracking-wide text-xs hover:tracking-wider hover:scale-105">
            {content}
        </div>
    )
}
