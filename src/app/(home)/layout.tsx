export default function HomeLayout({
    children,
    melissa,
    ethan,
    turner,
}: Readonly<{
    children: React.ReactNode;
    melissa: React.ReactNode;
    ethan: React.ReactNode;
    turner: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            <div className="grid gap-4 px-3 md:grid-cols-3">
                {melissa}
                {ethan}
                {turner}
            </div>
        </div>
    )
}