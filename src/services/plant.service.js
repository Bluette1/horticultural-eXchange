import { fileChecksum } from '../utils/checksum';
import { httpProtocol, host, port } from '../env.variables';

const BASE_URL = `${httpProtocol}://${host}:${port}`;
const PLANTS_API_ENDPOINT = `${BASE_URL}/api/plants`;
const PRESIGNED_URL_API_ENDPOINT = `${BASE_URL}/presigned_url`;

const createPresignedUrl = async(file, byte_size, checksum) => {
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: {
        filename: file.name,
        byte_size: byte_size,
        checksum: checksum,
        content_type: 'image/jpeg',
      }
    })
  }
  let res = await fetch(PRESIGNED_URL_API_ENDPOINT, options)
  if (res.status !== 200) return res
  return await res.json()
}

export const createPlant = async(plantInfo) => {
  const {image, name, category, price} = plantInfo

  // To upload image file to S3, we need to do three steps:
  // 1) request a pre-signed PUT request (for S3) from the backend

  const checksum = await fileChecksum(image)
  const presignedFileParams = await createPresignedUrl(image, image.size, checksum)
  console.log(presignedFileParams)
  // 2) send file to said PUT request (to S3)
  const s3PutOptions = {
    method: 'PUT',
    headers: presignedFileParams.direct_upload.headers,
    body: image,
  }
  const presigned_url = presignedFileParams.direct_upload.url;
  let awsRes = await fetch(presigned_url, s3PutOptions)
  if (awsRes.status !== 200) return awsRes

  // 3) confirm & create plant with backend
  let plantsPostOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({plant: {
      name,
      category,
      price,
      image: presignedFileParams.blob_signed_id,
    }})
  }
  let res = await fetch(PLANTS_API_ENDPOINT, plantsPostOptions)
  if (res.status !== 200) return res 
  return await res.json()
}