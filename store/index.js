export const state = () => ({
  cacheVersion: ""
})

export const mutations = {
  setCacheVersion(state, version) {
    state.cacheVersion = version
  }
}

export const actions = {
  loadCacheVersion({ commit }) {
    return this.$storyapi.get(`cdn/spaces/me`).then(res => {
      commit("setCacheVersion", res.data.space.version)
    })
  }
}

export default {
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      let getProjects = await app.$storyapi.get("cdn/stories", {
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        starts_with: "projects/"
      })
      let projects = getProjects.data.stories.map(bp => {
        return {
          id: bp.uuid,
          slug: bp.slug,
          created_at: bp.created_at,
          taglist: bp.tag_list,
          content: bp.content
        }
      })
      commit("projects/update", projects)
    }
  }
}
