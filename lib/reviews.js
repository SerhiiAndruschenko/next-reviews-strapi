import qs from 'qs';


export const CMS_URL = process.env.CMS_URL;

export const CACHE_TAG_REVIEWS = 'reviews';

const API_URL = `${CMS_URL}/api`;

const REVIEWS_URL = `${CMS_URL}/api/reviews?` + qs.stringify({
    fields: ['slug', 'Title', 'content', 'excerpt', 'publishedAt'],
    populate: {Image: {fields: ['url']}, author: {fields: ['slug', 'Title']}}
});

const AUTHORS_URL = `${CMS_URL}/api/authors?` + qs.stringify({
    fields: ['slug', 'Title', 'Bio'],
    populate: {Image: {fields: ['url']}}
});

export async function getSlugs() {
    const response = await fetch(`${API_URL}/reviews?populate=*`, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    const data = await response.json();

    if (!Array.isArray(data.data)) {
        throw new Error("Unable to fetch slugs from WordPress API");
    }

    return data.data.map(review => review.slug);
}

export async function getReview(slug) {
    const reviews = await getReviews();
    //console.log(reviews);
    const review = reviews.find((review) => review.attributes.slug === slug);
    return review;
}
 
export async function getReviews() {
    const response = await fetch(`${REVIEWS_URL}`, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    const data = await response.json();
    //console.log(data.data);
    const reviews = data.data.sort((a, b) => new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime());
    return reviews;
}

export async function getPageCount() {
    const reviews = await getReviews();
    const pageCount = Math.ceil(reviews.length / 7);
    return pageCount; 
}

export async function getPagedReviews(pageNumber, perPage = 7) {

    const REVIEWS_PER_PAGE_URL = `${CMS_URL}/api/reviews?` + qs.stringify({
        fields: ['slug', 'Title', 'content', 'excerpt', 'publishedAt'],
        populate: {Image: {fields: ['url']}, author: {fields: ['slug', 'Title']}},
        pagination: { page: pageNumber, pageSize: perPage},
        sort: ['publishedAt:desc']
    });

    const response = await fetch(`${REVIEWS_PER_PAGE_URL}`, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    const data = await response.json();
   // console.log(REVIEWS_PER_PAGE_URL);
    
    const reviews = data.data.sort((a, b) => new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime());
    return reviews;
}

export async function getAuthorReviews(slug) {
    const reviews = await getReviews();
    
    const authorReviews = reviews.filter(review => review.attributes.author.data.attributes.slug === slug);
    const sortedReviews = authorReviews.sort((a, b) => new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime());
    return sortedReviews;
} 
 
export async function getAuthorBySlug(slug) {
    const authors = await getAuthors();
    //console.log(authors);
    const author = authors.find(author => author.attributes.slug === slug);
    return author ? author : null;
}

export async function getAuthors() {
    const response = await fetch(`${AUTHORS_URL}`, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    const data = await response.json();
    
    const authors = data.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return authors;
}