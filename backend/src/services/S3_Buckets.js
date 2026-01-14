import {GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"

export const client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


async function uploadFileToS3(fileBuffer, fileName, mimeType) {

    // Basic validations
    if (!fileBuffer || !fileName || !mimeType) {
        const error = new Error("Missing required upload parameters");
        error.statusCode = 400;
        throw error;
    }

    // Sanitize filename
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const KEY = `uploads/${Date.now()}-${safeName}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: KEY,
        Body: fileBuffer,
        ContentType: mimeType
    };

    try {
        const awsResponseOnUpload = await client.send( new PutObjectCommand(params));

        console.log("S3 Upload Success:", {
            key: KEY,
            etag: awsResponseOnUpload.ETag
        });

        return KEY;

    } catch (error) {
        console.error("S3 Upload Failed:", error);

        const err = new Error("Failed to upload file to S3");
        err.statusCode = error.$metadata?.httpStatusCode || 500;
        throw err;
    }
}

async function getFileFromS3(fileKey) {
    const params = {
        Key:fileKey,
        Bucket:process.env.AWS_BUCKET
    }

    try {
        const file = await client.send(new GetObjectCommand(params))

        console.log(file, " File Return from S3")

        return {
            stream: file.Body,
            contentType: file.ContentType
        }

    } catch (error) {
        console.log(error, "error while getting file")
    }
}



export {
    uploadFileToS3,
    getFileFromS3
}