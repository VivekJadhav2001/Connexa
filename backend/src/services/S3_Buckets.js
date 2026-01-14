import {S3Client} from "@aws-sdk/client-s3"

export const client = new S3Client({
    region
})


function uploadFileToS3(fileBuffer, fileName, mimeType) {
    
}

function getFileFromS3(fileKey) {}



export {
    uploadFileToS3,
    getFileFromS3
}