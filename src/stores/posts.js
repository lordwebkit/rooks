import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
export const usePostsStore = defineStore('posts', () => {
  const posts = ref()
  const isLoadingPosts = ref(false)
  const users = ref()
  const filterUser = ref('')

  const fetchPosts = async () => {
    isLoadingPosts.value = true

    try {
      const { data } = await axios.get(postsUrl)
      posts.value = data
      isLoadingPosts.value = false
    } catch (e) {
      isLoadingPosts.value = false
      console.error(e)
    }
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(postsUrl)
      users.value = data

      const userIdToTitle = {}
      users.value.forEach((user) => {
        userIdToTitle[user.id] = user.title
      })

      posts.value.forEach((post) => {
        post.author = userIdToTitle[post.userId]
      })
    } catch (e) {
      console.error(e)
    }
  }

  const filteredPosts = computed(() => {
    if (filterUser.value === '') {
      return posts.value
    } else {
      const matchedUsers = users.value.filter((user) =>
        user.title.toLowerCase().includes(filterUser.value.toLowerCase())
      )

      if (matchedUsers.length > 0) {
        const result = []

        matchedUsers.forEach((matchedUser) => {
          const userPosts = posts.value.filter((post) => post.userId === matchedUser.id)
          result.push(...userPosts)
        })

        return result
      } else {
        return []
      }
    }
  })

  return { fetchPosts, fetchUsers, filterUser, filteredPosts, isLoadingPosts }
})
