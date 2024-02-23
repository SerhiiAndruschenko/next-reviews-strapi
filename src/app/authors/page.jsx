import { getAuthors } from "@/lib/reviews";
import Heading from "@/src/components/Heading";
import '@/public/styles/authors.scss';
import AnimatedElement from "@/src/components/AnimatedElement";
import Link from "next/link";
import { CMS_URL } from "@/lib/reviews";

export default async function Authors() {
    const authors = await getAuthors();

    return (
        <>
            <div className="authors-page">
                <Heading>Authors</Heading>

                <div className="authors-row">
                    {authors.map((author) => (
                        <AnimatedElement>
                            {console.log(author)}  
                            <Link className="flex flex-col items-center border rounded bg-slate-200 hover:shadow-lg" href={`/authors/${author.attributes.slug}`} key={author.attributes.slug}>
                                <img src={`${CMS_URL}${author.attributes.Image.data.attributes.url}`}></img>
                                <span>{author.attributes.Title}</span>
                            </Link>
                        </AnimatedElement>
                    ))}
                </div>

            </div>
        </>
    );
}