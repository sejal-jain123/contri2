// const OPENAI_API_KEY = 'sk-CrFfctiwEoCSzaUPMorxT3BlbkFJ1unaQXB2hfCgyAfeYMstv'
// const OPENAI_API_KEY = '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';
const EDENAI_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTBkZjVkMDYtZTM5My00YzExLWIyZDMtYmYwYTQxNDc5MmZmIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.N3HUyZsoFk69og7kZfghcHGqUvSELArs6TBDvaKuASk'

const getApiResponse = async (text) => {
  
  /* const config = {
    url: 'https://api.openai.com/v1/images/generations',
    body: {
      prompt: text,
      n: 1,
      size: "512x512",
    },
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  } */
  
  const config = {
    url: 'https://api.edenai.run/v2/image/generation',
    body: {
      "response_as_dict": true,
      "attributes_as_list": false,
      "show_original_response": false,
      "resolution": "256x256",
      "num_images": 1,
      "text": text,
      "providers": "deepai"
    },
    headers: {
      'authorization': `Bearer ${EDENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }
  const response = await fetch(config.url, {
    mode: config.mode,
    method: config.method,
    headers: config.headers,
    body: JSON.stringify(config.body),
  }).then(res => res.json());
  console.log(44, response);
  const image_url = response.deepai.items[0].image_resource_url;
  console.log(46, image_url);
  return image_url;
}


document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const ip = document.querySelector("input");
  const img_data = await getApiResponse(ip.value);
  console.log(54, img_data);
  const img = document.querySelector("img");
  img.setAttribute("src", img_data);
})

document.querySelector("img").addEventListener("error", () => {
  const img = document.querySelector("img");
  const fallback_img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
  img.setAttribute("src", fallback_img_url);
})