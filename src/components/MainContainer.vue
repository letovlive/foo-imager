<template>
  <div class="main">
    <div class="main-container">
      <svg
        id="imageSvg"
        :height="image.height"
        :width="image.width"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          :fill="image.backgroundColor"
          :height="image.height"
          :width="image.width"
          x="0"
          y="0"
        />
        <text
          :fill="image.fontColor"
          :style="getFontSettings()"
          :x="image.width / 2"
          :y="(image.height + (isVertical ? image.height * 0.1 : 0)) / 2"
          alignment-baseline="central"
          text-anchor="middle"
        >
          {{ imageText }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
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
  @Prop({default: ''}) text: string;

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
   * Mounted hook.
   */
  mounted (): void {
    this.$nextTick(() => {
      this.$emit('update:svg', this.$el.querySelector('#imageSvg'));
    });
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
}
</script>
