import fetch from "node-fetch"
import fs from 'fs'
import path from 'path'

export const saveImageToStorage = async (fetchLink: string, nameWithExtension: string) => {
    // starting from application root create a new folder /images
    const imagesDirectory = process.env.IMAGES_DIRECTORY!

    if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory, { recursive: true })
    }

    if (fs.existsSync(nameWithExtension)) {
        console.log({ message: "Image already exists", nameWithExtension })
        return false
    }

    const response = await fetch(fetchLink)

    if (![200, 304].includes(response.status)) {
        console.log({ message: "Image not ready yet", nameWithExtension })
        return false
    }

    const buffer = await response.buffer()
    fs.writeFileSync(path.join(imagesDirectory, nameWithExtension), buffer)
    return true
}