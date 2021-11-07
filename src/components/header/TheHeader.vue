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
          <router-link class="header__logo" to="/">
            <img
              class="header__img"
              src="../../assets/img/logo.svg"
              alt="logo"
            />
          </router-link>
          <div class="row-center">
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
                @clickLogout="logoutHandler"
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
            <AppBurgerButton :isCross="menuIsOpen" @clickButton="toggleMenu" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
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
    }),
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

    logoutHandler() {
      if (this.$route?.meta?.auth) {
        this.$router.push('/')
      }
      this.logout()
    },

    scrollHandler(scrollPosition) {
      this.headerIsShow = scrollPosition >= 400 ? true : false
      this.headerIsFixed = scrollPosition >= 200 ? true : false
    },

    addScrollEvent() {
      let lastScrollPosition = 0
      let tick = false
      window.addEventListener('scroll', () => {
        lastScrollPosition = window.scrollY
        if (!tick) {
          window.requestAnimationFrame(() => {
            this.scrollHandler(lastScrollPosition)
            tick = false
          })
          tick = true
        }
      })
    },
  },

  mounted() {
    this.addScrollEvent()
  },
}
</script>

<style lang="scss" scoped>
.header {
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
    padding: 5px 0;

    &.is-padding {
      padding: 15px 0;
    }
  }

  &__img {
    width: 115px;
    height: 47px;

    @media (max-width: 577px) {
      width: 90px;
      height: 37px;
    }
  }

  &__language {
    @media (max-width: 769px) {
      display: none;
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
