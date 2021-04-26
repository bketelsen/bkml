import {ARTICLE_QUERY, ARTICLE_SLUGS_QUERY} from '@/lib/queries';

import Bleed from '@/components/mdx/bleed'
import Callout from '@/components/mdx/callout'
import PostContent from '@/components/PostContent';
import hydrate from 'next-mdx-remote/hydrate'
import { initializeApollo } from "@/lib/apolloClient";
import renderToString from 'next-mdx-remote/render-to-string'

const components = { Bleed,Callout }

function Post({ source, post }) {
  const content = hydrate(source,{components})
  return (
    <PostContent
      post={post}>{content}</PostContent>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const page = await
    apolloClient.query({
      query: ARTICLE_SLUGS_QUERY,
    });

  var articles = page.data.allArticles

  const paths = articles.map(({id}) => {
    return {
      params: { slug: id }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const page = await
    apolloClient.query({
      query: ARTICLE_QUERY,
      variables: {
        articleID: params.slug,
      }

    });

  var post = page.data.Article
  console.log(post)
  const mdxSource = await renderToString(post.body,{components})


  return {
    props: {
      source: mdxSource,
      post,
    },
    revalidate: 30, // In seconds
  }
}

export default Post;
