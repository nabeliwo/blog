declare module 'gatsby-awesome-pagination' {
  namespace GatsbyAwesomePagination {
    function paginate(data: {
      createPage: any
      items?: readonly any[]
      itemsPerPage: number
      pathPrefix: string
      component: string
    }): void
  }

  export = GatsbyAwesomePagination
}
