<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__row">
          <AppMenu
            class="footer__menu"
            v-for="(menu, index) in footerMenu"
            direction="column"
            :key="index"
            :menu="menu"
          />
        </div>
        <div class="footer_bottom">
          <div class="footer__column">
            <ul class="footer__list">
              <li class="footer__text">
                {{ $t('app.footer.copyRight') }}
              </li>
              <li class="footer__text">
                {{ $t('app.footer.address') }}
              </li>
              <li class="footer__text">
                {{ $t('app.footer.inn') }}
              </li>
              <li class="footer__text">
                {{ $t('app.footer.allRights') }}
              </li>
            </ul>
            <div class="footer__socials">
              <a
                class="footer__social"
                href="https://vk.com/papajohnsru"
                target="_blank"
              >
                <VkontakteIcon />
              </a>
              <a
                class="footer__social"
                href="https://www.facebook.com/papajohnsru/"
                target="_blank"
              >
                <FacebookIcon />
              </a>
              <a
                class="footer__social"
                href="https://www.instagram.com/papajohnsru/"
                target="_blank"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
          <router-link class="footer__personal" to="/personal-data">
            {{ $t('app.footer.personalData') }}
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import AppMenu from '@elements/AppMenu'
import FacebookIcon from '@icons/FacebookIcon'
import InstagramIcon from '@icons/InstagramIcon'
import VkontakteIcon from '@icons/VkontakteIcon'
import { footerMenu } from './footerMenu'

export default {
  name: 'TheFooter',
  components: {
    AppMenu,
    FacebookIcon,
    InstagramIcon,
    VkontakteIcon,
  },
  data() {
    return {
      footerMenu,
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $white-color;

  &__inner {
    padding: 40px 0 50px;

    @media (max-width: 576px) {
      padding-top: 20px;
    }
  }

  &__row {
    @include flex;
    width: 620px;
    padding-bottom: 24px;

    @media (max-width: 769px) {
      width: 100%;
    }

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

  &__menu {
    width: calc(100% / 3);
    margin-right: 30px;

    @media (max-width: 576px) {
      width: 100%;
      margin-right: 0;
    }
  }

  &_bottom {
    @include flex-space-center;
    border-top: 1px solid $pale-blue-color;
    padding-top: 24px;

    @media (max-width: 769px) {
      flex-direction: column;
    }
  }

  &__column {
    @include flex-align-center;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

  &__text {
    font-family: $gotham-font;
    font-size: 12px;
    color: $brown-color;
  }

  &__socials {
    @include flex-align-center;
    margin: 0 40px;

    @media (max-width: 576px) {
      margin-top: 24px;
    }
  }

  &__social {
    @include flex-center;
    width: 40px;
    height: 40px;
    color: $primary-color;
    cursor: pointer;

    @include green-color-hover;
  }

  &__personal {
    font-family: $gotham-font;
    font-size: 12px;
    color: $brown-color;
    text-align: center;

    @include green-color-hover;

    @media (max-width: 769px) {
      margin-top: 24px;
    }
  }
}
</style>
