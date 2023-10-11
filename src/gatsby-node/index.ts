import path from 'path'

import { GatsbyNode } from 'gatsby'
import { paginate } from 'gatsby-awesome-pagination'
import { createFilePath } from 'gatsby-source-filesystem'

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
    {
      posts: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
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
    posts.forEach(({ node }, index) => {
      const slug = node.fields?.slug
      const next = index === 0 ? null : posts[index - 1].node
      const previous = index === posts.length - 1 ? null : posts[index + 1].node

      if (slug) {
        createPage({
          path: slug,
          component: path.resolve('src/templates/post.tsx'),
          context: {
            slug,
            next,
            previous,
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
