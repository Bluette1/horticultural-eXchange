import { fileChecksum } from "../utils/checksum";
import { httpProtocol, host, port } from "../env.variables";
import authHeader from "./auth-header";

const parser = require("fast-xml-parser");
const BASE_URL = `${httpProtocol}://${host}:${port}`;
const PLANTS_API_ENDPOINT = `${BASE_URL}/api/plants`;
const PRESIGNED_URL_API_ENDPOINT = `${BASE_URL}/presigned_url`;

const createPresignedUrl = async (file, byte_size, checksum) => {
  let options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({
      file: {
        filename: file.name,
        byte_size: byte_size,
        checksum: checksum,
        content_type: file.type,
      },
    }),
  };
  let res = await fetch(PRESIGNED_URL_API_ENDPOINT, options);
  if (res.status !== 200) return res;
  return await res.json();
};


const uploadImage = async(image) => {
  const checksum = await fileChecksum(image);
  const presignedFileParams = await createPresignedUrl(
    image,
    image.size,
    checksum
  );
  // 2) send file to said POST request (to S3)
  const formData = new FormData();

  const fields = presignedFileParams.url_fields;
  const keys = Object.keys(fields);
  for (let index = 0; index < keys.length; index++) {
    formData.append([keys[index]], fields[keys[index]]);
  }
  formData.append("file", image);
  const s3PutOptions = {
    method: "POST",
    body: formData,
  };
  const presigned_url = presignedFileParams.url;
  let awsRes = await fetch(presigned_url, s3PutOptions);
  return awsRes;
};

export const createPlant = async (plantInfo) => {
  const { image, name, category, price } = plantInfo;

  // To upload image file to S3, we need to do three steps:
  // 1) request a pre-signed POST request (for S3) from the backend
  let image_url;
  if (image) {
    const awsRes = await uploadImage(image);
    if (awsRes.status !== 201) return awsRes;
    const body = await awsRes.text();
    const jsonObj = parser.parse(body);
    image_url = jsonObj.PostResponse.Location;
  }

  // 3) confirm & create plant with backend
  let plantsPostOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({
      plant: {
        name,
        category,
        price,
        image_url,
      },
    }),
  };
  let res = await fetch(PLANTS_API_ENDPOINT, plantsPostOptions);
  if (res.status !== 200) return res;
  return await res.json();
};

export const updatePlant = async (id, plantInfo) => {
  const { image, name, category, price, description, common_name, in_stock } = plantInfo;

  // To upload image file to S3, we need to do three steps:
  // 1) request a pre-signed POST request (for S3) from the backend
  let image_url;
  if (image) {
    const awsRes = await uploadImage(image);
    if (awsRes.status !== 201) return awsRes;
    const body = await awsRes.text();
    const jsonObj = parser.parse(body);
    image_url = jsonObj.PostResponse.Location;
  }

  // 3) confirm & create plant with backend
  let plantsPostOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({
      plant: {
        name,
        category,
        price,
        description,
        common_name,
        in_stock,
        image_url,
      },
    }),
  };
  let res = await fetch(`${PLANTS_API_ENDPOINT}/${id}`, plantsPostOptions);
  if (res.status !== 200) return res;
  return await res.json();
};
