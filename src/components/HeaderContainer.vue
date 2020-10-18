<template>
  <el-header
    class="app__header"
    height="80"
  >
    <el-row>
      <el-col
        :lg="4"
        :md="4"
        :sm="4"
        :xs="4"
      >
        <img
          alt="logo"
          class="app__logo"
          src="./../assets/logo.svg"
        >
      </el-col>
      <el-col
        :lg="16"
        :md="16"
        :sm="16"
        :xs="0"
      >
        <h1>
          {{ $t('app.name') }}
        </h1>
      </el-col>
      <el-col
        :lg="4"
        :md="4"
        :sm="4"
        :xs="4"
      >
        <github-link
          target="_blank"
          url="https://github.com/letovlive/foo-imager"
        />
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GithubLink from './GithubLink.vue';

@Component({
  /**
   * Components.
   */
  components: {
    GithubLink
  }
})
export default class HeaderContainer extends Vue {
}
</script>
