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
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import Image from './../interfaces/Image';

  @Component
  export default class MainContainer extends Vue {

    /**
     * Image settings.
     */
    @Prop({
      default: {
        height: 0,
        width: 0,
        backgroundColor: '#fff',
        fontColor: '#fff'
      }
    }) image: Image;

    /**
     * Text on image.
     */
    @Prop({ default: '' }) text: string;

    /**
     * Mounted hook.
     */
    mounted (): void {
      this.$nextTick(() => {
        this.$emit('update:svg', this.$el.querySelector('#imageSvg'));
      });
    }

    /**
     * Checks if image is vertical.
     * @return boolean
     */
    get isVertical (): boolean {
      return this.image.height / this.image.width >= 2;
    }

    /**
     * Compute font size
     * @return number
     */
    get fontSize (): number {
      return this.image[this.isVertical ? 'height' : 'width'] / 5;
    }

    /**
     * Image text.
     * @return text
     */
    get imageText (): string {
      return this.text || `${this.image.width}x${this.image.height}`;
    }

    /**
     * Get font CSS.
     * @return {string}
     */
    getFontSettings (): Object {
      return {
        fontSize: `${this.fontSize}px`,
        writingMode: this.isVertical ? 'vertical-rl' : 'horizontal-tb',
        textOrientation: 'mixed',
      };
    }
  };
</script>