<template>
    <el-header
      height="80"
      class="app__header"
    >
        <el-row>
            <el-col
              :xs="4"
              :sm="4"
              :md="4"
              :lg="4"
            >
                <img
                  class="app__logo"
                  src="./../assets/logo.svg"
                >
            </el-col>
            <el-col
              :xs="0"
              :sm="16"
              :md="16"
              :lg="16"
            >
                <h1>
                    {{ $t('app.name') }}
                </h1>
            </el-col>
            <el-col
              :xs="4"
              :sm="4"
              :md="4"
              :lg="4"
            >
                <github-link
                  url="https://github.com/letovlive/foo-imager"
                >
                </github-link>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
  import GithubLink from './GithubLink.vue';

  export default {
    /**
     * Name.
     */
    name: 'HeaderContainer',
    /**
     * Components.
     */
    components: {
      GithubLink
    },
  };
</script>