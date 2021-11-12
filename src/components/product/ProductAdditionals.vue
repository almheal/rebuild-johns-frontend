<template>
  <div class="product-additionals">
    <div class="product-additionals__tags" v-if="tags.length">
      <div
        class="product-additionals__tag"
        v-for="tag in tags"
        :style="{ backgroundColor: tag.backgroundColor }"
        :key="tag.title"
      >
        {{ tag.title }}
      </div>
    </div>

    <div class="product-additionals__row row-center">
      <div class="product-additionals__features" v-if="features.length">
        <div
          class="product-additionals__icon"
          v-for="feature in features"
          :key="feature.title"
        >
          <img v-lazy="feature.icon" alt="feature-img" />
          <AppPoppup
            class="product-additionals__poppup"
            :list="[$t(feature.title)]"
          />
        </div>
      </div>

      <div class="product-additionals__persons" v-if="persons">
        <div class="row-center">
          <div class="product-additionals__icon">
            <PersonsIcon />
            <AppPoppup
              class="product-additionals__poppup"
              :list="[$t('app.numberPersons.title')]"
              width="160"
            />
          </div>

          <span>{{ persons }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonsIcon from '@icons/PersonsIcon'
import AppPoppup from '@elements/AppPoppup'

export default {
  name: 'ProductAdditionals',
  components: {
    PersonsIcon,
    AppPoppup,
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    features: {
      type: Array,
      default: () => [],
    },
    persons: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.product-additionals {
  @include flex-justify-align(space-between, flex-end);
  padding-right: 24px;
  height: 20px;

  &__tag {
    @include flex-align(center);
    position: relative;
    padding: 0 12px;
    height: 20px;
    font-family: $gotham-font;
    font-size: 12px;
    font-weight: 700;
    color: $white-color;
    margin-bottom: 3px;

    &:last-child {
      margin-bottom: 0;
    }

    &::after {
      content: '';
      @include absolute-top-right(0, 0);
      width: 0;
      height: 0;
      border-color: transparent $white-color transparent transparent;
      border-style: solid;
      border-width: 10px 4px 10px 0;
    }
  }

  &__poppup {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.3s, opacity 0.2s;
    transition-delay: 0.3s, 0s;
  }

  &__row {
    width: 100%;
    justify-content: flex-end;
  }

  &__features {
    @include flex;
  }

  &__icon {
    position: relative;
    width: 16px;
    height: 16px;

    &:hover {
      .product-additionals__poppup {
        opacity: 1;
        visibility: visible;
        transition: visibility 0s, opacity 0.2s;
        transition-delay: 0s;
      }
    }
  }

  &__persons {
    margin-left: 10px;

    span {
      margin-left: 5px;
    }
  }
}
</style>
