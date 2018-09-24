<template>
    <div>
        <el-footer>
            <a href="mailto:alex.petrenko.inbox@gmail.com">© Alexey Petrenko</a> |
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
     * Mixins.
     */
    mixins: [],

    /**
     * Props.
     */
    props: {},

    /**
     * Reactive properties.
     * @returns {{}}
     */
    data () {
      return {
        dialogVisible: false,
      };
    },

    /**
     * Created hook.
     */
    created () {
    },

    /**
     * Mounted hook.
     */
    mounted () {
    },

    /**
     * Destroyed hook.
     */
    destroyed () {
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
    computed: {},

    /**
     * Methods.
     */
    methods: {},

    /**
     * Watchers.
     */
    watch: {}
  };
</script>