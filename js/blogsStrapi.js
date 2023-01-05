function fetchStrapiBlogs() {
  const apiURL = "https://blog.prannaykedia.com/api/blogs?populate=coverImage";
  const blogsReq = new Request(apiURL);

  fetch(blogsReq)
    .then((res) => res.json())
    .then((response) => {
      let blogs = response.data;
      if (blogs.length == 0) {
        document.getElementById("empty-state").classList.remove("hidden");
        return;
      }
      document.getElementById("empty-state").classList.add("hidden");
      let latestBlog = blogs[blogs.length - 1];
      let blogList = document.getElementById("blogs");
      blogs.forEach((blog) => {
        if (blog === latestBlog) {
          // make latest blog card
          document
            .getElementById("latest-blog")
            .appendChild(createLatestBlog(blog));
        } else {
          // make old blog cards
          blogList.appendChild(createBlogCard(blog));
        }
      });
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("empty-state").classList.remove("hidden");
    });
}

function createBlogCard(blog) {
  const cardClasses = ["flex", "flex-col", "gap-4"];
  const imgClasses = [
    "aspect-video",
    "h-auto",
    "w-76",
    "rounded-xl",
    "card",
    "hover:shadow-xl",
  ];
  const cardBodyClasses = ["pl-1", "text-center", "md:text-start"];
  const dateClasses = [
    "text-gray-500",
    "font-normal",
    "md:font-medium",
    "text-xs",
  ];
  const titleClasses = ["text-xl", "font-bold", "pt-2"];
  const descClasses = ["font-light", "text-xs", "pt-1"];

  let card = document.createElement("a");
  card.href = `/blog.html?id=${blog.id}`;
  card.classList.add(...cardClasses);

  let coverImage = document.createElement("img");
  coverImage.classList.add(...imgClasses);
  coverImage.src = blog.attributes.coverImage.data.attributes.url;

  let cardBody = document.createElement("div");
  cardBody.classList.add(...cardBodyClasses);

  let blogDate = document.createElement("p");
  blogDate.classList.add(...dateClasses);
  blogDate.innerHTML = new Date(blog.attributes.createdAt).toLocaleDateString(
    undefined,
    (options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
  );

  let blogTitle = document.createElement("h2");
  blogTitle.classList.add(...titleClasses);
  blogTitle.innerHTML = blog.attributes.title;

  let blogDescription = document.createElement("p");
  blogDescription.classList.add(...descClasses);
  blogDescription.innerHTML = blog.attributes.description;

  const cardBodyElements = [blogDate, blogTitle, blogDescription];
  cardBody.append(...cardBodyElements);
  card.append(coverImage, cardBody);

  return card;
}

function createLatestBlog(blog) {
  const cardClasses = [
    "flex",
    "flex-col",
    "md:flex-row",
    "items-center",
    "lg:px-24",
    "md:px-24",
    "px-6",
    "mt-12",
    "md:mt-20",
    "gap-3",
    "md:gap-12",
  ];
  const imgClasses = [
    "rounded-xl",
    "aspect-video",
    "h-auto",
    "md:w-1/2",
    "hover:shadow-xl",
  ];
  const cardBodyClasses = [
    "md:w-1/2",
    "flex",
    "flex-col",
    "text-center",
    "md:text-start",
    "gap-2",
    "md:gap-6",
  ];
  const dateClasses = [
    "text-gray-500",
    "text-xs",
    "font-normal",
    "md:font-medium",
    "md:text-sm",
  ];
  const titleClasses = ["text-xl", "md:text-4xl", "font-bold"];
  const descClasses = [
    "font-light",
    "text-xs",
    "text-clip",
    "overflow-hidden",
    "max-h-24",
    "md:max-h-fit",
    "md:text-base",
  ];

  let card = document.createElement("a");
  card.href = `/blog.html?id=${blog.id}`;
  card.classList.add(...cardClasses);

  let coverImage = document.createElement("img");
  coverImage.classList.add(...imgClasses);
  coverImage.src = blog.attributes.coverImage.data.attributes.url;

  let cardBody = document.createElement("div");
  cardBody.classList.add(...cardBodyClasses);

  let blogDate = document.createElement("p");
  blogDate.classList.add(...dateClasses);
  blogDate.innerHTML = new Date(blog.attributes.createdAt).toLocaleDateString(
    undefined,
    (options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
  );

  let blogTitle = document.createElement("h2");
  blogTitle.classList.add(...titleClasses);
  blogTitle.innerHTML = blog.attributes.title;

  let blogDescription = document.createElement("p");
  blogDescription.classList.add(...descClasses);
  blogDescription.innerHTML = blog.attributes.description;

  const cardBodyElements = [blogDate, blogTitle, blogDescription];
  cardBody.append(...cardBodyElements);
  card.append(coverImage, cardBody);

  return card;
}

fetchStrapiBlogs();
