import path from 'path'
import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { paginate } from 'gatsby-awesome-pagination'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql<{
    posts: Pick<GatsbyTypes.Query['allMarkdownRemark'], 'edges'>
    tagsGroup: Pick<GatsbyTypes.Query['allMarkdownRemark'], 'group'>
  }>(`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const posts = result.data?.posts.edges

  paginate({
    createPage,
    items: posts,
    itemsPerPage: 10,
    pathPrefix: '/',
    component: path.resolve('src/templates/index.tsx'),
  })

  if (posts) {
    posts.forEach(({ node }) => {
      const slug = node.fields?.slug

      if (slug) {
        createPage({
          path: slug,
          component: path.resolve('src/templates/post.tsx'),
          context: {
            slug: slug,
          },
        })
      }
    })
  }

  const tags = result.data?.tagsGroup.group

  if (tags) {
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${tag.fieldValue}/`,
        component: path.resolve('./src/templates/tagPosts.tsx'),
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  }
}
