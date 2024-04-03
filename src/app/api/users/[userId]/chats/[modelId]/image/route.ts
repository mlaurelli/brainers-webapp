import { ConversationType } from "@/components/chat/chatbox"
import { AiGirlfriend } from "@/models/ai-girlfriend"
import { saveMessage, updateImageUsage } from "@/utils/db"
import { canGetImage } from "@/utils/subscriptionUsage"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { userId: string, modelId: string } }) {

    const model = AiGirlfriend.filter(model => model.id = params.modelId)[0]
    const body = await request.json()

    const conversationId: string = body.conversationId

    try {
        const check = await canGetImage(params.userId)
        if (!check) {
            return Response.json({ error: "You exceeded the limits of your tier" }, { status: 403 })
        }
    } catch (error) {
        console.error({ message: "Error checking usages", params, conversationId, error });
        return Response.json({ message: "Error checking usages", params, conversationId }, { status: 500 })
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    var raw = JSON.stringify({
        "key": process.env.MODELS_LAB_TOKEN!,
        "prompt": model.image_prompt,
        "negative_prompt": "(worst quality,low quality:1.4), (depth of field,blurry:1.2), (greyscale,monochrome:1.1), 3D face, cropped, lowres, text, (nsfw:1.3), (worst quality:2), (low quality:2), (normal quality:2), normal quality, (grayscale), skin spots, acnes, skin blemishes, age spot, (ugy:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit, bad hands, missing fingers, (((extra arms and legs)))",
        "width": "512",
        "height": "768",
        "safety_checker": false,
        "samples": 1,
        "num_inference_steps": 35,
        "seed": null,
        "guidance_scale": 5,
        "lora_strength": 1,
        "scheduler": "DPMSolverMultistepScheduler",
        "algorithm_type": "dpmsolver+++",
        "use_karras_sigmas": "yes",
        "model_id": "epicrealism-natural-sin-r",
        "lora_model": "noemi,epicrealismhelper",
        "webhook": null,
        "track_id": null,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as unknown as RequestRedirect
    };

    const response = await fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)

    const json = await response.json()

    if ( !["success", "processing"].includes(json.status)) {
        return Response.json({ error: "error when creating image for conversationId", conversationId, json })
    }

    const imageMessage = {
        type: 'in',
        text: null,
        image: json.status === "processing" ? json.future_links[0] : json.output[0],
        avatar: model.avatar,
        name: model.id
    } as ConversationType

    try {
        saveMessage(imageMessage, params.userId, params.modelId, conversationId)
        updateImageUsage(params.userId)
    } catch (error) {
        console.error({ message: "Error during saving messages", imageMessage, params, conversationId, error })
        return Response.json({ message: "Error during saving messages", imageMessage, params, conversationId, error }, { status: 500 })
    }

    return Response.json({ links: json.output, width: json.meta.width, height: json.meta.height })
}


// {
//     "status": "success",
//     "generationTime": 0.65,
//     "id": 81443063,
//     "output": [
//         "https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/604d1afb-dee3-4aa6-8d92-932337ecc147-0.png"
//     ],
//     "proxy_links": [
//         "https://cdn2.stablediffusionapi.com/generations/604d1afb-dee3-4aa6-8d92-932337ecc147-0.png"
//     ],
//     "meta": {
//         "base64": "no",
//         "file_prefix": "604d1afb-dee3-4aa6-8d92-932337ecc147",
//         "guidance_scale": 0,
//         "height": 512,
//         "instant_response": "no",
//         "n_samples": 1,
//         "negative_prompt": "bad quality",
//         "outdir": "out",
//         "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk collie with heavy black eyeliner))",
//         "safety_checker": "no",
//         "safety_checker_type": "black",
//         "seed": 1373787908,
//         "temp": "no",
//         "width": 512
//     }
// }
