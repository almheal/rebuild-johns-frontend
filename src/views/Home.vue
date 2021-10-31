<template>
  <div class="home">
    <div class="container">
      <div class="home__inner">
        <HomeCategories
          class="home__categories"
          :categories="categories"
          @clickCategory="categoryHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategories from '@components/home/HomeCategories'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeCategories,
  },
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
    }),
  },
  methods: {
    ...mapActions({
      fetchCategories: 'category/fetchCategories',
    }),
    categoryHandler(category) {
      console.log(category)
    },
  },
  mounted() {
    this.fetchCategories()
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
