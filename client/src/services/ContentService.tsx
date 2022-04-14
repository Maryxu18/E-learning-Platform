export async function getVideosByTag(selectedTag) {
  let URL;
  if (selectedTag === "All") {
    URL = "http://localhost:3000/education/post";
  } else {
    URL = "http://localhost:3000/education/post/tag/".concat(selectedTag);
  }
  const response = await fetch(URL);
  if (response.status === 200 || response.status === 201) {
    const data = await response.json();
    // filter by embed only
    return filterURL(data.data);
  } else {
    alert("An error occurred. Please try again later");
  }
}

export function filterURL(postList) {
  const videos = [];
  for (let i = 0; i < postList.length; i++) {
    if (postList[i].contentType === "EMBED") {
      if (postList[i].content.URL) {
        //   alert();
        //   alert(postList[i].description);
        const index = postList[i].content.URL.indexOf("=");
        videos.push({
          URL: postList[i].content.URL.substring(index + 1),
          title: postList[i].title,
          description: postList[i].description,
        });
      }
    }
  }
  return videos;
}
