import React from 'react'
function imageURL(name) {
  return process.env.NEXT_PUBLIC_API_URL + name;
}
const Image = (
  {
    source,
  }
) => {
  return (
    <img className="rounded-xl object-cover object-center w-full py-2"  src={imageURL(source)} />

  )
};

// https://www.notion.so/Callout-blocks-5b2638247b54447eb2e21145f97194b0
export default Image;
