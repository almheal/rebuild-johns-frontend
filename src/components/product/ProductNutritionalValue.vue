<template>
  <div class="nutritional-value" @click="openPoppup">
    <AppPoppup
      v-if="poppupIsShow"
      width="248"
      :title="`${$t('app.nutritionalValue.title')} 100 ${$t(
        'app.sizes.units.g'
      )}`"
      :list="nutritionalValueForTemplate"
    />
    <InfoIcon class="nutritional-value__icon" />
  </div>
</template>

<script>
import InfoIcon from '@icons/InfoIcon'
import AppPoppup from '@elements/AppPoppup'
import { eventClickDocument } from '@utils'

export default {
  name: 'ProductNutritionalValue',
  components: {
    InfoIcon,
    AppPoppup,
  },
  props: {
    nutritionalValue: {
      type: Object,
      default: () => {},
    },
    persons: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    poppupIsShow: false,
  }),

  computed: {
    nutritionalValueForTemplate() {
      const text = {
        persons: this.$t('app.numberPersons.title'),
        proteins: this.$t('app.nutritionalValue.proteins'),
        fats: this.$t('app.nutritionalValue.fats'),
        carbohydrates: this.$t('app.nutritionalValue.carbohydrates'),
        energyValue: this.$t('app.nutritionalValue.energyValue'),
        weight: this.$t('app.nutritionalValue.weight'),
      }

      return Object.keys(this.nutritionalValue).reduce((acc, key) => {
        if (this.nutritionalValue[key]) {
          acc.push(`${text[key]} — ${this.nutritionalValue[key]}`)
        }
        return acc
      }, [])
    },
  },
  methods: {
    openPoppup() {
      eventClickDocument(() => {
        this.poppupIsShow = !this.poppupIsShow
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.nutritional-value {
  position: relative;
  cursor: pointer;

  &:hover {
    .nutritional-value__icon {
      color: $brown-color;
    }
  }

  &__icon {
    transition: color 0.2s;
  }
}
</style>
