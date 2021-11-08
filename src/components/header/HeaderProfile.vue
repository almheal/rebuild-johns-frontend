<template>
  <div class="header-profile">
    <div class="row-center" @click="$emit('toProfile')">
      <div class="header-profile__column">
        <div class="header-profile__bonuses">10</div>
        <div class="header-profile__text">{{ $t('app.profile.bonuses') }}</div>
      </div>
      <AppUserAvatar :img="userAvatar" />
    </div>
    <div class="header-profile__logout" @click="$emit('clickLogout')">
      <ExitIcon class="header-profile__icon" />
      <span>{{ $t('app.profile.logout') }}</span>
    </div>
  </div>
</template>

<script>
import AppUserAvatar from '@elements/AppUserAvatar'
import ExitIcon from '@icons/ExitIcon'

export default {
  name: 'HeaderProfile',
  components: {
    AppUserAvatar,
    ExitIcon,
  },
  emits: ['clickLogout', 'toProfile'],
  props: {
    userAvatar: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.header-profile {
  padding: 10px 16px;
  background-color: $white-color;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);

    .header-profile__logout {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 769px) {
    @include flex-space-center;
    width: 100%;
    padding: 0;

    &:hover {
      box-shadow: initial;
    }
  }

  &__column {
    text-align: right;
    margin-right: 10px;

    @media (max-width: 769px) {
      order: 1;
      margin: 0 0 0 24px;
      text-align: left;
    }
  }

  &__bonuses {
    font-family: $gotham-font;
    color: $brown-color;
    margin-bottom: 5px;

    @media (max-width: 769px) {
      font-size: 18px;
    }
  }

  &__text {
    font-size: 12px;
    text-transform: lowercase;

    @media (max-width: 769px) {
      font-size: 14px;
    }
  }

  &__logout {
    @include absolute-default(0, 100%);
    @include flex-justify-align(flex-end, center);
    visibility: hidden;
    opacity: 0;
    width: 100%;
    padding: 5px 16px;
    font-size: 12px;
    background-color: $white-color;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(41, 44, 51, 0.2);
    transition: 0.3s;

    @media (max-width: 769px) {
      position: relative;
      display: flex;
      width: auto;
      opacity: 1;
      visibility: visible;
      box-shadow: initial;

      &::before,
      &::after,
      span {
        display: none;
      }
    }

    &:hover {
      color: $green-color;

      .header-profile__icon {
        fill: $green-color;
      }
    }

    &::before {
      content: '';
      @include absolute-default(0, -8px);
      height: 8px;
      width: 100%;
      background-color: $white-color;
    }

    &::after {
      content: '';
      @include absolute-left-center;
      top: -1px;
      height: 1px;
      background-color: $dark-smoky-white;
      width: calc(100% - 32px);
    }
  }

  &__icon {
    margin-right: 5px;
    transition: fill 0.3s;
  }
}
</style>
