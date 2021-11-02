<template>
  <div class="constructor">
    <div class="container">
      <div class="constructor__inner">
        <div class="constructor__body">
          <div class="constructor__column">
            <ConstructorProduct
              :placeholder="product.title ? $t(product.title) : ''"
              :img="product.img"
              :varieties="varieties"
              :sizes="constructorProduct.activeVariety.sizes"
              :activeVariety="constructorProduct.activeVariety"
              v-model:title="constructorProduct.title"
              v-model:activeSize="constructorProduct.activeSize"
              @update:activeVariety="defaultVarietyAndSize($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConstructorProduct from '@components/constructor/ConstructorProduct'
import { DEFAULT_PIZZA_OPTIONS } from '@const'
import { mapState } from 'vuex'

export default {
  name: 'Constructor',
  components: {
    ConstructorProduct,
  },
  data() {
    return {
      constructorProduct: {
        title: '',
        activeVariety: {
          variety: '',
          sizes: [],
        },
        activeSize: {},
      },
    }
  },
  computed: {
    ...mapState({
      product: (state) => state.product.product,
    }),

    varieties() {
      return Object.keys(this.product).length
        ? this.product.options
        : DEFAULT_PIZZA_OPTIONS
    },
  },

  methods: {
    defaultVarietyAndSize(option) {
      this.constructorProduct.activeVariety = option
      this.constructorProduct.activeSize = option.sizes[0]
    },
  },

  mounted() {
    this.defaultVarietyAndSize(
      Object.keys(this.product).length
        ? this.product.options[0]
        : DEFAULT_PIZZA_OPTIONS[0]
    )
    console.log(this.constructorProduct)
  },
}
</script>

<style lang="scss" scoped>
.constructor {
  &__inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0;
  }

  &__body {
    background-color: $white-color;
    padding: 50px 64px;
    border-radius: 10px;
  }

  &__column {
    width: 325px;
  }
}
</style>
