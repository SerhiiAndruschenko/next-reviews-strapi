import Heading from "@/src/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/src/components/ShareLinkButton";
import Link from "next/link";
import AnimatedElement from "@/src/components/AnimatedElement";
import { marked } from "marked";
import { CMS_URL } from "@/lib/reviews";

// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  return {
    title: review.attributes.Title,
  }; 
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  
  const content = marked(review.attributes.content);
  return (
    <>
      <div className="article-head flex flex-col gap-x-9 justify-between items-center mb-9 sm:flex-row">
        <div className="mb-4 rounded w-full sm:w-4/12">
          <AnimatedElement>
            <img
              width={484}
              height={312}
              alt={review.attributes.Title}
              src={`${CMS_URL}${review.attributes.Image.data.attributes.url}`}
            />
          </AnimatedElement>
        </div>
        <div className="w-full sm:w-8/12">
          <AnimatedElement>
            <Link
              className="font-gentium"
              href={`/authors/${review.attributes.author.data.attributes.slug}`}
            >
              {review.attributes.author.data.attributes.Title}
            </Link>
          </AnimatedElement>

          <Heading>{review.attributes.Title}</Heading>
          <AnimatedElement>
            <ShareLinkButton />
          </AnimatedElement>
        </div>
      </div>

      <AnimatedElement>
        <article
          dangerouslySetInnerHTML={{ __html: content }}
          className="w-full font-gentium prose prose-slate max-w-none"
        />
      </AnimatedElement>
    </>
  );
}
