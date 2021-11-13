<template>
  <header class="header">
    <div
      class="header"
      :class="{ 'is-fixed': headerIsFixed, 'is-show': headerIsShow }"
    >
      <div class="container">
        <div
          class="header__inner"
          :class="{ 'is-padding': !Object.keys(user).length }"
        >
          <router-link
            class="header__logo"
            to="/"
            :class="{ 'is-hidden': getRouteName === 'Home' && headerIsShow }"
          >
            <img
              class="header__img"
              src="../../assets/img/logo.svg"
              alt="logo"
            />
          </router-link>
          <HeaderCategories
            v-if="headerIsShow && getRouteName === 'Home' && !menuIsOpen"
            :categories="categoriesWithProducts"
            @clickCategory="setCategoryRefId($event._id)"
          />
          <div
            class="header__row row-center"
            :class="{ 'is-open': menuIsOpen }"
          >
            <div class="row-center wrapper-relative">
              <HeaderMenu
                v-if="menuIsOpen"
                :menuList="menuList"
                :buttonDisabled="Boolean(componentFormName)"
                :selectedLocaleTitle="currentLocale.title"
                :locales="locales"
                :userAvatar="user.img"
                :isUser="Boolean(Object.keys(user).length)"
                @clickButton="setComponentFormName(COMPONENT_FORM_NAMES.login)"
                @selectLanguage="selectLanguageHandler"
                @clickCross="toggleMenu"
                @clickLogout="logout"
              />

              <AppLanguage
                class="header__language"
                v-if="!menuIsOpen"
                :languages="locales"
                :selectedLanguageTitle="currentLocale.title"
                @selectLanguage="selectLanguageHandler"
              />
              <div class="header__forms" v-if="componentFormName">
                <AppToggleList
                  class="header__toggle"
                  :list="formToggleList"
                  :toShow="(item) => $t(item.title)"
                  :toActive="
                    (item) => item.componentFormName === componentFormName
                  "
                  :activeItem="componentFormName"
                  @toggleItem="setComponentFormName($event.componentFormName)"
                />
                <AppCross class="header__cross" @clickCross="toggleMenu" />
                <component
                  class="header__form"
                  :is="componentFormName"
                  @toRegistration="
                    setComponentFormName(COMPONENT_FORM_NAMES.registration)
                  "
                  @isSubmited="toggleMenu"
                />
              </div>
            </div>
            <AppBurgerButton
              class="header__burger"
              :class="{ 'is-hidden': headerIsShow && getRouteName === 'Home' }"
              :isCross="menuIsOpen"
              @clickButton="toggleMenu"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import { menuList } from './menuList'
import AppLanguage from '@elements/AppLanguage'
import AppBurgerButton from '@elements/AppBurgerButton'
import AppButton from '@elements/AppButton'
import AppCross from '@icons/CrossIcon'
import AppToggleList from '@elements/AppToggleList'
const HeaderMenu = defineAsyncComponent(() =>
  import(/*webpackChunkName: "headerMenu"*/ '@components/header/HeaderMenu')
)
const LoginForm = defineAsyncComponent(() =>
  import(/*webpackChunkName: "loginForm"*/ '@components/forms/LoginForm')
)
const RegistrationForm = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "registrationForm"*/ '@components/forms/RegistrationForm'
  )
)
const HeaderCategories = defineAsyncComponent(() =>
  import(
    /*webpackChunkName: "headerCategories"*/ '@components/header/HeaderCategories'
  )
)

export default {
  name: 'TheHeader',
  components: {
    AppLanguage,
    AppBurgerButton,
    AppButton,
    AppCross,
    AppToggleList,
    HeaderMenu,
    LoginForm,
    RegistrationForm,
    HeaderCategories,
  },
  data() {
    return {
      menuIsOpen: false,
      menuList,
      componentFormName: '',
      COMPONENT_FORM_NAMES: {
        registration: 'RegistrationForm',
        login: 'LoginForm',
      },
      headerIsShow: false,
      headerIsFixed: false,
    }
  },
  computed: {
    ...mapState({
      currentLocale: (state) => state.locale.currentLocale,
      locales: (state) => state.locale.locales,
      user: (state) => state.user.user,
      categories: (state) => state.category.categories,
      products: (state) => state.product.products,
    }),

    getRouteName() {
      return this.$route.name
    },

    categoriesWithProducts() {
      return this.categories.filter((category) =>
        this.products.some((product) => product.category._id === category._id)
      )
    },

    formToggleList() {
      return [
        {
          title: 'app.utils.login',
          componentFormName: this.COMPONENT_FORM_NAMES.login,
        },
        {
          title: 'app.login.registration',
          componentFormName: this.COMPONENT_FORM_NAMES.registration,
        },
      ]
    },
  },

  methods: {
    ...mapActions({
      changeLocale: 'locale/changeLocale',
      logout: 'user/logout',
    }),

    ...mapMutations({
      setCategoryRefId: 'category/SET_SCROLL_CATEGORY_ID',
    }),

    selectLanguageHandler(language) {
      this.changeLocale({ locale: language.title, languages: this.locales })
    },

    setComponentFormName(value) {
      this.componentFormName = value
    },

    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
      if (!this.menuIsOpen) {
        this.setComponentFormName('')
      }
    },

    scrollHandler(scrollPosition) {
      this.headerIsShow = scrollPosition >= 400
      this.headerIsFixed = scrollPosition >= 200
    },

    addScrollEvent() {
      let lastScrollPosition = 0
      let tick = false
      window.addEventListener(
        'scroll',
        () => {
          lastScrollPosition = window.scrollY
          if (!tick) {
            window.requestAnimationFrame(() => {
              this.scrollHandler(lastScrollPosition)
              tick = false
            })
            tick = true
          }
        },
        { passive: true }
      )
    },
  },

  mounted() {
    this.addScrollEvent()
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 50;
  height: 80px;
  background-color: $white-color;

  &.is-fixed {
    position: fixed;
    left: 0;
    top: -60px;
    right: 0;
    z-index: 1000;
    height: 60px;
    transition: top 0.3s;

    .header__img {
      width: 90px;
      height: 36px;
    }
  }

  &.is-show {
    top: 0;
    box-shadow: 0 2px 24px 0 rgba(83, 92, 90, 0.38);
    transition: top 0.3s;
  }

  &__inner {
    @include flex-space-center;
    height: 100%;
  }

  &__img {
    width: 115px;
    height: 47px;

    @media (max-width: 577px) {
      width: 90px;
      height: 37px;
    }
  }

  &__logo {
    &.is-hidden {
      @media (max-width: 993px) {
        display: none;
      }
    }
  }

  &__row {
    &.is-open {
      margin: 0 0 0 auto;
    }
  }

  &__language {
    @media (max-width: 769px) {
      display: none;
    }
  }

  &__burger {
    @media (max-width: 769px) {
      &.is-hidden {
        display: none;
      }
    }
  }

  &__forms {
    @include absolute-top-right(100%);
    z-index: 1000;
    width: 340px;

    @media (max-width: 769px) {
      @include fixed-full;
      background-color: $white-color;

      .header__form {
        box-shadow: initial;
      }
    }
  }

  &__toggle {
    display: none;
    margin-bottom: 32px;

    @media (max-width: 769px) {
      @include flex;
      padding-right: 47px;
    }
  }

  &__cross {
    @include absolute-top-right(24px, 24px);
    z-index: 10;

    @media (max-width: 769px) {
      top: 13px;
    }
  }
}
</style>
