'use client'
import { deleteImage } from "@/app/actions/images"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { addPhoto } from "@/app/actions/posts"
import { useRouter } from "next/navigation";



interface PhotoFetchProps {
    params: {
        postId: string
    }
}

export default function PhotoUploadPage({ params }: PhotoFetchProps) {

    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');
    const router = useRouter();

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        deleteImage(uploadedFileUrl).then((res) => {
            if (res) {
                setUploadedFileUrl('')
            } else {
                console.error('error deleting post from storage')
            }
        }).then(() => {
            router.push(`/manage/post/edit/${params.postId}`)
        })

    }

    function ImageHandler() {

        return (
            <div>
                {uploadedFileUrl.length > 0 ?
                    <div className="w-fit h-fit relative">
                        <Image
                            src={uploadedFileUrl}
                            width={50}
                            height={50}
                            className="w-44 aspect-square object-contain"
                            alt="image upload preview"
                        />
                        <button
                            onClick={(event) => { handleDelete(event) }}
                            className="bg-red-500 text-white absolute top-0 right-0 p-1 text-sm"
                        >
                            delete
                        </button>
                    </div>
                    :
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            setUploadedFileUrl(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />}
            </div>
        )
    }

    function handleBack(event: React.MouseEvent<HTMLButtonElement>) {

        if (uploadedFileUrl !== '') {
            handleDelete(event)

        } else {
            router.push(`/manage/post/edit/${params.postId}`)
        }


    }


    return (
        <div className="z-50 absolute top-0 left-0 bg-base w-screen">
            <div className="bg-white border-4 border-accent mx-2 md:mx-10 my-3 p-1 md:p-5">
                <div className="w-full flex justify-between">

                    <button className="p-3 flex font-radley font-medium tracking-wide"
                        onClick={(event) => { handleBack(event) }}>
                        BACK
                    </button>
                    {uploadedFileUrl !== '' && <button onClick={() => { addPhoto(params.postId, uploadedFileUrl).then(() => { router.push(`/`) }) }}>
                        SUBMIT
                    </button>}
                </div>

                <ImageHandler />

            </div>
        </div>
    )
}