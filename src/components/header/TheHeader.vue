<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link class="header__logo" to="/">
          <img class="header__img" src="../../assets/img/logo.svg" alt="logo" />
        </router-link>
        <div class="row-center">
          <template v-if="menuIsOpen">
            <AppMenu :menu="menuList" />
            <AppButton
              class="header__button"
              font="gotham"
              view="transparent"
              textTransform="uppercase"
              >{{ $t('app.utils.login') }}</AppButton
            >
          </template>
          <AppLanguage
            v-if="!menuIsOpen"
            :languages="locales"
            :selectedLanguageTitle="currentLocale.title"
            @selectLanguage="selectLanguageHandler"
          />
          <AppBurgerButton
            :isCross="menuIsOpen"
            @clickButton="menuIsOpen = !menuIsOpen"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { menuList } from './menuList'
import AppLanguage from '@elements/AppLanguage'
import AppBurgerButton from '@elements/AppBurgerButton'
import AppButton from '@elements/AppButton'
import { mapState, mapActions } from 'vuex'
const AppMenu = defineAsyncComponent(() =>
  import(/*webpackChunkName: "appMenu"*/ '@elements/AppMenu')
)

export default {
  name: 'TheHeader',
  components: {
    AppLanguage,
    AppBurgerButton,
    AppButton,
    AppMenu,
  },
  data() {
    return {
      menuIsOpen: false,
      menuList,
    }
  },
  computed: {
    ...mapState({
      currentLocale: (state) => state.locale.currentLocale,
      locales: (state) => state.locale.locales,
    }),
  },
  methods: {
    ...mapActions({
      changeLocale: 'locale/changeLocale',
    }),
    selectLanguageHandler(language) {
      this.changeLocale({ locale: language.title, languages: this.locales })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  background-color: $white-color;

  &__inner {
    @include flex-justify-space;
    padding: 15px 0;
  }

  &__img {
    width: 115px;
    height: 47px;
  }

  &__button {
    margin: 0 16px;
  }
}
</style>
