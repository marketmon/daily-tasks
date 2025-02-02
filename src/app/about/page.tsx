import Image from "next/image";

export default function Page() {


    interface Feature {
        title: string;
        description: string;
    }

    const features: Feature[] = [
        {
            title: "Daily Cadence",
            description: "Everyday we reflect and plan ahead what our objectives/tasks are."
        },
        {
            title: "Build in public",
            description: "We contribute to public discourse and maintain the necessary transparency for trust."
        },
        {
            title: "Track our descent into madness",
            description: "Watch our language, ideas, and feelings evolve overtime as we respond and adapt to circumstances."
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-poppins">
            <main className="max-w-3xl mx-auto px-6 py-24">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-zinc-900">
                            This is our journey
                        </h1>
                        <p className="text-xl text-zinc-600">
                            Panbo Daily is an internal tool used to keep ourselves accountable. This our primary source as we sculpt our history as an organization.
                        </p>
                    </div>

                    <div className="h-px bg-zinc-200" />

                    <div className="space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="space-y-2">
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    {feature.title}
                                </h2>
                                <p className="text-zinc-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-zinc-200" />

                    <div className="space-y-6 text-center">
                        <div className="inline-flex items-center space-x-2 text-sm">
                            <span className="text-zinc-500">
                                Philadelphia.
                            </span>
                            <span className="text-zinc-300">•</span>
                            <span className="text-zinc-500">
                                Started August 9, 2024
                            </span>
                        </div>
                        <div className="w-full flex justify-center">
                            <Image src="/favicon.ico" alt="panbo logo" height={40} width={40} />
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}