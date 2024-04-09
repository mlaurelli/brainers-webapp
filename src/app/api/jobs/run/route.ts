import { getNextJob, removeCompletedJob, updateMessageImage } from "@/utils/db"
import { saveImageToStorage } from "@/utils/images-storage"
import { NextRequest, NextResponse } from "next/server"
const path = require('path')

export async function POST(_req: NextRequest, _res: NextResponse) {

  if (!isAuthenticated) {
    return NextResponse.json({}, { status: 401 })
  }

  const imagesDirectory = process.env.IMAGES_DIRECTORY!

  const job = await getNextJob()

  if (job && job[0].JobName === 'store_chat_image') {
    const saved = await saveImageToStorage(job[0].Action, `${job[0].MessageID}.png`)
    if (!saved) {
      return NextResponse.json({ success: false, message: 'Retry next time', params: [job[0].MessageID, job[0].Action] })
    }
    updateMessageImage(job[0].MessageID,  `/api/images/${job[0].MessageID}`)
    await removeCompletedJob(job[0].JobId)
    return NextResponse.json({ success: true, message: 'Job executed successfully' })
  }

  return NextResponse.json({ success: false, message: 'No job found or job name not supported' }, { status: 404 })
}

function isAuthenticated(req: NextRequest) {
  const authheader = req.headers.get('authorization') || req.headers.get('Authorization')
  const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true;
  } else {
    return false;
  }
}