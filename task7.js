async function loadAndProcessPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }

    const data = await response.json();

    const firstTenPosts = data.slice(0, 10);

    const processedPosts = firstTenPosts.map((post) => {
      return {
        postId: post.id,
        userId: post.userId,
        title: post.title,
        shortBody: post.body.slice(0, 40),
        titleLength: post.title.length
      };
    });

    return processedPosts;
  } catch (error) {
    console.log("Ошибка при загрузке постов:", error.message);
    return [];
  }
}

loadAndProcessPosts().then((result) => {
  console.log("Обработанные посты:");
  console.log(result);
});