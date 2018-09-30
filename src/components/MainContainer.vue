<template>
    <div class="main">
        <div class="main-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="imageSvg"
              :width="image.width"
              :height="image.height"
            >
                <rect
                  :width="image.width"
                  :height="image.height"
                  :fill="image.backgroundColor"
                  x="0"
                  y="0"
                >
                </rect>
                <text
                  :x="image.width / 2"
                  :y="(image.height + (isVertical ? image.height * 0.1 : 0)) / 2"
                  text-anchor="middle"
                  :fill="image.fontColor"
                  alignment-baseline="central"
                  :style="getFontSettings()"
                >
                    {{ imageText }}
                </text>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
  export default {
    /**
     * Name.
     */
    name: 'MainContainer',

    /**
     * Props.
     */
    props: {
      image: {
        type: Object,
        default () {
          return {
            height: 0,
            width: 0,
            backgroundColor: '#fff',
            fontColor: '#fff'
          };
        }
      },
      text: {
        type: String,
        default: ''
      }
    },

    /**
     * Reactive properties.
     * @returns {{}}
     */
    data () {
      return {};
    },

    /**
     * Mounted hook.
     */
    mounted () {
      this.$nextTick(() => {
        this.$emit('update:svg', this.$el.querySelector('#imageSvg'));
      })
    },

    /**
     * Computed properties.
     */
    computed: {

      /**
       * Checks if image is vertical.
       */
      isVertical () {
        return this.image.height / this.image.width >= 2;
      },

      /**
       * Compute font size
       */
      fontSize () {
        return this.image[this.isVertical ? 'height' : 'width'] / 5;
      },

      /**
       * Image text.
       */
      imageText () {
        return this.text || `${this.image.width}x${this.image.height}`;
      }
    },

    /**
     * Methods.
     */
    methods: {
      /**
       * Get font CSS.
       * @return {string}
       */
      getFontSettings () {
        return {
          fontSize: `${this.fontSize}px`,
          writingMode: this.isVertical ? 'vertical-rl' : 'horizontal-tb',
          textOrientation: 'mixed',
        };
      },
    },

    /**
     * Watchers.
     */
    watch: {}
  };
</script>