import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest, { params }: { params: { userId: string, messageId: string} }) {

  const messageID  = params.messageId

  console.log(params)

  try {
    // const check = await canGetImage(params.userId, messageID)
    const check = true
    if (!check) {
      return Response.json({ error: "Not authorized" }, { status: 403 })
    }
  } catch (error) {
    console.error({ message: "Error checking image retrieval", params, messageID, error });
    return Response.json({ message: "Error checking image retrieval", params, messageID }, { status: 500 })
  }

  try {
    const imagesDirectory = process.env.IMAGES_DIRECTORY!
    const filePath = path.resolve(imagesDirectory, `${messageID}.png`)

    // Verifica se il file esiste
    if (fs.existsSync(filePath)) {
      // Ritorna il file PNG

      const blob = fs.readFileSync(filePath)

      const headers = new Headers()

      headers.set("Content-Type", "image/*")

      return new NextResponse(blob, { status: 200, statusText: "OK", headers })
    } else {
      // File non trovato
      return Response.json({ error: 'File non trovato' }, { status: 404 });
    }
  } catch (error) {
    console.error({ message: "Error during saving audio usage", params, messageID, error })
    return Response.json({ message: "Error during audio usage", params, messageID, error }, { status: 500 })
  }
}