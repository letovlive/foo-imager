<template>
    <el-aside class="el-aside" width="auto">
        <h2>{{ $t('text.settings') }}</h2>
        <el-form
          label-width="90px"
          label-position="left"
        >
            <el-form-item
              label="Width"
              size="80"
            >
                <el-input-number
                  v-model="image.width"
                  @change="handleChange"
                  :min="1"
                  :max="10000"
                >
                </el-input-number>
            </el-form-item>
            <el-form-item label="Height">
                <el-input-number
                  v-model="image.height"
                  @change="handleChange"
                  :min="1"
                  :max="10000"
                >
                </el-input-number>
            </el-form-item>
            <div>
                <el-form-item
                  class="color-picker"
                  label="Background"
                >
                    <el-color-picker
                      v-model="image.backgroundColor"
                      show-alpha
                    >
                    </el-color-picker>
                </el-form-item>
                <el-form-item
                  class="color-picker color-picker__font"
                  label="Font color"
                >
                    <el-color-picker
                      v-model="image.fontColor"
                    >
                    </el-color-picker>
                </el-form-item>
            </div>
            <slot name="bottom"></slot>
        </el-form>
    </el-aside>
</template>

<script>
  export default {
    /**
     * Name.
     */
    name: 'Sidebar',

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
        image: {
          height: 200,
          width: 200,
          backgroundColor: 'rgba(19, 206, 102, 0.8)',
          fontColor: 'rgba(19, 100, 102, 0.8)'
        }
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
      this.$emit('input', this.image);
    },

    /**
     * Destroyed hook.
     */
    destroyed () {
    },

    /**
     * Components.
     */
    components: {},

    /**
     * Computed properties.
     */
    computed: {},

    /**
     * Methods.
     */
    methods: {
      handleChange () {},
    },

    /**
     * Watchers.
     */
    watch: {
      image: {
        deep: true,
        handler () {
          this.$emit('input', this.image);
        }
      }
    }
  };
</script>