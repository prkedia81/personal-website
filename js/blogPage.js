function checkForBlog() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (blogId) {
        getBlog(blogId);
    } else {
        showMissingBlog();
    }
}

function getBlog(id) {
    const apiURL = "http://localhost:1337/api/blogs?populate=coverImage";
    const blogsReq = new Request(apiURL);

    fetch(blogsReq)
        .then((res) => res.json())
        .then((response) => {
            let blog = response.data[id - 1];
            if (blog == null) {
                return;
            } else {
                // Generate Blog Header
                document.getElementById('empty-state').classList.add('hidden');
                const blogHeader = document.getElementById("blog-header");
                blogHeader.appendChild(createBlogHeader(blog));

                // Generate Blog Content
                const blogBody = document.getElementById("blog-content");
                blogBody.appendChild(createBlogBody(blog));
                formatBlogBody(blogBody);
            }
        })
        .catch((err) => console.error(err));
}

function createBlogHeader(blog) {
    const cardClasses = [
        "flex-col",
        "flex",
        "md:flex-row",
        "items-center",
        "lg:px-24",
        "md:px-24",
        "px-6",
        "mt-12",
        "gap-12",
        "justify-around",
    ];
    const imgClasses = ["md:w-1/2", "aspect-video", "md:order-2", "rounded-xl"];
    const cardBodyClasses = [
        "order-2",
        "md:order-1",
        "md:w-1/3",
        "flex",
        "flex-col",
        "gap-3",
        "text-center",
        "md:text-start",
        "md:gap-6",
    ];
    const dateClasses = ["text-gray-500", "font-light", "text-xs", "md:text-sm"];
    const titleClasses = ["text-3xl", "md:text-5xl", "font-bold"];

    let card = document.createElement("div");
    card.classList.add(...cardClasses);

    let coverImage = document.createElement("img");
    coverImage.classList.add(...imgClasses);
    coverImage.src = `http://localhost:1337${blog.attributes.coverImage.data.attributes.formats.large.url}`;

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

    const cardBodyElements = [blogTitle, blogDate];
    cardBody.append(...cardBodyElements);
    card.append(cardBody, coverImage);

    return card;
}

function createBlogBody(blog) {
    // Ckeditor Blog Body Quote
    const divClasses = ['mt-6', 'md:mt-16', 'lg:px-44', 'md:px-44', 'px-6', 'leading-7', 'font-normal', 'text-base', 'flex', 'flex-col', 'gap-4'];
    const content = blog.attributes.contents;
    let htmlObject = document.createElement("div");
    htmlObject.classList.add(...divClasses);
    htmlObject.innerHTML = content;
    return htmlObject;

    // For editor.js -> parse through the json and convert to HTML
    // https://medium.com/@pavittarx/rendering-json-from-editor-js-to-html-bfb615ee78c4

    // For markdown -> parse markdown to convert to HTML

    // TO DO: Code, Images from Ckeditor and tables
}

function formatBlogBody(blogBody) {
    // const paragraphClasses = ["indent-16"];
    const paragraphClasses = [];
    const headingClasses = ["heading", "text-2xl", "mt-4", "font-extrabold"];
    const boldClasses = [];
    const linkClasses = ["underline", "font-medium", "text-indigo-700"];
    const subheadingClasses = ['subheading', 'font-semibold'];
    const orderedListClasses = ['list-decimal', 'px-12'];
    const unorderedListClasses = ['list-disc', 'px-12'];
    const codeClasses = ['p-3', 'bg-gray-50', 'rounded-md', 'text-sm'];
    const blockquoteClasses = ["relative", 'text-lg', 'mx-10', 'mt-8'];
    const blockquoteText = ['text-gray-800', 'italic', 'z-10', 'relative', 'font-light'];
    const figureClasses = ['image', 'flex', 'flex-col', 'gap-2', 'items-center', 'justify-center'];
    const imageClasses = [];
    const imageCaptionClasses = ['caption', 'text-xs', 'font-light'];

    const formatFunction = (query, classes) => {
        blogBody.querySelectorAll(query).forEach((ele) => {
            // Removes blank spaces from the code
            if (ele.innerHTML == '&nbsp;') {
                ele.classList.add('hidden');
            } else if (ele.parentElement.tagName == 'BLOCKQUOTE') {
                const svgElement =
                    `<svg class="absolute top-0 left-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-gray-100" width="16" height="16"
                    viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                        d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                        fill="currentColor" />
                    </svg>`
                const quotesSvg = document.createElement('div');
                quotesSvg.innerHTML = svgElement;

                let textDiv = document.createElement('p');
                textDiv.classList.add(...blockquoteText);
                textDiv.innerHTML = ele.innerHTML;

                const blockQuote = ele.parentElement
                ele.remove()
                blockQuote.append(quotesSvg, textDiv);
            } else if (ele.tagName === 'FIGURE') {
                children = ele.children;
                Object.entries(children).forEach((entry) => {
                    const [, child] = entry;
                    if (child.tagName === 'IMG') {
                        child.classList.add(...imageClasses);
                    } else if (child.tagName === 'FIGCAPTION') {
                        child.classList.add(...imageCaptionClasses);
                    }
                })
            }
            ele.classList.add(...classes);
        })
    };

    // headings:
    formatFunction('h1, h2, h3', headingClasses);

    // subheadings:
    formatFunction('h4, h5', subheadingClasses);

    // paragraph:
    formatFunction('p', paragraphClasses);

    // strong or bold:
    formatFunction('b, strong', boldClasses);

    // links:
    formatFunction('a', linkClasses);

    // ordered lists:
    formatFunction('ol', orderedListClasses);

    // unordered lists:
    formatFunction('ul', unorderedListClasses);

    // images:
    formatFunction('figure', figureClasses)

    // code:
    formatFunction('code', codeClasses);

    // blockquote:
    formatFunction('blockquote', blockquoteClasses);
}

function showMissingBlog() {
    document.getElementById('empty-state').classList.remove('hidden');
    return;
}

checkForBlog();
