<script setup>
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
const fetchContent = async () => {
  await store.fetchPosts()
  await store.fetchUsers()
}

fetchContent()
</script>

<template>
  <div class="page py-6 px-3">
    <header class="header">
      <div class="container mx-auto">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Author"
            aria-label="Author"
            aria-describedby="basic-addon1"
            v-model="store.filterUser"
          />
        </div>
      </div>
    </header>
    <main class="hero">
      <div class="container mx-auto" v-show="!store.isLoadingPosts">
        <div class="cards">
          <div class="cards__item card" v-for="card in store.filteredPosts" :key="card.id">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">
                {{ card.body }}
              </p>
            </div>
            <div class="card__footer card-footer text-body-secondary">
              Author: {{ card.author }}
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="preloader container mx-auto" v-show="store.isLoadingPosts">
      <div class="preloader__spinner spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div
      class="empty-cards container mx-auto"
      v-show="!store.isLoadingPosts && !store.filteredPosts && store.filterUser"
    >
      <div class="alert alert-warning" role="alert">
        {{ store.filterUser }} не был найден, пожалуйста проверьте правильность искомого автора
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  z-index: 100;

  @media (max-width: 575px) {
    padding: 0 16px;
  }
}

.page {
  background-color: rgb(238, 238, 238);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}

.hero {
  height: 100%;
}

.cards {
  columns: 4;
  column-gap: 20px;

  @media (max-width: 991px) {
    columns: 3;
  }

  @media (max-width: 767px) {
    columns: 2;
  }

  @media (max-width: 575px) {
    column-gap: 10px;
  }

  @media (max-width: 425px) {
    columns: 1;
  }

  &__item {
    width: 100%;
    margin-bottom: 20px;
    break-inside: avoid-column;

    @media (max-width: 575px) {
      margin-bottom: 10px;
    }
  }
}

.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  &__spinner {
    width: 50px;
    height: 50px;

    &--min {
      width: 20px;
      height: 20px;
    }
  }
}

.empty-cards {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
