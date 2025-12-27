# Basic React 3 Fiber Setup

This is a basic React 3 Fiber setup that serves as a place to implement GLSL shaders.

You can define new GLSL shaders in the src/app/shaders folder
You can define new objects and compose new effects in the scene in src/app/Card.tsx
You can define new ThreeJS effects in the src/app/Effects folder

---

## Example Usage

In Card.tsx we define Scene() which contains a Canvas component.

Inside the Canvas component is EffectComposer which stores the Scene effects; this stores our wrapped Effects.

Inside src/app/shaders, we define testfrag.glsl storing the implementation of our Sobel edge detector. The GLSL uses uniform threshold to receive a threshold value from the user or slider.

Inside src/app/Effects, we store Sobel.tsx which extends the Effects class from the postprocesing library by adding a name, fragment shader, and the mapped shader uniforms. The effect is then wrapped to be used as a React component and exported.
