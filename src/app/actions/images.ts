'use server'
import { UTApi } from "uploadthing/server";

export async function deleteImage(photo: String) {
    const baseUrl = "https://utfs.io/f/";
    const justUploadThingId = photo.replace(baseUrl, '')


    const utapi = new UTApi();


    try {
        await utapi.deleteFiles(justUploadThingId)

        return true
    }
    catch (error) {
        return error
    }

}