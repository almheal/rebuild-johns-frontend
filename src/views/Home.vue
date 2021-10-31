<template>
  <div class="home">
    <div class="container">
      <div class="home__inner">
        <HomeCategories
          class="home__categories"
          :loading="categoriesLoader"
          :categories="categories"
          @clickCategory="categoryHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategories from '@components/home/HomeCategories'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeCategories,
  },
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
      categoriesLoader: (state) => state.category.categoriesLoader,
    }),
  },
  methods: {
    categoryHandler(category) {
      console.log(category)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  &__inner {
    padding: 40px 0;
  }

  &__categories {
    @media (max-width: 769px) {
      display: none;
    }
  }
}
</style>
