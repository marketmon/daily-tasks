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

interface FormState {
    errors: FormErrors,
}

interface PostFormProps {
    formAction: any,
    initialData: {
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
            <div className="space-y-4">
                {uploadedFileUrl.length > 0 ? (
                    <div className="relative max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
                        <Image
                            src={uploadedFileUrl}
                            width={50}
                            height={50}
                            className="w-full aspect-square object-cover"
                            alt="image upload preview"
                        />
                        <button
                            onClick={handleDelete}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                            Remove Image
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setUploadedFileUrl(res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`Upload failed: ${error.message}`);
                            }}
                        />
                    </div>
                )}
            </div>
        )
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event?.currentTarget)

        if (initialData.authorId) {
            formData.append('authorId', initialData.authorId)
            formData.append('photo', uploadedFileUrl || '')
            createPost(formState, formData);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={onSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
                    <div className="space-y-4">
                        <label
                            htmlFor="content"
                            className="block text-lg font-semibold text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            placeholder="Share your thoughts..."
                        />
                        {formState.errors.content && (
                            <div className="text-red-500 text-sm mt-1">
                                {formState.errors.content.join(', ')}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <p className="text-lg font-semibold text-gray-700">Image Upload</p>
                        <ImageHandler />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}