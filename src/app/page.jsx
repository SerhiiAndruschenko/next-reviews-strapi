import Link from "next/link";
import Heading from "@/src/components/Heading";
import { getPagedReviews, getPageCount, getReviews } from "@/lib/reviews";
import AnimatedElement from "@/src/components/AnimatedElement";
import Image from "next/image";
import HomeBanner from "../components/HomeBanner";
import { CMS_URL } from "@/lib/reviews";

// export const dynamic = 'force-dynamic';

function parsePageParams(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}

export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParams(searchParams.page);
  const reviews = await getReviews();
  const pageCount = await getPageCount();
  return (
    <>
      {page == 1 && (
          <HomeBanner />
        )}

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

      
      <div className="pagination">
        {page >= 2 && (
          <Link className="arrow" href={`/?page=${page - 1}`} title="prev-page">
            &laquo;
          </Link>
        )}
        {Array.from({ length: pageCount }, (_, index) => (
          <Link
            className={index + 1 == page ? "active" : ""}
            key={index + 1}
            href={`/?page=${index + 1}`}
            title={index + 1}
          >
            {index + 1}
          </Link>
        ))}
        {page !== pageCount && (
          <Link className="arrow" href={`/?page=${page + 1}`} title="next-page">
            &raquo;
          </Link>
        )}
      </div>
    </>
  );
}
