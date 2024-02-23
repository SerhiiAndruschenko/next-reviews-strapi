import Link from "next/link";
import Heading from "@/src/components/Heading";
import { getAuthorReviews, getAuthorBySlug } from "@/lib/reviews";
import AnimatedElement from "@/src/components/AnimatedElement";
import Image from "next/image";
import { marked } from "marked";
import { CMS_URL } from "@/lib/reviews";

// export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug } }) {
  const author = await getAuthorBySlug(slug);
  return {
    title: author.attributes.Title,
  };
}

export default async function AuthorPage({ params: { slug } }) {
  const reviews = await getAuthorReviews(slug);
  const author = await getAuthorBySlug(slug);
  const bio = marked(author.attributes.Bio);
  return (
    <>
      <AnimatedElement>
        <div className="author-heading">
          <img src={`${CMS_URL}${author.attributes.Image.data.attributes.url}`}></img>
          <div className="author-info">
            <Heading>{author.attributes.Title}</Heading>

            <div
              className="font-gentium text-left"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement>
        <h2 className="section-title font-bold text-2xl mb-4 font-gentium">Author's Bookshelf: Reviews</h2>
      </AnimatedElement>

      <ul className="flex flex-col gap-4">
        {reviews.map((review) => (
          <li key={review.attributes.slug}>
            
          <AnimatedElement> 
            <Link
              className="flex flex-col items-center sm:flex-row post-card border rounded bg-slate-200 hover:shadow-lg"
              href={`/reviews/${review.attributes.slug}`}
              title={review.attributes.Title} 
            >
              <div className="post-card__image" style={{backgroundImage: `url(${CMS_URL}${review.attributes.Image.data.attributes.url}`}}></div>
              <div className="post-card__content">
                <p className="font-gentium text-left mb-2">
                  {review.attributes.author.data.attributes.Title}
                </p>

                <h2 className="font-gentium text-left">{review.attributes.Title}</h2>
                <div
                  className="font-gentium text-left"
                >
                  {review.attributes.excerpt}
                </div>
              </div>
            </Link>
          </AnimatedElement>
        </li>
        ))}
      </ul>
    </>
  );
}
