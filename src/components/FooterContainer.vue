<template>
    <div>
        <el-footer>
            <a
              :href="mailto"
              @mouseover="showEmail"
              @mouseout="hideEmail"
            >© Alexey Petrenko</a> |
            <a href="#" @click.prevent="dialogVisible = true">{{ $t('text.licence')}}</a>
        </el-footer>
        <el-dialog
          title="Licence"
          :visible.sync="dialogVisible"
          width="80%"
        >
            <licence></licence>
            <span
              slot="footer"
              class="dialog-footer"
            >
            <el-button
              type="primary"
              @click="dialogVisible = false"
            >
                {{ $t('button.close') }}
            </el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import Licence from './Licence.vue';

  export default {
    /**
     * Name.
     */
    name: 'FooterContainer',

    /**
     * Reactive properties.
     * @returns {{}}
     */
    data () {
      return {
        dialogVisible: false,
        visibleEmail: false
      };
    },

    /**
     * Components.
     */
    components: {
      Licence
    },

    /**
     * Computed properties.
     */
    computed: {

      mailto () {
        const contact = 'YWxleC5wZXRyZW5rby5pbmJveEBnbWFpbC5jb20=';
        const subject = 'Rm9vIGltYWdlcg==';

        return this.visibleEmail ? `mailto:${atob(contact)}?subject=${atob(subject)}` : '#';
      }
    },

    /**
     * Methods.
     */
    methods: {

      /**
       * Show email.
       */
      showEmail () {
        console.log('111');
        this.visibleEmail = true;
      },

      /**
       * Hide email.
       */
      hideEmail () {
        this.visibleEmail = false;
      }
    },
  };
</script>