/**
 * @typedef Viewport
 * @property {(canvas: HTMLCanvasElement, index?: number) => Viewport} add Add a new layer.
 * @property {(index: number) => Viewport} remove Remove a layer.
 * @property {(index: number) => HTMLCanvasElement} get Get a layer.
 */

(function () {
  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(`.cl-viewport {
      flex: 1;
      display: flex;
      position: relative;
    }
  
    .cl-viewport canvas {
      position: absolute;
      background-color: transparent;
    }`)
  );

  document.head.appendChild(style);
})();

/**
 * Object to access CanvasLayering functions.
 */
const CanvasLayering = {
  /**
   * Creates a Viewport from an existing "div" element
   *
   * @param {HTMLDivElement} viewport
   * @return {Viewport}
   */
  create(viewport) {
    if (!viewport.classList.contains('cl-viewport')) {
      viewport.classList.add('cl-viewport');
    }

    return {
      add(canvas, index = viewport.childElementCount) {
        canvas.style.zIndex = index;
        canvas.width = viewport.clientWidth;
        canvas.height = viewport.clientHeight;
        viewport.append(canvas);

        return this;
      },
      remove(index) {
        if (index >= 0) {
          viewport.removeChild(viewport.children[index]);

          for (let i = index; i < viewport.children.length; i++) {
            --viewport.children[i].style.zIndex;
          }
        }

        return this;
      },
      get(index) {
        if (index >= 0 && index < viewport.childElementCount) {
          return viewport.children[index];
        }

        return null;
      },
    };
  },
};
