'use client'
import { useFormState } from "react-dom"
import { UploadButton } from "@/utils/uploadthing"
import { FormEvent, useState } from "react"
import { createPost } from "@/app/actions/posts"
import Image from "next/image"
import { deleteImage } from "@/app/actions/images"

interface FormErrors {
    content?: string[],
}

// Define the shape of the form state
interface FormState {
    errors: FormErrors,
}

interface PostFormProps {
    formAction: any, // The action to perform when the form is submitted
    initialData: { // The initial data for the form fields
        authorId: string,
    },
}

export default function CreatePostForm({ formAction, initialData }: PostFormProps) {

    const [formState, action] = useFormState<FormState>(formAction, {
        errors: {},
    })

    const [uploadedFileUrl, setUploadedFileUrl] = useState<string>('');


    function ImageHandler() {

        function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
            event.preventDefault()

            deleteImage(uploadedFileUrl).then((res) => {
                if (res) {
                    setUploadedFileUrl('')
                } else {
                    console.error('error deleting post from storage')
                }
            })

        }

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


    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event?.currentTarget)

        if (initialData.authorId && uploadedFileUrl !== '') {
            formData.append('authorId', initialData.authorId)
            formData.append('photo', uploadedFileUrl)

            createPost(formState, formData);
        } else if (initialData.authorId && uploadedFileUrl === '') {
            formData.append('authorId', initialData.authorId)
            formData.append('photo', '')

            createPost(formState, formData);
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="md:w-1/2 w-11/12 mt-5">
                    <div className="mb-4">
                        <label htmlFor="content" className="block mb-2 font-roboto font-bold">DESCRIPTION:</label>
                        <textarea id="content"
                            name="content"
                            className="p-2 w-full text-sm border-accent border-2 h-16">

                        </textarea>
                        {
                            formState.errors.content
                            && <div className="text-red-500">
                                {formState.errors.content?.join(', ')} {// Display form errors related to the content field
                                }
                            </div>
                        }
                    </div>

                    <ImageHandler />

                    <div className="mb-4">
                        <button type="submit" className="bg-accent text-white font-radley px-4 py-2 mr-2">NEXT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}