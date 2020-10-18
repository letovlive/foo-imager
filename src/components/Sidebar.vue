<template>
  <el-aside
    class="el-aside"
    width="auto"
  >
    <h2>{{ $t('text.settings') }}</h2>
    <el-form
      label-position="left"
      label-width="90px"
    >
      <el-form-item
        label="Width"
        size="80"
      >
        <el-input-number
          v-model="image.width"
          :max="10000"
          :min="1"
          name="width"
        />
      </el-form-item>
      <el-form-item label="Height">
        <el-input-number
          v-model="image.height"
          :max="10000"
          :min="1"
          name="height"
        />
      </el-form-item>
      <div>
        <el-form-item
          class="color-picker"
          label="Background"
        >
          <el-color-picker
            v-model="image.backgroundColor"
            name="background"
            show-alpha
          />
        </el-form-item>
        <el-form-item
          class="color-picker color-picker__font"
          label="Font color"
        >
          <el-color-picker
            v-model="image.fontColor"
            name="fontColor"
          />
        </el-form-item>
      </div>
      <slot name="bottom" />
    </el-form>
  </el-aside>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
import Image from './../interfaces/Image';

@Component
export default class Sidebar extends Vue {
  /**
   * Reactive image.
   */
  image: Image = {
    height: 200,
    width: 200,
    backgroundColor: 'rgba(19, 206, 102, 0.8)',
    fontColor: 'rgba(19, 100, 102, 0.8)'
  };

  /**
   * Mounted hook.
   */
  mounted () {
    this.$emit('input', this.image);
  }

  /**
   * Emit input when image is changed.
   */
  @Emit('input')
  imageChanged (): Image {
    return this.image;
  }

  /**
   * Image watcher.
   */
  @Watch('image', {deep: true})
  emitImage () { this.imageChanged(); }
}
</script>
