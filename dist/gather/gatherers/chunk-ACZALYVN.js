import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  core_exports,
  isEqual_default,
  isUnderTest,
  makeComputedArtifact,
  require_create_entity_finder_api,
  simulation_exports,
  url_utils_default
} from "./chunk-ELEI4PD3.js";
import {
  LighthouseError,
  createIcuMessageFn,
  getFormatted,
  getModuleDirectory,
  getRendererFormattedStrings,
  isStringOrIcuMessage,
  lighthouseVersion,
  lookupLocale,
  replaceIcuMessages
} from "./chunk-BSOGFMIV.js";
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";
import {
  init_shim_fs,
  shim_fs_default
} from "./chunk-NDN2O67Z.js";
import {
  Util
} from "./chunk-XKFKI4NM.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-23MNVS5G.js";

// node_modules/lighthouse-stack-packs/packs/amp.js
var require_amp = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/amp.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="%230379c4" fill-rule="evenodd" d="m171.887 116.28-53.696 89.36h-9.728l9.617-58.227-30.2.047a4.852 4.852 0 0 1-4.855-4.855c0-1.152 1.07-3.102 1.07-3.102l53.52-89.254 9.9.043-9.86 58.317 30.413-.043a4.852 4.852 0 0 1 4.855 4.855c0 1.088-.427 2.044-1.033 2.854l.004.004zM128 0C57.306 0 0 57.3 0 128s57.306 128 128 128 128-57.306 128-128S198.7 0 128 0z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using WebP in the context of AMP. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "modern-image-formats": "Consider displaying all [`amp-img`](https://amp.dev/documentation/components/amp-img/?format=websites) components in WebP formats while specifying an appropriate fallback for other browsers. [Learn more](https://amp.dev/documentation/components/amp-img/#example:-specifying-a-fallback-image).",
      /** Additional description of a Lighthouse audit that tells the user how images are automatically lazy loaded for the AMP framewok. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Ensure that you are using [`amp-img`](https://amp.dev/documentation/components/amp-img/?format=websites) for images to automatically lazy-load. [Learn more](https://amp.dev/documentation/guides-and-tutorials/develop/media_iframes_3p/?format=websites#images).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by reducing the amount of render blocking resources present on their page in the context of the AMP framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "render-blocking-resources": "Use tools such as [AMP Optimizer](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer) to [server-side render AMP layouts](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/server-side-rendering/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by ensuring all the CSS written is supported by the AMP framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": "Refer to the [AMP documentation](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages/) to ensure all styles are supported.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using a runtime-managed animated image in the context of the AMP framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "efficient-animated-content": "For animated content, use [`amp-anim`](https://amp.dev/documentation/components/amp-anim/) to minimize CPU usage when the content is offscreen.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using responsive images in the context of the AMP framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "The [`amp-img`](https://amp.dev/documentation/components/amp-img/?format=websites) component supports the [`srcset`](https://web.dev/use-srcset-to-automatically-choose-the-right-image/) attribute to specify which image assets to use based on the screen size. [Learn more](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/art_direction/)."
    };
    module.exports = {
      id: "amp",
      title: "AMP",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/angular.js
var require_angular = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/angular.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><path fill="%23dd0031" d="M125 30 31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/><path fill="%23c3002f" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/><path fill="%23fff" d="M125 52.1 66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by reducing the total bytes delivered by their page in the context of the Angular framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "total-byte-weight": "Apply [route-level code splitting](https://web.dev/route-level-code-splitting-in-angular/) to minimize the size of your JavaScript bundles. Also, consider precaching assets with the [Angular service worker](https://web.dev/precaching-with-the-angular-service-worker/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS and JS files in the context of the Angular framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-warning": "If you are using Angular CLI, ensure that builds are generated in production mode. [Learn more](https://angular.io/guide/deployment#enable-runtime-production-mode).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the Angular framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "If you are using Angular CLI, include source maps in your production build to inspect your bundles. [Learn more](https://angular.io/guide/deployment#inspect-the-bundles).",
      /** Additional description of a Lighthouse audit that tells the user how they can use responsive images in the context of the Angular framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "Consider using the `BreakpointObserver` utility in the Component Dev Kit (CDK) to manage image breakpoints. [Learn more](https://material.angular.io/cdk/layout/overview).",
      /** Additional description of a Lighthouse audit that tells the user how they can use preload to improve performance in the context of the Angular framework. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-rel-preload": "Preload routes ahead of time to speed up navigation. [Learn more](https://web.dev/route-preloading-in-angular/).",
      /** Additional description of a Lighthouse audit that tells the user and *how* they should reduce the size of the web page's DOM in the context of the Angular framework. 'Learn More' becomes link text to additional documentation. */
      "dom-size": "Consider virtual scrolling with the Component Dev Kit (CDK) if very large lists are being rendered. [Learn more](https://web.dev/virtualize-lists-with-angular-cdk/)."
    };
    module.exports = {
      id: "angular",
      title: "Angular",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/drupal.js
var require_drupal = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/drupal.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.525 243.713"><path fill="%23009cde" d="M131.64 51.91C114.491 34.769 98.13 18.429 93.26 0c-4.87 18.429-21.234 34.769-38.38 51.91C29.16 77.613 0 106.743 0 150.434a93.263 93.263 0 1 0 186.525 0c0-43.688-29.158-72.821-54.885-98.524m-92 120.256c-5.719-.194-26.824-36.571 12.329-75.303l25.909 28.3a2.215 2.215 0 0 1-.173 3.306c-6.183 6.34-32.534 32.765-35.81 41.902-.675 1.886-1.663 1.815-2.256 1.795m53.624 47.943a32.075 32.075 0 0 1-32.076-32.075 33.423 33.423 0 0 1 7.995-21.187c5.784-7.072 24.077-26.963 24.077-26.963s18.012 20.183 24.033 26.896a31.368 31.368 0 0 1 8.046 21.254 32.076 32.076 0 0 1-32.075 32.075m61.392-52.015c-.691 1.512-2.26 4.036-4.376 4.113-3.773.138-4.176-1.796-6.965-5.923-6.122-9.06-59.551-64.9-69.545-75.699-8.79-9.498-1.238-16.195 2.266-19.704 4.395-4.403 17.224-17.225 17.224-17.225s38.255 36.296 54.19 61.096 10.444 46.26 7.206 53.342"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused CSS, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-css-rules": "Consider removing unused CSS rules and only attach the needed `Drupal` libraries to the relevant page or component in a page. See the [`Drupal` documentation](https://www.drupal.org/docs/develop/theming-drupal/adding-assets-css-js-to-a-drupal-theme-via-librariesyml#define) for details. To identify attached libraries that are adding extraneous CSS, try running [code coverage](https://developer.chrome.com/docs/devtools/coverage) in Chrome DevTools. You can identify the theme/module responsible from the URL of the stylesheet when CSS aggregation is disabled in your `Drupal` site. Look out for themes/modules that have many stylesheets in the list which have a lot of red in code coverage. A theme/module should only attach a stylesheet library if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using webp in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "modern-image-formats": "Consider configuring [WebP image formats with a Convert image style](https://www.drupal.org/docs/core-modules-and-themes/core-modules/image-module/working-with-images#styles) on your site.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by lazy loading images that are initially offscreen in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Consider configuring lazy load images in `Drupal`. The field formatters for images support `lazy` or `eager`.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by reducing the total bytes delivered by their page in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "total-byte-weight": "Consider using [Responsive Image Styles](https://www.drupal.org/documentation/modules/responsive_image) to reduce the size of images loaded on your page. If you are using `Views` to show multiple content items on a page, consider implementing pagination to limit the number of content items shown on a given page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by reducing the amount of render blocking resources present on their page, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "render-blocking-resources": "Consider using [a module](https://www.drupal.org/project/critical_css) to inline critical CSS and JavaScript, and use the defer attribute for non-critical CSS or JavaScript.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": 'Ensure you have enabled "Aggregate CSS files" in the "Administration \xBB Configuration \xBB Development" page.',
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": 'Ensure you have enabled "Aggregate JavaScript files" in the "Administration \xBB Configuration \xBB Development" page.',
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by encoding animated images as video, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "efficient-animated-content": "Consider uploading your `GIF` to a service which will make it available to embed as an HTML5 video.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "Consider removing unused JavaScript assets and only attach the needed `Drupal` libraries to the relevant page or component in a page. See the [Drupal documentation](https://www.drupal.org/docs/develop/theming-drupal/adding-assets-css-js-to-a-drupal-theme-via-librariesyml#define) for details. To identify attached libraries that are adding extraneous JavaScript, try running [code coverage](https://developer.chrome.com/docs/devtools/coverage) in Chrome DevTools. You can identify the theme/module responsible from the URL of the script when JavaScript aggregation is disabled in your `Drupal` site. Look out for themes/modules that have many scripts in the list which have a lot of red in code coverage. A theme/module should only attach a script library if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve their site by enabling long caching in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-long-cache-ttl": 'Set the "Browser and proxy cache maximum age" in the "Administration \xBB Configuration \xBB Development" page. Read about [`Drupal` cache and optimizing for performance](https://www.drupal.org/docs/8/api/cache-api/cache-api).',
      /** Additional description of a Lighthouse audit that tells the user how they can improve site performance by optimizing images, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-optimized-images": "Consider using [a module](https://www.drupal.org/project/project_module?f%5B0%5D=&f%5B1%5D=&f%5B2%5D=im_vid_3%3A123&f%5B3%5D=&f%5B4%5D=sm_field_project_type%3Afull&f%5B5%5D=&f%5B6%5D=&text=image&solrsort=iss_project_release_usage+desc&op=Search) that automatically optimizes and reduces the size of images uploaded through the site while retaining quality. Also, ensure you are using the native [Responsive Image Styles](https://www.drupal.org/documentation/modules/responsive_image) provided from `Drupal` for all images rendered on the site.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Drupal`. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-text-compression": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. Consider using a CDN that natively supports this, or configure the web server to perform this operation. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/text-compression).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using responsive images in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "Ensure that you are using the native [Responsive Image Styles](https://www.drupal.org/documentation/modules/responsive_image) provided from `Drupal`. Use the Responsive Image Styles when rendering image fields through view modes, views, or images uploaded through the WYSIWYG editor.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Drupal`. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "prioritize-lcp-image": "If the LCP element is dynamically added to the page, you should optimize the image in order to improve LCP. [Learn more](https://www.smashingmagazine.com/2023/08/methods-improving-drupal-largest-contentful-paint-core-web-vital/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the time to first byte speed metric, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "Offload traffic with one or more `Drupal` caching modules such as `Internal Page Cache`, `Internal Dynamic Page Cache`, and `BigPipe`. Couple these with a CDN to further improve response time. Your hosting servers should make use of PHP OPcache. Consider using memory-caching such as Redis or Memcached to reduce database query times. Lastly use performant themes, modules, and faster servers to lower server response time.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Drupal`. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "redirects": "Redirects introduce additional delays before the page can be loaded. If the [Redirect](https://www.drupal.org/project/redirect) module is installed, review if unnecessary redirects can be removed. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/redirects).",
      /** Additional description of a Lighthouse audit that tells the user how they can add preconnect or dns-prefetch resource hints, in the context of the `Drupal` CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-rel-preconnect": "`Preconnect` or `dns-prefetch` resource hints can be added by installing and configuring [a module](https://www.drupal.org/project/project_module?f%5B0%5D=&f%5B1%5D=&f%5B2%5D=&f%5B3%5D=&f%5B4%5D=sm_field_project_type%3Afull&f%5B5%5D=&f%5B6%5D=&text=Preconnect&solrsort=score+desc&op=Search) that provides facilities for user agent resource hints."
    };
    module.exports = {
      id: "drupal",
      title: "Drupal",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/ezoic.js
var require_ezoic = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/ezoic.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82"><path fill="%235FA624" fill-rule="evenodd" d="M81.37 48.117C85.301 25.821 70.413 4.56 48.117.63 25.821-3.3 4.56 11.586.63 33.883-3.3 56.178 11.586 77.44 33.883 81.37 56.18 85.301 77.44 70.412 81.37 48.117Zm-8.935-14.17c2.77 12.357-1.942 25.721-12.96 33.436-14.57 10.203-34.656 6.662-44.859-7.909a32.434 32.434 0 0 1-2.869-4.98l28.7-20.097a6.53 6.53 0 1 0-3.744-5.347L9.564 48.054c-2.768-12.359 1.943-25.724 12.96-33.439 14.572-10.203 34.656-6.662 44.86 7.91a32.349 32.349 0 0 1 2.868 4.98L41.554 47.6a6.53 6.53 0 1 0 3.746 5.35l27.136-19.003Z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Remove Unused CSS is a setting name. */
      "unused-css-rules": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Remove Unused CSS` to help with this issue. It will identify the CSS classes that are actually used on each page of your site, and remove any others to keep the file size small.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Next-Gen Formats is a setting name.*/
      "modern-image-formats": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Next-Gen Formats` to convert images to WebP.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Lazy Load Images is a setting name.*/
      "offscreen-images": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Lazy Load Images` to defer loading off-screen images until they are needed.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Critical CSS is a setting name.*/
      "render-blocking-resources": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Critical CSS` and `Script Delay` to defer non-critical JS/CSS.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Minify CSS is a setting name.*/
      "unminified-css": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Minify CSS` to automatically minify your CSS to reduce network payload sizes.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Minify Javascript is a setting name.*/
      "unminified-javascript": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Minify Javascript` to automatically minify your JS to reduce network payload sizes.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Efficient Static Cache Policy is a setting name.*/
      "uses-long-cache-ttl": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Efficient Static Cache Policy` to set recommended values in the caching header for static assests.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Next-Gen Formats is a setting name.*/
      "uses-optimized-images": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Next-Gen Formats` to convert images to WebP.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Resize Images is a setting name.*/
      "uses-responsive-images": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Resize Images` to resize images to a device appropriate size, reducing network payload sizes.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Cloud Caching is Ezoic's CDN.*/
      "server-response-time": "Use [Ezoic Cloud Caching](https://pubdash.ezoic.com/speed/caching) to cache your content across our world wide network, improving time to first byte.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Pre-Connect Origins is a setting name.*/
      "uses-rel-preconnect": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Pre-Connect Origins` to automatically add `preconnect` resource hints to establish early connections to important third-party origins.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Preload Fonts and Preload Background Images are setting names.*/
      "uses-rel-preload": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Preload Fonts` and `Preload Background Images` to add `preload` links to prioritize fetching resources that are currently requested later in page load.",
      /** Additional description of a Lighthouse audit for a third-party framework called `Ezoic`. This is displayed after a user expands the section to see more. No character length limits. Ezoic Leap is Ezoic's site speed improvement toolset. Optimize Fonts is a setting name.*/
      "font-display": "Use [Ezoic Leap](https://pubdash.ezoic.com/speed) and enable `Optimize Fonts` to automatically leverage the `font-display` CSS feature to ensure text is user-visible while webfonts are loading."
    };
    module.exports = {
      id: "ezoic",
      title: "Ezoic",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/gatsby.js
var require_gatsby = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/gatsby.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="%23639"/><path fill="%23fff" d="M6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can remove unused CSS rules by configuring the Gatsby plugin `gatsby-plugin-purgecss` which sets up PurgeCSS */
      "unused-css-rules": "Use the `PurgeCSS` `Gatsby` plugin to remove unused rules from stylesheets. [Learn more](https://purgecss.com/plugins/gatsby.html).",
      /** Additional description of a Lighthouse audit that tells the user to use the gatsby-plugin-image component to automatically optimize image format */
      "modern-image-formats": "Use the `gatsby-plugin-image` component instead of `<img>` to automatically optimize image format. [Learn more](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image).",
      /** Additional description of a Lighthouse audit that tells the user to defer loading images which are not shown on screen using the gatsby-plugin-image component */
      "offscreen-images": "Use the `gatsby-plugin-image` component instead of `<img>` to automatically lazy-load images. [Learn more](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image).",
      /** Additional description of a Lighthouse audit that tells the user to use gatsby-script to defer loading of non-critical third-party libraries */
      "render-blocking-resources": "Use the `Gatsby Script API` to defer loading of non-critical third-party scripts. [Learn more](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/).",
      /** Additional description of a Lighthouse audit that tells the user to use Webpack Bundle Analyzer to discover JavaScript code that is not used */
      "unused-javascript": "Use `Webpack Bundle Analyzer` to detect unused JavaScript code. [Learn more](https://www.gatsbyjs.com/plugins/gatsby-plugin-webpack-bundle-analyser-v2/)",
      /** Additional description of a Lighthouse audit that tells the user to enable caching for assets (e.g. images) and artifacts that don't change between deployments */
      "uses-long-cache-ttl": "Configure caching for immutable assets. [Learn more](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/caching/).",
      /** Additional description of a Lighthouse audit that tells the user to use the gatsby-plugin-image component to adjust image quality */
      "uses-optimized-images": "Use the `gatsby-plugin-image` component instead of `<img>` to adjust image quality. [Learn more](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image).",
      /** Additional description of a Lighthouse audit that tells the user to serve responsive images using the gatsby-plugin-image component with appropriate `sizes` set */
      "uses-responsive-images": "Use the `gatsby-plugin-image` component to set appropriate `sizes`. [Learn more](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image).",
      /** Additional description of a Lighthouse audit that tells the user to use the gatsby-plugin-image component to automatically preload LCP images. "prop" is short for "property" */
      "prioritize-lcp-image": "Use the `gatsby-plugin-image` component and set the `loading` prop to `eager`. [Learn more](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image#shared-props)."
    };
    module.exports = {
      id: "gatsby",
      title: "Gatsby",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/joomla.js
var require_joomla = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/joomla.js"(exports, module) {
    "use strict";
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 258"><path fill="%23F9AE41" d="M255.7 35.6a33.7 33.7 0 0 0-67-4.8l-.4-.2c-27.6-12.4-50.8 9.6-50.8 9.6l-61.4 61.7 24.3 23.4 49.4-48.6c23-23 35.6-7.4 35.6-7.4 17.4 14.6.6 32 .6 32l24.9 24c20.3-22 21.5-41.1 15.3-56.3a33.7 33.7 0 0 0 29.5-33.4"/><path fill="%23EE4035" d="m226.5 190.5.2-.3c12.4-27.6-9.6-50.8-9.6-50.8L155.4 78l-23.3 24.3 48.5 49.4c23 23 7.5 35.6 7.5 35.6-14.7 17.4-32 .6-32 .6l-24 24.9c21.9 20.3 41 21.5 56.2 15.3a33.7 33.7 0 1 0 38.2-37.6"/><path fill="%234F91CD" d="m156 133-49.5 48.6c-23 23-35.6 7.4-35.6 7.4-17.4-14.6-.6-32-.6-32l-24.9-24c-20.3 22-21.4 41.1-15.3 56.3a33.7 33.7 0 1 0 37.6 38.2l.3.2c27.6 12.4 50.8-9.6 50.8-9.6l61.4-61.7-24.3-23.4"/><path fill="%237AC043" d="M75.7 106.6c-23-23-7.4-35.6-7.4-35.6 14.6-17.4 32-.6 32-.6l24-24.9c-22-20.3-41-21.5-56.3-15.3a33.7 33.7 0 1 0-38.2 37.6l-.2.3C17.2 95.7 39.2 119 39.2 119l61.7 61.4 23.4-24.3-48.6-49.4"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused CSS, in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-css-rules": "Consider reducing, or switching, the number of [Joomla extensions](https://extensions.joomla.org/) loading unused CSS in your page. To identify extensions that are adding extraneous CSS, try running [code coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage) in Chrome DevTools. You can identify the theme/plugin responsible from the URL of the stylesheet. Look out for plugins that have many stylesheets in the list which have a lot of red in code coverage. A plugin should only enqueue a stylesheet if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using webp in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "modern-image-formats": "Consider using a [plugin](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=webp) or service that will automatically convert your uploaded images to the optimal formats.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by lazy loading images that are initially offscreen in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Install a [lazy-load Joomla plugin](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=lazy%20loading) that provides the ability to defer any offscreen images, or switch to a template that provides that functionality. Starting with Joomla 4.0, all new images will [automatically](https://github.com/joomla/joomla-cms/pull/30748) get the `loading` attribute from the core.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by reducing the total bytes delivered by their page in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "total-byte-weight": "Consider showing excerpts in your article categories (e.g. via the read more link), reducing the number of articles shown on a given page, breaking your long posts into multiple pages, or using a plugin to lazy-load comments.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by reducing the amount of render blocking resources present on their page, in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "render-blocking-resources": "There are a number of Joomla plugins that can help you [inline critical assets](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=performance) or [defer less important resources](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=performance). Beware that optimizations provided by these plugins may break features of your templates or plugins, so you will need to test these thoroughly.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": "A number of [Joomla extensions](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=performance) can speed up your site by concatenating, minifying, and compressing your css styles. There are also templates that provide this functionality.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": "A number of [Joomla extensions](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=performance) can speed up your site by concatenating, minifying, and compressing your scripts. There are also templates that provide this functionality.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by encoding animated images as video, in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "efficient-animated-content": "Consider uploading your GIF to a service which will make it available to embed as an HTML5 video.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "Consider reducing, or switching, the number of [Joomla extensions](https://extensions.joomla.org/) loading unused JavaScript in your page. To identify plugins that are adding extraneous JS, try running [code coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage) in Chrome DevTools. You can identify the extension responsible from the URL of the script. Look out for extensions that have many scripts in the list which have a lot of red in code coverage. An extension should only enqueue a script if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve their site by enabling long caching in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-long-cache-ttl": "Read about [Browser Caching in Joomla](https://docs.joomla.org/Cache).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site performance by optimizing images, in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-optimized-images": "Consider using an [image optimization plugin](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=performance) that compresses your images while retaining quality.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance via enabling text compression in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-text-compression": "You can enable text compression by enabling Gzip Page Compression in Joomla (System > Global configuration > Server).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using responsive images in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "Consider using a [responsive images plugin](https://extensions.joomla.org/instant-search/?jed_live%5Bquery%5D=responsive%20images) to use responsive images in your content.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the server-response-time speed metric, in the context of the Joomla CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "Templates, extensions, and server specifications all contribute to server response time. Consider finding a more optimized template, carefully selecting an optimization extension, and/or upgrading your server."
    };
    module.exports = {
      id: "joomla",
      title: "Joomla",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/magento.js
var require_magento = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/magento.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="%23f26322" viewBox="0 0 1000 1000"><path d="M916.9 267.4v465.3l-111.3 67.4V331.4l-1.5-.9-303.9-189-304.6 189.2-1.2.8V799L83.1 732.6V267.4l.7-.4L500.3 10l416 257 .6.4zM560.7 468.5v383.3L500.3 890l-61-38.2V306.7l-136 84.3v476.6l197 122.5 196.4-122.5V391l-136-84.3v161.8z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using webp in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "modern-image-formats": "Consider searching the [Magento Marketplace](https://marketplace.magento.com/catalogsearch/result/?q=webp) for a variety of third-party extensions to leverage newer image formats.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by lazy loading images that are initially offscreen in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Consider modifying your product and catalog templates to make use of the web platform's [lazy loading](https://web.dev/native-lazy-loading) feature.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by disabling JS bundling in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "disable-bundling": "Disable Magento's built-in [JavaScript bundling and minification](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/js-bundling.html), and consider using [baler](https://github.com/magento/baler/) instead.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": `Enable the "Minify CSS Files" option in your store's Developer settings. [Learn more](https://devdocs.magento.com/guides/v2.3/performance-best-practices/configuration.html?itm_source=devdocs&itm_medium=search_page&itm_campaign=federated_search&itm_term=minify%20css%20files).`,
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": "Use [Terser](https://www.npmjs.com/package/terser) to minify all JavaScript assets from static content deployment, and disable the built-in minification feature.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "Disable Magento's built-in [JavaScript bundling](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/js-bundling.html).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site performance by optimizing images, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-optimized-images": "Consider searching the [Magento Marketplace](https://marketplace.magento.com/catalogsearch/result/?q=optimize%20image) for a variety of third party extensions to optimize images.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the time to first byte speed metric, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "Use Magento's [Varnish integration](https://devdocs.magento.com/guides/v2.3/config-guide/varnish/config-varnish.html).",
      /** Additional description of a Lighthouse audit that tells the user how they can add preconnect or dns-prefetch resource hints, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-rel-preconnect": "Preconnect or dns-prefetch resource hints can be added by [modifying a themes's layout](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/layouts/xml-manage.html).",
      /** Additional description of a Lighthouse audit that tells the user how they can add preload tags, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-rel-preload": "`<link rel=preload>` tags can be added by [modifying a themes's layout](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/layouts/xml-manage.html).",
      /** Additional description of a Lighthouse audit that tells the user how they can minimize critical request chains, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "critical-request-chains": "If you are not bundling your JavaScript assets, consider using [baler](https://github.com/magento/baler).",
      /** Additional description of a Lighthouse audit that tells the user how they can specify font-display, in the context of the Magento platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "font-display": "Specify `@font-display` when [defining custom fonts](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/css-topics/using-fonts.html)."
    };
    module.exports = {
      id: "magento",
      title: "Magento",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/next.js
var require_next = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/next.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 124"><path fill="%23000" d="M48.942 32.632h38.96v3.082h-35.39v23.193H85.79v3.082H52.513v25.464h35.794v3.081H48.942V32.632Zm42.45 0h4.139l18.343 25.464 18.749-25.464L158.124.287l-41.896 60.485 21.59 29.762h-4.302l-19.642-27.086L94.15 90.534h-4.22l21.751-29.762-20.29-28.14Zm47.967 3.082v-3.082h44.397v3.082h-20.453v54.82h-3.571v-54.82h-20.373ZM.203 32.632h4.464l61.557 91.671-25.439-33.769L3.936 37.011l-.162 53.523H.203zm183.194 53.891c.738 0 1.276-.563 1.276-1.29 0-.727-.538-1.29-1.276-1.29-.73 0-1.277.563-1.277 1.29 0 .727.547 1.29 1.277 1.29Zm3.509-3.393c0 2.146 1.555 3.549 3.822 3.549 2.414 0 3.874-1.446 3.874-3.956v-8.837h-1.946v8.828c0 1.394-.704 2.138-1.946 2.138-1.112 0-1.867-.692-1.893-1.722h-1.911Zm10.24-.113c.14 2.233 2.007 3.662 4.787 3.662 2.97 0 4.83-1.498 4.83-3.887 0-1.878-1.06-2.917-3.632-3.514l-1.38-.338c-1.634-.38-2.294-.891-2.294-1.783 0-1.125 1.025-1.86 2.563-1.86 1.459 0 2.466.718 2.649 1.869h1.893c-.113-2.103-1.971-3.583-4.516-3.583-2.737 0-4.56 1.48-4.56 3.704 0 1.835 1.033 2.926 3.3 3.454l1.616.39c1.659.389 2.388.96 2.388 1.912 0 1.108-1.146 1.913-2.71 1.913-1.676 0-2.84-.753-3.005-1.939h-1.928Z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can remove unusused CSS rules by configuring a plugin named PurgeCSS. */
      "unused-css-rules": "Consider setting up `PurgeCSS` in `Next.js` configuration to remove unused rules from stylesheets. [Learn more](https://purgecss.com/guides/next.html).",
      /** Additional description of a Lighthouse audit that tells the user to use the next/image component to automatically optimize image format. */
      "modern-image-formats": "Use the `next/image` component instead of `<img>` to automatically optimize image format. [Learn more](https://nextjs.org/docs/basic-features/image-optimization).",
      /** Additional description of a Lighthouse audit that tells the user to defer loading images which are not shown on screen using the next/image component. */
      "offscreen-images": "Use the `next/image` component instead of `<img>` to automatically lazy-load images. [Learn more](https://nextjs.org/docs/basic-features/image-optimization).",
      /** Additional description of a Lighthouse audit that tells the user to use next/script to defer loading of non-critical third-party libraries. */
      "render-blocking-resources": "Use the `next/script` component to defer loading of non-critical third-party scripts. [Learn more](https://nextjs.org/docs/basic-features/script).",
      /** Additional description of a Lighthouse audit that tells the user to use Webpack Bundle Analyzer to discover JavaScript code that is not used. */
      "unused-javascript": "Use `Webpack Bundle Analyzer` to detect unused JavaScript code. [Learn more](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)",
      /** Additional description of a Lighthouse audit that tells the user to enable caching for assets (e.g. images) and server-side rendered (SSR) pages that don't change between deployments. */
      "uses-long-cache-ttl": "Configure caching for immutable assets and `Server-side Rendered` (SSR) pages. [Learn more](https://nextjs.org/docs/going-to-production#caching).",
      /** Additional description of a Lighthouse audit that tells the user to use the next/image component to adjust image quality. */
      "uses-optimized-images": "Use the `next/image` component instead of `<img>` to adjust image quality. [Learn more](https://nextjs.org/docs/basic-features/image-optimization).",
      /** Additional description of a Lighthouse audit that tells the user to enable compression (gzip, brotli) on their servers. */
      "uses-text-compression": "Enable compression on your Next.js server. [Learn more](https://nextjs.org/docs/api-reference/next.config.js/compression).",
      /** Additional description of a Lighthouse audit that tells the user to serve responsive images using the next/image component with appropriate `sizes` set. */
      "uses-responsive-images": "Use the `next/image` component to set the appropriate `sizes`. [Learn more](https://nextjs.org/docs/api-reference/next/image#sizes).",
      /** Additional description of a Lighthouse audit that tells the user to analyze the performance of their applications using Next.js Analytics. */
      "user-timings": "Consider using `Next.js Analytics` to measure your app's real-world performance. [Learn more](https://nextjs.org/docs/advanced-features/measuring-performance).",
      /** Additional description of a Lighthouse audit that tells the user to use the next/image component to automatically preload LCP images. */
      "prioritize-lcp-image": 'Use the `next/image` component and set "priority" to true to preload LCP image. [Learn more](https://nextjs.org/docs/api-reference/next/image#priority).',
      /** Additional description of a Lighthouse audit that tells the user to use the next/image component to make sure `width` and `height` of image elements are always specified. */
      "unsized-images": "Use the `next/image` component to make sure images are always sized appropriately. [Learn more](https://nextjs.org/docs/api-reference/next/image#width)."
    };
    module.exports = {
      id: "next.js",
      title: "Next.js",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/nitropack.js
var require_nitropack = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/nitropack.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="142" height="54"><g fill="none" fill-rule="evenodd"><g fill="%231B004E"><path d="M19.486 53.24h-3.891L4.682 39.247v13.936H0V32.946h5.444l9.475 12.398V32.946h4.567zM21.346 32.94h4.647v3.57h-4.647v-3.57Zm0 5.477h4.647V53.18h-4.647V38.417ZM40.569 53.183H36c-3.408 0-4.991-1.625-4.991-4.697v-6.22h-3.777V38.42h3.777v-5.474h4.598v5.474h4.958v3.846h-4.958v4.588c0 1.597.477 2.252 2.197 2.252h2.764v4.077ZM46.688 53.183h-4.57V38.42h4.57v2.308c.31-.686 1.351-2.336 4.425-2.336h3.13v4.56h-4.004c-2.593 0-3.55.967-3.55 3.019v7.212ZM70.612 45.802c0 4.56-3.409 7.75-8.01 7.75s-8.006-3.19-8.006-7.75c0-4.56 3.408-7.755 8.006-7.755 4.598 0 8.01 3.195 8.01 7.755Zm-4.599 0c0-2.14-1.35-3.733-3.408-3.733-2.057 0-3.44 1.594-3.44 3.733 0 2.139 1.41 3.733 3.44 3.733 2.03 0 3.408-1.598 3.408-3.733ZM72.47 32.946h11.7c4.543 0 7.192 2.28 7.192 6.526 0 4.247-2.649 6.577-7.191 6.577h-6.935v7.125h-4.765V32.946Zm4.766 4.218v4.676h6.485c1.832 0 2.736-.883 2.736-2.34 0-1.565-.904-2.336-2.736-2.336h-6.485ZM102.662 51.016c-.254.485-1.636 2.48-4.71 2.48-3.665 0-6.627-2.906-6.627-7.694 0-4.789 2.962-7.667 6.656-7.667 2.962 0 4.372 1.851 4.626 2.336v-2.05h4.567v14.762h-4.512v-2.167Zm-3.327-8.932c-2.03 0-3.384 1.594-3.384 3.733 0 2.14 1.354 3.733 3.384 3.733s3.327-1.597 3.327-3.733-1.298-3.733-3.327-3.733ZM119.184 43.578a2.98 2.98 0 0 0-2.749-1.494c-1.918 0-3.13 1.594-3.13 3.733 0 2.14 1.24 3.758 3.158 3.758 1.807 0 2.625-1.168 2.764-1.51h4.4c-.143 2.052-2.116 5.5-7.275 5.5-4.286 0-7.641-3.078-7.641-7.75 0-4.673 3.328-7.755 7.585-7.755 5.159 0 7.105 3.392 7.33 5.53l-4.442-.012ZM129.712 46.6v6.577h-4.567V32.194h4.567v11.998l5.838-5.784h5.751l-6.994 6.811 7.362 7.952h-5.921z"/></g><g fill="%2325F5CE"><path d="M49.159 4.65c12.832 0 23.235 10.41 23.235 23.251h4.648C77.042 12.491 64.558 0 49.159 0c-15.4 0-27.883 12.492-27.883 27.901h4.647c0-12.841 10.403-23.25 23.236-23.25Z"/><path d="M44.852 25.793a3.632 3.632 0 0 1 2.6-5.097L63.8 16.951 50.426 27.09a3.626 3.626 0 0 1-5.574-1.296Z"/></g></g></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Reduce Unused CSS` is the name of a feature and becomes link text to additional documentation.*/
      "unused-css-rules": "Enable [`Reduce Unused CSS`](https://support.nitropack.io/hc/en-us/articles/360020418457-Reduce-Unused-CSS) to remove CSS rules that are not applicable to this page.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Image Optimization` is the name of a feature and becomes link text to additional documentation. `WebP` is the name of a standardized image format for the web.*/
      "modern-image-formats": "Use [`Image Optimization`](https://support.nitropack.io/hc/en-us/articles/16547237162513) to automatically convert your images to WebP.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Automatic Image Lazy Loading` is the name of a feature and becomes link text to additional documentation.*/
      "offscreen-images": "Defer offscreen images by enabling [`Automatic Image Lazy Loading`](https://support.nitropack.io/hc/en-us/articles/12457493524369-NitroPack-Lazy-Loading-Feature-for-Images).",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Remove render-blocking resources` is the name of a feature and becomes link text to additional documentation.*/
      "render-blocking-resources": "Enable [`Remove render-blocking resources`](https://support.nitropack.io/hc/en-us/articles/13820893500049-How-to-Deal-with-Render-Blocking-Resources-in-NitroPack) in NitroPack for faster initial load times.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Minify resources` is the name of a feature and becomes link text to additional documentation.*/
      "unminified-css": "Enable [`Minify resources`](https://support.nitropack.io/hc/en-us/articles/360061059394-Minify-Resources) in your Caching settings to reduce the size of your CSS, HTML, and JavaScript files for faster load times.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Minify resources` is the name of a feature and becomes link text to additional documentation.*/
      "unminified-javascript": "Enable [`Minify resources`](https://support.nitropack.io/hc/en-us/articles/360061059394-Minify-Resources) in your Caching settings to reduce the size of your JS, HTML, and CSS files for faster load times.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Delayed Scripts` is the name of a feature and becomes link text to additional documentation.*/
      "unused-javascript": "Configure [`Delayed Scripts`](https://support.nitropack.io/hc/en-us/articles/1500002600942-Delayed-Scripts) in NitroPack to delay loading of scripts until they are needed.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Improve Server Response Time` is the name of a feature and becomes link text to additional documentation.*/
      "uses-long-cache-ttl": "Go to the [`Improve Server Response Time`](https://support.nitropack.io/hc/en-us/articles/1500002321821-Improve-Server-Response-Time) feature in the `Caching` menu and adjust your page cache expiration time to improve loading times and user experience.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Image Optimization` is the name of a feature and becomes link text to additional documentation.*/
      "uses-optimized-images": "Automatically compress, optimize, and convert your images into WebP by enabling the [`Image Optimization`](https://support.nitropack.io/hc/en-us/articles/14177271695121-How-to-serve-images-in-next-gen-formats-using-NitroPack) setting.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Gzip compression` is the name of a feature and becomes link text to additional documentation.*/
      "uses-text-compression": "Use [`Gzip compression`](https://support.nitropack.io/hc/en-us/articles/13229297479313-Enabling-GZIP-compression) in NitroPack to reduce the size of the files that are sent to the browser.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Adaptive Image Sizing` is the name of a feature and becomes link text to additional documentation.*/
      "uses-responsive-images": "Enable [`Adaptive Image Sizing`](https://support.nitropack.io/hc/en-us/articles/10123833029905-How-to-Enable-Adaptive-Image-Sizing-For-Your-Site) to preemptively optimize your images and make them match the dimensions of the containers they\u2019re displayed in across all devices.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `HTML Lazy Load` is the name of a feature.*/
      "dom-size": "Contact your account manager to enable [`HTML Lazy Load`](https://support.nitropack.io/hc/en-us/articles/17144942904337). Configuring it will prioritize and optimize your page rendering performance.",
      /** Additional description of a Lighthouse audit for a third-party framework called `NitroPack`. This is displayed after a user expands the section to see more. No character length limits. `Override Font Rendering Behavior` is the name of a feature and becomes link text to additional documentation.*/
      "font-display": "Use the [`Override Font Rendering Behavior`](https://support.nitropack.io/hc/en-us/articles/16547358865041) option in NitroPack to set a desired value for the CSS font-display rule."
    };
    module.exports = {
      id: "nitropack",
      title: "NitroPack",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/nuxt.js
var require_nuxt = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/nuxt.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512"><path fill="%2300DC82" d="M281.44 397.667h156.88c5.006 0 9.798-1.759 14.133-4.244.336-2.481 8.805-5.596 11.307-9.894 2.502-4.297 4.242-9.173 4.24-14.134-.002-4.962-1.734-9.836-4.24-14.131l-106-182.321c-2.502-4.297-5.559-7.413-9.893-9.894-4.335-2.48-10.542-4.24-15.547-4.24-5.005 0-9.799 1.76-14.133 4.24-4.335 2.481-7.392 5.597-9.894 9.894l-26.853 46.64-53.707-90.457c-2.504-4.296-5.557-8.823-9.893-11.303-4.336-2.481-9.127-2.827-14.133-2.827-5.006 0-9.798.346-14.134 2.827-4.335 2.48-8.802 7.007-11.306 11.303L46.827 355.268c-2.506 4.295-2.8259.169-2.827 14.131-.002 4.961.325 9.836 2.827 14.134 2.502 4.297 6.97 7.413 11.306 9.894 4.336 2.481 9.127 4.24 14.134 4.24H171.2c39.201 0 67.734-17.585 87.627-50.88L306.88 263.4l25.44-43.813 77.733 132.853H306.88l-25.44 45.227ZM169.787 352.44h-69.254l103.174-178.08L256 263.4l-34.639 60.384c-13.21 21.603-28.272 28.656-51.574 28.656Z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to serve modern formats like WebP. */
      "modern-image-formats": 'Use the `nuxt/image` component and set `format="webp"`. [Learn more](https://image.nuxt.com/usage/nuxt-img#format).',
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to defer loading images which are not shown on screen. */
      "offscreen-images": 'Use the `nuxt/image` component and set `loading="lazy"` for offscreen images. [Learn more](https://image.nuxt.com/usage/nuxt-img#loading).',
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to automatically compress their images. */
      "uses-optimized-images": "Use the `nuxt/image` component and set the appropriate `quality`. [Learn more](https://image.nuxt.com/usage/nuxt-img#quality).",
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to serve appropriately sized images to different devices. */
      "uses-responsive-images": "Use the `nuxt/image` component and set the appropriate `sizes`. [Learn more](https://image.nuxt.com/usage/nuxt-img#sizes).",
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to prioritize the loading of the image that is part of the Largest Contentful Paint (LCP). */
      "prioritize-lcp-image": "Use the `nuxt/image` component and specify `preload` for LCP image. [Learn more](https://image.nuxt.com/usage/nuxt-img#preload).",
      /** Additional description of a Lighthouse audit that tells the user to use the nuxt/image component to provide explicit `width` and `height` for images to prevent layout shift. */
      "unsized-images": "Use the `nuxt/image` component and specify explicit `width` and `height`. [Learn more](https://image.nuxt.com/usage/nuxt-img#width-height)."
    };
    module.exports = {
      id: "nuxt",
      title: "Nuxt",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/octobercms.js
var require_octobercms = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/octobercms.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310"><path fill="none" d="M-1-1h802v602H-1z"/><path fill="%23de6c26" d="M135 6.9c-14.2 4.4-34.9 21.8-49.9 42C55.8 88.5 39.6 135.8 41.4 177c.8 20.2 4.9 35.5 14.4 54.5 13.6 27.4 40.8 55.1 65.5 66.9 14.1 6.7 13.4 6.9 14.1-2.8.3-4.4 1-32.4 1.6-62.1 2.7-137.3 4.4-176 8.2-191.3.6-2.3 1.4-4.2 1.9-4.2 1.2 0 3.6 9.1 4.9 18.3.5 4.3 1 17.7 1 29.8 0 12 .3 21.9.7 21.9.3 0 5.7-5 11.9-11 6.9-6.8 12-11 13.3-11 1.8 0 1.9.3 1 2.7-1.2 3.1-7.9 13.2-19.1 28.5L153 128l.1 31.2c.1 17.2.4 37.4.8 44.9l.6 13.7 11-12.6c14-16 35.1-37.1 39.5-39.6l3.3-1.9-.6 3.2c-2 9.8-9.5 20.7-37.4 54.3L154 240.8v31.1c0 18.3.4 31.1.9 31.1 2.8 0 19.3-6.4 26.8-10.5 13.8-7.3 23.8-15 38.3-29.5 15.7-15.7 24.4-27.4 33.4-45.2 20.5-40 21-80.3 1.6-119-17.8-35.6-54.6-72.1-87.8-86.9-11.7-5.3-24.6-7.3-32.2-5z"/></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused CSS, in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-css-rules": "Consider reviewing the [plugins](https://octobercms.com/plugins) loading unused CSS on the website. To identify plugins that add unnecessary CSS, run [code coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage) in Chrome DevTools. Identify the theme/plugin responsible from the stylesheet URL. Look for plugins with many stylesheets with lots of red in code coverage. A plugin should only add a stylesheet if it is actually used on the web page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using webp in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "modern-image-formats": "Consider using a [plugin](https://octobercms.com/plugins?search=image) or service that will automatically convert the uploaded images to the optimal formats. [WebP lossless images](https://developers.google.com/speed/webp) are 26% smaller in size compared to PNGs and 25-34% smaller than comparable JPEG images at the equivalent SSIM quality index. Another next-gen image format to consider is [AVIF](https://jakearchibald.com/2020/avif-has-landed/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by lazy loading images that are initially offscreen in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Consider installing an [image lazy loading plugin](https://octobercms.com/plugins?search=lazy) that provides the ability to defer any offscreen images, or switch to a theme that provides that functionality. Also consider using [the AMP plugin](https://octobercms.com/plugins?search=Accelerated+Mobile+Pages).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by reducing the total bytes delivered by their page in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "total-byte-weight": "Consider showing excerpts in the post lists (e.g. using a `show more` button), reducing the number of posts shown on a given web page, breaking long posts into multiple web pages, or using a plugin to lazy-load comments.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by reducing the amount of render blocking resources present on their page, in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "render-blocking-resources": "There are many plugins that help [inline critical assets](https://octobercms.com/plugins?search=css). These plugins may break other plugins, so you should test thoroughly.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": "There are many [plugins](https://octobercms.com/plugins?search=css) that can speed up a website by concatenating, minifying and compressing the styles. Using a build process to do this minification up-front can speed up development.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": "There are many [plugins](https://octobercms.com/plugins?search=javascript) that can speed up a website by concatenating, minifying and compressing the scripts. Using a build process to do this minification up-front can speed up development.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by encoding animated images as video, in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "efficient-animated-content": "[Replace animated GIFs with video](https://web.dev/replace-gifs-with-videos/) for faster web page loads and consider using modern file formats such as [WebM](https://web.dev/replace-gifs-with-videos/#create-webm-videos) or [AV1](https://developers.google.com/web/updates/2018/09/chrome-70-media-updates#av1-decoder) to improve compression efficiency by greater than 30% over the current state-of-the-art video codec, VP9.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "Consider reviewing the [plugins](https://octobercms.com/plugins?search=javascript) that load unused JavaScript in the web page. To identify plugins that add unnecessary JavaScript, run [code coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage) in Chrome DevTools. Identify the theme/plugin responsible from the URL of the script. Look for plugins with many scripts with lots of red in code coverage. A plugin should only add a script if it is actually used on the web page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve their site by enabling long caching in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-long-cache-ttl": "Read about [preventing unnecessary network requests with the HTTP Cache](https://web.dev/http-cache/#caching-checklist). There are many [plugins](https://octobercms.com/plugins?search=Caching) that can be used to speed up caching.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site performance by optimizing images, in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-optimized-images": "Consider using an [image optimization plugin](https://octobercms.com/plugins?search=image) to compresses images while retaining the quality.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance via enabling text compression in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-text-compression": "Enable text compression in the web server configuration.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using responsive images in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "Upload images directly in the media manager to ensure the required image sizes are available. Consider using the [resize filter](https://octobercms.com/docs/markup/filter-resize) or an [image resizing plugin](https://octobercms.com/plugins?search=image) to ensure the optimal image sizes are used.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the time to first byte speed metric, in the context of the October CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "Themes, plugins and server specifications all contribute to the server response time. Consider finding a more optimized theme, carefully selecting an optimization plugin and/or upgrade the server. October CMS also allows developers to use [`Queues`](https://octobercms.com/docs/services/queues) to defer the processing of a time consuming task, such as sending an e-mail. This drastically speeds up web requests."
    };
    module.exports = {
      id: "octobercms",
      title: "October CMS",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/react.js
var require_react = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/react.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="%2361DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the React library. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": "If your build system minifies CSS files automatically, ensure that you are deploying the production build of your application. You can check this with the React Developer Tools extension. [Learn more](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the React library. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": "If your build system minifies JS files automatically, ensure that you are deploying the production build of your application. You can check this with the React Developer Tools extension. [Learn more](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the React library. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "If you are not server-side rendering, [split your JavaScript bundles](https://web.dev/code-splitting-suspense/) with `React.lazy()`. Otherwise, code-split using a third-party library such as [loadable-components](https://www.smooth-code.com/open-source/loadable-components/docs/getting-started/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the time to first byte speed metric, in the context of the React library. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "If you are server-side rendering any React components, consider using `renderToPipeableStream()` or `renderToStaticNodeStream()` to allow the client to receive and hydrate different parts of the markup instead of all at once. [Learn more](https://reactjs.org/docs/react-dom-server.html#renderToPipeableStream).",
      /** Additional description of a Lighthouse audit that tells the user how they can minimize redirects, in the context of the React library. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "redirects": "If you are using React Router, minimize usage of the `<Redirect>` component for [route navigations](https://reacttraining.com/react-router/web/api/Redirect).",
      /** Additional description of a Lighthouse audit that tells the user how they can use the Profiler to help measure performance. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "user-timings": "Use the React DevTools Profiler, which makes use of the Profiler API, to measure the rendering performance of your components. [Learn more.](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)",
      /** Additional description of a Lighthouse audit that tells the user *why* and *how* they should reduce the size of the web page"s DOM, in the context of the React library, as well as how to maximize component performance when many DOM nodes are present. 'Learn More' becomes link text to additional documentation. */
      "dom-size": 'Consider using a "windowing" library like `react-window` to minimize the number of DOM nodes created if you are rendering many repeated elements on the page. [Learn more](https://web.dev/virtualize-long-lists-react-window/). Also, minimize unnecessary re-renders using [`shouldComponentUpdate`](https://reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action), [`PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent), or [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo) and [skip effects](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) only until certain dependencies have changed if you are using the `Effect` hook to improve runtime performance.'
    };
    module.exports = {
      id: "react",
      title: "React",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/wix.js
var require_wix = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/wix.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 28"><path fill-rule="evenodd" d="M0 .032s2.796-.356 4.66 1.31C5.81 2.37 6.145 4.008 6.145 4.008L9.952 18.96l3.165-12.239c.309-1.301.864-2.909 1.743-3.997 1.121-1.385 3.398-1.472 3.641-1.472.242 0 2.519.087 3.639 1.472.88 1.088 1.435 2.696 1.744 3.997l3.165 12.239 3.806-14.953s.336-1.638 1.486-2.666C34.205-.324 37 .032 37 .032l-7.289 27.945s-2.404.176-3.607-.446c-1.58-.816-2.332-1.447-3.289-5.249l-.099-.395c-.349-1.399-.883-3.59-1.424-5.813l-.162-.667-.162-.664c-.779-3.198-1.497-6.143-1.612-6.517-.108-.351-.236-1.187-.855-1.187-.607 0-.746.837-.857 1.187-.13.412-.99 3.955-1.856 7.514l-.162.667c-.512 2.107-1.01 4.151-1.341 5.48l-.1.395c-.956 3.802-1.708 4.433-3.288 5.249-1.204.622-3.608.446-3.608.446zM43.998 5v.995L44 5.994v16.628c-.014 3.413-.373 4.17-1.933 4.956-1.213.61-3.067.379-3.067.379V9.332c0-.935.315-1.548 1.477-2.098.693-.329 1.34-.58 2.012-.953C43.54 5.703 43.998 5 43.998 5zM46 .125s3.877-.673 5.797 1.107c1.228 1.14 2.602 3.19 2.602 3.19l3.38 4.965c.164.258.378.54.72.54.343 0 .558-.282.722-.54l3.38-4.965s1.374-2.05 2.602-3.19C67.123-.548 71 .125 71 .125l-9.186 13.923 9.161 13.881-.032.004c-.38.045-4.036.423-5.855-1.266-1.229-1.138-2.487-2.992-2.487-2.992l-3.38-4.964c-.164-.26-.379-.54-.721-.54-.343 0-.557.28-.721.54l-3.38 4.964s-1.19 1.854-2.418 2.992c-1.92 1.783-5.957 1.262-5.957 1.262l9.161-13.88zM43.96 0H44c0 1.91-.186 3.042-1.387 3.923-.384.28-1.048.71-1.826.992C39.719 5.304 39 6 39 6c0-3.476.53-4.734 1.95-5.48.865-.452 2.272-.514 2.82-.52z"></path></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user to optimize image formats, in the context of the Wix CMS platform. */
      "modern-image-formats": "Upload images using `Wix Media Manager` to ensure they are automatically served as WebP. Find [more ways to optimize](https://support.wix.com/en/article/site-performance-optimizing-your-media) your site's media.",
      /** Additional description of a Lighthouse audit that tells the user to defer loading of non-critical third-party libraries, in the context of the Wix CMS platform. */
      "render-blocking-resources": "When [adding third-party code](https://support.wix.com/en/article/site-performance-using-third-party-code-on-your-site) in the `Custom Code` tab of your site's dashboard, make sure it's deferred or loaded at the end of the code body. Where possible, use Wix\u2019s [integrations](https://support.wix.com/en/article/about-marketing-integrations) to embed marketing tools on your site. ",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by avoiding animated images and using videos where possible, in the context of the Wix CMS platform. */
      "efficient-animated-content": "Place videos inside `VideoBoxes`, customize them using `Video Masks` or add `Transparent Videos`. [Learn more](https://support.wix.com/en/article/wix-video-about-wix-video).",
      /** Additional description of a Lighthouse audit that tells the user to be aware of JavaScript code that is not used, particularly from third-parties, in the context of the Wix CMS platform. */
      "unused-javascript": "Review any third-party code you've added to your site in the `Custom Code` tab of your site's dashboard and only keep the services that are necessary to your site. [Find out more](https://support.wix.com/en/article/site-performance-removing-unused-javascript).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the server response time, in the context of the Wix CMS platform. */
      "server-response-time": "Wix utilizes CDNs and caching to serve responses as fast as possible for most visitors. Consider [manually enabling caching](https://support.wix.com/en/article/site-performance-caching-pages-to-optimize-loading-speed) for your site, especially if using `Velo`."
    };
    module.exports = {
      id: "wix",
      title: "Wix",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/wordpress.js
var require_wordpress = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/wordpress.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.5 122.5"><g fill="%232f3439"><path d="M8.7 61.3c0 20.8 12.1 38.7 29.6 47.3l-25-68.7c-3 6.5-4.6 13.7-4.6 21.4zm88-2.7c0-6.5-2.3-11-4.3-14.5-2.7-4.3-5.2-8-5.2-12.3 0-4.8 3.7-9.3 8.9-9.3h.7a52.4 52.4 0 0 0-79.4 9.9h3.3c5.5 0 14-.6 14-.6 2.9-.2 3.2 4 .4 4.3 0 0-2.9.4-6 .5l19.1 57L59.7 59l-8.2-22.5c-2.8-.1-5.5-.5-5.5-.5-2.8-.1-2.5-4.5.3-4.3 0 0 8.7.7 13.9.7 5.5 0 14-.7 14-.7 2.8-.2 3.2 4 .3 4.3 0 0-2.8.4-6 .5l19 56.5 5.2-17.5c2.3-7.3 4-12.5 4-17z"/><path d="m62.2 65.9-15.8 45.8a52.6 52.6 0 0 0 32.3-.9l-.4-.7zM107.4 36a49.6 49.6 0 0 1-3.6 24.2l-16.1 46.5A52.5 52.5 0 0 0 107.4 36z"/><path d="M61.3 0a61.3 61.3 0 1 0 .1 122.7A61.3 61.3 0 0 0 61.3 0zm0 119.7a58.5 58.5 0 1 1 .1-117 58.5 58.5 0 0 1-.1 117z"/></g></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused CSS, in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-css-rules": "Consider reducing, or switching, the number of [WordPress plugins](https://wordpress.org/plugins/) loading unused CSS in your page. To identify plugins that are adding extraneous CSS, try running [code coverage](https://developer.chrome.com/docs/devtools/coverage/) in Chrome DevTools. You can identify the theme/plugin responsible from the URL of the stylesheet. Look out for plugins that have many stylesheets in the list which have a lot of red in code coverage. A plugin should only enqueue a stylesheet if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve image loading by using webp in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. */
      "modern-image-formats": "Consider using the [Performance Lab](https://wordpress.org/plugins/performance-lab/) plugin to automatically convert your uploaded JPEG images into WebP, wherever supported.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by lazy loading images that are initially offscreen in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "offscreen-images": "Install a [lazy-load WordPress plugin](https://wordpress.org/plugins/search/lazy+load/) that provides the ability to defer any offscreen images, or switch to a theme that provides that functionality. Also consider using [the AMP plugin](https://wordpress.org/plugins/amp/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site loading performance by reducing the total bytes delivered by their page in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "total-byte-weight": "Consider showing excerpts in your post lists (e.g. via the more tag), reducing the number of posts shown on a given page, breaking your long posts into multiple pages, or using a plugin to lazy-load comments.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by reducing the amount of render blocking resources present on their page, in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "render-blocking-resources": "There are a number of WordPress plugins that can help you [inline critical assets](https://wordpress.org/plugins/search/critical+css/) or [defer less important resources](https://wordpress.org/plugins/search/defer+css+javascript/). Beware that optimizations provided by these plugins may break features of your theme or plugins, so you will likely need to make code changes.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their CSS files in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-css": "A number of [WordPress plugins](https://wordpress.org/plugins/search/minify+css/) can speed up your site by concatenating, minifying, and compressing your styles. You may also want to use a build process to do this minification up-front if possible.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by minifying their Javascript files in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unminified-javascript": "A number of [WordPress plugins](https://wordpress.org/plugins/search/minify+javascript/) can speed up your site by concatenating, minifying, and compressing your scripts. You may also want to use a build process to do this minification up front if possible.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by encoding animated images as video, in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "efficient-animated-content": "Consider uploading your GIF to a service which will make it available to embed as an HTML5 video.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by removing unused Javascript files in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "unused-javascript": "Consider reducing, or switching, the number of [WordPress plugins](https://wordpress.org/plugins/) loading unused JavaScript in your page. To identify plugins that are adding extraneous JS, try running [code coverage](https://developer.chrome.com/docs/devtools/coverage/) in Chrome DevTools. You can identify the theme/plugin responsible from the URL of the script. Look out for plugins that have many scripts in the list which have a lot of red in code coverage. A plugin should only enqueue a script if it is actually used on the page.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve their site by enabling long caching in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-long-cache-ttl": "Read about [Browser Caching in WordPress](https://wordpress.org/support/article/optimization/#browser-caching).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve site performance by optimizing images, in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-optimized-images": "Consider using an [image optimization WordPress plugin](https://wordpress.org/plugins/search/optimize+images/) that compresses your images while retaining quality.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance via enabling text compression in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-text-compression": "You can enable text compression in your web server configuration.",
      /** Additional description of a Lighthouse audit that tells the user how they can improve performance by using responsive images in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "uses-responsive-images": "Upload images directly through the [media library](https://wordpress.org/support/article/media-library-screen/) to ensure that the required image sizes are available, and then insert them from the media library or use the image widget to ensure the optimal image sizes are used (including those for the responsive breakpoints). Avoid using `Full Size` images unless the dimensions are adequate for their usage. [Learn More](https://wordpress.org/support/article/inserting-images-into-posts-and-pages/).",
      /** Additional description of a Lighthouse audit that tells the user how they can improve the time to first byte speed metric, in the context of the Wordpress CMS platform. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
      "server-response-time": "Choose a lightweight theme (ideally a block theme) and implement full-page caching or a static site solution. Disable unnecessary plugins to minimize server overhead. Consider upgrading your hosting to managed or dedicated service."
    };
    module.exports = {
      id: "wordpress",
      title: "WordPress",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/packs/wp-rocket.js
var require_wp_rocket = __commonJS({
  "node_modules/lighthouse-stack-packs/packs/wp-rocket.js"(exports, module) {
    var icon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294 524"><defs><linearGradient id="a" x1="36.742%" x2="37.116%" y1="100.518%" y2="-.001%"><stop offset="0%" stop-color="%23DD5F29"/><stop offset="26.042%" stop-color="%23F26B32"/><stop offset="100%" stop-color="%23FAC932"/></linearGradient><linearGradient id="b" x1="28.046%" x2="28.421%" y1="100.518%" y2="-.003%"><stop offset="0%" stop-color="%23DD5F29"/><stop offset="26.042%" stop-color="%23F26B32"/><stop offset="100%" stop-color="%23FAC932"/></linearGradient><linearGradient id="c" x1="38.215%" x2="38.589%" y1="100.518%" y2="0%"><stop offset="0%" stop-color="%23DD5F29"/><stop offset="26.042%" stop-color="%23F26B32"/><stop offset="100%" stop-color="%23FAC932"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(%23a)" d="M218.617 270.615c-9.752 0-18.896-5.689-23.366-14.63l-7.72-17.27h-76.6l-7.722 17.27c-4.47 8.941-13.613 14.63-23.366 14.63H75.78l32.712 249.306c1.625 4.671 4.673 4.671 6.502 0l32.51-79.648 28.242 79.442c1.625 4.676 4.673 4.676 6.501 0L220.04 270.82l-1.423-.204Z" transform="translate(-1.58 -.2)"/><path fill="url(%23b)" d="M184.47 231.784h-70.3l-10.77 24.179c-3.657 7.314-10.768 12.597-18.489 14.02L109.7 423.791c1.625 2.844 4.673 2.844 6.501 0l31.697-48.155 29.055 47.951c1.829 2.845 4.673 2.845 6.502 0l28.039-154.012c-6.908-2.032-13.004-6.908-16.255-13.613l-10.768-24.18Z" transform="translate(-1.58 -.2)"/><path fill="url(%23c)" d="m195.259 255.988-46.123-103.014-45.92 103.014c-1.625 3.048-3.656 5.69-6.095 7.925l19.1 102.2c1.015 1.423 3.657 1.83 5.485 0l25.601-33.931 25.602 33.728c1.625 2.032 4.47 1.626 5.485 0l21.131-103.42c-1.625-2.032-3.047-4.064-4.266-6.502Z" transform="translate(-1.58 -.2)"/><path fill="%23F56F46" d="M.439 12.559c-1.422-4.877 1.422-8.33 6.299-8.33H47.17c2.845 0 5.486 2.437 6.299 4.876l29.665 116.83h1.422l53.437-121.3c1.016-2.032 3.048-3.86 5.892-3.86h6.299c3.047 0 5.08 1.625 5.892 3.86l53.437 121.3h1.423L240.6 9.105c.61-2.439 3.454-4.877 6.299-4.877h40.433c4.877 0 7.518 3.454 6.299 8.33l-65.221 231.63c-.61 2.845-3.454 4.876-6.298 4.876h-5.487c-2.438 0-4.876-1.625-5.892-3.86l-63.19-141.009h-1.015L83.744 245.203c-1.016 2.032-3.454 3.86-5.892 3.86h-5.486c-2.845 0-5.486-2.031-6.299-4.876L.44 12.559Z"/></g></svg>`;
    var UIStrings2 = {
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Remove Unused CSS is a name of the feature */
      "unused-css-rules": `Enable [Remove Unused CSS](https://docs.wp-rocket.me/article/1529-remove-unused-css) in 'WP Rocket' to fix this issue. It reduces page size by removing all CSS and stylesheets that are not used while keeping only the used CSS for each page.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. `Imagify` is an image optimization add-on */
      "modern-image-formats": `Enable 'Imagify' from the Image Optimization tab in 'WP Rocket' to convert your images to WebP.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Delay JavaScript, LazyLoad for iframes and videos and Replace YouTube iframe with preview image are names of the features */
      "unused-javascript": `Enable [Delay JavaScript execution](https://docs.wp-rocket.me/article/1349-delay-javascript-execution) in 'WP Rocket' to fix this problem. It will improve the loading of your page by delaying the execution of scripts until user interaction. If your site has iframes, you can use WP Rocket's [LazyLoad for iframes and videos](https://docs.wp-rocket.me/article/1674-lazyload-for-iframes-and-videos) and [Replace YouTube iframe with preview image](https://docs.wp-rocket.me/article/1488-replace-youtube-iframe-with-preview-image) as well.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Remove Unused CSS, Load JavaScript deferred are names of the features */
      "render-blocking-resources": `Enable [Remove Unused CSS](https://docs.wp-rocket.me/article/1529-remove-unused-css) and [Load JavaScript deferred](https://docs.wp-rocket.me/article/1265-load-javascript-deferred) in 'WP Rocket' to address this recommendation. These features will respectively optimize the CSS and JavaScript files so that they don't block the rendering of your page.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Minify CSS Files is a name of the feature */
      "unminified-css": `Enable [Minify CSS files](https://docs.wp-rocket.me/article/1350-css-minify-combine) in 'WP Rocket' to fix this issue. Any spaces and comments in your site's CSS files will be removed to make the file size smaller and faster to download.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Minify JavaScript Files is a name of the feature */
      "unminified-javascript": `Enable [Minify JavaScript files](https://docs.wp-rocket.me/article/1351-javascript-minify-combine) in 'WP Rocket' to fix this issue. Empty spaces and comments will be removed from JavaScript files to make their size smaller and faster to download.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. `Imagify` is an image optimization add-on */
      "uses-optimized-images": `Enable 'Imagify' from the Image Optimization tab in 'WP Rocket' and run Bulk Optimization to compress your images.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Prefetch DNS Requests, Enable CDN are names of the features */
      "uses-rel-preconnect": `Use [Prefetch DNS Requests](https://docs.wp-rocket.me/article/1302-prefetch-dns-requests) in 'WP Rocket' to add "dns-prefetch" and speed up the connection with external domains. Also, 'WP Rocket' automatically adds "preconnect" to [Google Fonts domain](https://docs.wp-rocket.me/article/1312-optimize-google-fonts) and any CNAME(S) added via the [Enable CDN](https://docs.wp-rocket.me/article/42-using-wp-rocket-with-a-cdn) feature.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. Remove Unused CSS is a name of the feature*/
      "uses-rel-preload": `To fix this issue for fonts, enable [Remove Unused CSS](https://docs.wp-rocket.me/article/1529-remove-unused-css) in 'WP Rocket'. Your site's critical fonts will be preloaded with priority.`,
      /** Additional description of a Lighthouse audit for a third-party framework called 'WP Rocket'. This is displayed after a user expands the section to see more. No character length limits. LazyLoad for images is a name of the feature*/
      "offscreen-images": `Enable [LazyLoad](https://docs.wp-rocket.me/article/1141-lazyload-for-images) in WP Rocket to fix this recommendation. This feature delays the loading of the images until the visitor scrolls down the page and actually needs to see them.`
    };
    module.exports = {
      id: "wp-rocket",
      title: "WP Rocket",
      icon,
      UIStrings: UIStrings2
    };
  }
});

// node_modules/lighthouse-stack-packs/index.js
var require_lighthouse_stack_packs = __commonJS({
  "node_modules/lighthouse-stack-packs/index.js"(exports, module) {
    var stackPacks2 = [
      require_amp(),
      require_angular(),
      require_drupal(),
      require_ezoic(),
      require_gatsby(),
      require_joomla(),
      require_magento(),
      require_next(),
      require_nitropack(),
      require_nuxt(),
      require_octobercms(),
      require_react(),
      require_wix(),
      require_wordpress(),
      require_wp_rocket()
    ];
    module.exports = stackPacks2;
  }
});

// node_modules/third-party-web/dist/entities-nostats.json
var require_entities_nostats = __commonJS({
  "node_modules/third-party-web/dist/entities-nostats.json"(exports, module) {
    module.exports = [{ name: "Google/Doubleclick Ads", company: "Google", homepage: "https://marketingplatform.google.com/about/enterprise/", category: "ad", domains: ["adservice.google.com", "adservice.google.com.au", "adservice.google.com.sg", "adservice.google.com.br", "adservice.google.com.ua", "adservice.google.co.uk", "adservice.google.co.jp", "adservice.google.co.in", "adservice.google.co.kr", "adservice.google.co.id", "adservice.google.co.nz", "adservice.google.ie", "adservice.google.se", "adservice.google.de", "adservice.google.ca", "adservice.google.be", "adservice.google.es", "adservice.google.ch", "adservice.google.fr", "adservice.google.nl", "*.googleadservices.com", "*.googlesyndication.com", "*.googletagservices.com", "*.2mdn.net", "*.doubleclick.net"] }, { name: "Facebook", homepage: "https://www.facebook.com", category: "social", domains: ["*.facebook.com", "*.atlassbx.com", "*.fbsbx.com", "fbcdn-photos-e-a.akamaihd.net", "*.facebook.net", "*.fbcdn.net"], products: [{ name: "Facebook Messenger Customer Chat", urlPatterns: ["REGEXP:connect\\.facebook\\.net\\/.*\\/sdk\\/xfbml\\.customerchat\\.js"], facades: [{ name: "React Live Chat Loader", repo: "https://github.com/calibreapp/react-live-chat-loader" }] }] }, { name: "Instagram", homepage: "https://www.instagram.com", category: "social", domains: ["*.cdninstagram.com", "*.instagram.com"] }, { name: "Google CDN", company: "Google", homepage: "https://developers.google.com/speed/libraries/", category: "cdn", domains: ["ajax.googleapis.com", "commondatastorage.googleapis.com", "www.gstatic.com", "ssl.gstatic.com"] }, { name: "Google Maps", company: "Google", homepage: "https://www.google.com/maps", category: "utility", domains: ["maps.google.com", "maps-api-ssl.google.com", "maps.googleapis.com", "mts.googleapis.com", "mt.googleapis.com", "mt0.googleapis.com", "mt1.googleapis.com", "mt2.googleapis.com", "mt3.googleapis.com", "khm0.googleapis.com", "khm1.googleapis.com", "khms.googleapis.com", "khms1.googleapis.com", "khms2.googleapis.com", "maps.gstatic.com"] }, { name: "Other Google APIs/SDKs", company: "Google", homepage: "https://developers.google.com/apis-explorer/#p/", category: "utility", domains: ["accounts.google.com", "apis.google.com", "calendar.google.com", "clients2.google.com", "cse.google.com", "news.google.com", "pay.google.com", "payments.google.com", "play.google.com", "smartlock.google.com", "www.google.com", "www.google.de", "www.google.co.jp", "www.google.com.au", "www.google.co.uk", "www.google.ie", "www.google.com.sg", "www.google.co.in", "www.google.com.br", "www.google.ca", "www.google.co.kr", "www.google.co.nz", "www.google.co.id", "www.google.fr", "www.google.be", "www.google.com.ua", "www.google.nl", "www.google.ru", "www.google.se", "www.googleapis.com", "imasdk.googleapis.com", "storage.googleapis.com", "translate.googleapis.com", "translate.google.com", "translate-pa.googleapis.com", "lh3.googleusercontent.com", "jnn-pa.googleapis.com", "csi.gstatic.com"] }, { name: "Firebase", homepage: "https://developers.google.com/apis-explorer/#p/", category: "utility", domains: ["firebasestorage.googleapis.com", "firestore.googleapis.com", "firebaseinstallations.googleapis.com", "firebase.googleapis.com", "firebaseremoteconfig.googleapis.com"] }, { name: "Google Analytics", company: "Google", homepage: "https://marketingplatform.google.com/about/analytics/", category: "analytics", domains: ["*.google-analytics.com", "*.urchin.com", "analytics.google.com"] }, { name: "Google Optimize", company: "Google", homepage: "https://marketingplatform.google.com/about/optimize/", category: "analytics", domains: ["www.googleoptimize.com"] }, { name: "Google AMP", company: "Google", homepage: "https://github.com/google/amp-client-id-library", category: "analytics", domains: ["ampcid.google.com"] }, { name: "Google Tag Manager", company: "Google", homepage: "https://marketingplatform.google.com/about/tag-manager/", category: "tag-manager", domains: ["*.googletagmanager.com"] }, { name: "Google Fonts", company: "Google", homepage: "https://fonts.google.com/", category: "cdn", domains: ["fonts.googleapis.com", "fonts.gstatic.com"] }, { name: "Adobe TypeKit", company: "Adobe", homepage: "https://fonts.adobe.com/", category: "cdn", domains: ["*.typekit.com", "*.typekit.net"] }, { name: "YouTube", homepage: "https://youtube.com", category: "video", domains: ["*.youtube.com", "*.ggpht.com", "*.youtube-nocookie.com", "*.ytimg.com"], products: [{ name: "YouTube Embedded Player", urlPatterns: ["youtube.com/embed/"], facades: [{ name: "Lite YouTube", repo: "https://github.com/paulirish/lite-youtube-embed" }, { name: "Ngx Lite Video", repo: "https://github.com/karim-mamdouh/ngx-lite-video" }] }] }, { name: "Twitter", homepage: "https://twitter.com", category: "social", domains: ["*.vine.co", "*.twimg.com", "*.twitpic.com", "platform.twitter.com", "syndication.twitter.com"] }, { name: "AddThis", homepage: "https://www.addthis.com/", category: "social", domains: ["*.addthis.com", "*.addthiscdn.com", "*.addthisedge.com"] }, { name: "AddToAny", homepage: "https://www.addtoany.com/", category: "social", domains: ["*.addtoany.com"] }, { name: "Akamai", homepage: "https://www.akamai.com/", category: "cdn", domains: ["23.62.3.183", "*.akamaitechnologies.com", "*.akamaitechnologies.fr", "*.akamai.net", "*.akamaiedge.net", "*.akamaihd.net", "*.akamaized.net", "*.edgefcs.net", "*.edgekey.net", "edgesuite.net", "*.srip.net"] }, { name: "Blogger", homepage: "https://www.blogger.com/", category: "hosting", domains: ["*.blogblog.com", "*.blogger.com", "*.blogspot.com", "images-blogger-opensocial.googleusercontent.com"] }, { name: "Gravatar", homepage: "https://en.gravatar.com/", category: "social", domains: ["*.gravatar.com"] }, { name: "Yandex Metrica", company: "Yandex", homepage: "https://metrica.yandex.com/about?", category: "analytics", domains: ["mc.yandex.ru", "mc.yandex.com", "d31j93rd8oukbv.cloudfront.net"] }, { name: "Hotjar", homepage: "https://www.hotjar.com/", category: "analytics", domains: ["*.hotjar.com", "*.hotjar.io"] }, { name: "Baidu Analytics", homepage: "https://tongji.baidu.com/web/welcome/login", category: "analytics", domains: ["hm.baidu.com", "hmcdn.baidu.com"] }, { name: "Insider", homepage: "", category: "analytics", domains: ["*.useinsider.com"] }, { name: "Adobe Experience Cloud", company: "Adobe", homepage: "", category: "analytics", domains: ["*.2o7.net", "du8783wkf05yr.cloudfront.net", "*.hitbox.com", "*.imageg.net", "*.nedstat.com", "*.omtrdc.net"] }, { name: "Adobe Tag Manager", company: "Adobe", homepage: "https://www.adobe.com/experience-platform/", category: "tag-manager", domains: ["*.adobedtm.com", "*.demdex.net", "*.everesttech.net", "sstats.adobe.com", "hbrt.adobe.com"] }, { name: "jQuery CDN", homepage: "https://code.jquery.com/", category: "cdn", domains: ["*.jquery.com"] }, { name: "Cloudflare CDN", homepage: "https://cdnjs.com/", category: "cdn", domains: ["cdnjs.cloudflare.com", "amp.cloudflare.com"] }, { name: "Cloudflare", homepage: "https://www.cloudflare.com/website-optimization/", category: "utility", domains: ["ajax.cloudflare.com", "*.nel.cloudflare.com", "static.cloudflareinsights.com"] }, { name: "WordPress", company: "Automattic", homepage: "https://wp.com/", category: "hosting", domains: ["*.wordpress.com", "s0.wp.com", "s2.wp.com", "*.w.org", "c0.wp.com", "s1.wp.com", "i0.wp.com", "i1.wp.com", "i2.wp.com", "widgets.wp.com"] }, { name: "WordPress Site Stats", company: "Automattic", homepage: "https://wp.com/", category: "analytics", domains: ["pixel.wp.com", "stats.wp.com"] }, { name: "Hatena Blog", homepage: "https://hatenablog.com/", category: "hosting", domains: ["*.st-hatena.com", "*.hatena.ne.jp"] }, { name: "Shopify", homepage: "https://www.shopify.com/", category: "hosting", domains: ["*.shopify.com", "*.shopifyapps.com", "*.shopifycdn.com", "*.shopifysvc.com"] }, { name: "Dealer", homepage: "https://www.dealer.com/", category: "hosting", domains: ["*.dealer.com"] }, { name: "PIXNET", homepage: "https://www.pixnet.net/", category: "social", domains: ["*.pixfs.net", "*.pixnet.net"] }, { name: "Moat", homepage: "https://moat.com/", category: "ad", domains: ["*.moatads.com", "*.moatpixel.com"] }, { name: "33 Across", homepage: "https://33across.com/", category: "ad", domains: ["*.33across.com"] }, { name: "OpenX", homepage: "https://www.openx.com/", category: "ad", domains: ["*.deliverimp.com", "*.openxadexchange.com", "*.servedbyopenx.com", "*.jump-time.net", "*.openx.net", "*.openxcdn.net"] }, { name: "Amazon Ads", homepage: "https://ad.amazon.com/", category: "ad", domains: ["*.amazon-adsystem.com"] }, { name: "Rubicon Project", homepage: "https://rubiconproject.com/", category: "ad", domains: ["*.rubiconproject.com", "*.chango.com", "*.fimserve.com"] }, { name: "The Trade Desk", homepage: "https://www.thetradedesk.com/", category: "ad", domains: ["*.adsrvr.org", "d1eoo1tco6rr5e.cloudfront.net"] }, { name: "Bidswitch", homepage: "https://www.bidswitch.com/", category: "ad", domains: ["*.bidswitch.net"] }, { name: "LiveRamp IdentityLink", homepage: "https://liveramp.com/discover-identitylink/", category: "analytics", domains: ["*.circulate.com", "*.rlcdn.com"] }, { name: "Drawbridge", homepage: "https://www.drawbridge.com/", category: "ad", domains: ["*.adsymptotic.com"] }, { name: "AOL / Oath / Verizon Media", homepage: "https://www.oath.com/", category: "ad", domains: ["*.advertising.com", "*.aol.com", "*.aolcdn.com", "*.blogsmithmedia.com", "*.oath.com", "*.aol.net", "*.tacoda.net", "*.aol.co.uk"] }, { name: "Xaxis", homepage: "https://www.xaxis.com/", category: "ad", domains: ["*.247realmedia.com", "*.mookie1.com", "*.gmads.net"] }, { name: "Freshdesk", company: "Freshworks", homepage: "https://freshdesk.com/", category: "customer-success", domains: ["d36mpcpuzc4ztk.cloudfront.net"] }, { name: "Help Scout", homepage: "https://www.helpscout.net/", category: "customer-success", domains: ["djtflbt20bdde.cloudfront.net", "*.helpscout.net"], products: [{ name: "Help Scout Beacon", urlPatterns: ["beacon-v2.helpscout.net"], facades: [{ name: "React Live Chat Loader", repo: "https://github.com/calibreapp/react-live-chat-loader" }] }] }, { name: "Alexa", homepage: "https://www.alexa.com/", category: "analytics", domains: ["*.alexametrics.com", "d31qbv1cthcecs.cloudfront.net"] }, { name: "OneSignal", homepage: "https://onesignal.com/", category: "utility", domains: ["*.onesignal.com"] }, { name: "Lucky Orange", homepage: "https://www.luckyorange.com/", category: "analytics", domains: ["*.luckyorange.com", "d10lpsik1i8c69.cloudfront.net", "*.luckyorange.net"] }, { name: "Crazy Egg", homepage: "https://www.crazyegg.com/", category: "analytics", domains: ["*.cetrk.com", "*.crazyegg.com", "dnn506yrbagrg.cloudfront.net"] }, { name: "Hello Bar", homepage: "https://www.hellobar.com/", category: "marketing", domains: ["*.hellobar.com"] }, { name: "Yandex Ads", company: "Yandex", homepage: "https://yandex.com/adv/", category: "ad", domains: ["an.yandex.ru"] }, { name: "Salesforce", homepage: "https://www.salesforce.com/products/marketing-cloud/", category: "analytics", domains: ["*.krxd.net"] }, { name: "Salesforce Commerce Cloud", homepage: "https://www.salesforce.com/products/commerce-cloud/overview/", category: "hosting", domains: ["*.cquotient.com", "*.demandware.net", "demandware.edgesuite.net"] }, { name: "Optimizely", homepage: "https://www.optimizely.com/", category: "analytics", domains: ["*.optimizely.com"] }, { name: "LiveChat", homepage: "https://www.livechat.com/", category: "customer-success", domains: ["*.livechatinc.com", "*.livechat.com", "*.livechat-static.com"] }, { name: "VK", homepage: "https://vk.com/", category: "social", domains: ["*.vk.com"] }, { name: "Tumblr", homepage: "https://tumblr.com/", category: "social", domains: ["*.tumblr.com"] }, { name: "Wistia", homepage: "https://wistia.com/", category: "video", domains: ["*.wistia.com", "embedwistia-a.akamaihd.net", "*.wistia.net"] }, { name: "Brightcove", homepage: "https://www.brightcove.com/en/", category: "video", domains: ["*.brightcove.com", "*.brightcove.net", "*.zencdn.net"] }, { name: "JSDelivr CDN", homepage: "https://www.jsdelivr.com/", category: "cdn", domains: ["*.jsdelivr.net"] }, { name: "Sumo", homepage: "https://sumo.com/", category: "marketing", domains: ["*.sumo.com", "*.sumome.com", "sumo.b-cdn.net"] }, { name: "Vimeo", homepage: "https://vimeo.com/", category: "video", domains: ["*.vimeo.com", "*.vimeocdn.com"], products: [{ name: "Vimeo Embedded Player", urlPatterns: ["player.vimeo.com/video/"], facades: [{ name: "Lite Vimeo", repo: "https://github.com/slightlyoff/lite-vimeo" }, { name: "Lite Vimeo Embed", repo: "https://github.com/luwes/lite-vimeo-embed" }, { name: "Ngx Lite Video", repo: "https://github.com/karim-mamdouh/ngx-lite-video" }] }] }, { name: "Disqus", homepage: "https://disqus.com/", category: "social", domains: ["*.disqus.com", "*.disquscdn.com"] }, { name: "Yandex APIs", company: "Yandex", homepage: "https://yandex.ru/", category: "utility", domains: ["api-maps.yandex.ru", "money.yandex.ru"] }, { name: "Yandex CDN", company: "Yandex", homepage: "https://yandex.ru/", category: "cdn", domains: ["*.yandex.st", "*.yastatic.net"] }, { name: "Integral Ad Science", homepage: "https://integralads.com/uk/", category: "ad", domains: ["*.adsafeprotected.com", "*.iasds01.com"] }, { name: "Tealium", homepage: "https://tealium.com/", category: "tag-manager", domains: ["*.aniview.com", "*.delvenetworks.com", "*.limelight.com", "*.tiqcdn.com", "*.llnwd.net", "*.tealiumiq.com"] }, { name: "Pubmatic", homepage: "https://pubmatic.com/", category: "ad", domains: ["*.pubmatic.com"] }, { name: "Olark", homepage: "https://www.olark.com/", category: "customer-success", domains: ["*.olark.com"] }, { name: "Tawk.to", homepage: "https://www.tawk.to/", category: "customer-success", domains: ["*.tawk.to"] }, { name: "OptinMonster", homepage: "https://optinmonster.com/", category: "marketing", domains: ["*.opmnstr.com", "*.optmnstr.com", "*.optmstr.com"] }, { name: "ZenDesk", homepage: "https://zendesk.com/", category: "customer-success", domains: ["*.zdassets.com", "*.zendesk.com", "*.zopim.com"] }, { name: "Pusher", homepage: "https://pusher.com/", category: "utility", domains: ["*.pusher.com", "*.pusherapp.com"] }, { name: "Drift", homepage: "https://www.drift.com/", category: "marketing", domains: ["*.drift.com", "*.driftt.com"], products: [{ name: "Drift Live Chat", urlPatterns: ["REGEXP:js\\.driftt\\.com\\/include\\/.*\\/.*\\.js"], facades: [{ name: "React Live Chat Loader", repo: "https://github.com/calibreapp/react-live-chat-loader" }] }] }, { name: "Sentry", homepage: "https://sentry.io/", category: "utility", domains: ["*.getsentry.com", "*.ravenjs.com", "*.sentry-cdn.com", "*.sentry.io"] }, { name: "Amazon Web Services", homepage: "https://aws.amazon.com/s3/", category: "other", domains: ["*.amazon.com", "*.amazonaws.com", "*.amazonwebapps.com", "*.amazonwebservices.com", "*.elasticbeanstalk.com", "*.images-amazon.com", "*.amazon.co.uk"] }, { name: "Amazon Pay", homepage: "https://pay.amazon.com", category: "utility", domains: ["payments.amazon.com", "*.payments-amazon.com"] }, { name: "Media.net", homepage: "https://www.media.net/", category: "ad", domains: ["*.media.net", "*.mnet-ad.net"] }, { name: "Yahoo!", homepage: "https://www.yahoo.com/", category: "ad", domains: ["*.bluelithium.com", "*.hostingprod.com", "*.lexity.com", "*.yahoo.com", "*.yahooapis.com", "*.yimg.com", "*.zenfs.com", "*.yahoo.net"] }, { name: "Adroll", homepage: "https://www.adroll.com/", category: "ad", domains: ["*.adroll.com"] }, { name: "Twitch", homepage: "https://twitch.tv/", category: "video", domains: ["*.twitch.tv"] }, { name: "Taboola", homepage: "https://www.taboola.com/", category: "ad", domains: ["*.taboola.com", "*.taboolasyndication.com"] }, { name: "Sizmek", homepage: "https://www.sizmek.com/", category: "ad", domains: ["*.serving-sys.com", "*.peer39.net"] }, { name: "Scorecard Research", homepage: "https://www.scorecardresearch.com/", category: "ad", domains: ["*.scorecardresearch.com"] }, { name: "Criteo", homepage: "https://www.criteo.com/", category: "ad", domains: ["*.criteo.com", "*.emailretargeting.com", "*.criteo.net"] }, { name: "Segment", homepage: "https://segment.com/", category: "analytics", domains: ["*.segment.com", "*.segment.io"] }, { name: "ShareThis", homepage: "https://www.sharethis.com/", category: "social", domains: ["*.sharethis.com"] }, { name: "Distil Networks", homepage: "https://www.distilnetworks.com/", category: "utility", domains: ["*.areyouahuman.com"] }, { name: "Connexity", homepage: "https://connexity.com/", category: "analytics", domains: ["*.connexity.net"] }, { name: "Popads", homepage: "https://www.popads.net/", category: "ad", domains: ["*.popads.net"] }, { name: "CreateJS CDN", homepage: "https://code.createjs.com/", category: "cdn", domains: ["*.createjs.com"] }, { name: "Squarespace", homepage: "https://www.squarespace.com/", category: "hosting", domains: ["*.squarespace.com"] }, { name: "Media Math", homepage: "https://www.mediamath.com/", category: "ad", domains: ["*.mathads.com", "*.mathtag.com"] }, { name: "Mixpanel", homepage: "https://mixpanel.com/", category: "analytics", domains: ["*.mixpanel.com", "*.mxpnl.com"] }, { name: "FontAwesome CDN", homepage: "https://fontawesome.com/", category: "cdn", domains: ["*.fontawesome.com"] }, { name: "Hubspot", homepage: "https://hubspot.com/", category: "marketing", domains: ["*.hs-scripts.com", "*.hubspot.com", "*.leadin.com", "*.hs-analytics.net", "*.hscollectedforms.net", "*.hscta.net", "*.hsforms.net", "*.hsleadflows.net", "*.hsstatic.net", "*.hubspot.net", "*.hsforms.com", "*.hs-banner.com", "*.hs-embed-reporting.com", "*.hs-growth-metrics.com", "*.hs-data.com", "*.hsadspixel.net", "*.hubapi.com"] }, { name: "Mailchimp", homepage: "https://mailchimp.com/", category: "marketing", domains: ["*.chimpstatic.com", "*.list-manage.com", "*.mailchimp.com"] }, { name: "MGID", homepage: "https://www.mgid.com/", category: "ad", domains: ["*.mgid.com", "*.dt07.net"] }, { name: "Stripe", homepage: "https://stripe.com", category: "utility", domains: ["*.stripe.com", "*.stripecdn.com", "*.stripe.network"] }, { name: "PayPal", homepage: "https://paypal.com", category: "utility", domains: ["*.paypal.com", "*.paypalobjects.com"] }, { name: "Market GID", homepage: "https://www.marketgid.com/", category: "ad", domains: ["*.marketgid.com"] }, { name: "Pinterest", homepage: "https://pinterest.com/", category: "social", domains: ["*.pinimg.com", "*.pinterest.com"] }, { name: "New Relic", homepage: "https://newrelic.com/", category: "utility", domains: ["*.newrelic.com", "*.nr-data.net"] }, { name: "AppDynamics", homepage: "https://www.appdynamics.com/", category: "utility", domains: ["*.appdynamics.com", "*.eum-appdynamics.com", "d3tjaysgumg9lf.cloudfront.net"] }, { name: "Parking Crew", homepage: "https://parkingcrew.net/", category: "other", domains: ["d1lxhc4jvstzrp.cloudfront.net", "*.parkingcrew.net"] }, { name: "WordAds", company: "Automattic", homepage: "https://wordads.co/", category: "ad", domains: ["*.pubmine.com"] }, { name: "AppNexus", homepage: "https://www.appnexus.com/", category: "ad", domains: ["*.adnxs.com", "*.ctasnet.com", "*.adrdgt.com"] }, { name: "Histats", homepage: "https://www.histats.com/", category: "analytics", domains: ["*.histats.com"] }, { name: "DoubleVerify", homepage: "https://www.doubleverify.com/", category: "ad", domains: ["*.doubleverify.com", "*.dvtps.com", "*.iqfp1.com"] }, { name: "Mediavine", homepage: "https://www.mediavine.com/", category: "ad", domains: ["*.mediavine.com"] }, { name: "Wix", homepage: "https://www.wix.com/", category: "hosting", domains: ["*.parastorage.com", "*.wix.com", "*.wixstatic.com", "*.wixapps.net"] }, { name: "Webflow", homepage: "https://webflow.com/", category: "hosting", domains: ["*.uploads-ssl.webflow.com", "*.assets-global.website-files.com", "*.assets.website-files.com"] }, { name: "Weebly", homepage: "https://www.weebly.com/", category: "hosting", domains: ["*.editmysite.com"] }, { name: "LinkedIn", homepage: "https://www.linkedin.com/", category: "social", domains: ["*.bizographics.com", "platform.linkedin.com", "*.slideshare.com", "*.slidesharecdn.com", "*.oribi.io"] }, { name: "LinkedIn Ads", category: "ad", domains: ["*.licdn.com", "*.ads.linkedin.com", "ads.linkedin.com", "www.linkedin.com"] }, { name: "Vox Media", homepage: "https://www.voxmedia.com/", category: "content", domains: ["*.vox-cdn.com", "*.voxmedia.com"] }, { name: "Hotmart", homepage: "https://www.hotmart.com/", category: "content", domains: ["*.hotmart.com"] }, { name: "SoundCloud", homepage: "https://www.soundcloud.com/", category: "content", domains: ["*.sndcdn.com", "*.soundcloud.com", "*.stratus.sc"] }, { name: "Spotify", homepage: "https://www.spotify.com/", category: "content", domains: ["*.scdn.co", "*.spotify.com"] }, { name: "AMP", homepage: "https://amp.dev/", category: "content", domains: ["*.ampproject.org"] }, { name: "Beeketing", homepage: "https://beeketing.com/", category: "marketing", domains: ["*.beeketing.com"] }, { name: "Albacross", homepage: "https://albacross.com/", category: "marketing", domains: ["*.albacross.com"] }, { name: "TrafficJunky", homepage: "https://www.trafficjunky.com/", category: "ad", domains: ["*.contentabc.com", "*.trafficjunky.net"] }, { name: "Bootstrap CDN", homepage: "https://www.bootstrapcdn.com/", category: "cdn", domains: ["*.bootstrapcdn.com"] }, { name: "Shareaholic", homepage: "https://www.shareaholic.com/", category: "social", domains: ["*.shareaholic.com", "dsms0mj1bbhn4.cloudfront.net"] }, { name: "Snowplow", homepage: "https://snowplowanalytics.com/", category: "analytics", domains: ["d32hwlnfiv2gyn.cloudfront.net"] }, { name: "RD Station", homepage: "https://www.rdstation.com/en/", category: "marketing", domains: ["d335luupugsy2.cloudfront.net"] }, { name: "Jivochat", homepage: "https://www.jivochat.com/", category: "customer-success", domains: ["*.jivosite.com"] }, { name: "Listrak", homepage: "https://www.listrak.com/", category: "marketing", domains: ["*.listrak.com", "*.listrakbi.com"] }, { name: "Ontame", homepage: "https://www.ontame.io", category: "analytics", domains: ["*.ontame.io"] }, { name: "Ipify", homepage: "https://www.ipify.org", category: "utility", domains: ["*.ipify.org"] }, { name: "Ensighten", homepage: "https://www.ensighten.com/", category: "tag-manager", domains: ["*.ensighten.com"] }, { name: "EpiServer", homepage: "https://www.episerver.com", category: "content", domains: ["*.episerver.net"] }, { name: "mPulse", homepage: "https://developer.akamai.com/akamai-mpulse", category: "analytics", domains: ["*.akstat.io", "*.go-mpulse.net", "*.mpulse.net", "*.mpstat.us"] }, { name: "Pingdom RUM", homepage: "https://www.pingdom.com/product/performance-monitoring/", category: "analytics", domains: ["*.pingdom.net"] }, { name: "SpeedCurve RUM", company: "SpeedCurve", homepage: "https://www.speedcurve.com/features/performance-monitoring/", category: "analytics", domains: ["*.speedcurve.com"] }, { name: "Radar", company: "Cedexis", homepage: "https://www.cedexis.com/radar/", category: "analytics", domains: ["*.cedexis-test.com", "*.cedexis.com", "*.cmdolb.com", "cedexis.leasewebcdn.com", "*.cedexis-radar.net", "*.cedexis.net", "cedexis-test01.insnw.net", "cedexisakamaitest.azureedge.net", "cedexispub.cdnetworks.net", "cs600.wac.alphacdn.net", "cs600.wpc.edgecastdns.net", "global2.cmdolb.com", "img-cedexis.mncdn.com", "a-cedexis.msedge.net", "zn3vgszfh.fastestcdn.net"] }, { name: "Byside", homepage: "https://byside.com", category: "analytics", domains: ["*.byside.com"] }, { name: "VWO", homepage: "https://vwo.com", category: "analytics", domains: ["*.vwo.com", "*.visualwebsiteoptimizer.com", "d5phz18u4wuww.cloudfront.net", "*.wingify.com"] }, { name: "Bing Ads", homepage: "https://bingads.microsoft.com", category: "ad", domains: ["*.bing.com", "*.microsoft.com", "*.msn.com", "*.s-msft.com", "*.s-msn.com", "*.msads.net", "*.msecnd.net"] }, { name: "GoSquared", homepage: "https://www.gosquared.com", category: "analytics", domains: ["*.gosquared.com", "d1l6p2sc9645hc.cloudfront.net"] }, { name: "Usabilla", homepage: "https://usabilla.com", category: "analytics", domains: ["*.usabilla.com", "d6tizftlrpuof.cloudfront.net"] }, { name: "Fastly Insights", homepage: "https://insights.fastlylabs.com", category: "analytics", domains: ["*.fastly-insights.com"] }, { name: "Visual IQ", homepage: "https://www.visualiq.com", category: "analytics", domains: ["*.myvisualiq.net"] }, { name: "Snapchat", homepage: "https://www.snapchat.com", category: "analytics", domains: ["*.snapchat.com", "*.sc-static.net"] }, { name: "Atlas Solutions", homepage: "https://atlassolutions.com", category: "analytics", domains: ["*.atdmt.com"] }, { name: "Quantcast", homepage: "https://www.quantcast.com", category: "analytics", domains: ["*.brtstats.com", "*.quantcount.com", "*.quantserve.com", "*.semantictec.com", "*.ntv.io"] }, { name: "Spiceworks", homepage: "https://www.spiceworks.com", category: "analytics", domains: ["*.spiceworks.com"] }, { name: "Marketo", homepage: "https://www.marketo.com", category: "analytics", domains: ["*.marketo.com", "*.mktoresp.com", "*.marketo.net"] }, { name: "Intercom", homepage: "https://www.intercom.com", category: "customer-success", domains: ["*.intercomcdn.com", "*.intercom.io"], products: [{ name: "Intercom Widget", urlPatterns: ["widget.intercom.io", "js.intercomcdn.com/shim.latest.js"], facades: [{ name: "React Live Chat Loader", repo: "https://github.com/calibreapp/react-live-chat-loader" }, { name: "Intercom Facade", repo: "https://github.com/danielbachhuber/intercom-facade/" }] }] }, { name: "Unpkg", homepage: "https://unpkg.com", category: "cdn", domains: ["*.unpkg.com", "*.npmcdn.com"] }, { name: "ESM>CDN", homepage: "https://esm.sh", category: "cdn", domains: ["esm.sh"] }, { name: "JSPM", homepage: "https://jspm.org/", category: "cdn", domains: ["ga.jspm.io"] }, { name: "ReadSpeaker", homepage: "https://www.readspeaker.com", category: "other", domains: ["*.readspeaker.com"] }, { name: "Browsealoud", homepage: "https://www.texthelp.com/en-gb/products/browsealoud/", category: "other", domains: ["*.browsealoud.com", "*.texthelp.com"] }, { name: "15gifts", category: "customer-success", domains: ["*.15gifts.com", "*.primefuse.com"] }, { name: "1xRUN", category: "utility", domains: ["*.1xrun.com"] }, { name: "2AdPro Media Solutions", category: "ad", domains: ["*.2adpro.com"] }, { name: "301 Digital Media", category: "content", domains: ["*.301ads.com", "*.301network.com"] }, { name: "360 picnic platform", company: "MediaV", category: "ad", domains: ["*.mediav.com"] }, { name: "365 Media Group", category: "content", domains: ["*.365dm.com"] }, { name: "365 Tech Services", category: "hosting", domains: ["*.365webservices.co.uk"] }, { name: "3D Issue", category: "utility", domains: ["*.3dissue.com", "*.pressjack.com"] }, { name: "47Line Technologies", category: "other", domains: ["*.pejs.net"] }, { name: "4finance", category: "utility", domains: ["*.4finance.com"] }, { name: "5miles", category: "content", domains: ["*.5milesapp.com"] }, { name: "77Tool", company: "77Agency", category: "analytics", domains: ["*.77tracking.com"] }, { name: "9xb", category: "ad", domains: ["*.9xb.com"] }, { name: "@UK", category: "hosting", domains: ["*.uk-plc.net"] }, { name: "A Perfect Pocket", category: "hosting", domains: ["*.aperfectpocketdata.com"] }, { name: "A-FIS PTE", category: "analytics", domains: ["*.websta.me"] }, { name: "AB Tasty", homepage: "https://www.abtasty.com/", category: "analytics", domains: ["*.abtasty.com", "d1447tq2m68ekg.cloudfront.net"] }, { name: "ABA RESEARCH", category: "analytics", domains: ["*.abaresearch.uk", "qmodal.azurewebsites.net"] }, { name: "ADMIZED", category: "ad", domains: ["*.admized.com"] }, { name: "ADNOLOGIES", category: "ad", domains: ["*.heias.com"] }, { name: "ADventori", category: "ad", domains: ["*.adventori.com"] }, { name: "AI Media Group", category: "ad", domains: ["*.aimediagroup.com"] }, { name: "AIR.TV", category: "ad", domains: ["*.air.tv"] }, { name: "AKQA", category: "ad", domains: ["*.srtk.net"] }, { name: "AOL ad", company: "AOL", category: "ad", domains: ["*.atwola.com"] }, { name: "AOL On", company: "AOL", category: "content", domains: ["*.5min.com"] }, { name: "AOL Sponsored Listiings", company: "AOL", category: "ad", domains: ["*.adsonar.com"] }, { name: "APSIS Lead", company: "APSIS International AB", category: "ad", domains: ["*.prospecteye.com"] }, { name: "APSIS Profile Cloud", company: "APSIS", category: "analytics", domains: ["*.innomdc.com"] }, { name: "APSIS Forms", company: "APSIS", category: "other", domains: ["*.apsisforms.com"] }, { name: "ARENA", company: "Altitude", category: "ad", domains: ["*.altitude-arena.com"] }, { name: "ARM", category: "analytics", domains: ["*.tag4arm.com"] }, { name: "ASAPP", category: "other", domains: ["*.asapp.com"] }, { name: "ASP", category: "hosting", domains: ["*.goshowoff.com"] }, { name: "AT Internet", category: "analytics", domains: ["*.ati-host.net"] }, { name: "ATTRAQT", category: "utility", domains: ["*.attraqt.com", "*.locayta.com"] }, { name: "AVANSER", category: "analytics", domains: ["*.avanser.com.au"] }, { name: "AVG", company: "AVG Technologies", category: "utility", domains: ["*.avg.com"] }, { name: "AWeber", category: "ad", domains: ["*.aweber.com"] }, { name: "AXS", category: "content", domains: ["*.axs.com"] }, { name: "Accentuate", company: "Accentuate Digital", category: "utility", homepage: "https://www.accentuate.io/", domains: ["*.accentuate.io"] }, { name: "Accenture", category: "analytics", domains: ["*.tmvtp.com"] }, { name: "Accord Holdings", category: "ad", domains: ["*.agcdn.com"] }, { name: "Accordant Media", category: "ad", domains: ["*.a3cloud.net"] }, { name: "Account Kit", category: "other", domains: ["*.accountkit.com"] }, { name: "Accuen Media (Omnicom Media Group)", category: "content", domains: ["*.p-td.com"] }, { name: "Accuweather", category: "content", domains: ["*.accuweather.com"] }, { name: "Acquisio", category: "ad", domains: ["*.acq.io"] }, { name: "Act-On Software", category: "marketing", domains: ["*.actonsoftware.com"] }, { name: "ActBlue", category: "other", domains: ["*.actblue.com"] }, { name: "Active Agent", category: "ad", domains: ["*.active-agent.com"] }, { name: "ActiveCampaign", category: "ad", domains: ["*.trackcmp.net", "app-us1.com", "*.app-us1.com"] }, { name: "AcuityAds", category: "ad", domains: ["*.acuityplatform.com"] }, { name: "Acxiom", category: "ad", domains: ["*.acxiom-online.com", "*.acxiomapac.com", "*.delivery.net"] }, { name: "Ad4Screen", category: "ad", domains: ["*.a4.tl"] }, { name: "Ad6Media", category: "ad", domains: ["*.ad6media.fr"] }, { name: "AdCurve", category: "ad", domains: ["*.shop2market.com"] }, { name: "AdEasy", category: "ad", domains: ["*.adeasy.ru"] }, { name: "AdExtent", category: "ad", domains: ["*.adextent.com"] }, { name: "AdForge Edge", company: "AdForge", category: "ad", domains: ["*.adforgeinc.com"] }, { name: "AdGear", company: "Samsung Electronics", category: "ad", domains: ["*.adgear.com", "*.adgrx.com"] }, { name: "AdInMedia", category: "ad", domains: ["*.fastapi.net"] }, { name: "AdJug", category: "ad", domains: ["*.adjug.com"] }, { name: "AdMatic", category: "ad", domains: ["*.admatic.com.tr"] }, { name: "AdMedia", category: "ad", domains: ["*.admedia.com"] }, { name: "AdRecover", category: "ad", domains: ["*.adrecover.com"] }, { name: "AdRiver", category: "ad", domains: ["*.adriver.ru"] }, { name: "AdSniper", category: "ad", domains: ["*.adsniper.ru", "*.sniperlog.ru"] }, { name: "AdSpeed", category: "ad", domains: ["*.adspeed.net"] }, { name: "AdSpruce", category: "ad", domains: ["*.adspruce.com"] }, { name: "AdSupply", category: "ad", domains: ["*.doublepimp.com"] }, { name: "AdTheorent", category: "ad", domains: ["*.adentifi.com"] }, { name: "AdThink AudienceInsights", company: "AdThink Media", category: "analytics", domains: ["*.audienceinsights.net"] }, { name: "AdTrue", company: "FPT AdTrue", category: "ad", domains: ["*.adtrue.com"] }, { name: "AdYapper", category: "ad", domains: ["*.adyapper.com"] }, { name: "Adacado", category: "ad", domains: ["*.adacado.com"] }, { name: "Adap.tv", category: "ad", domains: ["*.adap.tv"] }, { name: "Adapt Services", category: "hosting", domains: ["*.adcmps.com"] }, { name: "Adaptive Web", category: "hosting", domains: ["*.adaptive.co.uk"] }, { name: "Adara Media", category: "ad", domains: ["*.yieldoptimizer.com"] }, { name: "Adblade", category: "ad", domains: ["*.adblade.com"] }, { name: "Adbrain", category: "ad", domains: ["*.adbrn.com"] }, { name: "AddEvent", category: "utility", domains: ["*.addevent.com"] }, { name: "AddShoppers", category: "social", domains: ["*.addshoppers.com", "d3rr3d0n31t48m.cloudfront.net", "*.shop.pe"] }, { name: "AddThisEvent", category: "hosting", domains: ["*.addthisevent.com"] }, { name: "Addoox MetaNetwork", company: "Addoox", category: "ad", domains: ["*.metanetwork.net"] }, { name: "Addvantage Media", category: "ad", domains: ["*.addvantagemedia.com", "*.simplytechnology.net"] }, { name: "AD EBis", category: "analytics", homepage: "https://www.ebis.ne.jp/", domains: ["*.ebis.ne.jp"] }, { name: "Adecs", category: "customer-success", domains: ["*.adecs.co.uk"] }, { name: "Adelphic", category: "ad", domains: ["*.ipredictive.com"] }, { name: "Adestra", category: "ad", domains: ["*.adestra.com", "*.msgfocus.com"] }, { name: "Adform", category: "ad", domains: ["*.adform.net", "*.adformdsp.net"] }, { name: "Adkontekst", category: "ad", domains: ["*.adkontekst.pl"] }, { name: "Adlead", category: "ad", domains: ["*.webelapp.com"] }, { name: "Adledge", category: "utility", domains: ["*.adledge.com"] }, { name: "Adloox", category: "ad", domains: ["*.adlooxtracking.com"] }, { name: "Adlux", category: "ad", domains: ["*.adlux.com"] }, { name: "Admedo", category: "ad", domains: ["*.a8723.com", "*.adizio.com", "*.admedo.com"] }, { name: "Admeta", company: "Wideorbit", category: "ad", domains: ["*.atemda.com"] }, { name: "Admetrics", company: "Next Tuesday", category: "analytics", domains: ["*.nt.vc"] }, { name: "Admiral", category: "ad", domains: ["*.unknowntray.com"] }, { name: "Admitad", category: "ad", domains: ["*.lenmit.com"] }, { name: "Admixer for Publishers", company: "Admixer", category: "ad", domains: ["*.admixer.net"] }, { name: "Adnium", category: "ad", domains: ["*.adnium.com"] }, { name: "Adnostic", company: "Dennis Publishing", category: "ad", domains: ["*.adnostic.co.uk"] }, { name: "Adobe Marketing Cloud", company: "Adobe Systems", category: "ad", domains: ["*.adobetag.com"] }, { name: "Adobe Scene7", company: "Adobe Systems", category: "content", domains: ["wwwimages.adobe.com", "*.scene7.com", "*.everestads.net", "*.everestjs.net"] }, { name: "Adobe Systems", category: "content", domains: ["adobe.com", "www.adobe.com"] }, { name: "Adobe Business Catalyst", homepage: "https://www.businesscatalyst.com/", category: "hosting", domains: ["*.businesscatalyst.com"] }, { name: "Adocean", company: "Gemius", category: "ad", domains: ["*.adocean.pl"] }, { name: "Adometry", company: "Google", category: "ad", domains: ["*.dmtry.com"] }, { name: "Adomik", category: "analytics", domains: ["*.adomik.com"] }, { name: "Adotmob", category: "ad", domains: ["*.adotmob.com"] }, { name: "Adrian Quevedo", category: "hosting", domains: ["*.adrianquevedo.com"] }, { name: "Adroit Digital Solutions", category: "ad", domains: ["*.imiclk.com", "*.abmr.net"] }, { name: "AdsNative", category: "ad", domains: ["*.adsnative.com"] }, { name: "AdsWizz", category: "ad", domains: ["*.adswizz.com"] }, { name: "Adscale", category: "ad", domains: ["*.adscale.de"] }, { name: "Adschoom", company: "JSWeb Production", category: "ad", domains: ["*.adschoom.com"] }, { name: "Adscience", category: "ad", domains: ["*.adscience.nl"] }, { name: "Adsiduous", category: "ad", domains: ["*.adsiduous.com"] }, { name: "Adsty", category: "ad", domains: ["*.adx1.com"] }, { name: "Adtech (AOL)", category: "ad", domains: ["*.adtechus.com"] }, { name: "Adtegrity", category: "ad", domains: ["*.adtpix.com"] }, { name: "Adthink", company: "Adthink Media", category: "ad", domains: ["*.adxcore.com", "*.dcoengine.com"] }, { name: "AdultWebmasterEmpire.Com", category: "ad", domains: ["*.awempire.com"] }, { name: "Adunity", category: "ad", domains: ["*.adunity.com"] }, { name: "Advance Magazine Group", category: "content", domains: ["*.condenastdigital.com", "*.condenet.com", "*.condenast.co.uk"] }, { name: "Adverline Board", company: "Adverline", category: "ad", domains: ["*.adverline.com", "*.adnext.fr"] }, { name: "AdvertServe", category: "ad", domains: ["*.advertserve.com"] }, { name: "Advolution", category: "utility", domains: ["*.advolution.de"] }, { name: "Adwise", category: "ad", domains: ["*.adwise.bg"] }, { name: "Adyen", category: "utility", domains: ["*.adyen.com"] }, { name: "Adyoulike", category: "ad", domains: ["*.adyoulike.com", "*.omnitagjs.com", "*.adyoulike.net"] }, { name: "Adzerk", category: "ad", domains: ["*.adzerk.net"] }, { name: "Adzip", company: "Adbox Digital", category: "ad", domains: ["*.adzip.co"] }, { name: "AerServ", category: "ad", domains: ["*.aerserv.com"] }, { name: "Affectv", category: "ad", domains: ["*.affectv.com", "*.affec.tv"] }, { name: "Affiliate Window", company: "Digital Window", category: "ad", domains: ["*.dwin1.com"] }, { name: "Affiliatly", category: "ad", domains: ["*.affiliatly.com"] }, { name: "Affino", category: "ad", domains: ["affino.com"] }, { name: "Affirm", category: "utility", domains: ["*.affirm.com"] }, { name: "Afterpay", company: "Block", category: "utility", homepage: "https://www.afterpay.com/", domains: ["*.afterpay.com"] }, { name: "Agenda Media", category: "ad", domains: ["*.agendamedia.co.uk"] }, { name: "Aggregate Knowledge", company: "Neustar", category: "ad", domains: ["*.agkn.com"] }, { name: "AgilOne", category: "marketing", domains: ["*.agilone.com"] }, { name: "Agility", category: "hosting", domains: ["*.agilitycms.com"] }, { name: "Ahalogy", category: "social", domains: ["*.ahalogy.com"] }, { name: "Aheadworks", category: "utility", domains: ["*.aheadworks.com"] }, { name: "AirPR", category: "analytics", domains: ["*.airpr.com"] }, { name: "Aira", category: "ad", domains: ["*.aira.net"] }, { name: "Airport Parking and Hotels", category: "content", domains: ["*.aph.com"] }, { name: "Akanoo", category: "analytics", domains: ["*.akanoo.com"] }, { name: "Alchemy", company: "AndBeyond.Media", category: "ad", domains: ["*.andbeyond.media"] }, { name: "AlephD", company: "AOL", category: "ad", domains: ["*.alephd.com"] }, { name: "AliveChat", company: "AYU Technology Solutions", category: "customer-success", domains: ["*.websitealive.com", "*.websitealive7.com"] }, { name: "All Access", category: "other", domains: ["*.allaccess.com.ph"] }, { name: "Alliance for Audited Media", category: "ad", domains: ["*.aamsitecertifier.com"] }, { name: "Allyde", category: "marketing", domains: ["*.mautic.com"] }, { name: "AlphaSSL", category: "utility", domains: ["*.alphassl.com"] }, { name: "Altitude", category: "ad", domains: ["*.altitudeplatform.com"] }, { name: "Altocloud", category: "analytics", domains: ["*.altocloud.com"] }, { name: "Amadeus", category: "content", domains: ["*.e-travel.com"] }, { name: "Amazon CloudFront", company: "Amazon", category: "utility", domains: ["cloudfront.net"] }, { name: "Ambassador", category: "ad", domains: ["*.getambassador.com"] }, { name: "Ambient", company: "Ericcson", category: "other", domains: ["*.adnetwork.vn", "*.ambientplatform.vn"] }, { name: "Amelia Communication", category: "hosting", domains: ["*.sara.media"] }, { name: "Amobee", category: "marketing", domains: ["*.amgdgt.com", "*.kontera.com"] }, { name: "Amplience", category: "marketing", domains: ["*.10cms.com", "*.amplience.com", "*.amplience.net", "*.bigcontent.io", "*.adis.ws"] }, { name: "Amplitude Mobile Analytics", company: "Amplitude", category: "analytics", domains: ["*.amplitude.com", "d24n15hnbwhuhn.cloudfront.net"] }, { name: "Anametrix", company: "Ensighten", category: "analytics", domains: ["*.anametrix.com"] }, { name: "Ancora Platform", company: "Ancora Media Solutions", category: "ad", domains: ["*.ancoraplatform.com"] }, { name: "Anedot", category: "other", domains: ["*.anedot.com"] }, { name: "AnimateJS", category: "utility", domains: ["*.animatedjs.com"] }, { name: "AnswerDash", category: "customer-success", domains: ["*.answerdash.com"] }, { name: "Answers", category: "analytics", domains: ["*.answcdn.com", "*.answers.com", "*.dsply.com"] }, { name: "Apester", category: "analytics", domains: ["*.apester.com", "*.qmerce.com"] }, { name: "Apligraf SmartWeb", company: "Apligraf", category: "utility", domains: ["*.apligraf.com.br"] }, { name: "Appier", category: "ad", domains: ["*.appier.net"] }, { name: "Appsolute", category: "utility", homepage: "https://appsolute.us/", domains: ["dropahint.love"] }, { name: "Apptus eSales", company: "Apptus", category: "analytics", domains: ["*.apptus.com"] }, { name: "Arbor", company: "LiveRamp", category: "other", domains: ["*.pippio.com"] }, { name: "Ardent Creative", category: "hosting", domains: ["*.ardentcreative.co.uk"] }, { name: "Arnold Clark Automobiles", category: "content", domains: ["*.arnoldclark.com"] }, { name: "Atom Content Marketing", category: "content", domains: ["*.atomvault.net"] }, { name: "Atom Data", category: "other", domains: ["*.atomdata.io"] }, { name: "Attribution", category: "ad", domains: ["*.attributionapp.com"] }, { name: "Audience 360", company: "Datapoint Media", category: "ad", domains: ["*.dpmsrv.com"] }, { name: "Audience Science", category: "ad", domains: ["*.revsci.net"] }, { name: "AudienceSearch", company: "Intimate Merger", category: "ad", domains: ["*.im-apps.net"] }, { name: "Auditorius", category: "ad", domains: ["*.audtd.com"] }, { name: "Augur", category: "analytics", domains: ["*.augur.io"] }, { name: "Auto Link Maker", company: "Apple", category: "ad", domains: ["*.apple.com"] }, { name: "Autopilot", category: "ad", domains: ["*.autopilothq.com"] }, { name: "Avail", company: "RichRelevance", category: "ad", domains: ["*.avail.net"] }, { name: "AvantLink", category: "ad", domains: ["*.avmws.com"] }, { name: "Avco Systems", category: "utility", domains: ["*.avcosystems.com"] }, { name: "Avid Media", category: "customer-success", domains: ["*.adspdbl.com", "*.metadsp.co.uk"] }, { name: "Avocet Systems", category: "ad", domains: ["*.avocet.io", "ads.avct.cloud"] }, { name: "Avora", category: "analytics", domains: ["*.truedash.com"] }, { name: "Azure Traffic Manager", company: "Microsoft", category: "other", domains: ["*.gateway.net", "*.trafficmanager.net"] }, { name: "Azure Web Services", company: "Microsoft", category: "cdn", domains: ["*.azurewebsites.net", "*.azureedge.net", "*.msedge.net", "*.windows.net"] }, { name: "BAM", category: "analytics", domains: ["*.bam-x.com"] }, { name: "Baifendian Technology", category: "marketing", domains: ["*.baifendian.com"] }, { name: "Bankrate", category: "utility", domains: ["*.bankrate.com"] }, { name: "BannerFlow", company: "Nordic Factory Solutions", category: "ad", domains: ["*.bannerflow.com"] }, { name: "Barclaycard SmartPay", company: "Barclaycard", category: "utility", domains: ["*.barclaycardsmartpay.com"] }, { name: "Barilliance", category: "analytics", domains: ["*.barilliance.net", "dn3y71tq7jf07.cloudfront.net"] }, { name: "Barnebys", category: "other", domains: ["*.barnebys.com"] }, { name: "Basis", company: "Basis Technologies", category: "ad", homepage: "https://basis.net/", domains: ["*.basis.net"] }, { name: "Batch Media", category: "ad", domains: ["*.t4ft.de"] }, { name: "Bauer Consumer Media", category: "content", domains: ["*.bauercdn.com", "*.greatmagazines.co.uk"] }, { name: "Baynote", category: "analytics", domains: ["*.baynote.net"] }, { name: "Bazaarvoice", category: "analytics", domains: ["*.bazaarvoice.com", "*.feedmagnet.com"] }, { name: "Beachfront Media", category: "ad", domains: ["*.bfmio.com"] }, { name: "BeamPulse", category: "analytics", domains: ["*.beampulse.com"] }, { name: "Beeswax", category: "ad", domains: ["*.bidr.io"] }, { name: "Beetailer", category: "social", domains: ["*.beetailer.com"] }, { name: "Best Of Media S.A.", category: "content", domains: ["*.servebom.com"] }, { name: "Bet365", category: "ad", domains: ["*.bet365affiliates.com"] }, { name: "Betfair", category: "other", domains: ["*.cdnbf.net"] }, { name: "Betgenius", company: "Genius Sports", category: "content", domains: ["*.connextra.com"] }, { name: "Better Banners", category: "ad", domains: ["*.betterbannerscloud.com"] }, { name: "Better Business Bureau", category: "analytics", domains: ["*.bbb.org"] }, { name: "Between Digital", category: "ad", domains: ["*.betweendigital.com"] }, { name: "BidTheatre", category: "ad", domains: ["*.bidtheatre.com"] }, { name: "Bidtellect", category: "ad", domains: ["*.bttrack.com"] }, { name: "Bigcommerce", category: "marketing", domains: ["*.bigcommerce.com"] }, { name: "BitGravity", company: "Tata Communications", category: "content", domains: ["*.bitgravity.com"] }, { name: "Bitly", category: "utility", domains: ["*.bitly.com", "*.lemde.fr", "*.bit.ly"] }, { name: "Bizible", category: "ad", domains: ["*.bizible.com", "*.bizibly.com"] }, { name: "Bizrate", category: "analytics", domains: ["*.bizrate.com"] }, { name: "BlastCasta", category: "social", domains: ["*.poweringnews.com"] }, { name: "Blindado", category: "utility", domains: ["*.siteblindado.com"] }, { name: "Blis", category: "ad", domains: ["*.blismedia.com"] }, { name: "Blogg.se", category: "hosting", domains: ["*.cdnme.se", "*.publishme.se"] }, { name: "BloomReach", category: "ad", domains: ["*.brcdn.com", "*.brsrvr.com", "*.brsvr.com"] }, { name: "Bloomberg", category: "content", domains: ["*.gotraffic.net"] }, { name: "Shop Logic", company: "BloomReach", category: "marketing", domains: ["*.goshoplogic.com"] }, { name: "Blue State Digital", category: "ad", domains: ["*.bsd.net"] }, { name: "Blue Triangle Technologies", category: "analytics", domains: ["*.btttag.com"] }, { name: "BlueCava", category: "ad", domains: ["*.bluecava.com"] }, { name: "BlueKai", company: "Oracle", category: "ad", domains: ["*.bkrtx.com", "*.bluekai.com"] }, { name: "Bluecore", category: "analytics", domains: ["*.bluecore.com"] }, { name: "Bluegg", category: "hosting", domains: ["d1va5oqn59yrvt.cloudfront.net"] }, { name: "Bold Commerce", category: "utility", domains: ["*.shappify-cdn.com", "*.shappify.com", "*.boldapps.net"] }, { name: "BoldChat", company: "LogMeIn", category: "customer-success", domains: ["*.boldchat.com"] }, { name: "Bombora", category: "ad", domains: ["*.mlno6.com"] }, { name: "Bonnier", category: "content", domains: ["*.bonniercorp.com"] }, { name: "Bookatable", category: "content", domains: ["*.bookatable.com", "*.livebookings.com"] }, { name: "Booking.com", category: "content", domains: ["*.bstatic.com"] }, { name: "Boomtrain", category: "ad", domains: ["*.boomtrain.com", "*.boomtrain.net"] }, { name: "BoostSuite", category: "ad", domains: ["*.poweredbyeden.com"] }, { name: "Boostable", category: "ad", domains: ["*.boostable.com"] }, { name: "Bootstrap Chinese network", category: "cdn", domains: ["*.bootcss.com"] }, { name: "Booxscale", category: "ad", domains: ["*.booxscale.com"] }, { name: "Borderfree", company: "pitney bowes", category: "utility", domains: ["*.borderfree.com", "*.fiftyone.com"] }, { name: "BowNow", category: "analytics", homepage: "https://bow-now.jp/", domains: ["*.bownow.jp"] }, { name: "Box", category: "hosting", domains: ["*.box.com"] }, { name: "Boxever", category: "analytics", domains: ["*.boxever.com"] }, { name: "Braintree Payments", company: "Paypal", category: "utility", domains: ["*.braintreegateway.com"] }, { name: "Branch Metrics", category: "ad", domains: ["*.branch.io", "*.app.link"] }, { name: "Brand Finance", category: "other", domains: ["*.brandirectory.com"] }, { name: "Brand View", category: "analytics", domains: ["*.brandview.com"] }, { name: "Brandscreen", category: "ad", domains: ["*.rtbidder.net"] }, { name: "BridgeTrack", company: "Sapient", category: "ad", domains: ["*.bridgetrack.com"] }, { name: "BrightRoll", company: "Yahoo!", category: "ad", domains: ["*.btrll.com"] }, { name: "BrightTag / Signal", company: "Signal", homepage: "https://www.signal.co", category: "tag-manager", domains: ["*.btstatic.com", "*.thebrighttag.com"] }, { name: "Brightcove ZenCoder", company: "Brightcove", category: "other", domains: ["*.zencoder.net"] }, { name: "Bronto Software", category: "marketing", domains: ["*.bm23.com", "*.bronto.com", "*.brontops.com"] }, { name: "Browser-Update.org", category: "other", domains: ["*.browser-update.org"] }, { name: "Buffer", category: "social", domains: ["*.bufferapp.com"] }, { name: "Bugsnag", category: "utility", domains: ["*.bugsnag.com", "d2wy8f7a9ursnm.cloudfront.net"] }, { name: "Burst Media", category: "ad", domains: ["*.burstnet.com", "*.1rx.io"] }, { name: "Burt", category: "analytics", domains: ["*.richmetrics.com", "*.burt.io"] }, { name: "Business Message", category: "ad", domains: ["*.message-business.com"] }, { name: "Business Week", company: "Bloomberg", category: "social", domains: ["*.bwbx.io"] }, { name: "Buto", company: "Big Button", category: "ad", domains: ["*.buto.tv"] }, { name: "Button", category: "ad", domains: ["*.btncdn.com"] }, { name: "BuySellAds", category: "ad", domains: ["*.buysellads.com", "*.buysellads.net"] }, { name: "BuySight (AOL)", category: "ad", domains: ["*.pulsemgr.com"] }, { name: "Buyapowa", category: "ad", domains: ["*.co-buying.com"] }, { name: "BuzzFeed", category: "social", domains: ["*.buzzfed.com", "*.buzzfeed.com"] }, { name: "C1X", category: "ad", domains: ["*.c1exchange.com"] }, { name: "C3 Metrics", category: "analytics", domains: ["*.c3tag.com"] }, { name: "CANDDi", company: "Campaign and Digital Intelligence", category: "ad", domains: ["*.canddi.com"] }, { name: "CCM benchmark Group", category: "social", domains: ["*.ccm2.net"] }, { name: "CD Networks", category: "utility", domains: ["*.gccdn.net"] }, { name: "CDN Planet", category: "analytics", domains: ["*.cdnplanet.com"] }, { name: "InAuth", category: "utility", homepage: "https://www.inauth.com/", domains: ["*.cdn-net.com"] }, { name: "CJ Affiliate", company: "Conversant", category: "ad", domains: ["*.cj.com", "*.dpbolvw.net"] }, { name: "CJ Affiliate by Conversant", company: "Conversant", category: "ad", domains: ["*.ftjcfx.com"] }, { name: "CNBC", category: "content", domains: ["*.cnbc.com"] }, { name: "CNET Content Solutions", company: "CBS Interactive", category: "content", domains: ["*.cnetcontent.com"] }, { name: "CPEx", category: "content", domains: ["*.cpex.cz"] }, { name: "CPXi", category: "ad", domains: ["*.cpxinteractive.com"] }, { name: "CUBED Attribution", company: "CUBED", category: "ad", domains: ["*.withcubed.com"] }, { name: "Cachefly", category: "utility", domains: ["*.cachefly.net"] }, { name: "Calendly", category: "other", domains: ["*.calendly.com"] }, { name: "CallRail", category: "analytics", domains: ["*.callrail.com"] }, { name: "CallTrackingMetrics", category: "analytics", domains: ["*.tctm.co"] }, { name: "Canned Banners", category: "ad", domains: ["*.cannedbanners.com"] }, { name: "Canopy Labs", category: "analytics", domains: ["*.canopylabs.com"] }, { name: "Capita", category: "utility", domains: ["*.crcom.co.uk"] }, { name: "Captify Media", category: "ad", domains: ["*.cpx.to"] }, { name: "Captiify", category: "ad", domains: ["*.captifymedia.com"] }, { name: "Captivate Ai", category: "ad", domains: ["*.captivate.ai"] }, { name: "Captora", category: "marketing", domains: ["*.captora.com"] }, { name: "Carcloud", category: "other", domains: ["*.carcloud.co.uk"] }, { name: "Cardlytics", category: "ad", domains: ["*.cardlytics.com"] }, { name: "Cardosa Enterprises", category: "analytics", domains: ["*.y-track.com"] }, { name: "Caspian Media", category: "ad", domains: ["*.caspianmedia.com"] }, { name: "Cast", category: "utility", domains: ["*.cast.rocks"] }, { name: "Catch", category: "other", domains: ["*.getcatch.com"] }, { name: "Cavisson", category: "analytics", domains: ["*.cavisson.com"] }, { name: "Cedato", category: "ad", domains: ["*.algovid.com", "*.vdoserv.com"] }, { name: "Celebrus Technologies", category: "analytics", domains: ["*.celebrus.com"] }, { name: "Celtra", category: "ad", domains: ["*.celtra.com"] }, { name: "Centro", category: "ad", domains: ["*.brand-server.com"] }, { name: "Ceros", category: "other", domains: ["ceros.com", "view.ceros.com"] }, { name: "Ceros Analytics", company: "Ceros", category: "analytics", domains: ["api.ceros.com"] }, { name: "Certona", category: "analytics", domains: ["*.certona.net"] }, { name: "Certum", category: "utility", domains: ["*.ocsp-certum.com", "*.certum.pl"] }, { name: "Cgrdirect", category: "other", domains: ["*.cgrdirect.co.uk"] }, { name: "Channel 5 Media", category: "ad", domains: ["*.five.tv"] }, { name: "Channel.me", category: "customer-success", domains: ["*.channel.me"] }, { name: "ChannelAdvisor", category: "ad", domains: ["*.channeladvisor.com", "*.searchmarketing.com"] }, { name: "ChannelApe", company: "ChannelApe", category: "other", homepage: "https://www.channelape.com/", domains: ["*.channelape.com"] }, { name: "Chargeads Oscar", company: "Chargeads", category: "ad", domains: ["*.chargeads.com"] }, { name: "Charities Aid Foundation", category: "utility", domains: ["*.cafonline.org"] }, { name: "Chartbeat", category: "analytics", domains: ["*.chartbeat.com", "*.chartbeat.net"] }, { name: "Cheapflights Media", company: "Momondo", category: "content", domains: ["*.momondo.net"] }, { name: "CheckM8", category: "ad", domains: ["*.checkm8.com"] }, { name: "CheckRate", company: "FreeStart", category: "utility", domains: ["*.checkrate.co.uk"] }, { name: "Checkfront", category: "other", domains: ["*.checkfront.com", "dcg3jth5savst.cloudfront.net"] }, { name: "CheetahMail", company: "Experian", category: "ad", domains: ["*.chtah.com"] }, { name: "Chitika", category: "ad", domains: ["*.chitika.net"] }, { name: "ChoiceStream", category: "ad", domains: ["*.choicestream.com"] }, { name: "Cint", category: "social", domains: ["*.cint.com"] }, { name: "Civic", category: "hosting", domains: ["*.civiccomputing.com"] }, { name: "ClearRise", category: "customer-success", domains: ["*.clearrise.com"] }, { name: "Clearstream", category: "ad", domains: ["*.clrstm.com"] }, { name: "Clerk.io ApS", category: "analytics", domains: ["*.clerk.io"] }, { name: "CleverDATA", category: "ad", domains: ["*.1dmp.io"] }, { name: "CleverTap", category: "analytics", domains: ["d2r1yp2w7bby2u.cloudfront.net"] }, { name: "Click Density", category: "analytics", domains: ["*.clickdensity.com"] }, { name: "Click4Assistance", category: "customer-success", domains: ["*.click4assistance.co.uk"] }, { name: "ClickDesk", category: "customer-success", domains: ["*.clickdesk.com", "d1gwclp1pmzk26.cloudfront.net"] }, { name: "ClickDimensions", category: "ad", domains: ["*.clickdimensions.com"] }, { name: "Clickadu (Winner Solutions)", category: "ad", domains: ["*.clickadu.com"] }, { name: "Clickagy Audience Lab", company: "Clickagy", category: "ad", domains: ["*.clickagy.com"] }, { name: "Clickio", category: "ad", domains: [] }, { name: "Clicktale", category: "analytics", domains: ["*.cdngc.net", "*.clicktale.net"] }, { name: "Clicktripz", category: "content", domains: ["*.clicktripz.com"] }, { name: "Clik.com Websites", category: "content", domains: ["*.clikpic.com"] }, { name: "Cloud Technologies", category: "ad", domains: ["*.behavioralengine.com", "*.behavioralmailing.com"] }, { name: "Cloud-A", category: "other", domains: ["*.bulkstorage.ca"] }, { name: "Cloud.typography", company: "Hoefler &amp; Co", category: "cdn", domains: ["*.typography.com"] }, { name: "CloudSponge", category: "ad", domains: ["*.cloudsponge.com"] }, { name: "CloudVPS", category: "other", domains: ["*.adoftheyear.com", "*.objectstore.eu"] }, { name: "Cloudinary", category: "content", domains: ["*.cloudinary.com"] }, { name: "Cloudqp", company: "Cloudwp", category: "other", domains: ["*.cloudwp.io"] }, { name: "Cludo", category: "utility", domains: ["*.cludo.com"] }, { name: "Cognesia", category: "marketing", domains: ["*.intelli-direct.com"] }, { name: "CogoCast", company: "Cogo Labs", category: "ad", domains: ["*.cogocast.net"] }, { name: "Colbenson", category: "utility", domains: ["*.colbenson.com"] }, { name: "Collective", category: "ad", domains: ["*.collective-media.net"] }, { name: "Com Laude", category: "other", domains: ["*.gdimg.net"] }, { name: "Comm100", category: "customer-success", domains: ["*.comm100.com"] }, { name: "CommerceHub", category: "marketing", domains: ["*.mercent.com"] }, { name: "Commission Factory", category: "ad", domains: ["*.cfjump.com"] }, { name: "Communicator", category: "ad", domains: ["*.communicatorcorp.com", "*.communicatoremail.com"] }, { name: "Comodo", category: "utility", domains: ["*.comodo.com", "*.trust-provider.com", "*.trustlogo.com", "*.usertrust.com", "*.comodo.net"] }, { name: "Comodo Certificate Authority", company: "Comodo", category: "utility", domains: ["crt.comodoca.com", "*.comodoca4.com", "ocsp.comodoca.com", "ocsp.usertrust.com", "crt.usertrust.com"] }, { name: "Compete", company: "Millwood Brown Digital", category: "analytics", domains: ["*.c-col.com", "*.compete.com"] }, { name: "Compuware", category: "analytics", domains: ["*.axf8.net"] }, { name: "Conductrics", category: "analytics", domains: ["*.conductrics.com"] }, { name: "Confirmit", category: "analytics", domains: ["*.confirmit.com"] }, { name: "Connatix", category: "ad", domains: ["*.connatix.com"] }, { name: "Connect Events", category: "hosting", domains: ["*.connectevents.com.au"] }, { name: "Constant Contact", category: "ad", domains: ["*.ctctcdn.com"] }, { name: "Constructor.io", category: "utility", domains: ["*.cnstrc.com"] }, { name: "Contabo", category: "hosting", domains: ["185.2.100.179"] }, { name: "Content Media Corporation", category: "content", domains: ["*.contentmedia.eu"] }, { name: "ContentSquare", category: "analytics", domains: ["d1m6l9dfulcyw7.cloudfront.net", "*.content-square.net", "*.contentsquare.net"] }, { name: "ContextWeb", category: "ad", domains: ["*.contextweb.com"] }, { name: "Continental Exchange Solutions", category: "utility", domains: ["*.hifx.com"] }, { name: "Converge-Digital", category: "ad", domains: ["*.converge-digital.com"] }, { name: "Conversant", category: "analytics", domains: ["*.dotomi.com", "*.dtmpub.com", "*.emjcd.com", "mediaplex.com", "*.tqlkg.com", "*.fastclick.net"] }, { name: "Conversant Ad Server", company: "Conversant", category: "ad", domains: ["adfarm.mediaplex.com", "*.mediaplex.com"] }, { name: "Conversant Tag Manager", company: "Conversant", category: "tag-manager", domains: ["*.mplxtms.com"] }, { name: "Conversio", category: "ad", domains: ["*.conversio.com"] }, { name: "Conversion Labs", category: "ad", domains: ["*.net.pl"] }, { name: "Conversion Logic", category: "ad", domains: ["*.conversionlogic.net"] }, { name: "Convert Insights", category: "analytics", domains: ["*.convertexperiments.com"] }, { name: "ConvertMedia", category: "ad", domains: ["*.admailtiser.com", "*.basebanner.com", "*.cmbestsrv.com", "*.vidfuture.com", "*.zorosrv.com"] }, { name: "Convertro", category: "ad", domains: ["*.convertro.com"] }, { name: "Conviva", category: "content", domains: ["*.conviva.com"] }, { name: "Cookie Reports", category: "utility", domains: ["*.cookiereports.com"] }, { name: "Cookie-Script.com", category: "utility", domains: ["*.cookie-script.com"] }, { name: "CookieQ", company: "Baycloud Systems", category: "utility", domains: ["*.cookieq.com"] }, { name: "CoolaData", category: "analytics", domains: ["*.cooladata.com"] }, { name: "CopperEgg", category: "analytics", domains: ["*.copperegg.com", "d2vig74li2resi.cloudfront.net"] }, { name: "Council ad Network", category: "ad", domains: ["*.counciladvertising.net"] }, { name: "Covert Pics", category: "content", domains: ["*.covet.pics"] }, { name: "Cox Digital Solutions", category: "ad", domains: ["*.afy11.net"] }, { name: "Creafi Online Media", category: "ad", domains: ["*.creafi-online-media.com"] }, { name: "Creators", category: "content", domains: ["*.creators.co"] }, { name: "Crimson Hexagon Analytics", company: "Crimson Hexagon", category: "analytics", domains: ["*.hexagon-analytics.com"] }, { name: "Crimtan", category: "ad", domains: ["*.ctnsnet.com"] }, { name: "Cross Pixel Media", category: "ad", domains: ["*.crsspxl.com"] }, { name: "Crosswise", category: "ad", domains: ["*.univide.com"] }, { name: "Crowd Control", company: "Lotame", category: "ad", domains: ["*.crwdcntrl.net"] }, { name: "Crowd Ignite", category: "ad", domains: ["*.crowdignite.com"] }, { name: "CrowdTwist", category: "ad", domains: ["*.crowdtwist.com"] }, { name: "Crowdskout", category: "ad", domains: ["*.crowdskout.com"] }, { name: "Crowdynews", category: "social", domains: ["*.breakingburner.com"] }, { name: "Curalate", category: "marketing", domains: ["*.curalate.com", "d116tqlcqfmz3v.cloudfront.net"] }, { name: "Customer Acquisition Cloud", company: "[24]7", category: "ad", domains: ["*.campanja.com"] }, { name: "Customer.io", category: "ad", domains: ["*.customer.io"] }, { name: "Custora", category: "analytics", domains: ["*.custora.com"] }, { name: "Cxense", category: "ad", domains: ["*.cxense.com", "*.cxpublic.com", "*.emediate.dk", "*.emediate.eu"] }, { name: "CyberKnight", company: "Namogoo", category: "utility", domains: ["*.namogoo.com"] }, { name: "CyberSource (Visa)", category: "utility", domains: ["*.authorize.net"] }, { name: "Cybernet Quest", category: "analytics", domains: ["*.cqcounter.com"] }, { name: "D.A. Consortium", category: "ad", domains: ["*.eff1.net"] }, { name: "D4t4 Solutions", category: "analytics", domains: ["*.u5e.com"] }, { name: "DCSL Software", category: "hosting", domains: ["*.dcslsoftware.com"] }, { name: "DMG Media", category: "content", domains: ["*.mol.im", "*.and.co.uk", "*.anm.co.uk", "*.dailymail.co.uk"] }, { name: "DTSCOUT", category: "ad", domains: ["*.dtscout.com"] }, { name: "Dailykarma", category: "utility", homepage: "https://www.dailykarma.com/", domains: ["*.dailykarma.io"] }, { name: "Dailymotion", category: "content", domains: ["*.dailymotion.com", "*.dmxleo.com", "*.dm.gg", "*.pxlad.io", "*.dmcdn.net", "*.sublimevideo.net"] }, { name: "Dash Hudson", company: "Dash Hudson", category: "content", domains: ["*.dashhudson.com"] }, { name: "Datacamp", category: "utility", domains: ["*.cdn77.org"] }, { name: "Datalicious", category: "tag-manager", domains: ["*.supert.ag", "*.optimahub.com"] }, { name: "Datalogix", category: "ad", domains: ["*.nexac.com"] }, { name: "Datawrapper", category: "utility", domains: ["*.datawrapper.de", "*.dwcdn.net"] }, { name: "Dataxu", category: "marketing", domains: ["*.w55c.net"] }, { name: "DatoCMS", homepage: "https://www.datocms.com/", category: "content", domains: ["*.datocms-assets.com"] }, { name: "Datonics", category: "ad", domains: ["*.pro-market.net"] }, { name: "Dealtime", category: "content", domains: ["*.dealtime.com"] }, { name: "Debenhams Geo Location", company: "Debenhams", category: "utility", domains: ["176.74.183.134"] }, { name: "Decibel Insight", category: "analytics", domains: ["*.decibelinsight.net"] }, { name: "Deep Forest Media", company: "Rakuten", category: "ad", domains: ["*.dpclk.com"] }, { name: "DeepIntent", category: "ad", domains: ["*.deepintent.com"] }, { name: "Delicious Media", category: "social", domains: ["*.delicious.com"] }, { name: "Delineo", category: "ad", domains: ["*.delineo.com"] }, { name: "Delta Projects AB", category: "ad", domains: ["*.de17a.com"] }, { name: "Demand Media", category: "content", domains: ["*.dmtracker.com"] }, { name: "DemandBase", category: "marketing", domains: ["*.demandbase.com"] }, { name: "DemandJump", category: "analytics", domains: ["*.demandjump.com"] }, { name: "Dennis Publishing", category: "content", domains: ["*.alphr.com"] }, { name: "Devatics", category: "analytics", domains: ["*.devatics.com", "*.devatics.io"] }, { name: "Developer Media", category: "ad", domains: ["*.developermedia.com"] }, { name: "DialogTech", category: "ad", domains: ["*.dialogtech.com"] }, { name: "DialogTech SourceTrak", company: "DialogTech", category: "ad", domains: ["d31y97ze264gaa.cloudfront.net"] }, { name: "DigiCert", category: "utility", domains: ["*.digicert.com"] }, { name: "Digioh", category: "ad", domains: ["*.lightboxcdn.com"] }, { name: "Digital Look", category: "content", domains: ["*.digitallook.com"] }, { name: "Digital Media Exchange", company: "NDN", category: "content", domains: ["*.newsinc.com"] }, { name: "Digital Millennium Copyright Act Services", category: "utility", domains: ["*.dmca.com"] }, { name: "Digital Ocean", category: "other", domains: ["95.85.62.56"] }, { name: "Digital Remedy", category: "ad", domains: ["*.consumedmedia.com"] }, { name: "Digital Window", category: "ad", domains: ["*.awin1.com", "*.zenaps.com"] }, { name: "DigitalScirocco", category: "analytics", domains: ["*.digitalscirocco.net"] }, { name: "Digitial Point", category: "utility", domains: ["*.dpstatic.com"] }, { name: "Diligent (Adnetik)", category: "ad", domains: ["*.wtp101.com"] }, { name: "Directed Edge", category: "social", domains: ["*.directededge.com"] }, { name: "Distribute Travel", category: "ad", domains: ["*.dtrck.net"] }, { name: "District M", category: "ad", domains: ["*.districtm.io"] }, { name: "DistroScale", category: "ad", domains: ["*.jsrdn.com"] }, { name: "Divido", category: "utility", domains: ["*.divido.com"] }, { name: "Dow Jones", category: "content", domains: ["*.dowjones.com", "*.dowjoneson.com"] }, { name: "Drifty Co", category: "utility", domains: ["*.onicframework.com"] }, { name: "Drip", company: "The Numa Group", category: "ad", domains: ["*.getdrip.com"] }, { name: "Dropbox", category: "utility", domains: ["*.dropboxusercontent.com"] }, { name: "Dyn Real User Monitoring", company: "Dyn", category: "analytics", domains: ["*.jisusaiche.biz", "*.dynapis.com", "*.jisusaiche.com", "*.dynapis.info"] }, { name: "DynAdmic", category: "ad", domains: ["*.dyntrk.com"] }, { name: "Dynamic Converter", category: "utility", domains: ["*.dynamicconverter.com"] }, { name: "Dynamic Dummy Image Generator", company: "Open Source", category: "utility", domains: ["*.dummyimage.com"] }, { name: "Dynamic Logic", category: "ad", domains: ["*.dl-rms.com", "*.questionmarket.com"] }, { name: "Dynamic Yield", category: "customer-success", domains: ["*.dynamicyield.com"] }, { name: "Dynatrace", category: "analytics", domains: ["*.ruxit.com", "js-cdn.dynatrace.com"] }, { name: "ec-concier", homepage: "https://ec-concier.com/", category: "marketing", domains: ["*.ec-concier.com"] }, { name: "ECT News Network", category: "content", domains: ["*.ectnews.com"] }, { name: "ELITechGroup", category: "analytics", domains: ["*.elitechnology.com"] }, { name: "EMAP", category: "content", domains: ["*.emap.com"] }, { name: "EMedia Solutions", category: "ad", domains: ["*.e-shots.eu"] }, { name: "EQ works", category: "ad", domains: ["*.eqads.com"] }, { name: "ESV Digital", category: "analytics", domains: ["*.esearchvision.com"] }, { name: "Ebiquity", category: "analytics", domains: ["*.ebiquitymedia.com"] }, { name: "Eco Rebates", category: "ad", domains: ["*.ecorebates.com"] }, { name: "Ecwid", category: "hosting", domains: ["*.ecwid.com", "*.shopsettings.com", "d3fi9i0jj23cau.cloudfront.net", "d3j0zfs7paavns.cloudfront.net"] }, { name: "Edge Web Fonts", company: "Adobe Systems", category: "cdn", domains: ["*.edgefonts.net"] }, { name: "Edition Digital", category: "ad", domains: ["*.editiondigital.com"] }, { name: "Edot Web Technologies", category: "hosting", domains: ["*.edot.co.za"] }, { name: "Effective Measure", category: "ad", domains: ["*.effectivemeasure.net"] }, { name: "Effiliation sa", category: "ad", domains: ["*.effiliation.com"] }, { name: "Ekm Systems", category: "analytics", domains: ["*.ekmsecure.com", "*.ekmpinpoint.co.uk"] }, { name: "Elastera", category: "hosting", domains: ["*.elastera.net"] }, { name: "Elastic Ad", category: "ad", domains: ["*.elasticad.net"] }, { name: "Elastic Load Balancing", company: "Amazon Web Services", category: "hosting", domains: ["*.105app.com"] }, { name: "Elecard StreamEye", company: "Elecard", category: "other", domains: ["*.streameye.net"] }, { name: "Elevate", company: "Elevate Technology Solutions", category: "utility", domains: ["*.elevaate.technology"] }, { name: "Elicit", category: "utility", domains: ["*.elicitapp.com"] }, { name: "Elogia", category: "ad", domains: ["*.elogia.net"] }, { name: "Email Attitude", company: "1000mercis", category: "ad", domains: ["*.email-attitude.com"] }, { name: "EmailCenter", category: "ad", domains: ["*.emailcenteruk.com"] }, { name: "Embedly", category: "content", domains: ["*.embedly.com", "*.embed.ly"] }, { name: "EmpathyBroker Site Search", company: "EmpathyBroker", category: "utility", domains: ["*.empathybroker.com"] }, { name: "Enfusen", category: "analytics", domains: ["*.enfusen.com"] }, { name: "Engadget", company: "Engadget (AOL)", category: "content", domains: ["*.gdgt.com"] }, { name: "Engagio", category: "marketing", domains: ["*.engagio.com"] }, { name: "Ensighten Manage", company: "Ensighten", category: "tag-manager", domains: ["*.levexis.com"] }, { name: "EntityLink", category: "other", domains: ["*.entitytag.co.uk"] }, { name: "Entrust Datacard", category: "utility", domains: ["*.entrust.com", "*.entrust.net"] }, { name: "Equiniti", category: "utility", domains: ["*.equiniti.com"] }, { name: "Errorception", category: "utility", domains: ["*.errorception.com"] }, { name: "Esri ArcGIS", company: "Esri", category: "utility", domains: ["*.arcgis.com", "*.arcgisonline.com"] }, { name: "Ethnio", category: "analytics", domains: ["*.ethn.io"] }, { name: "Eulerian Technologies", category: "ad", domains: ["*.eolcdn.com"] }, { name: "Euroland", category: "utility", domains: ["*.euroland.com"] }, { name: "European Interactive Digital ad Alli", category: "utility", domains: ["*.edaa.eu"] }, { name: "Eventbrite", category: "hosting", domains: ["*.evbuc.com", "*.eventbrite.co.uk"] }, { name: "Everflow", category: "analytics", domains: ["*.tp88trk.com"] }, { name: "Evergage", category: "analytics", domains: ["*.evergage.com", "*.evgnet.com"] }, { name: "Everquote", category: "content", domains: ["*.evq1.com"] }, { name: "Everyday Health", category: "ad", domains: ["*.agoramedia.com"] }, { name: "Evidon", category: "analytics", domains: ["*.evidon.com"] }, { name: "Evolve Media", category: "content", domains: ["*.evolvemediallc.com"] }, { name: "Exactag", category: "ad", domains: ["*.exactag.com"] }, { name: "ExoClick", category: "ad", domains: ["*.exoclick.com"] }, { name: "Expedia", category: "content", domains: ["*.travel-assets.com", "*.trvl-media.com", "*.trvl-px.com", "*.uciservice.com"] }, { name: "Expedia Australia", company: "Expedia", category: "content", domains: ["*.expedia.com.au"] }, { name: "Expedia Canada", company: "Expedia", category: "content", domains: ["*.expedia.ca"] }, { name: "Expedia France", company: "Expedia", category: "content", domains: ["*.expedia.fr"] }, { name: "Expedia Germany", company: "Expedia", category: "content", domains: ["*.expedia.de"] }, { name: "Expedia Italy", company: "Expedia", category: "content", domains: ["*.expedia.it"] }, { name: "Expedia Japan", company: "Expedia", category: "content", domains: ["*.expedia.co.jp"] }, { name: "Expedia USA", company: "Expedia", category: "content", domains: ["*.expedia.com"] }, { name: "Expedia United Kingdom", company: "Expedia", category: "content", domains: ["*.expedia.co.uk"] }, { name: "Experian", category: "utility", domains: ["*.audienceiq.com", "*.experian.com", "*.experianmarketingservices.digital"] }, { name: "Experian Cross-Channel Marketing Platform", company: "Experian", category: "marketing", domains: ["*.eccmp.com", "*.ccmp.eu"] }, { name: "Exponea", category: "analytics", domains: ["*.exponea.com"] }, { name: "Exponential Interactive", category: "ad", domains: ["*.exponential.com"] }, { name: "Extensis WebInk", category: "cdn", domains: ["*.webink.com"] }, { name: "Extole", category: "ad", domains: ["*.extole.com", "*.extole.io"] }, { name: "Ey-Seren", category: "analytics", domains: ["*.webabacus.com"] }, { name: "EyeView", category: "ad", domains: ["*.eyeviewads.com"] }, { name: "Eyeota", category: "ad", domains: ["*.eyeota.net"] }, { name: "Ezakus Pretargeting", company: "Ezakus", category: "ad", domains: ["*.ezakus.net"] }, { name: "Ezoic", category: "analytics", domains: ["*.ezoic.net"] }, { name: "FLXone", company: "Teradata", category: "ad", domains: ["*.pangolin.blue", "*.flx1.com", "d2hlpp31teaww3.cloudfront.net", "*.flxpxl.com"] }, { name: "Fairfax Media", category: "content", domains: ["ads.fairfax.com.au", "resources.fairfax.com.au"] }, { name: "Fairfax Media Analtics", company: "Fairfax Media", category: "analytics", domains: ["analytics.fairfax.com.au"] }, { name: "Falk Technologies", category: "ad", domains: ["*.angsrvr.com"] }, { name: "Fanplayr", category: "analytics", domains: ["*.fanplayr.com", "d38nbbai6u794i.cloudfront.net"] }, { name: "Fast Thinking", company: "NE Marketing", category: "marketing", domains: ["*.fast-thinking.co.uk"] }, { name: "Fastest Forward", category: "analytics", domains: ["*.gaug.es"] }, { name: "Fastly", category: "utility", domains: ["*.fastly.net"] }, { name: "Feedbackify", company: "InsideMetrics", category: "analytics", domains: ["*.feedbackify.com"] }, { name: "Feefo.com", company: "Feefo", category: "analytics", domains: ["*.feefo.com"] }, { name: "Fidelity Media", category: "ad", domains: ["*.fidelity-media.com"] }, { name: "Filestack", category: "content", domains: ["*.filepicker.io"] }, { name: "Finsbury Media", category: "ad", domains: ["*.finsburymedia.com"] }, { name: "Firepush", category: "utility", domains: ["*.firepush.io"] }, { name: "FirstImpression", category: "ad", domains: ["*.firstimpression.io"] }, { name: "Fit Analytics", category: "other", domains: ["*.fitanalytics.com"] }, { name: "Fits Me", category: "analytics", domains: ["*.fits.me"] }, { name: "Fivetran", category: "analytics", domains: ["*.fivetran.com"] }, { name: "FlexShopper", category: "utility", domains: ["*.flexshopper.com"] }, { name: "Flickr", category: "content", domains: ["*.flickr.com", "*.staticflickr.com"] }, { name: "Flipboard", category: "social", domains: ["*.flipboard.com"] }, { name: "Flipdesk", category: "customer-success", homepage: "https://flipdesk.jp/", domains: ["*.flipdesk.jp"] }, { name: "Flipp", category: "analytics", domains: ["*.wishabi.com", "d2e0sxz09bo7k2.cloudfront.net", "*.wishabi.net"] }, { name: "Flite", category: "ad", domains: ["*.flite.com"] }, { name: "Flixmedia", category: "analytics", domains: ["*.flix360.com", "*.flixcar.com", "*.flixfacts.com", "*.flixsyndication.net", "*.flixfacts.co.uk"] }, { name: "Flockler", category: "ad", domains: ["*.flockler.com"] }, { name: "Flowplayer", category: "content", domains: ["*.flowplayer.org"] }, { name: "Flowzymes Ky", category: "cdn", domains: ["*.jquerytools.org"] }, { name: "Fomo", category: "ad", domains: ["*.notifyapp.io"] }, { name: "Fonecall", category: "analytics", domains: ["*.web-call-analytics.com"] }, { name: "Fontdeck", category: "cdn", domains: ["*.fontdeck.com"] }, { name: "Foodity Technologies", category: "ad", domains: ["*.foodity.com"] }, { name: "Force24", category: "ad", domains: ["*.force24.co.uk"] }, { name: "ForeSee", company: "Answers", category: "analytics", domains: ["*.4seeresults.com", "*.answerscloud.com", "*.foresee.com", "*.foreseeresults.com"] }, { name: "Forensiq", category: "utility", domains: ["*.fqtag.com"] }, { name: "Fort Awesome", category: "cdn", domains: ["*.fortawesome.com"] }, { name: "Forter", category: "utility", domains: ["*.forter.com"] }, { name: "Forward Internet Group", category: "hosting", domains: ["*.f3d.io"] }, { name: "Forward3D", category: "ad", domains: ["*.forward3d.com"] }, { name: "Fospha", category: "analytics", domains: ["*.fospha.com"] }, { name: "Foursixty", category: "customer-success", domains: ["*.foursixty.com"] }, { name: "FoxyCart", category: "utility", domains: ["*.foxycart.com"] }, { name: "Framer CDN", company: "Framer", homepage: "https://www.framer.com", category: "hosting", domains: ["framerusercontent.com", "*.framerstatic.com", "events.framer.com", "framer.com"] }, { name: "Fraudlogix", category: "utility", domains: ["*.yabidos.com"] }, { name: "FreakOut", category: "ad", domains: ["*.fout.jp"] }, { name: "Freespee", category: "customer-success", domains: ["*.freespee.com"] }, { name: "Freetobook", category: "content", domains: ["*.freetobook.com"] }, { name: "Fresh 8 Gaming", category: "ad", domains: ["*.fresh8.co"] }, { name: "Fresh Relevance", category: "analytics", domains: ["*.freshrelevance.com", "*.cloudfront.ne", "d1y9qtn9cuc3xw.cloudfront.net", "d81mfvml8p5ml.cloudfront.net", "dkpklk99llpj0.cloudfront.net"] }, { name: "Friendbuy", category: "ad", domains: ["*.friendbuy.com", "djnf6e5yyirys.cloudfront.net"] }, { name: "Frienefit", category: "ad", domains: ["*.frienefit.com"] }, { name: "FuelX", category: "ad", domains: ["*.fuelx.com"] }, { name: "Full Circle Studies", category: "analytics", domains: ["*.securestudies.com"] }, { name: "FullStory", category: "analytics", domains: ["*.fullstory.com"] }, { name: "Fyber", category: "ad", domains: ["*.fyber.com"] }, { name: "G-Forces Web Management", category: "hosting", domains: ["*.gforcesinternal.co.uk"] }, { name: "G4 Native", company: "Gravity4", category: "ad", domains: ["*.triggit.com"] }, { name: "GET ME IN!  (TicketMaster)", category: "content", domains: ["*.getmein.com"] }, { name: "GIPHY", category: "content", domains: ["*.giphy.com"] }, { name: "GainCloud", company: "GainCloud Systems", category: "other", domains: ["*.egaincloud.net"] }, { name: "Gath Adams", category: "content", domains: ["*.iwantthatflight.com.au"] }, { name: "Gecko Tribe", category: "social", domains: ["*.geckotribe.com"] }, { name: "Gemius", category: "ad", domains: ["*.gemius.pl"] }, { name: "Genesis Media", category: "ad", domains: ["*.bzgint.com", "*.genesismedia.com", "*.genesismediaus.com"] }, { name: "Genie Ventures", category: "ad", domains: ["*.genieventures.co.uk"] }, { name: "Geniee", category: "ad", domains: ["*.href.asia", "*.genieessp.jp", "*.genieesspv.jp", "*.gssprt.jp"] }, { name: "Geniuslink", category: "analytics", domains: ["*.geni.us"] }, { name: "GeoRiot", category: "other", domains: ["*.georiot.com"] }, { name: "GeoTrust", category: "utility", domains: ["*.geotrust.com"] }, { name: "Geoplugin", category: "utility", domains: ["*.geoplugin.com", "*.geoplugin.net"] }, { name: "Georeferencer", company: "Klokan Technologies", category: "utility", domains: ["*.georeferencer.com"] }, { name: "GetIntent RTBSuite", company: "GetIntent", category: "ad", domains: ["*.adhigh.net"] }, { name: "GetResponse", category: "ad", domains: ["*.getresponse.com"] }, { name: "GetSiteControl", company: "GetWebCraft", category: "utility", domains: ["*.getsitecontrol.com"] }, { name: "GetSocial", category: "social", domains: ["*.getsocial.io"] }, { name: "Getty Images", category: "content", domains: ["*.gettyimages.com", "*.gettyimages.co.uk"] }, { name: "Gfycat", company: "Gycat", category: "utility", domains: ["*.gfycat.com"] }, { name: "Ghostery Enterprise", company: "Ghostery", category: "marketing", domains: ["*.betrad.com"] }, { name: "Giant Media", category: "ad", domains: ["*.videostat.com"] }, { name: "Gigya", category: "analytics", domains: ["*.gigya.com"] }, { name: "GitHub", category: "utility", domains: ["*.github.com", "*.githubusercontent.com", "*.github.io", "*.rawgit.com"] }, { name: "Gladly", company: "Gladly", homepage: "https://www.gladly.com/", category: "customer-success", domains: ["*.gladly.com"] }, { name: "Glassdoor", category: "content", domains: ["*.glassdoor.com"] }, { name: "Gleam", category: "marketing", domains: ["*.gleam.io"] }, { name: "Global Digital Markets", category: "ad", domains: ["*.gdmdigital.com"] }, { name: "Global-e", category: "hosting", domains: ["*.global-e.com"] }, { name: "GlobalSign", category: "utility", domains: ["*.globalsign.com", "*.globalsign.net"] }, { name: "GlobalWebIndex", category: "analytics", domains: ["*.globalwebindex.net"] }, { name: "Globase International", category: "ad", domains: ["*.globase.com"] }, { name: "GoDataFeed", category: "other", domains: ["*.godatafeed.com"] }, { name: "Google APIs", company: "Google", category: "utility", domains: ["googleapis.com"] }, { name: "Google Ad Block Detection", company: "Google", category: "ad", domains: ["*.0emn.com", "*.0fmm.com"] }, { name: "Google Analytics Experiments", company: "Google", category: "analytics", domains: ["*.gexperiments1.com"] }, { name: "Google DoubleClick Ad Exchange", company: "Google", category: "ad", domains: ["*.admeld.com"] }, { name: "Google IPV6 Metrics", company: "Google", category: "analytics", domains: ["*.ipv6test.net"] }, { name: "Google Plus", company: "Google", category: "social", domains: ["plus.google.com"] }, { name: "Google Trusted Stores", company: "Google", category: "utility", domains: ["*.googlecommerce.com"] }, { name: "Google Video", company: "Google", category: "content", domains: ["*.googlevideo.com"] }, { name: "Google reCAPTCHA", company: "Google", category: "utility", domains: ["*.recaptcha.net"] }, { name: "GovMetric", company: "ROL Solutions", category: "analytics", domains: ["*.govmetric.com"] }, { name: "Granify", category: "analytics", domains: ["*.granify.com"] }, { name: "Grapeshot", category: "ad", domains: ["*.gscontxt.net", "*.grapeshot.co.uk"] }, { name: "Gravity (AOL)", category: "analytics", domains: ["*.grvcdn.com"] }, { name: "Groovy Gecko", category: "content", domains: ["*.ggwebcast.com", "*.groovygecko.net"] }, { name: "GroupM", category: "ad", domains: ["*.qservz.com"] }, { name: "Guardian Media", category: "ad", domains: ["*.theguardian.com", "*.guardian.co.uk"] }, { name: "GumGum", category: "ad", domains: ["*.gumgum.com"] }, { name: "Gumtree", category: "content", domains: ["*.gumtree.com"] }, { name: "H264 Codec", company: "Cisco", category: "other", domains: ["*.openh264.org"] }, { name: "HERE", category: "analytics", domains: ["*.medio.com"] }, { name: "HP Optimost", company: "Hewlett-Packard Development Company", category: "marketing", domains: ["*.hp.com", "d2uncb19xzxhzx.cloudfront.net"] }, { name: "Has Offers", company: "TUNE", category: "ad", domains: ["*.go2cloud.org"] }, { name: "Hawk Search", category: "utility", domains: ["*.hawksearch.com"] }, { name: "Haymarket Media Group", category: "content", domains: ["*.brandrepublic.com", "*.hbpl.co.uk"] }, { name: "Heap", category: "analytics", domains: ["*.heapanalytics.com"] }, { name: "Hearst Communications", category: "content", domains: ["*.h-cdn.co", "*.hearstdigital.com", "*.hearstlabs.com", "*.hearst.io", "*.cdnds.net"] }, { name: "Heatmap", category: "analytics", domains: ["*.heatmap.it"] }, { name: "Heroku", category: "other", domains: ["*.herokuapp.com"] }, { name: "Hexton", category: "utility", domains: ["*.hextom.com"] }, { name: "Hibernia Networks", category: "utility", domains: ["*.hiberniacdn.com"] }, { name: "High Impact Media", category: "ad", domains: ["*.reactx.com"] }, { name: "Highcharts", category: "utility", domains: ["*.highcharts.com"] }, { name: "Highwinds", category: "utility", domains: ["*.hwcdn.net"] }, { name: "HitsLink", category: "analytics", domains: ["*.hitslink.com"] }, { name: "Hola Networks", category: "other", domains: ["*.h-cdn.com"] }, { name: "Hootsuite", category: "analytics", domains: ["*.hootsuite.com"] }, { name: "HotUKDeals", category: "analytics", domains: ["*.hotukdeals.com"] }, { name: "HotWords", company: "Media Response Group", category: "ad", domains: ["*.hotwords.com.br"] }, { name: "HotelsCombined", category: "content", domains: ["*.datahc.com"] }, { name: "Hoverr", category: "ad", domains: ["*.hoverr.media"] }, { name: "Hull.js", category: "utility", domains: ["*.hull.io", "*.hullapp.io"] }, { name: "Hupso Website Analyzer", company: "Hupso", category: "analytics", domains: ["*.hupso.com"] }, { name: "I-Behavior", company: "WPP", category: "ad", domains: ["*.ib-ibi.com"] }, { name: "i-mobile", company: "i-mobile", category: "ad", domains: ["*.i-mobile.co.jp"] }, { name: "IBM Digital Analytics", company: "IBM", category: "analytics", domains: ["*.cmcore.com", "coremetrics.com", "data.coremetrics.com", "data.de.coremetrics.com", "libs.de.coremetrics.com", "tmscdn.de.coremetrics.com", "iocdn.coremetrics.com", "libs.coremetrics.com", "tmscdn.coremetrics.com", "*.s81c.com", "*.unica.com", "*.coremetrics.eu"] }, { name: "IBM Digital Data Exchange", company: "IBM", category: "tag-manager", domains: ["tagmanager.coremetrics.com"] }, { name: "IBM Tealeaf", company: "IBM", category: "analytics", domains: ["*.ibmcloud.com"] }, { name: "IBM Acoustic Campaign", company: "IBM", category: "analytics", domains: ["www.sc.pages01.net", "www.sc.pages02.net", "www.sc.pages03.net", "www.sc.pages04.net", "www.sc.pages05.net", "www.sc.pages06.net", "www.sc.pages07.net", "www.sc.pages08.net", "www.sc.pages09.net", "www.sc.pagesA.net"] }, { name: "ICF Technology", category: "content", domains: ["*.camads.net"] }, { name: "IFDNRG", category: "hosting", domains: ["*.ifdnrg.com"] }, { name: "IMRG", category: "analytics", domains: ["*.peermap.com", "*.imrg.org"] }, { name: "IPONWEB", category: "ad", domains: ["*.company-target.com", "*.liadm.com", "*.iponweb.net", "*.p161.net"] }, { name: "IQ Mobile", category: "utility", domains: ["*.iqm.cc"] }, { name: "IS Group", category: "hosting", domains: ["*.creative-serving.com"] }, { name: "IT Dienstleistungen Tim Prinzkosky", category: "utility", domains: ["*.flaticons.net"] }, { name: "IXI Digital", company: "Equifax", category: "ad", domains: ["*.ixiaa.com"] }, { name: "IcoMoon", category: "cdn", domains: ["d19ayerf5ehaab.cloudfront.net", "d1azc1qln24ryf.cloudfront.net"] }, { name: "IdenTrust", category: "utility", domains: ["*.identrust.com"] }, { name: "Ido", category: "customer-success", domains: ["*.idio.co"] }, { name: "Ignition One", category: "marketing", domains: ["*.searchignite.com"] }, { name: "ImageShack", category: "content", domains: ["*.yfrog.com"] }, { name: "Imagen Studio", category: "utility", domains: ["*.telephonesky.com"] }, { name: "Imagini Holdings", category: "ad", domains: ["*.vdna-assets.com"] }, { name: "Img Safe", category: "content", domains: ["*.imgsafe.org"] }, { name: "Imgur", category: "utility", domains: ["*.imgur.com"] }, { name: "Impact Radius", category: "ad", domains: ["*.impactradius-event.com", "*.impactradius-go.com", "*.7eer.net", "d3cxv97fi8q177.cloudfront.net", "*.evyy.net", "*.ojrq.net", "utt.impactcdn.com", "*.sjv.io"] }, { name: "Improve Digital", category: "ad", domains: ["*.360yield.com"] }, { name: "Improvely", category: "analytics", domains: ["*.iljmp.com"] }, { name: "InMobi", category: "ad", domains: ["*.inmobi.com"] }, { name: "InSkin Media", category: "ad", domains: ["*.inskinad.com", "*.inskinmedia.com"] }, { name: "Inbenta", category: "customer-success", domains: ["*.inbenta.com"] }, { name: "Incisive Media", category: "content", domains: ["*.incisivemedia.com"] }, { name: "Indeed", category: "content", domains: ["*.indeed.com"] }, { name: "Index Exchange", company: "WPP", category: "ad", domains: ["*.casalemedia.com", "*.indexww.com"] }, { name: "Indoona", category: "other", domains: ["*.indoona.com"] }, { name: "Infectious Media", category: "ad", domains: ["*.impdesk.com", "*.impressiondesk.com", "*.inmz.net"] }, { name: "Inference Mobile", category: "ad", domains: ["*.inferencemobile.com"] }, { name: "Infinity Tracking", category: "analytics", domains: ["*.infinity-tracking.net"] }, { name: "Infoline", category: "analytics", domains: ["*.ioam.de"] }, { name: "Infolinks", category: "ad", domains: ["*.infolinks.com"] }, { name: "Infopark", category: "hosting", domains: ["*.scrvt.com"] }, { name: "Infusionsoft", category: "ad", domains: ["*.infusionsoft.com"] }, { name: "Ink", category: "ad", domains: ["*.inktad.com"] }, { name: "Inktel Contact Center Solutions", company: "Inktel", category: "customer-success", domains: ["*.inktel.com"] }, { name: "Inneractive", category: "ad", domains: ["*.inner-active.mobi"] }, { name: "Innovid", category: "ad", homepage: "https://www.innovid.com/", domains: ["*.innovid.com"] }, { name: "Insight Express", category: "analytics", domains: ["*.insightexpressai.com"] }, { name: "Insipio", category: "other", domains: ["*.insipio.com"] }, { name: "Inspectlet", category: "analytics", domains: ["*.inspectlet.com"] }, { name: "Instansive", category: "utility", domains: ["*.instansive.com"] }, { name: "Instart", homepage: "https://www.instart.com/", category: "utility", domains: ["*.insnw.net"] }, { name: "Instembedder", category: "content", domains: ["*.instaembedder.com"] }, { name: "Instinctive", category: "ad", domains: ["*.instinctiveads.com"] }, { name: "Intelligent Reach", category: "ad", domains: ["*.ist-track.com"] }, { name: "Intent HQ", category: "analytics", domains: ["*.intenthq.com"] }, { name: "Intent IQ", category: "ad", domains: ["*.intentiq.com"] }, { name: "Intercept Interactive", category: "ad", domains: ["*.undertone.com"] }, { name: "Interest Graph", company: "AOL", category: "ad", domains: ["*.gravity.com"] }, { name: "Internet Brands", category: "content", domains: ["*.ibpxl.com"] }, { name: "Interpublic Group", category: "ad", domains: ["*.mbww.com"] }, { name: "Interstate", category: "analytics", domains: ["*.interstateanalytics.com"] }, { name: "Interview", category: "analytics", domains: ["*.efm.me"] }, { name: "Intilery", category: "customer-success", domains: ["*.intilery-analytics.com"] }, { name: "Investis", category: "utility", domains: ["*.investis.com"] }, { name: "Investis Flife", category: "hosting", domains: ["*.quartalflife.com"] }, { name: "Invodo", category: "ad", domains: ["*.invodo.com"] }, { name: "iSite", category: "analytics", domains: ["*.isitetv.com"] }, { name: "Issue", category: "content", domains: ["*.issue.by"] }, { name: "J.D. Williams & Co", category: "content", domains: ["*.drct2u.com"] }, { name: "Janrain", category: "analytics", domains: ["*.janrain.com", "*.janrainbackplane.com", "*.rpxnow.com", "d3hmp0045zy3cs.cloudfront.net"] }, { name: "Jellyfish", category: "ad", domains: ["*.jellyfish.net"] }, { name: "JetStream", category: "content", domains: ["*.xlcdn.com"] }, { name: "JingDong", category: "content", domains: ["*.3.com", "*.jd.com"] }, { name: "Jivox", category: "ad", domains: ["*.jivox.com"] }, { name: "Jobvite", category: "content", domains: ["*.jobvite.com"] }, { name: "Johnston Press", category: "content", domains: ["*.johnstonpress.co.uk", "*.jpress.co.uk"] }, { name: "Join the Dots (Research)", category: "social", domains: ["*.jtdiscuss.com"] }, { name: "JotForm", category: "utility", domains: ["*.jotformpro.com"] }, { name: "JuicyAds", category: "ad", domains: ["*.juicyads.com"] }, { name: "JustPremium", category: "ad", domains: ["*.net.net"] }, { name: "JustPremium Ads", company: "JustPremium", category: "ad", domains: ["*.justpremium.com"] }, { name: "JustUno", category: "ad", domains: ["*.justuno.com", "d2j3qa5nc37287.cloudfront.net"] }, { name: "KINX (Korea Internet Neutral eXchange)", category: "other", domains: ["*.kinxcdn.com"] }, { name: "KISSmetrics", category: "analytics", domains: ["*.kissmetrics.com", "doug1izaerwt3.cloudfront.net", "dsyszv14g9ymi.cloudfront.net"] }, { name: "Kaizen Platform", category: "analytics", domains: ["*.kaizenplatform.net"] }, { name: "Kakao", category: "social", domains: ["*.daum.net", "*.daumcdn.net"] }, { name: "Kaltura Video Platform", company: "Kaltura", category: "content", domains: ["*.kaltura.com"] }, { name: "Kameleoon", homepage: "https://www.kameleoon.com/", category: "analytics", domains: ["*.kameleoon.com", "*.kameleoon.eu", "*.kameleoon.io"] }, { name: "Kampyle", category: "analytics", domains: ["*.kampyle.com"] }, { name: "Kantar", category: "analytics", domains: ["*.sesamestats.com"] }, { name: "Kargo", category: "marketing", domains: ["*.kargo.com"] }, { name: "KARTE", company: "Plaid", homepage: "https://karte.io/", category: "marketing", domains: ["*.karte.io"] }, { name: "Kauli", category: "ad", domains: ["*.kau.li"] }, { name: "Keen", company: "Keen", homepage: "https://keen.io/", category: "analytics", domains: ["*.keen.io", "d26b395fwzu5fz.cloudfront.net"] }, { name: "Kelkoo", category: "hosting", domains: ["*.kelkoo.com"] }, { name: "Kenshoo", category: "marketing", domains: ["*.xg4ken.com"] }, { name: "Key CDN", category: "utility", domains: ["*.kxcdn.com"] }, { name: "Keynote", company: "Dynatrace", category: "analytics", domains: ["*.keynote.com"] }, { name: "Keywee", category: "ad", domains: ["*.keywee.co"] }, { name: "Kiosked", category: "ad", domains: ["*.kiosked.com"] }, { name: "Klarna", category: "utility", domains: ["*.klarna.com"] }, { name: "Klaviyo", category: "ad", domains: ["*.klaviyo.com"] }, { name: "Klevu Search", company: "Klevu", category: "utility", domains: ["*.klevu.com"] }, { name: "Klick2Contact", category: "customer-success", domains: ["*.klick2contact.com"] }, { name: "Knight Lab", company: "Northwestern University", category: "utility", domains: ["*.knightlab.com"] }, { name: "Kodajo", category: "other", domains: ["*.kodajo.com"] }, { name: "Komoona", category: "ad", domains: ["*.komoona.com"] }, { name: "Korrelate", company: "JD Power", category: "analytics", domains: ["*.korrelate.net"] }, { name: "LKQD", category: "ad", domains: ["*.lkqd.net"] }, { name: "Layer0", category: "cdn", domains: ["*.layer0.co"] }, { name: "Layershift", category: "hosting", domains: ["109.109.138.174"] }, { name: "Lead Forensics", category: "ad", domains: ["*.200summit.com", "*.baw5tracker.com", "*.business-path-55.com", "*.bux1le001.com", "*.central-core-7.com", "*.direct-azr-78.com", "*.explore-123.com", "*.forensics1000.com", "*.gldsta-02-or.com", "*.green-bloc9.com", "*.lansrv040.com", "*.lead-123.com", "*.leadforensics.com", "*.mavic852.com", "*.mon-com-net.com", "*.peak-ip-54.com", "*.snta0034.com", "*.svr-prc-01.com", "*.syntace-094.com", "*.tghbn12.com", "*.trail-web.com", "*.web-01-gbl.com", "*.web-cntr-07.com", "*.trackdiscovery.net"] }, { name: "Lead Intelligence", company: "Magnetise Solutions", category: "ad", domains: ["*.leadintelligence.co.uk"] }, { name: "LeadLander", category: "analytics", domains: ["*.formalyzer.com", "*.trackalyzer.com"] }, { name: "Leaflet", category: "utility", domains: ["*.leafletjs.com"] }, { name: "LeasdBoxer", company: "LeadBoxer", category: "ad", domains: ["*.leadboxer.com"] }, { name: "LeaseWeb", homepage: "https://www.leaseweb.com/", category: "cdn", domains: ["*.lswcdn.net", "*.leasewebcdn.com"] }, { name: "Leboncoin", category: "content", domains: ["*.leboncoin.fr"] }, { name: "Lengow", category: "hosting", domains: ["*.lengow.com"] }, { name: "Lessbuttons", category: "social", domains: ["*.lessbuttons.com"] }, { name: "Letter Press", category: "ad", domains: ["*.getletterpress.com"] }, { name: "Level 3 Communications", category: "utility", domains: ["footprint.net"] }, { name: "Level3", category: "other", domains: ["secure.footprint.net"] }, { name: "Lifestreet Media", category: "social", domains: ["*.lfstmedia.com"] }, { name: "LiftSuggest", category: "analytics", domains: ["d2blwevgjs7yom.cloudfront.net"] }, { name: "Ligatus", category: "ad", domains: ["*.ligadx.com"] }, { name: "LightStep", category: "analytics", domains: ["*.lightstep.com"] }, { name: "LightWidget", category: "utility", domains: ["*.lightwidget.com"] }, { name: "Likelihood", company: "LIkeihood", category: "hosting", domains: ["*.likelihood.com"] }, { name: "LikeShop", company: "Dash Hudson", category: "content", domains: ["likeshop.me"] }, { name: "LINE Corporation", category: "ad", domains: ["*.line-scdn.net", "*.line.me"] }, { name: "Linkcious", category: "analytics", domains: ["*.linkcious.com"] }, { name: "Linking Mobile", category: "ad", domains: ["*.linkingmobile.com"] }, { name: "LittleData", category: "analytics", homepage: "https://www.littledata.io/", domains: ["*.littledata.io"] }, { name: "LiveBurst", category: "ad", domains: ["*.liveburst.com"] }, { name: "LiveClicker", category: "ad", domains: ["*.liveclicker.net"] }, { name: "LiveHelpNow", category: "customer-success", domains: ["*.livehelpnow.net"] }, { name: "LiveInternet", category: "analytics", domains: ["*.yadro.ru"] }, { name: "LiveJournal", category: "social", domains: ["*.livejournal.com", "*.livejournal.net"] }, { name: "LivePerson", category: "customer-success", homepage: "https://www.liveperson.com/", domains: ["*.liveperson.com", "*.look.io", "*.liveperson.net", "*.lpsnmedia.net"] }, { name: "LiveRail", company: "Facebook", category: "ad", domains: ["*.liverail.com", "*.lrcdn.net"] }, { name: "LiveTex", category: "customer-success", domains: ["*.livetex.ru"] }, { name: "Livefyre", category: "content", domains: ["*.fyre.co", "*.livefyre.com"] }, { name: "Living Map Company", category: "utility", domains: ["*.livingmap.com"] }, { name: "Local World", category: "content", domains: ["*.thelocalpeople.co.uk"] }, { name: "LockerDome", category: "analytics", domains: ["*.lockerdome.com"] }, { name: "Logentries", company: "Rapid", category: "utility", domains: ["*.logentries.com"] }, { name: "Logicalis", category: "analytics", domains: ["*.trovus.co.uk"] }, { name: "LoginRadius", company: "LoginRadius", homepage: "https://www.loginradius.com/", category: "ad", domains: ["*.loginradius.com", "*.lrcontent.com"] }, { name: "LongTail Ad Solutions", category: "ad", domains: ["*.jwpcdn.com", "*.jwplatform.com", "*.jwplayer.com", "*.jwpltx.com", "*.jwpsrv.com", "*.longtailvideo.com"] }, { name: "Loop Commerce", category: "other", domains: ["*.loopassets.net"] }, { name: "Loop11", category: "analytics", domains: ["*.loop11.com"] }, { name: "LoopMe", category: "ad", domains: ["*.loopme.biz", "*.loopme.com", "*.vntsm.com", "*.loopme.me"] }, { name: "Looper", category: "content", domains: ["*.looper.com"] }, { name: "Loyalty Point", category: "ad", domains: ["*.loyaltypoint.pl"] }, { name: "LoyaltyLion", category: "ad", domains: ["*.loyaltylion.com", "*.loyaltylion.net", "dg1f2pfrgjxdq.cloudfront.net"] }, { name: "Luma Tag", category: "analytics", domains: ["*.lumatag.co.uk"] }, { name: "Lumesse", category: "content", domains: ["*.recruitmentplatform.com"] }, { name: "Luminate", category: "ad", domains: ["*.luminate.com"] }, { name: "Lynchpin Analytics", category: "analytics", domains: ["*.lypn.net"] }, { name: "Lyris", category: "ad", domains: ["*.clicktracks.com"] }, { name: "Lytics", category: "ad", domains: ["*.lytics.io"] }, { name: "MEC WebTrack", company: "MEC", category: "ad", domains: ["*.e-webtrack.net"] }, { name: "MECLABS Institute", category: "analytics", domains: ["*.meclabs.com", "*.meclabsdata.com"] }, { name: "MLveda", category: "utility", domains: ["*.mlveda.com"] }, { name: "Macromill", company: "Macromill", category: "analytics", homepage: "https://group.macromill.com/", domains: ["*.macromill.com"] }, { name: "Macropod BugHerd", company: "Macropod", category: "utility", domains: ["*.bugherd.com"] }, { name: "Madison Logic", category: "marketing", domains: ["*.ml314.com"] }, { name: "Madmetrics", company: "Keyade", category: "analytics", domains: ["*.keyade.com"] }, { name: "Magnetic", category: "ad", domains: ["*.domdex.com", "d3ezl4ajpp2zy8.cloudfront.net"] }, { name: "Magnetic Platform", company: "Magnetic", category: "ad", domains: ["*.magnetic.is"] }, { name: "MailMunch", category: "ad", domains: ["*.mailmunch.co"] }, { name: "MailPlus", category: "ad", domains: ["*.mailplus.nl"] }, { name: "Mapbox", category: "utility", domains: ["*.mapbox.com"] }, { name: "Maptive", category: "utility", domains: ["*.maptive.com"] }, { name: "Marcaria.com", category: "other", domains: ["*.gooo.al"] }, { name: "Marchex", category: "analytics", domains: ["*.voicestar.com", "*.marchex.io"] }, { name: "Mark and Mini", category: "ad", domains: ["*.markandmini.com"] }, { name: "Marker", category: "utility", domains: ["*.marker.io"] }, { name: "Marketing Dashboards", company: "GroupM", category: "analytics", domains: ["*.m-decision.com"] }, { name: "Marketizator", category: "analytics", domains: ["*.marketizator.com"] }, { name: "Marketplace Web Service", company: "Amazon", category: "other", domains: ["*.ssl-images-amazon.com"] }, { name: "Mashable", category: "social", domains: ["*.mshcdn.com"] }, { name: "MatchWork", category: "utility", domains: ["*.matchwork.com"] }, { name: "MathJax", category: "utility", domains: ["*.mathjax.org"] }, { name: "Mather Economics", category: "analytics", domains: ["*.matheranalytics.com"] }, { name: "MaxCDN Enterprise", company: "MaxCDN", category: "utility", domains: ["*.netdna-cdn.com", "*.netdna-ssl.com"] }, { name: "MaxMind", category: "utility", domains: ["*.maxmind.com"] }, { name: "MaxPoint Interactive", category: "ad", domains: ["*.mxptint.net"] }, { name: "Maxsi", category: "analytics", domains: ["*.evisitanalyst.com"] }, { name: "Maxymiser", category: "analytics", domains: ["*.maxymiser.net", "maxymiser.hs.llnwd.net"] }, { name: "McAffee", category: "utility", domains: ["*.mcafeesecure.com", "*.scanalert.com"] }, { name: "Measured", category: "analytics", domains: ["*.measured.com"], homepage: "https://www.measured.com/" }, { name: "Media IQ", category: "analytics", domains: ["*.mediaiqdigital.com"] }, { name: "Media Management Technologies", category: "ad", domains: ["*.speedshiftmedia.com"] }, { name: "Media Temple", category: "hosting", domains: ["*.goodlayers2.com"] }, { name: "Mediabong", category: "ad", domains: ["*.mediabong.net"] }, { name: "Mediahawk", category: "analytics", domains: ["*.mediahawk.co.uk"] }, { name: "Mediahub", category: "ad", domains: ["*.hubverifyandoptimize.com", "*.projectwatchtower.com"] }, { name: "Mediasyndicator", category: "ad", domains: ["*.creativesyndicator.com"] }, { name: "Medium", category: "content", domains: ["*.medium.com"] }, { name: "Meetrics", category: "ad", domains: ["*.de.com", "*.meetrics.net", "*.mxcdn.net"] }, { name: "Mega", company: "Mega Information Technology", category: "other", domains: ["*.mgcdn.com"] }, { name: "Melt", category: "ad", domains: ["*.meltdsp.com", "*.mesp.com"] }, { name: "Meltwater Group", category: "customer-success", domains: ["*.meltwaternews.com"] }, { name: "Meme", category: "ad", domains: ["*.viewwonder.com"] }, { name: "MentAd", category: "ad", domains: ["*.mentad.com"] }, { name: "Mention Me", category: "ad", domains: ["*.mention-me.com"] }, { name: "Merchant Equipment Store", category: "utility", domains: ["*.merchantequip.com"] }, { name: "Merchenta", category: "customer-success", domains: ["*.merchenta.com"] }, { name: "Merkle Digital Data Exchange", company: "Merkle", category: "ad", domains: ["*.brilig.com"] }, { name: "Merkle Paid Search", company: "Merkle", category: "ad", domains: ["*.rkdms.com"] }, { name: "Met Office", category: "content", domains: ["*.metoffice.gov.uk"] }, { name: "Meta Broadcast", category: "social", domains: ["*.metabroadcast.com"] }, { name: "Michael Associates", category: "ad", domains: ["*.checktestsite.com"] }, { name: "Michelin", category: "content", domains: ["*.viamichelin.com"] }, { name: "Microad", category: "ad", domains: ["*.microad.jp"] }, { name: "Microsoft Certificate Services", company: "Microsoft", category: "utility", domains: ["*.msocsp.com"] }, { name: "Microsoft Hosted Libs", company: "Microsoft", category: "cdn", domains: ["*.aspnetcdn.com"] }, { name: "Microsoft XBox Live", company: "Microsoft", category: "marketing", domains: ["*.xboxlive.com"] }, { name: "Mightypop", category: "ad", domains: ["*.mightypop.ca"] }, { name: "Mika Tuupola", category: "utility", domains: ["*.appelsiini.net"] }, { name: "Millennial Media", category: "ad", domains: ["*.jumptap.com"] }, { name: "Mirror Image Internet", category: "utility", domains: ["*.miisolutions.net"] }, { name: "Mobify", category: "utility", domains: ["*.mobify.com", "*.mobify.net"] }, { name: "Mobile Nations", category: "social", domains: ["*.mobilenations.com"] }, { name: "Mobivate", category: "ad", domains: ["*.mobivatebulksms.com"] }, { name: "Momondo", category: "content", domains: ["*.momondo.dk"] }, { name: "Momondo Group", category: "content", domains: ["*.momondogrouo.com", "*.momondogroup.com"] }, { name: "Monarch Ads", category: "ad", domains: ["*.monarchads.com"] }, { name: "Monetate", category: "analytics", domains: ["*.monetate.net"] }, { name: "MonetizeMore", category: "ad", domains: ["*.m2.ai"] }, { name: "Monitor", company: "Econda", category: "analytics", domains: ["*.econda-monitor.de"] }, { name: "Monkey Frog Media", category: "content", domains: ["*.monkeyfrogmedia.com"] }, { name: "Monotype", category: "cdn", domains: ["*.fonts.com", "*.fonts.net"] }, { name: "Moore-Wilson", category: "ad", domains: ["*.mwdev.co.uk"] }, { name: "Moovweb", category: "utility", domains: ["*.moovweb.net"] }, { name: "Mopinion", category: "analytics", domains: ["*.mopinion.com"] }, { name: "MotionPoint", category: "other", domains: ["*.convertlanguage.com"] }, { name: "Mouse3K", category: "analytics", domains: ["*.mouse3k.com"] }, { name: "MouseStats", category: "analytics", domains: ["*.mousestats.com"] }, { name: "Mouseflow", homepage: "https://mouseflow.com/", category: "analytics", domains: ["*.mouseflow.com"] }, { name: "Movable Ink", category: "analytics", domains: ["*.micpn.com"] }, { name: "MovingIMAGE24", category: "content", domains: ["*.edge-cdn.net"] }, { name: "Moxielinks", category: "ad", domains: ["*.moxielinks.com"] }, { name: "Moz Recommended Companies", company: "Moz", category: "analytics", domains: ["d2eeipcrcdle6.cloudfront.net"] }, { name: "Mozilla", category: "utility", domains: ["*.mozilla.org"] }, { name: "Multiview", category: "content", domains: ["*.multiview.com", "*.track-mv.com"] }, { name: "Mux", category: "analytics", domains: ["*.litix.io"] }, { name: "MyAds", company: "MyBuys", category: "analytics", domains: ["*.veruta.com"] }, { name: "MyBuys", category: "analytics", domains: ["*.mybuys.com"] }, { name: "MyFonts", category: "cdn", domains: ["*.myfonts.net"] }, { name: "MyRegistry", category: "other", domains: ["*.myregistry.com"] }, { name: "MySpace", company: "Specific Media", category: "social", domains: ["*.myspace.com"] }, { name: "Mynewsdesk", category: "utility", domains: ["*.mynewsdesk.com"] }, { name: "NAVIS", category: "content", domains: ["*.navistechnologies.info"] }, { name: "NCC Group Real User Monitoring", company: "NCC Group", category: "analytics", domains: ["*.nccgroup-webperf.com"] }, { name: "NEORY Marketing Cloud", company: "NEORY", category: "marketing", domains: ["*.ad-srv.net"] }, { name: "Nanigans", category: "ad", domains: ["*.nanigans.com"] }, { name: "Nano Interactive", category: "ad", domains: ["*.audiencemanager.de"] }, { name: "Nanorep", company: "Nanorep Technologies", category: "customer-success", domains: ["*.nanorep.com"] }, { name: "Narrative", category: "ad", domains: ["*.narrative.io"] }, { name: "Native Ads", category: "ad", domains: ["*.nativeads.com"] }, { name: "Nativo", category: "ad", domains: ["*.postrelease.com"] }, { name: "Navegg", category: "ad", domains: ["*.navdmp.com"] }, { name: "NaviStone", category: "ad", domains: ["*.murdoog.com"] }, { name: "Naytev", category: "analytics", domains: ["*.naytev.com"] }, { name: "Needle", category: "analytics", domains: ["*.needle.com"] }, { name: "Neiman Marcus", category: "content", domains: ["*.ctscdn.com"] }, { name: "Nend", category: "ad", domains: ["*.nend.net"] }, { name: "Neodata", category: "ad", domains: ["*.neodatagroup.com"] }, { name: "Net Applications", category: "analytics", domains: ["*.hitsprocessor.com"] }, { name: "Net Reviews", category: "analytics", domains: ["*.avis-verifies.com"] }, { name: "NetAffiliation", company: "Kwanco", category: "ad", domains: ["*.metaffiliation.com"] }, { name: "NetDirector", company: "G-Forces Web Management", category: "other", domains: ["*.netdirector.co.uk"] }, { name: "NetFlix", category: "content", domains: ["*.nflxext.com", "*.nflximg.net"] }, { name: "Nielsen NetRatings SiteCensus", company: "The Nielsen Company", homepage: "http://www.nielsen-online.com/intlpage.html", category: "analytics", domains: ["*.imrworldwide.com"] }, { name: "NetSeer", category: "ad", domains: ["*.netseer.com", "*.ns-cdn.com"] }, { name: "NetShelter", company: "Ziff Davis Tech", category: "ad", domains: ["*.netshelter.net"] }, { name: "Netmining", company: "Ignition One", category: "ad", domains: ["*.netmng.com"] }, { name: "Netop", category: "customer-success", domains: ["*.netop.com"] }, { name: "Network Solutions", category: "utility", domains: ["*.netsolssl.com", "*.networksolutions.com"] }, { name: "Neustar AdAdvisor", company: "Neustar", category: "ad", domains: ["*.adadvisor.net"] }, { name: "New Approach Media", category: "ad", domains: ["*.newapproachmedia.co.uk"] }, { name: "NewShareCounts", category: "social", domains: ["*.newsharecounts.com"] }, { name: "News", category: "social", domains: ["*.news.com.au", "*.newsanalytics.com.au", "*.newsapi.com.au", "*.newscdn.com.au", "*.newsdata.com.au", "*.newsdiscover.com.au", "*.news-static.com"] }, { name: "Newsquest", category: "content", domains: ["*.newsquestdigital.co.uk"] }, { name: "Newzulu", category: "content", domains: ["*.filemobile.com", "*.projects.fm"] }, { name: "Nexcess.Net", category: "hosting", domains: ["*.nexcesscdn.net"] }, { name: "Nexstar Media Group", category: "ad", domains: ["*.yashi.com"] }, { name: "NextPerf", company: "Rakuten Marketing", category: "ad", domains: ["*.nxtck.com"] }, { name: "Nine.com.au", company: "Nine Digital", category: "content", domains: ["*.9msn.com.au"] }, { name: "NitroSell", category: "hosting", domains: ["*.nitrosell.com"] }, { name: "Nochex", category: "utility", domains: ["*.nochex.com"] }, { name: "Northern &amp; Shell Media Group", category: "content", domains: ["*.northernandshell.co.uk"] }, { name: "Nosto", category: "analytics", domains: ["*.nosto.com"] }, { name: "Now Interact", category: "analytics", domains: ["*.nowinteract.com"] }, { name: "Numberly", company: "1000mercis", category: "ad", domains: ["*.mmtro.com", "*.nzaza.com"] }, { name: "NyaConcepts", category: "analytics", domains: ["*.xclusive.ly"] }, { name: "O2", category: "other", domains: ["*.o2.co.uk"] }, { name: "GoDaddy", homepage: "https://www.godaddy.com/", category: "utility", domains: ["*.godaddy.com", "*.wsimg.com"] }, { name: "ObjectPlanet", category: "analytics", domains: ["*.easypolls.net"] }, { name: "OhMyAd", category: "ad", domains: ["*.ohmyad.co"] }, { name: "Okas Concepts", category: "utility", domains: ["*.okasconcepts.com"] }, { name: "Okta", category: "analytics", domains: ["*.okta.com"] }, { name: "Olapic", category: "content", domains: ["*.photorank.me"] }, { name: "Ometria", category: "analytics", domains: ["*.ometria.com"] }, { name: "Omniconvert", category: "analytics", domains: ["*.omniconvert.com", "d2tgfbvjf3q6hn.cloudfront.net", "d3vbj265bmdenw.cloudfront.net"] }, { name: "Omniroot", company: "Verizon", category: "utility", domains: ["*.omniroot.com"] }, { name: "OnAudience", company: "Cloud Technologies", category: "ad", domains: ["*.onaudience.com"] }, { name: "OnScroll", category: "ad", domains: ["*.onscroll.com"] }, { name: "OnState", category: "ad", domains: ["*.onstate.co.uk"] }, { name: "OnYourMap", category: "utility", domains: ["*.onyourmap.com"] }, { name: "One by AOL", company: "AOL", category: "ad", domains: ["*.adtechjp.com", "*.adtech.de"] }, { name: "One by AOL:Mobile", company: "AOL", category: "ad", domains: ["*.nexage.com"] }, { name: "OneAll", category: "analytics", domains: ["*.oneall.com"] }, { name: "OneSoon", category: "analytics", domains: ["*.adalyser.com"] }, { name: "OneTag", category: "ad", domains: ["*.onetag-sys.com"] }, { name: "Onet", category: "ad", domains: ["*.onet.pl"] }, { name: "Online Rewards", company: "Mastercard", category: "ad", domains: ["*.loyaltygateway.com"] }, { name: "Online republic", category: "content", domains: ["*.imallcdn.net"] }, { name: "Ooyala", category: "ad", domains: ["*.ooyala.com"] }, { name: "OpenTable", company: "Priceline Group", category: "content", domains: ["*.opentable.com", "*.opentable.co.uk", "*.toptable.co.uk"] }, { name: "OpenX Ad Exchange", company: "OpenX Technologies", category: "ad", domains: ["*.liftdna.com"] }, { name: "Opinion Stage", category: "analytics", domains: ["*.opinionstage.com"] }, { name: "OpinionBar", category: "analytics", domains: ["*.opinionbar.com"] }, { name: "Opta", company: "Perform Group", category: "content", domains: ["*.opta.net"] }, { name: "OptiMonk", category: "ad", domains: ["*.optimonk.com"] }, { name: "Optilead", category: "analytics", domains: ["*.dyn-img.com", "*.leadcall.co.uk", "*.optilead.co.uk"] }, { name: "Optimatic", category: "ad", domains: ["*.optimatic.com"] }, { name: "Optimise Media Group", category: "utility", domains: ["*.omguk.com"] }, { name: "Optimost", company: "OpenText", category: "ad", domains: ["*.optimost.com"] }, { name: "Optimove", company: "Mobius Solutions", category: "analytics", domains: ["*.optimove.net"] }, { name: "Optorb", category: "ad", domains: ["*.optorb.com"] }, { name: "Oracle", category: "marketing", domains: ["*.custhelp.com", "*.eloqua.com", "*.en25.com", "*.estara.com", "*.instantservice.com"] }, { name: "Oracle Recommendations On Demand", company: "Oracle", category: "analytics", domains: ["*.atgsvcs.com"] }, { name: "Oracle Responsys", company: "Oracle", category: "marketing", domains: ["*.adrsp.net", "*.responsys.net"] }, { name: "Order Security-VOID", company: "Order Security", category: "analytics", domains: ["*.order-security.com"] }, { name: "Oriel", category: "ad", domains: ["*.oriel.io"] }, { name: "Outbrain", homepage: "https://www.outbrain.com/", category: "ad", domains: ["*.outbrain.com", "*.outbrainimg.com", "*.visualrevenue.com"] }, { name: "OverStream", company: "Coull", category: "ad", domains: ["*.coull.com"] }, { name: "Overdrive", category: "content", domains: ["*.contentreserve.com"] }, { name: "Overstock", category: "utility", domains: ["*.ostkcdn.com"] }, { name: "OwnerIQ", category: "ad", domains: ["*.owneriq.net"] }, { name: "OzCart", category: "utility", domains: ["*.ozcart.com.au"] }, { name: "Ozone Media", category: "ad", domains: ["*.adadyn.com"] }, { name: "Loqate", company: "Loqate", category: "other", domains: ["*.pcapredict.com", "*.postcodeanywhere.co.uk"] }, { name: "PEER 1 Hosting", category: "hosting", domains: ["*.peer1.com"] }, { name: "PERFORM", category: "content", domains: ["*.performgroup.com"] }, { name: "PICnet", category: "hosting", domains: ["*.nonprofitsoapbox.com"] }, { name: "Pacnet", company: "Telstra", category: "other", domains: ["*.cdndelivery.net"] }, { name: "Pagefair", category: "ad", domains: ["*.pagefair.com", "*.pagefair.net"] }, { name: "Pagely", category: "other", domains: ["*.optnmstr.com"] }, { name: "Pagesuite", category: "ad", domains: ["*.pagesuite-professional.co.uk"] }, { name: "Pardot", category: "marketing", domains: ["*.pardot.com"] }, { name: "Parse.ly", category: "analytics", domains: ["*.parsely.com", "d1z2jf7jlzjs58.cloudfront.net"] }, { name: "Pay per Click", company: "Eysys", category: "ad", domains: ["*.eysys.com"] }, { name: "PayPal Ads", category: "ad", domains: ["*.where.com"] }, { name: "Peaks & Pies", category: "analytics", domains: ["*.bunchbox.co"] }, { name: "PebblePost", category: "ad", domains: ["*.pbbl.co"] }, { name: "Peerius", category: "analytics", domains: ["*.peerius.com"] }, { name: "Peermap", company: "IMRG", category: "analytics", domains: ["peermapcontent.affino.com"] }, { name: "Penske Media", category: "content", domains: ["*.pmc.com"] }, { name: "Penton", category: "utility", domains: ["*.pisces-penton.com"] }, { name: "Pepper", category: "ad", domains: ["*.peppercorp.com"] }, { name: "Perfect Audience", company: "Marin Software", category: "ad", domains: ["*.prfct.co", "*.marinsm.com", "*.perfectaudience.com"] }, { name: "Perfect Market", category: "ad", domains: ["*.perfectmarket.com"] }, { name: "Perfect Privacy", category: "other", domains: ["*.suitesmart.com"] }, { name: "Perform Group", category: "content", domains: ["*.performfeeds.com", "*.premiumtv.co.uk"] }, { name: "Performio", category: "ad", domains: ["*.performax.cz"] }, { name: "PerimeterX Bot Defender", company: "PerimeterX", category: "utility", domains: ["*.perimeterx.net", "*.pxi.pub"] }, { name: "Periscope", category: "content", domains: ["*.periscope.tv"] }, { name: "Permutive", category: "ad", domains: ["*.permutive.com", "d3alqb8vzo7fun.cloudfront.net"] }, { name: "Petametrics", category: "analytics", domains: ["*.petametrics.com"] }, { name: "PhotoBucket", category: "content", domains: ["*.photobucket.com"] }, { name: "Picreel", category: "analytics", domains: ["*.pcrl.co", "*.picreel.com"] }, { name: "Pictela (AOL)", category: "analytics", domains: ["*.pictela.net"] }, { name: "PistonHeads", category: "social", domains: ["*.pistonheads.com"] }, { name: "Piwik", category: "analytics", domains: ["*.drtvtracker.com", "*.piwikpro.com", "*.raac33.net"] }, { name: "Pixalate", category: "utility", domains: ["*.adrta.com"] }, { name: "Pixlee", category: "social", domains: ["*.pixlee.com"] }, { name: "Placed", category: "analytics", domains: ["*.placed.com"] }, { name: "Planning-inc", category: "analytics", domains: ["*.planning-inc.co.uk"] }, { name: "PlayAd Media Group", category: "ad", domains: ["*.youplay.se"] }, { name: "Playbuzz", category: "hosting", domains: ["*.playbuzz.com"] }, { name: "Pleenq", category: "ad", domains: ["*.pleenq.com"] }, { name: "Plentific", category: "content", domains: ["*.plentific.com"] }, { name: "PluginDetect", category: "other", domains: ["dtlilztwypawv.cloudfront.net"] }, { name: "Po.st", company: "RadiumOne", category: "utility", domains: ["*.po.st"] }, { name: "Pointpin", category: "utility", domains: ["*.pointp.in"] }, { name: "Pointroll (Garnett)", category: "ad", domains: ["*.pointroll.com"] }, { name: "Polar", homepage: "https://polar.me/", category: "ad", domains: ["*.polarmobile.ca", "*.mediaeverywhere.com", "*.mediavoice.com", "*.plrsrvcs.com", "*.polarcdn-engine.com", "*.polarcdn-meraxes.com", "*.polarcdn-pentos.com", "*.polarcdn-static.com", "*.polarcdn-terrax.com", "*.polarcdn.com", "*.polarmobile.com", "*.poweredbypolar.com", "*.mediaconductor.me", "*.polaracademy.me"] }, { name: "PollDaddy (Automattic)", category: "ad", domains: ["static.polldaddy.com", "*.poll.fm"] }, { name: "Polldaddy", company: "Automattic", category: "analytics", domains: ["polldaddy.com", "*.polldaddy.com"] }, { name: "Polyfill service", company: "Polyfill.io", category: "other", domains: ["*.polyfill.io"] }, { name: "MegaPopAds", category: "ad", domains: ["*.megapopads.com"] }, { name: "Populis", category: "ad", domains: ["*.populisengage.com"] }, { name: "Postimage.org", category: "content", domains: ["*.postimg.org"] }, { name: "PowerFront", category: "hosting", domains: ["*.inside-graph.com"] }, { name: "PowerReviews", category: "analytics", domains: ["*.powerreviews.com"] }, { name: "Powerlinks.com", category: "ad", domains: ["*.powerlinks.com"] }, { name: "Press+", category: "ad", domains: ["*.pipol.com", "*.ppjol.com", "*.ppjol.net"] }, { name: "PressArea", category: "utility", domains: ["*.pressarea.com"] }, { name: "Pretio Interactive", category: "ad", domains: ["*.pretio.in"] }, { name: "Prezi", category: "utility", domains: ["*.prezi.com"] }, { name: "PriceGrabber", category: "content", domains: ["*.pgcdn.com", "*.pricegrabber.com"] }, { name: "PriceRunner", category: "content", domains: ["*.pricerunner.com"] }, { name: "PrintFriendly", category: "utility", domains: ["*.printfriendly.com"] }, { name: "Privy", category: "ad", domains: ["*.privy.com", "*.privymktg.com"] }, { name: "Proclivity Media", category: "analytics", domains: ["*.pswec.com"] }, { name: "Profitshare", category: "ad", domains: ["*.profitshare.ro"] }, { name: "Programattik", category: "ad", domains: ["*.programattik.com"] }, { name: "Proper Media", category: "content", domains: ["*.proper.io"] }, { name: "Property Week", category: "content", domains: ["*.propertyweek.com"] }, { name: "Provide Support", category: "customer-success", domains: ["*.providesupport.com"] }, { name: "Proweb Uk", category: "hosting", domains: ["*.proweb.net"] }, { name: "Proximic (ComScore)", category: "ad", domains: ["*.proximic.com"] }, { name: "Psyma", category: "ad", domains: ["*.psyma.com"] }, { name: "PubFactory", company: "Safari Books Online", category: "content", domains: ["*.pubfactory.com"] }, { name: "PubNation", category: "ad", domains: ["*.pubnation.com"] }, { name: "Publicidad.net", category: "ad", domains: ["*.publicidad.tv"] }, { name: "PublishThis", company: "Ultra Unlimited", category: "ad", domains: ["*.publishthis.com"] }, { name: "Pulse Insights", category: "analytics", domains: ["*.pulseinsights.com"] }, { name: "Pulsepoint", category: "marketing", domains: ["*.displaymarketplace.com"] }, { name: "Purch", category: "ad", domains: ["*.bestofmedia.com", "*.purch.com"] }, { name: "Pure Chat", category: "customer-success", domains: ["*.purechat.com"] }, { name: "PushCrew", category: "ad", domains: ["*.pushcrew.com"] }, { name: "Q1Media", category: "ad", domains: ["*.q1media.com", "*.q1mediahydraplatform.com"] }, { name: "Qbase Software Development", category: "hosting", domains: ["*.smartwebportal.co.uk"] }, { name: "Qeryz", category: "analytics", domains: ["*.qeryz.com"] }, { name: "Qode Interactive", category: "hosting", domains: ["*.qodeinteractive.com"] }, { name: "Qrius", category: "social", domains: ["*.qrius.me"] }, { name: "Qualaroo", category: "analytics", domains: ["*.qualaroo.com"] }, { name: "Qualtrics", category: "analytics", domains: ["*.qualtrics.com"] }, { name: "Qubit", company: "Qubit", category: "analytics", domains: ["*.qubit.com", "*.qutics.com", "d3c3cq33003psk.cloudfront.net", "*.goqubit.com", "*.qubitproducts.com"] }, { name: "Qubit Deliver", company: "Qubit", category: "analytics", domains: ["d1m54pdnjzjnhe.cloudfront.net", "d22rutvoghj3db.cloudfront.net", "dd6zx4ibq538k.cloudfront.net"] }, { name: "QuestionPro", category: "analytics", domains: ["*.questionpro.com"] }, { name: "Queue-it", category: "other", domains: ["*.queue-it.net"] }, { name: "QuinStreet", category: "ad", domains: ["*.Quinstreet.com", "*.b2btechleadform.com", "*.qnsr.com", "*.qsstats.com"] }, { name: "QuoVadis", category: "utility", domains: ["*.quovadisglobal.com"] }, { name: "Qzzr", category: "analytics", domains: ["*.movementventures.com", "*.qzzr.com"] }, { name: "RapidAPI", category: "utility", domains: ["*.rapidapi.com"] }, { name: "RCS Media Group", category: "ad", domains: ["*.rcsadv.it"] }, { name: "REVIVVE", category: "ad", domains: ["*.revivve.com"] }, { name: "RSSinclude", category: "social", domains: ["*.rssinclude.com"] }, { name: "RTB House AdPilot", company: "RTB House", category: "ad", domains: ["*.erne.co", "*.creativecdn.com"] }, { name: "RTB Media", category: "ad", domains: ["*.rtb-media.me"] }, { name: "RUN", category: "ad", domains: ["*.runadtag.com", "*.rundsp.com"] }, { name: "Rackspace", category: "hosting", domains: ["*.rackcdn.com", "*.rackspacecloud.com", "*.raxcdn.com", "*.websitetestlink.com"] }, { name: "RadiumOne", category: "ad", domains: ["*.gwallet.com", "*.r1-cdn.net"] }, { name: "Rakuten DC Storm", company: "Rakuten", category: "analytics", domains: ["*.dc-storm.com", "*.h4k5.com", "*.stormiq.com"] }, { name: "Rakuten LinkShare", company: "Rakuten", category: "ad", domains: ["*.linksynergy.com"] }, { name: "Rakuten Marketing", company: "Rakuten", category: "ad", domains: ["*.rakuten-static.com", "*.rmtag.com", "tag.rmp.rakuten.com"] }, { name: "Rakuten MediaForge", company: "Rakuten", category: "ad", domains: ["*.mediaforge.com"] }, { name: "Rambler", company: "Rambler & Co", category: "utility", domains: ["*.rambler.ru"] }, { name: "Ranker", category: "content", domains: ["*.ranker.com", "*.rnkr-static.com"] }, { name: "Ravelin", category: "utility", domains: ["*.ravelin.com"] }, { name: "Raygun", category: "utility", domains: ["*.raygun.io", "*.rapidzebra.io"] }, { name: "ReCollect", category: "utility", domains: ["*.recollect.net"] }, { name: "ReSRC", category: "utility", domains: ["*.resrc.it"] }, { name: "ReTargeter", category: "ad", domains: ["*.retargeter.com"] }, { name: "Reach Group", category: "ad", domains: ["*.redintelligence.net"] }, { name: "ReachDynamics", category: "ad", domains: ["*.rdcdn.com"] }, { name: "ReachForce", category: "ad", domains: ["*.reachforce.com"] }, { name: "ReachLocal", category: "ad", domains: ["*.rtrk.co.nz"] }, { name: "ReachMee", category: "content", domains: ["*.reachmee.com"] }, { name: "Reactful", category: "analytics", domains: ["*.reactful.com"] }, { name: "Realtime", company: "internet business technologies", category: "utility", domains: ["*.realtime.co"] }, { name: "Realtime Media (Brian Communications)", category: "ad", domains: ["*.rtm.com"] }, { name: "Realtime Targeting", category: "ad", domains: ["*.idtargeting.com"] }, { name: "Realytics", category: "analytics", domains: ["dcniko1cv0rz.cloudfront.net", "*.realytics.net"] }, { name: "RebelMouse", category: "ad", domains: ["*.rebelmouse.com", "*.rbl.ms"] }, { name: "Receiptful", category: "utility", domains: ["*.receiptful.com"] }, { name: "Recite Me", category: "other", domains: ["*.reciteme.com"] }, { name: "RecoBell", category: "analytics", domains: ["*.recobell.io"] }, { name: "Recommend", category: "analytics", domains: ["*.recommend.pro"] }, { name: "Red Eye International", category: "ad", domains: ["*.pajmc.com"] }, { name: "Redfish Group", category: "ad", domains: ["*.wmps.com"] }, { name: "Reevoo", category: "analytics", domains: ["*.reevoo.com"] }, { name: "Refersion", category: "ad", domains: ["*.refersion.com"] }, { name: "Refined Ads", category: "ad", domains: ["*.refinedads.com"] }, { name: "Reflektion", category: "analytics", domains: ["*.reflektion.com", "d26opx5dl8t69i.cloudfront.net"] }, { name: "Reflow", company: "Scenestealer", category: "ad", domains: ["*.reflow.tv"] }, { name: "Reklama", category: "ad", domains: ["*.o2.pl", "*.wp.pl"] }, { name: "Relevad ReleStar", company: "Relevad", category: "ad", domains: ["*.relestar.com"] }, { name: "Remarketing Pixel", company: "Adsterra Network", category: "ad", domains: ["*.datadbs.com", "*.remarketingpixel.com"] }, { name: "Remintrex", company: "SmartUp Venture", category: "ad", domains: ["*.remintrex.com"] }, { name: "Republer", category: "ad", domains: ["*.republer.com"] }, { name: "Research Now", category: "analytics", domains: ["*.researchgnow.com", "*.researchnow.com"] }, { name: "Research Online", company: "Skills Development Scotland", category: "content", domains: ["*.researchonline.org.uk"] }, { name: "Resonance Insights", category: "analytics", domains: ["*.res-x.com"] }, { name: "Resonate Networks", category: "analytics", domains: ["*.reson8.com"] }, { name: "Response Team", category: "ad", domains: ["*.i-transactads.com"] }, { name: "ResponseTap", category: "analytics", domains: ["*.adinsight.com", "*.responsetap.com"] }, { name: "ResponsiveVoice", category: "other", domains: ["*.responsivevoice.org"] }, { name: "Retention Science", category: "ad", domains: ["*.retentionscience.com", "d1stxfv94hrhia.cloudfront.net"] }, { name: "Revcontent", category: "content", domains: ["*.revcontent.com"] }, { name: "Revee", category: "ad", domains: ["*.revee.com"] }, { name: "Revenue Conduit", category: "utility", domains: ["*.revenueconduit.com"] }, { name: "RevenueMantra", category: "ad", domains: ["*.revenuemantra.com"] }, { name: "Reviews.co.uk", category: "analytics", domains: ["*.reviews.co.uk"] }, { name: "Reviews.io", category: "analytics", domains: ["*.reviews.io"] }, { name: "Revolver Maps", category: "analytics", domains: ["*.revolvermaps.com"] }, { name: "Revv", category: "utility", domains: ["*.revv.co"] }, { name: "RichRelevance", category: "analytics", domains: ["*.richrelevance.com"] }, { name: "RightNow Service Cloud", company: "Oracle", category: "customer-success", domains: ["*.rightnowtech.com", "*.rnengage.com"] }, { name: "Rightster", category: "ad", domains: ["*.ads-creativesyndicator.com"] }, { name: "Riskified", category: "utility", domains: ["*.riskified.com"] }, { name: "Rockerbox", category: "analytics", homepage: "https://www.rockerbox.com/", domains: ["getrockerbox.com"] }, { name: "Rocket Fuel", category: "ad", domains: ["*.rfihub.com", "*.ru4.com", "*.rfihub.net", "*.ad1x.com"] }, { name: "Rollbar", category: "utility", domains: ["*.rollbar.com", "d37gvrvc0wt4s1.cloudfront.net"] }, { name: "RomanCart", category: "utility", domains: ["*.romancart.com"] }, { name: "Rondavu", category: "ad", domains: ["*.rondavu.com"] }, { name: "Roomkey", category: "content", domains: ["*.roomkey.com"] }, { name: "Roost", category: "utility", domains: ["*.goroost.com"] }, { name: "Roxot", category: "ad", domains: ["*.rxthdr.com"] }, { name: "Roxr Software", category: "analytics", domains: ["*.getclicky.com"] }, { name: "Rtoaster", company: "Brainpad", homepage: "https://www.brainpad.co.jp/rtoaster/", category: "marketing", domains: ["*.rtoaster.jp"] }, { name: "Rubikloud.com", category: "analytics", domains: ["*.rubikloud.com"] }, { name: "Ruler Analytics", company: "Ruler", category: "analytics", domains: ["*.nyltx.com", "*.ruleranalytics.com"] }, { name: "Runner", company: "Rambler & Co", category: "content", domains: ["*.begun.ru"] }, { name: "S4M", category: "ad", domains: ["*.sam4m.com"] }, { name: "SAP Hybris Marketing Convert", company: "SAP", category: "ad", domains: ["*.seewhy.com"] }, { name: "SAS Institute", category: "ad", domains: ["*.aimatch.com", "*.sas.com"] }, { name: "SATORI", homepage: "https://satori.marketing/", category: "marketing", domains: ["satori.segs.jp"] }, { name: "SC ShopMania Net SRL", category: "content", domains: ["*.shopmania.com"] }, { name: "SDL Media Manager", company: "SDL", category: "other", domains: ["*.sdlmedia.com"] }, { name: "SFR", category: "other", domains: ["*.sfr.fr"] }, { name: "SLI Systems", category: "utility", domains: ["*.resultslist.com", "*.resultspage.com", "*.sli-spark.com"] }, { name: "SMARTASSISTANT", company: "Smart Information Systems", category: "customer-success", domains: ["*.smartassistant.com"] }, { name: "SMARTSTREAM.TV", category: "ad", domains: ["*.smartstream.tv"] }, { name: "SPX", company: "Smaato", category: "ad", domains: ["*.smaato.net"] }, { name: "Sabio", category: "customer-success", domains: ["*.sabio.co.uk"] }, { name: "Sailthru", category: "analytics", domains: ["*.sail-horizon.com", "*.sail-personalize.com", "*.sail-track.com"] }, { name: "Sailthru Sightlines", company: "Sailthru", category: "marketing", domains: ["*.sailthru.com"] }, { name: "Sajari Pty", category: "utility", domains: ["*.sajari.com"] }, { name: "SaleCycle", category: "ad", domains: ["*.salecycle.com", "d16fk4ms6rqz1v.cloudfront.net", "d22j4fzzszoii2.cloudfront.net", "d30ke5tqu2tkyx.cloudfront.net", "dn1i8v75r669j.cloudfront.net"] }, { name: "Salesforce Live Agent", company: "Salesforce.com", category: "customer-success", domains: ["*.salesforceliveagent.com"] }, { name: "Salesforce.com", category: "ad", domains: ["*.force.com", "*.salesforce.com"] }, { name: "Samba TV", company: "Samba", category: "content", domains: ["*.samba.tv"] }, { name: "Samplicio.us", category: "analytics", domains: ["*.samplicio.us"] }, { name: "Say Media", category: "ad", domains: ["*.saymedia.com"] }, { name: "Scenario", category: "analytics", domains: ["*.getscenario.com"] }, { name: "Schuh (image shard)", company: "Schuh", category: "other", domains: ["d2ob0iztsaxy5v.cloudfront.net"] }, { name: "Science Rockstars", category: "analytics", domains: ["*.persuasionapi.com"] }, { name: "ScientiaMobile", category: "analytics", domains: ["*.wurflcloud.com", "*.wurfl.io"] }, { name: "Scoota", category: "ad", domains: ["*.rockabox.co", "*.scoota.co", "d31i2625d5nv27.cloudfront.net", "dyjnzf8evxrp2.cloudfront.net"] }, { name: "ScribbleLive", category: "ad", domains: ["*.scribblelive.com"] }, { name: "SearchForce", category: "ad", domains: ["*.searchforce.net"] }, { name: "SearchSpring", category: "utility", domains: ["*.searchspring.net"] }, { name: "Searchanise", category: "analytics", domains: ["*.searchanise.com"] }, { name: "Sears Holdings", category: "content", domains: ["*.shld.net"] }, { name: "Secomapp", category: "utility", domains: ["*.secomapp.com"] }, { name: "SecuredVisit", company: "4Cite Marketing", category: "ad", domains: ["*.securedvisit.com"] }, { name: "SecurityMetrics", category: "utility", domains: ["*.securitymetrics.com"] }, { name: "Segmento", category: "ad", domains: ["*.rutarget.ru"] }, { name: "Segmint", category: "analytics", domains: ["*.segmint.net"] }, { name: "Sekindo", category: "content", domains: ["*.sekindo.com"] }, { name: "Seldon", category: "analytics", domains: ["*.rummblelabs.com"] }, { name: "SelectMedia International", category: "content", domains: ["*.selectmedia.asia"] }, { name: "Selligent", category: "ad", domains: ["*.emsecure.net", "*.slgnt.eu", "targetemsecure.blob.core.windows.net"] }, { name: "Sellpoints", category: "analytics", domains: ["*.sellpoints.com"] }, { name: "Semantics3", category: "analytics", domains: ["*.hits.io"] }, { name: "Semasio", category: "analytics", domains: ["*.semasio.net"] }, { name: "Semcasting Site Visitor Attribution", company: "Semcasting", category: "ad", domains: ["*.smartzonessva.com"] }, { name: "Sentifi", category: "social", domains: ["*.sentifi.com"] }, { name: "ServMetric", category: "analytics", domains: ["*.servmetric.com"] }, { name: "ServiceSource International", category: "marketing", domains: ["*.scoutanalytics.net"] }, { name: "ServiceTick", category: "analytics", domains: ["*.servicetick.com"] }, { name: "Servo", company: "Xervo", category: "hosting", domains: ["*.onmodulus.net"] }, { name: "SessionCam", company: "ServiceTick", category: "analytics", domains: ["*.sessioncam.com", "d2oh4tlt9mrke9.cloudfront.net"] }, { name: "Seznam", category: "utility", domains: ["*.imedia.cz"] }, { name: "Sharethrough", category: "ad", domains: ["*.sharethrough.com"] }, { name: "SharpSpring", category: "marketing", domains: ["*.sharpspring.com", "*.marketingautomation.services"] }, { name: "ShopRunner", category: "content", domains: ["*.shoprunner.com", "*.s-9.us"] }, { name: "ShopStorm", category: "utility", domains: ["*.shopstorm.com"] }, { name: "Shopatron", category: "hosting", domains: ["*.shopatron.com"] }, { name: "Shopgate", category: "utility", domains: ["*.shopgate.com"] }, { name: "ShopiMind", company: "ShopIMind", category: "ad", domains: ["*.shopimind.com"] }, { name: "Shopkeeper Tools", category: "utility", domains: ["*.shopkeepertools.com"] }, { name: "Sidecar", category: "other", domains: ["*.getsidecar.com", "d3v27wwd40f0xu.cloudfront.net"] }, { name: "Sidereel", category: "analytics", domains: ["*.sidereel.com"] }, { name: "Sift Science", category: "utility", domains: ["*.siftscience.com"] }, { name: "Signal", category: "tag-manager", domains: ["*.sitetagger.co.uk"] }, { name: "Signyfyd", category: "utility", domains: ["*.signifyd.com"] }, { name: "Silktide", category: "hosting", domains: ["*.silktide.com"] }, { name: "Silverpop", company: "IBM", category: "ad", domains: ["*.mkt912.com", "*.mkt922.com", "*.mkt932.com", "*.mkt941.com", "*.mkt51.net", "*.mkt61.net", "*.pages01.net", "*.pages02.net", "*.pages03.net", "*.pages04.net", "*.pages05.net"] }, { name: "Simplaex", category: "marketing", domains: ["*.simplaex.net"] }, { name: "SimpleReach", category: "analytics", domains: ["*.simplereach.com", "d8rk54i4mohrb.cloudfront.net"] }, { name: "Simplestream", category: "content", domains: ["*.simplestream.com"] }, { name: "Simpli.fi", category: "ad", domains: ["*.simpli.fi"] }, { name: "Simplicity Marketing", category: "ad", domains: ["*.flashtalking.com"] }, { name: "SinnerSchrader Deutschland", category: "ad", domains: ["*.s2Betrieb.de"] }, { name: "Sirv", category: "other", domains: ["*.sirv.com"] }, { name: "Site Meter", category: "analytics", domains: ["*.sitemeter.com"] }, { name: "Site24x7 Real User Monitoring", company: "Site24x7", category: "analytics", domains: ["*.site24x7rum.com"] }, { name: "SiteGainer", category: "analytics", domains: ["*.sitegainer.com", "d191y0yd6d0jy4.cloudfront.net"] }, { name: "SiteScout", company: "Centro", category: "ad", domains: ["*.pixel.ad", "*.sitescout.com"] }, { name: "Siteimprove", category: "utility", domains: ["*.siteimprove.com", "*.siteimproveanalytics.com"] }, { name: "Six Degrees Group", category: "hosting", domains: ["*.fstech.co.uk"] }, { name: "Skimbit", category: "ad", domains: ["*.redirectingat.com", "*.skimresources.com", "*.skimresources.net"] }, { name: "Skimlinks", category: "ad", domains: ["*.skimlinks.com"] }, { name: "SkyGlue Technology", category: "analytics", domains: ["*.skyglue.com"] }, { name: "SkyScanner", category: "content", domains: ["*.skyscanner.net"] }, { name: "Skybet", company: "Bonne Terre t/a Sky Vegas (Sky)", category: "other", domains: ["*.skybet.com"] }, { name: "Skype", category: "other", domains: ["*.skype.com"] }, { name: "Slate Group", category: "content", domains: ["*.cdnslate.com"] }, { name: "SlimCut Media Outstream", company: "SlimCut Media", category: "ad", domains: ["*.freeskreen.com"] }, { name: "Smart Insight Tracking", company: "Emarsys", category: "analytics", domains: ["*.scarabresearch.com"] }, { name: "Smart AdServer", category: "ad", domains: ["*.01net.com", "*.sascdn.com", "*.sasqos.com", "*.smartadserver.com"] }, { name: "SmartFocus", category: "analytics", domains: ["*.emv2.com", "*.emv3.com", "*.predictiveintent.com", "*.smartfocus.com", "*.themessagecloud.com"] }, { name: "Smarter Click", category: "ad", domains: ["*.smct.co", "*.smarterclick.co.uk"] }, { name: "SmarterHQ", category: "analytics", domains: ["*.smarterhq.io", "d1n00d49gkbray.cloudfront.net", "*.smarterremarketer.net"] }, { name: "Smarttools", category: "customer-success", domains: ["*.smartertrack.com"] }, { name: "Smartzer", category: "ad", domains: ["*.smartzer.com"] }, { name: "Snack Media", category: "content", domains: ["*.snack-media.com"] }, { name: "Snacktools", category: "ad", domains: ["*.bannersnack.com"] }, { name: "SnapEngage", category: "customer-success", domains: ["*.snapengage.com"] }, { name: "SnapWidget", category: "content", domains: ["*.snapwidget.com"] }, { name: "Soasta", category: "analytics", domains: ["*.lognormal.net"] }, { name: "SociableLabs", category: "ad", domains: ["*.sociablelabs.net", "*.sociablelabs.com"] }, { name: "Social Annex", category: "customer-success", domains: ["*.socialannex.com"] }, { name: "SocialShopWave", category: "social", domains: ["*.socialshopwave.com"] }, { name: "Socialphotos", category: "social", domains: ["*.slpht.com"] }, { name: "Sociomantic Labs", company: "DunnHumby", category: "ad", domains: ["*.sociomantic.com"] }, { name: "SodaHead", category: "analytics", domains: ["*.sodahead.com"] }, { name: "Softwebzone", category: "hosting", domains: ["*.softwebzone.com"] }, { name: "Sojern", category: "marketing", domains: ["*.sojern.com"] }, { name: "Sokrati", category: "marketing", domains: ["*.sokrati.com"] }, { name: "Sonobi", category: "ad", domains: ["*.sonobi.com"] }, { name: "Sooqr Search", company: "Sooqr", category: "utility", domains: ["*.sooqr.com"] }, { name: "Sophus3", category: "analytics", domains: ["*.s3ae.com", "*.sophus3.com"] }, { name: "Sorenson Media", category: "content", domains: ["*.sorensonmedia.com"] }, { name: "Sortable", category: "ad", domains: ["*.deployads.com"] }, { name: "Sotic", category: "hosting", domains: ["*.sotic.net", "*.soticservers.net"] }, { name: "Soundest", category: "ad", domains: ["*.soundestlink.com", "*.soundest.net"] }, { name: "Sourcepoint", category: "ad", domains: ["*.decenthat.com", "*.fallingfalcon.com", "*.summerhamster.com", "d2lv4zbk7v5f93.cloudfront.net", "d3qxwzhswv93jk.cloudfront.net"] }, { name: "SourceKnowledge", homepage: "https://www.sourceknowledge.com", category: "ad", domains: ["*.provenpixel.com"] }, { name: "SpaceNet", category: "hosting", domains: ["*.nmm.de"] }, { name: "Sparkflow", company: "Intercept Interactive", category: "ad", domains: ["*.sparkflow.net"] }, { name: "Specific Media", category: "ad", domains: ["*.specificmedia.com", "*.adviva.net", "*.specificclick.net"] }, { name: "Spicy", company: "Data-Centric Alliance", category: "ad", domains: ["*.sspicy.ru"] }, { name: "Spoke", category: "customer-success", domains: ["*.121d8.com"] }, { name: "Spongecell", category: "ad", domains: ["*.spongecell.com"] }, { name: "Spot.IM", category: "social", domains: ["*.spot.im", "*.spotim.market"] }, { name: "SpotXchange", category: "ad", domains: ["*.spotxcdn.com", "*.spotxchange.com", "*.spotx.tv"] }, { name: "SpringServer", category: "ad", domains: ["*.springserve.com"] }, { name: "Spylight", category: "other", domains: ["*.spylight.com"] }, { name: "SreamAMG", company: "StreamAMG", category: "other", domains: ["*.streamamg.com"] }, { name: "StackAdapt", category: "ad", domains: ["*.stackadapt.com"] }, { name: "StackExchange", category: "social", domains: ["*.sstatic.net"] }, { name: "Stackla PTY", category: "social", domains: ["*.stackla.com"] }, { name: "Stailamedia", category: "ad", domains: ["*.stailamedia.com"] }, { name: "Stamped.io", category: "analytics", domains: ["*.stamped.io"] }, { name: "Starfield Services Root Certificate Authority", company: "Starfield Technologies", category: "utility", domains: ["*.starfieldtech.com", "ss2.us", "*.ss2.us"] }, { name: "Starfield Technologies", category: "utility", domains: ["*.websiteprotection.com"] }, { name: "StatCounter", category: "analytics", domains: ["*.statcounter.com"] }, { name: "Statful", category: "analytics", domains: ["*.statful.com"] }, { name: "Steelhouse", category: "ad", domains: ["*.steelhousemedia.com"] }, { name: "Steepto", category: "ad", domains: ["*.steepto.com"] }, { name: "StellaService", category: "analytics", domains: ["*.stellaservice.com"] }, { name: "StickyADS.tv", category: "ad", domains: ["*.stickyadstv.com"] }, { name: "STINGRAY", company: "FlexOne", category: "ad", domains: ["*.impact-ad.jp"] }, { name: "Storify", company: "Adobe Systems", category: "social", domains: ["*.storify.com"] }, { name: "Storm Tag Manager", company: "Rakuten", category: "tag-manager", domains: ["*.stormcontainertag.com"] }, { name: "Storygize", category: "ad", domains: ["*.storygize.net"] }, { name: "Strands", category: "utility", domains: ["*.strands.com"] }, { name: "StreamRail", category: "ad", domains: ["*.streamrail.com", "*.streamrail.net"] }, { name: "StrikeAd", category: "ad", domains: ["*.strikead.com"] }, { name: "Struq", company: "Quantcast", category: "ad", domains: ["*.struq.com"] }, { name: "Str\xC3\xB6er Digital Media", category: "ad", domains: ["*.stroeerdigitalmedia.de"] }, { name: "StumbleUpon", category: "content", domains: ["*.stumble-upon.com", "*.stumbleupon.com"] }, { name: "Sub2 Technologies", category: "analytics", domains: ["*.sub2tech.com"] }, { name: "SublimeSkinz", category: "ad", domains: ["*.ayads.co"] }, { name: "Sumo Logic", category: "utility", domains: ["*.sumologic.com"] }, { name: "Sunday Times Driving", category: "content", domains: ["*.driving.co.uk"] }, { name: "SundaySky", category: "ad", domains: ["*.sundaysky.com", "dds6m601du5ji.cloudfront.net"] }, { name: "Sunrise Integration", category: "utility", domains: ["*.sunriseintegration.com"] }, { name: "Supertool Network Technology", category: "analytics", domains: ["*.miaozhen.com"] }, { name: "Survata", category: "analytics", domains: ["*.survata.com"] }, { name: "SurveyGizmo", category: "analytics", domains: ["*.surveygizmo.eu"] }, { name: "SurveyMonkey", category: "analytics", domains: ["*.surveymonkey.com"] }, { name: "Survicate", category: "analytics", domains: ["*.survicate.com"] }, { name: "Sweet Tooth", category: "ad", domains: ["*.sweettooth.io"] }, { name: "Swiftype", category: "utility", domains: ["*.swiftype.com", "*.swiftypecdn.com"] }, { name: "Switch Concepts", category: "ad", domains: ["*.switchadhub.com"] }, { name: "SwitchAds", company: "Switch Concepts", category: "ad", domains: ["*.switchads.com"] }, { name: "Swogo", category: "analytics", domains: ["*.xsellapp.com"] }, { name: "Swoop", category: "ad", domains: ["*.swoop.com"] }, { name: "Symantec", category: "utility", domains: ["*.norton.com", "*.symantec.com", "*.symcb.com", "*.symcd.com"] }, { name: "Syncapse", category: "social", domains: ["*.clickable.net"] }, { name: "Synergetic", category: "ad", domains: ["*.synergetic.ag"] }, { name: "Synthetix", category: "customer-success", domains: ["*.syn-finity.com", "*.synthetix-ec1.com", "*.synthetix.com"] }, { name: "Syte", category: "other", domains: ["*.syteapi.com"] }, { name: "TINT", category: "content", domains: ["*.71n7.com", "d33w9bm0n1egwm.cloudfront.net", "d36hc0p18k1aoc.cloudfront.net", "d3l7tj34e9fc43.cloudfront.net"] }, { name: "TNS (Kantar Group)", category: "analytics", domains: ["*.tns-counter.ru"] }, { name: "TRUSTe", category: "utility", domains: ["*.truste.com"] }, { name: "TV Genius", company: "Ericcson Media Services", category: "content", domains: ["*.tvgenius.net"] }, { name: "TVSquared", category: "ad", domains: ["*.tvsquared.com"] }, { name: "TVTY", category: "ad", domains: ["*.distribeo.com", "*.ogigl.com"] }, { name: "Tactics bvba", category: "hosting", domains: ["*.influid.co"] }, { name: "Tag Inspector", company: "InfoTrust", category: "analytics", domains: ["d22xmn10vbouk4.cloudfront.net"] }, { name: "TagCommander", category: "tag-manager", domains: ["*.commander1.com", "*.tagcommander.com"] }, { name: "Tagboard", category: "social", domains: ["*.tagboard.com"] }, { name: "Taggstar", company: "Taggstar UK", category: "ad", domains: ["*.taggstar.com"] }, { name: "Tail Target", company: "Tail", category: "ad", domains: ["*.tailtarget.com"] }, { name: "Tailored", category: "other", domains: ["d24qm7bu56swjs.cloudfront.net", "dw3vahmen1rfy.cloudfront.net", "*.tailored.to"] }, { name: "Taleo Enterprise Cloud Service", company: "Oracle", category: "content", domains: ["*.taleo.net"] }, { name: "Talkable", category: "ad", domains: ["*.talkable.com", "d2jjzw81hqbuqv.cloudfront.net"] }, { name: "TapSense", category: "ad", domains: ["*.tapsense.com"] }, { name: "Tapad", category: "ad", domains: ["*.tapad.com"] }, { name: "Teads", category: "ad", domains: ["*.teads.tv"] }, { name: "Team Internet Tonic", company: "Team Internet", category: "ad", domains: ["*.dntrax.com"] }, { name: "TechTarget", category: "content", domains: ["*.techtarget.com", "*.ttgtmedia.com"] }, { name: "Technorati", company: "Synacor", category: "ad", domains: ["*.technoratimedia.com"] }, { name: "Teedhaze", category: "content", domains: ["*.fuel451.com"] }, { name: "Tell Apart", category: "analytics", domains: ["*.tellapart.com", "*.tellaparts.com"] }, { name: "Tencent", category: "content", domains: ["*.qq.com", "*.ywxi.net"] }, { name: "Thanx Media", category: "utility", domains: ["*.hawksearch.info"] }, { name: "Thawte", category: "utility", domains: ["*.thawte.com"] }, { name: "Thesis", category: "analytics", homepage: "https://www.thesistesting.com/", domains: ["*.ttsep.com"] }, { name: "The AA", category: "ad", domains: ["*.adstheaa.com"] }, { name: "The ADEX", category: "ad", domains: ["*.theadex.com"] }, { name: "The Best Day", category: "social", domains: ["*.thebestday.com"] }, { name: "The Filter", company: "Exabre", category: "analytics", domains: ["*.thefilter.com"] }, { name: "The Guardian", category: "analytics", domains: ["*.ophan.co.uk"] }, { name: "The Hut Group", category: "content", domains: ["*.thcdn.com"] }, { name: "The Numa Group", category: "other", domains: ["*.hittail.com"] }, { name: "The Publisher Desk", category: "ad", domains: ["*.206ads.com", "*.publisherdesk.com"] }, { name: "The Sydney Morning Herald", company: "Fairfax Media", category: "content", domains: ["*.smh.com.au"] }, { name: "The Wall Street Jounal", category: "content", domains: ["*.wsj.net"] }, { name: "The Wall Street Journal", category: "content", domains: ["*.marketwatch.com"] }, { name: "TheFind", category: "content", domains: ["*.thefind.com"] }, { name: "Thinglink", category: "utility", domains: ["*.thinglink.com"] }, { name: "Thirdpresence", category: "ad", domains: ["*.thirdpresence.com"] }, { name: "ThreatMetrix", category: "utility", domains: ["*.online-metrix.net"] }, { name: "Throtle", homepage: "https://throtle.io/", category: "analytics", domains: ["*.thrtle.com", "*.v12group.com"] }, { name: "TicketMaster", category: "content", domains: ["*.t-x.io", "*.tmcs.net"] }, { name: "TikTok", company: "ByteDance Ltd", homepage: "https://www.tiktok.com/en/", category: "social", domains: ["*.tiktok.com", "*.ipstatp.com"] }, { name: "Tidio Live Chat", company: "Tidio", homepage: "https://www.tidiochat.com/en/", category: "customer-success", domains: ["*.tidiochat.com"] }, { name: "Tiledesk Live Chat", company: "Tiledesk SRL", homepage: "https://www.tiledesk.com/", category: "customer-success", domains: ["*.tiledesk.com"] }, { name: "Time", category: "content", domains: ["*.timeinc.net"] }, { name: "Time2Perf", category: "ad", domains: ["*.time2perf.com"] }, { name: "TinyURL", category: "utility", domains: ["*.tinyurl.com"] }, { name: "Tivo", category: "analytics", domains: ["*.rovicorp.com"] }, { name: "Tom&Co", category: "hosting", domains: ["*.tomandco.uk"] }, { name: "Toms Native Ads", company: "Purch", category: "ad", domains: ["*.natoms.com"] }, { name: "ToneMedia", category: "ad", domains: ["*.clickfuse.com"] }, { name: "Tonic", company: "Team Internet", category: "ad", domains: ["*.dntx.com"] }, { name: "Touch Commerce", category: "customer-success", domains: ["*.inq.com", "*.touchcommerce.com"] }, { name: "ToutApp", category: "ad", domains: ["*.toutapp.com"] }, { name: "TraceView", company: "Solarwinds", category: "analytics", domains: ["*.tracelytics.com", "d2gfdmu30u15x7.cloudfront.net"] }, { name: "TrackJS", category: "analytics", domains: ["*.trackjs.com", "d2zah9y47r7bi2.cloudfront.net"] }, { name: "Tradedoubler", category: "ad", domains: ["*.pvnsolutions.com", "*.tradedoubler.com"] }, { name: "Tradelab", category: "ad", domains: ["*.tradelab.fr"] }, { name: "TrafficFactory", category: "ad", domains: ["*.trafficfactory.biz"] }, { name: "TrafficHunt", category: "ad", domains: ["*.traffichunt.com"] }, { name: "TrafficStars", category: "ad", domains: ["*.trafficstars.com", "*.tsyndicate.com"] }, { name: "Transifex", category: "utility", domains: ["*.transifex.com"] }, { name: "Travelex", category: "utility", domains: ["*.travelex.net", "*.travelex.co.uk"] }, { name: "Travelocity Canada", company: "Travelocity", category: "content", domains: ["*.travelocity.ca"] }, { name: "Travelocity USA", company: "Travelocity", category: "content", domains: ["*.travelocity.com"] }, { name: "Travelzoo", category: "content", domains: ["*.travelzoo.com"] }, { name: "Treasure Data", category: "analytics", domains: ["*.treasuredata.com"] }, { name: "Tremor Video", category: "ad", domains: ["*.tremorhub.com", "*.videohub.tv"] }, { name: "Trialfire", category: "analytics", domains: ["*.trialfire.com"] }, { name: "Tribal Fusion", company: "Exponential Interactive", category: "ad", domains: ["*.tribalfusion.com"] }, { name: "Triblio", category: "marketing", domains: ["*.tribl.io"] }, { name: "Triggered Messaging", company: "Fresh Relevance", category: "ad", domains: ["*.triggeredmessaging.com"] }, { name: "Trinity Mirror", category: "content", domains: ["*.mirror.co.uk"] }, { name: "Trinity Mirror Digital Media", category: "social", domains: ["*.tm-aws.com", "*.icnetwork.co.uk"] }, { name: "TripAdvisor", category: "content", domains: ["*.jscache.com", "*.tacdn.com", "*.tamgrt.com", "*.tripadvisor.com", "*.viator.com", "*.tripadvisor.co.uk"] }, { name: "TripleLift", category: "ad", domains: ["*.3lift.com"] }, { name: "Tru Optik", category: "ad", domains: ["*.truoptik.com"] }, { name: "TruConversion", category: "analytics", domains: ["*.truconversion.com"] }, { name: "Trueffect", category: "marketing", domains: ["*.adlegend.com"] }, { name: "Truefit", category: "analytics", domains: ["*.truefitcorp.com"] }, { name: "Trust Guard", category: "utility", domains: ["*.trust-guard.com"] }, { name: "Trust Pilot", category: "analytics", domains: ["*.trustpilot.com"] }, { name: "Amazon Trust Services", company: "Amazon", category: "utility", domains: ["*.amazontrust.com", "o.ss2.us"] }, { name: "Google Trust Services", company: "Google", category: "utility", domains: ["*.pki.goog"] }, { name: "Let's Encrypt", homepage: "https://letsencrypt.org/", category: "utility", domains: ["*.letsencrypt.org"] }, { name: "TrustX", category: "ad", domains: ["*.trustx.org"] }, { name: "Trusted Shops", category: "utility", domains: ["*.trustedshops.com"] }, { name: "Trustev", company: "TransUnion", category: "utility", domains: ["*.trustev.com"] }, { name: "Trustwave", category: "utility", domains: ["*.trustwave.com"] }, { name: "Tryzens TradeState", company: "Tryzens", category: "analytics", domains: ["*.tryzens-analytics.com"] }, { name: "TubeMogul", category: "ad", domains: ["*.tubemogul.com"] }, { name: "Turn", category: "ad", domains: ["*.turn.com"] }, { name: "Tutorialize", category: "customer-success", domains: ["*.tutorialize.me"] }, { name: "Twenga", category: "content", domains: ["*.twenga.fr", "*.c4tw.net", "*.twenga.co.uk"] }, { name: "Twitframe", company: "Superblock", category: "utility", domains: ["*.twitframe.com"] }, { name: "Twitter Online Conversion Tracking", company: "Twitter", category: "ad", domains: ["*.ads-twitter.com", "analytics.twitter.com"] }, { name: "Twitter Short URL", company: "Twitter", category: "social", domains: ["*.t.co"] }, { name: "Twyn Group", category: "ad", domains: ["*.twyn.com"] }, { name: "Tynt", company: "33 Across", category: "ad", domains: ["*.tynt.com"] }, { name: "Typepad", category: "hosting", domains: ["*.typepad.com"] }, { name: "TyrbooBytes", category: "utility", domains: ["*.turbobytes.net"] }, { name: "UPS i-parcel", company: "UPS", category: "other", domains: ["*.i-parcel.com"] }, { name: "US Media Consulting", category: "ad", domains: ["*.mediade.sk"] }, { name: "Ubertags", category: "tag-manager", domains: ["*.ubertags.com"] }, { name: "Umbel", category: "analytics", domains: ["*.umbel.com"] }, { name: "Unanimis", company: "Switch", category: "ad", domains: ["*.unanimis.co.uk"] }, { name: "Unbounce", category: "ad", domains: ["*.ubembed.com", "*.unbounce.com", "d2xxq4ijfwetlm.cloudfront.net", "d9hhrg4mnvzow.cloudfront.net"] }, { name: "Underdog Media", category: "ad", domains: ["*.underdog.media", "*.udmserve.net"] }, { name: "Understand Digital", category: "ad", domains: ["*.redirecting2.net"] }, { name: "Undertone", company: "Perion", category: "ad", domains: ["*.legolas-media.com"] }, { name: "Unidays", category: "ad", domains: ["*.myunidays.com", "*.unidays.world"] }, { name: "Uniqodo", category: "ad", domains: ["*.uniqodo.com"] }, { name: "Unite", category: "ad", domains: ["*.uadx.com"] }, { name: "United Card Services", category: "utility", domains: ["*.ucs.su"] }, { name: "United Internet", category: "hosting", domains: ["*.uicdn.com"] }, { name: "United Internet Media", category: "ad", domains: ["*.ui-portal.de"] }, { name: "United Internet Media AG", category: "hosting", domains: ["*.tifbs.net", "*.uicdn.net", "*.uimserv.net"] }, { name: "Unknown", category: "other", domains: [] }, { name: "Unruly Media", category: "ad", domains: ["*.unrulymedia.com"] }, { name: "UpBuild", category: "ad", domains: ["*.upbuild.io"] }, { name: "UpSellit", category: "analytics", domains: ["*.upsellit.com"] }, { name: "Upland Software", category: "hosting", domains: ["*.clickability.com"] }, { name: "Airship", category: "marketing", domains: ["*.urbanairship.com", "*.aswpsdkus.com"] }, { name: "UsabilityTools", category: "analytics", domains: ["*.usabilitytools.com"] }, { name: "Usablenet.net", category: "utility", domains: ["*.usablenet.net"] }, { name: "Use It Better", category: "analytics", domains: ["*.useitbetter.com"] }, { name: "User Replay", category: "analytics", domains: ["*.userreplay.net"] }, { name: "UserReport", category: "analytics", domains: ["*.userreport.com"] }, { name: "Userneeds", category: "analytics", domains: ["*.userneeds.dk"] }, { name: "Userzoom", category: "analytics", domains: ["*.userzoom.com"] }, { name: "V12 Retail Finance", category: "utility", domains: ["*.v12finance.com"] }, { name: "Vacaciones eDreams", category: "content", domains: ["*.odistatic.net"] }, { name: "Varick Media Management", category: "ad", domains: ["*.vmmpxl.com"] }, { name: "Vdopia Chocolate", company: "Vdopia", category: "ad", domains: ["*.vdopia.com"] }, { name: "Ve", company: "Ve", homepage: "https://www.ve.com/", category: "marketing", domains: ["*.veinteractive.com", "*.ve.com"] }, { name: "Ve Interactive", company: "Ve", category: "ad", domains: ["*.vepxl1.net", "*.adgenie.co.uk"] }, { name: "Vee24", category: "customer-success", domains: ["*.vee24.com"] }, { name: "Veeseo", category: "content", domains: ["*.veeseo.com"] }, { name: "Venatus Media", category: "marketing", domains: ["*.alcvid.com", "*.venatusmedia.com"] }, { name: "Veoxa", category: "ad", domains: ["*.veoxa.com"] }, { name: "Vergic AB", category: "customer-success", domains: ["*.psplugin.com"] }, { name: "Vergic Engage Platform", company: "Vergic", category: "customer-success", domains: ["*.vergic.com"] }, { name: "Verisign (Symantec)", category: "utility", domains: ["*.verisign.com"] }, { name: "Verizon", category: "utility", domains: ["*.public-trust.com"] }, { name: "Verizon Digital Media CDN", homepage: "https://www.verizondigitalmedia.com/", category: "cdn", domains: ["*.edgecastcdn.net", "*.edgecastdns.net"] }, { name: "Verizon Uplynk", company: "Verizon", category: "content", domains: ["*.uplynk.com"] }, { name: "Vero", company: "Semblance", category: "ad", domains: ["*.getvero.com", "d3qxef4rp70elm.cloudfront.net"] }, { name: "VertaMedia", category: "ad", domains: ["*.vertamedia.com"] }, { name: "Vertical Mass", category: "ad", domains: ["*.vmweb.net"] }, { name: "Vestorly", category: "ad", domains: ["*.oodalab.com"] }, { name: "Vextras", category: "other", domains: ["*.vextras.com"] }, { name: "Viacom", category: "content", domains: ["*.mtvnservices.com"] }, { name: "Vibrant Media", category: "ad", domains: ["*.intellitxt.com", "*.picadmedia.com"] }, { name: "VidPulse", category: "analytics", domains: ["*.vidpulse.com"] }, { name: "Video Media Groep", category: "ad", domains: ["*.vmg.host", "*.inpagevideo.nl"] }, { name: "VideoHub", company: "Tremor Video", category: "ad", domains: ["*.scanscout.com"] }, { name: "Videology", category: "ad", domains: ["*.tidaltv.com"] }, { name: "Vidible", category: "ad", domains: ["*.vidible.tv"] }, { name: "VigLink", category: "ad", domains: ["*.viglink.com"] }, { name: "Vindico", company: "Viant", category: "ad", domains: ["*.vindicosuite.com"] }, { name: "Viocorp International", category: "content", domains: ["*.vioapi.com"] }, { name: "ViralNinjas", category: "ad", domains: ["*.viralninjas.com"] }, { name: "Virool", category: "ad", domains: ["*.virool.com"] }, { name: "Virtual Earth", company: "Microsoft", category: "utility", domains: ["*.virtualearth.net"] }, { name: "Visely", company: "Visely", category: "other", homepage: "https://visely.io/", domains: ["*.visely.io"] }, { name: "VisScore", category: "analytics", domains: ["*.visscore.com", "d2hkbi3gan6yg6.cloudfront.net"] }, { name: "Visible Measures", category: "ad", domains: ["*.visiblemeasures.com"] }, { name: "Visual Studio", company: "Microsoft", category: "utility", domains: ["*.visualstudio.com"] }, { name: "VisualDNA", category: "ad", domains: ["*.visualdna.com"] }, { name: "VisualVisitor", category: "ad", domains: ["*.id-visitors.com"] }, { name: "Vivocha S.p.A", category: "customer-success", domains: ["*.vivocha.com"] }, { name: "Vizu (Nielsen)", category: "analytics", domains: ["*.vizu.com"] }, { name: "Vizury", category: "ad", domains: ["*.vizury.com"] }, { name: "VoiceFive", category: "analytics", domains: ["*.voicefive.com"] }, { name: "Volvelle", company: "Optomaton", category: "ad", domains: ["*.volvelle.tech"] }, { name: "VouchedFor", category: "analytics", domains: ["*.vouchedfor.co.uk"] }, { name: "WARPCACHE", category: "utility", domains: ["*.warpcache.net"] }, { name: "WISHLIST", company: "Shopapps", category: "social", domains: ["*.shopapps.in"] }, { name: "WP Engine", category: "hosting", domains: ["*.wpengine.com"] }, { name: "WalkMe", category: "customer-success", domains: ["*.walkme.com"] }, { name: "Watching That", category: "other", domains: ["*.watchingthat.com"] }, { name: "Wayfair", category: "analytics", domains: ["*.wayfair.com"] }, { name: "Web CEO", category: "other", domains: ["*.websiteceo.com"] }, { name: "Web Dissector", company: "Beijing Gridsum Technologies", category: "analytics", domains: ["*.gridsumdissector.com", "*.webdissector.com"] }, { name: "Web Forensics", category: "analytics", domains: ["*.webforensics.co.uk"] }, { name: "Web Security and Performance", company: "NCC Group", category: "utility", domains: ["*.nccgroup.trust"] }, { name: "WebEngage", category: "customer-success", domains: ["*.webengage.co", "*.webengage.com", "d23nd6ymopvz52.cloudfront.net", "d3701cc9l7v9a6.cloudfront.net"] }, { name: "WebInsight", company: "dotMailer", category: "analytics", domains: ["*.trackedlink.net", "*.trackedweb.net"] }, { name: "WebPageOne Solutions", category: "other", domains: ["*.webpageone.com"] }, { name: "WebSpectator", category: "ad", domains: ["*.webspectator.com"] }, { name: "WebTuna", company: "Application Performance", category: "analytics", domains: ["*.webtuna.com"] }, { name: "WebVideoCore", company: "StreamingVideoProvider", category: "content", domains: ["*.webvideocore.net"] }, { name: "WebWombat", category: "utility", domains: ["*.ic.com.au"] }, { name: "Webcollage", category: "customer-success", domains: ["*.webcollage.net"] }, { name: "Webcore", category: "ad", domains: ["*.onefeed.co.uk"] }, { name: "Webkul", company: "Webkul Software", category: "utility", domains: ["*.webkul.com"] }, { name: "Webmarked", category: "utility", domains: ["*.webmarked.net"] }, { name: "Weborama", category: "ad", domains: ["*.weborama.com", "*.weborama.fr"] }, { name: "WebpageFX", category: "ad", domains: ["*.leadmanagerfx.com"] }, { name: "Webphone", company: "IP WEB SERVICES", category: "customer-success", domains: ["*.webphone.net"] }, { name: "Webselect selectcommerce", company: "Webselect Internet", category: "hosting", domains: ["*.webselect.net"] }, { name: "Webthinking", category: "hosting", domains: ["*.webthinking.co.uk"] }, { name: "Webtrekk", category: "analytics", domains: ["*.wbtrk.net", "*.webtrekk-asia.net", "*.webtrekk.net", "*.wt-eu02.net", "*.wt-safetag.com"] }, { name: "Webtrends", category: "analytics", domains: ["*.webtrends.com", "*.webtrendslive.com", "d1q62gfb8siqnm.cloudfront.net"] }, { name: "Webtype", category: "cdn", domains: ["*.webtype.com"] }, { name: "White Ops", category: "utility", domains: ["*.acexedge.com", "*.tagsrvcs.com"] }, { name: "Whitespace", category: "ad", domains: ["*.whitespacers.com"] }, { name: "WhosOn Live Chat Software", category: "customer-success", domains: ["*.whoson.com"] }, { name: "Wibbitz", category: "other", domains: ["*.wibbitz.com"] }, { name: "Wide Area Communications", category: "hosting", domains: ["*.widearea.co.uk"] }, { name: "WideOrbit", category: "marketing", domains: ["*.admaym.com"] }, { name: "William Reed", category: "content", domains: ["*.wrbm.com"] }, { name: "WillyFogg.com", category: "content", domains: ["*.willyfogg.com"] }, { name: "Windows", company: "Microsoft", category: "utility", domains: ["*.windowsupdate.com"] }, { name: "WisePops", category: "utility", domains: ["*.wisepops.com"] }, { name: "Wishlist King", company: "Appmate", category: "other", homepage: "https://appmate.io/", domains: ["*.appmate.io"] }, { name: "Wishpond Technologies", category: "marketing", domains: ["*.wishpond.com", "*.wishpond.net"] }, { name: "WizRocket Technologies", category: "analytics", domains: ["*.wzrkt.com"] }, { name: "Woopra", category: "analytics", domains: ["*.woopra.com"] }, { name: "Woosmap", category: "utility", domains: ["*.woosmap.com"] }, { name: "WorkCast", category: "hosting", domains: ["*.workcast.net"] }, { name: "World News Media", category: "content", domains: ["*.wnmedia.co.uk"] }, { name: "Worldpay", category: "utility", domains: ["*.worldpay.com"] }, { name: "Wow Analytics", category: "analytics", domains: ["*.wowanalytics.co.uk"] }, { name: "Wowcher", category: "ad", domains: ["*.wowcher.co.uk"] }, { name: "Wufoo", category: "utility", domains: ["*.wufoo.com"] }, { name: "Wunderkind", category: "marketing", homepage: "https://www.wunderkind.co/", domains: ["*.bounceexchange.com", "*.bouncex.net", "*.wknd.ai", "*.cdnbasket.net", "*.cdnwidget.com"] }, { name: "Wyng", category: "ad", domains: ["*.offerpop.com"] }, { name: "XMLSHOP", category: "hosting", domains: ["*.xmlshop.biz"] }, { name: "XiTi", company: "AT Internet", category: "analytics", domains: ["*.xiti.com", "*.aticdn.net"], homepage: "https://www.atinternet.com/en/" }, { name: "YUDU", category: "content", domains: ["*.yudu.com"] }, { name: "Yahoo! Ad Exchange", company: "Yahoo!", category: "ad", domains: ["*.yieldmanager.com", "*.browsiprod.com"] }, { name: "Yahoo! JAPAN Ads", company: "Yahoo! JAPAN", category: "ad", homepage: "https://marketing.yahoo.co.jp/service/yahooads/", domains: ["yads.c.yimg.jp", "s.yimg.jp", "b92.yahoo.co.jp"] }, { name: "Yahoo! Tag Manager", company: "Yahoo! JAPAN", category: "tag-manager", homepage: "https://marketing.yahoo.co.jp/service/tagmanager/", domains: ["*.yjtag.jp"] }, { name: "Yahoo! Small Business", company: "Yahoo!", category: "hosting", domains: ["*.aabacosmallbusiness.com"] }, { name: "Yellow Robot", category: "ad", domains: ["*.backinstock.org"] }, { name: "YieldPartners", category: "ad", domains: ["*.yieldpartners.com"] }, { name: "Yieldbot", category: "ad", domains: ["*.yldbt.com"] }, { name: "Yieldify", category: "ad", domains: ["*.yieldify.com", "*.yieldifylabs.com", "d33wq5gej88ld6.cloudfront.net", "dwmvwp56lzq5t.cloudfront.net"] }, { name: "Yieldlab", category: "ad", domains: ["*.yieldlab.net"] }, { name: "Yieldmo", category: "ad", domains: ["*.yieldmo.com"] }, { name: "Yieldr", category: "ad", domains: ["*.254a.com"] }, { name: "Yo", category: "utility", domains: ["*.yopify.com"] }, { name: "YoYo", category: "utility", domains: ["*.goadservices.com"] }, { name: "Yotpo", homepage: "https://www.yotpo.com/", category: "marketing", domains: ["*.yotpo.com", "*.swellrewards.com"] }, { name: "Yottaa", category: "hosting", domains: ["*.yottaa.com", "*.yottaa.net"] }, { name: "YourAmigo", category: "utility", domains: ["*.youramigo.com"] }, { name: "YuMe", category: "ad", domains: ["*.yume.com", "*.yumenetworks.com"] }, { name: "Yummley", category: "other", domains: ["*.yummly.com"] }, { name: "ZEDO", category: "ad", domains: ["*.zedo.com"] }, { name: "Zafu", category: "analytics", domains: ["*.zafu.com"] }, { name: "Zaius", category: "ad", domains: ["*.zaius.com"] }, { name: "Zamplus ad", category: "ad", domains: ["*.zampda.net"] }, { name: "Zanox", category: "ad", domains: ["*.zanox.com", "*.zanox.ws"] }, { name: "Zapper", category: "utility", domains: ["*.zapper.com"] }, { name: "Zarget", category: "analytics", domains: ["*.zarget.com"] }, { name: "Zemanta", category: "ad", domains: ["*.zemanta.com"] }, { name: "Zen Internet", category: "other", domains: ["*.zyen.com"] }, { name: "Zenovia Digital Exchange", category: "ad", domains: ["*.rhythmxchange.com", "*.zenoviaexchange.com"] }, { name: "ZergNet", category: "content", domains: ["*.zergnet.com"] }, { name: "Zerogrey", category: "hosting", domains: ["*.zerogrey.com"] }, { name: "Ziff Davis Tech", category: "ad", domains: ["*.adziff.com", "*.zdbb.net"] }, { name: "Zmags", category: "marketing", domains: ["*.zmags.com"] }, { name: "Zolando", category: "content", domains: ["*.ztat.net"] }, { name: "Zoover", category: "analytics", domains: ["*.zoover.nl", "*.zoover.co.uk"] }, { name: "Zopim", category: "customer-success", domains: ["*.zopim.io"] }, { name: "[24]7", category: "customer-success", domains: ["*.247-inc.net", "*.247inc.net", "d1af033869koo7.cloudfront.net"] }, { name: "adKernel", category: "ad", domains: ["*.adkernel.com"] }, { name: "adMarketplace", company: "AMPexchange", category: "ad", domains: ["*.ampxchange.com", "*.admarketplace.net"] }, { name: "addtocalendar", category: "utility", domains: ["*.addtocalendar.com"] }, { name: "adnanny", category: "ad", domains: ["*.adserver01.de"] }, { name: "affilinet", category: "ad", domains: ["*.reussissonsensemble.fr", "*.successfultogether.co.uk"] }, { name: "audioBoom", category: "social", domains: ["*.audioboom.com", "*.audioboo.fm"] }, { name: "bPay by Barclaycard", company: "Barclays Bank", category: "utility", domains: ["*.bpay.co.uk"] }, { name: "bRealTime", category: "ad", domains: ["*.brealtime.com"] }, { name: "bd4travel", category: "analytics", domains: ["*.bd4travel.com"] }, { name: "bizinformation-VOID", company: "bizinformation", category: "analytics", domains: ["*.bizinformation.org"] }, { name: "carrot", category: "social", domains: ["*.sharebutton.co"] }, { name: "cloudIQ", category: "analytics", domains: ["*.cloud-iq.com"] }, { name: "comScore", category: "analytics", domains: ["*.adxpose.com", "*.comscore.com", "*.sitestat.com", "*.zqtk.net"] }, { name: "content.ad", category: "ad", domains: ["*.content.ad"] }, { name: "d3 Media", company: "d3 Technologies", category: "other", domains: ["*.d3sv.net"] }, { name: "dexiMEDIA", category: "ad", domains: ["*.deximedia.com"] }, { name: "dianomi", category: "ad", domains: ["*.dianomi.com", "*.dianomioffers.co.uk"] }, { name: "donReach", category: "social", domains: ["*.donreach.com"] }, { name: "dotMailer", category: "ad", domains: ["*.dmtrk.com", "*.dotmailer.com", "*.emlfiles.com"] }, { name: "dotMailer Surveys", company: "dotMailer", category: "analytics", domains: ["*.dotmailer-surveys.com"] }, { name: "dstillery", category: "ad", domains: ["*.dstillery.com", "*.media6degrees.com"] }, { name: "eBay", category: "ad", domains: ["*.ebay.com", "*.ebayimg.com", "*.fetchback.com"] }, { name: "eBay Enterprise", category: "hosting", domains: ["*.csdata1.com", "*.gsipartners.com"] }, { name: "eBuzzing", company: "Teads Managed Services", category: "ad", domains: ["*.ebz.io"] }, { name: "eDigital Research", category: "customer-success", domains: ["*.edigitalresearch.com", "*.edigitalsurvey.com", "*.edrcdn.com", "*.ecustomeropinions.com"] }, { name: "eGain", category: "analytics", domains: ["*.analytics-egain.com", "*.egain.com"] }, { name: "eHost", category: "hosting", domains: ["*.ehosts.net"] }, { name: "eKomi", category: "analytics", domains: ["*.ekomi.com", "*.ekomi.de"] }, { name: "eWAY", company: "Web Active Pty", category: "utility", domains: ["*.eway.com.au"] }, { name: "eXTReMe digital", category: "analytics", domains: ["*.extreme-dm.com"] }, { name: "eXelate", category: "ad", domains: ["*.exelator.com"] }, { name: "ecommercefeed.net", category: "marketing", domains: ["*.ecommercefeed.net"] }, { name: "engage:BDR", category: "ad", domains: ["*.bnmla.com", "*.ebdr3.com"] }, { name: "epago", category: "ad", domains: ["*.adaos-ads.net"] }, { name: "epoq internet services", category: "analytics", domains: ["*.epoq.de"] }, { name: "etouches", category: "hosting", domains: ["*.etouches.com"] }, { name: "etracker", category: "analytics", domains: ["*.etracker.com", "*.etracker.de"] }, { name: "everestads.com", category: "content", domains: ["*.verestads.net"] }, { name: "exebid.DCA", company: "Data-Centric Alliance", category: "ad", domains: ["*.exe.bid"] }, { name: "eyeReturn Marketing", category: "marketing", domains: ["*.eyereturn.com"] }, { name: "feedoptimise", category: "hosting", domains: ["*.feedoptimise.com", "d1w78njrm56n7g.cloudfront.net"] }, { name: "fifty-five", category: "ad", domains: ["*.55labs.com"] }, { name: "fluct", category: "ad", domains: ["*.adingo.jp"] }, { name: "freegeoip.net", company: "(community-funded)", category: "utility", domains: ["*.freegeoip.net"] }, { name: "freewheel.tv", category: "content", domains: ["*.fwmrm.net"] }, { name: "gnatta", category: "customer-success", domains: ["*.gnatta.com"] }, { name: "home.pl", category: "hosting", domains: ["*.nscontext.eu"] }, { name: "hyfn", category: "ad", domains: ["*.hyfn.com"] }, { name: "iAdvize SAS", category: "customer-success", domains: ["*.iadvize.com"] }, { name: "iBillboard", category: "ad", domains: ["*.ibillboard.com"] }, { name: "iCrossing", category: "ad", domains: ["*.ic-live.com"] }, { name: "iFactory", company: "RDW Group", category: "hosting", domains: ["*.ifactory.com"] }, { name: "iGoDigital", category: "analytics", domains: ["*.igodigital.com"] }, { name: "iJento", company: "Fopsha", category: "ad", domains: ["*.ijento.com"] }, { name: "iPage", category: "hosting", domains: ["*.ipage.com"] }, { name: "iPerceptions", category: "customer-success", domains: ["*.iperceptions.com"] }, { name: "iTunes", company: "Apple", category: "content", domains: ["*.mzstatic.com"] }, { name: "imgix", company: "Zebrafish Labs", category: "utility", domains: ["*.imgix.net"] }, { name: "infogr.am", category: "utility", domains: ["*.infogr.am", "*.jifo.co"] }, { name: "iotec", category: "analytics", domains: ["*.dsp.io"] }, { name: "iovation", category: "utility", domains: ["*.iesnare.com"] }, { name: "ipinfo.io", category: "utility", domains: ["*.ipinfo.io"] }, { name: "issuu", category: "content", domains: ["*.issuu.com", "*.isu.pub"] }, { name: "iubenda", category: "utility", domains: ["*.iubenda.com"] }, { name: "j2 Cloud Services", category: "ad", domains: ["*.campaigner.com"] }, { name: "jsonip.com", category: "analytics", domains: ["*.jsonip.com"] }, { name: "linkpulse", category: "analytics", domains: ["*.lp4.io"] }, { name: "loGo_net", category: "analytics", domains: ["*.logo-net.co.uk"] }, { name: "mainADV", category: "ad", domains: ["*.httptrack.com", "*.solocpm.com"] }, { name: "mbr targeting", category: "ad", domains: ["*.m6r.eu"] }, { name: "media.ventive", category: "ad", domains: ["*.contentspread.net"] }, { name: "metrigo", category: "ad", domains: ["*.metrigo.com"] }, { name: "minicabit.com", category: "content", domains: ["*.minicabit.com"] }, { name: "mobiManage", category: "hosting", domains: ["*.mobimanage.com"] }, { name: "moving-pictures", category: "other", domains: ["*.moving-pictures.biz", "*.v6-moving-pictures.com", "*.vtstat.com", "*.moving-pictures.de"] }, { name: "my6sense", category: "ad", domains: ["*.mynativeplatform.com"] }, { name: "myThings", category: "ad", domains: ["*.mythings.com", "*.mythingsmedia.net"] }, { name: "mymovies", category: "content", domains: ["*.mymovies.net"] }, { name: "nRelate-VOID", company: "nRelate", category: "content", domains: ["*.nrelate.com"] }, { name: "nToklo", category: "analytics", domains: ["*.ntoklo.com"] }, { name: "neXeps", category: "ad", domains: ["*.nexeps.com"] }, { name: "ninemsn Pty.", category: "utility", domains: ["*.ninemsn.com.au"] }, { name: "nugg.ad", category: "ad", domains: ["*.nuggad.net"] }, { name: "numero interactive", company: "numero", category: "ad", domains: ["*.numerointeractive.com"] }, { name: "optMD", company: "Optimax Media Delivery", category: "ad", domains: ["*.optmd.com"] }, { name: "otracking.com", category: "analytics", domains: ["*.otracking.com"] }, { name: "paysafecard", company: "Paysafe Group", category: "utility", domains: ["*.paysafecard.com"] }, { name: "piano", category: "ad", domains: ["*.npttech.com", "*.tinypass.com"] }, { name: "piclike", category: "ad", domains: ["*.piclike.us"] }, { name: "placehold.it", category: "utility", domains: ["*.placehold.it"] }, { name: "plista", category: "ad", domains: ["*.plista.com"] }, { name: "prebid.org", category: "utility", domains: ["*.prebid.org"] }, { name: "reEmbed", category: "other", domains: ["*.reembed.com"] }, { name: "reddit", category: "social", domains: ["*.reddit.com", "*.redditstatic.com"] }, { name: "rewardStyle.com", category: "ad", domains: ["*.rewardstyle.com"] }, { name: "rss2json", category: "utility", domains: ["*.rss2json.com"] }, { name: "sage Pay", company: "Sage Pay Europe", category: "utility", domains: ["*.sagepay.com"] }, { name: "section.io", category: "utility", domains: ["*.squixa.net"] }, { name: "smartclip", category: "ad", domains: ["*.smartclip.net"] }, { name: "sovrn", category: "ad", domains: ["*.lijit.com"] }, { name: "stackpile.io", company: "StackPile", category: "tag-manager", domains: ["*.stackpile.io"] }, { name: "template-help.com", category: "hosting", domains: ["*.template-help.com"] }, { name: "test", company: "test only", category: "other", domains: ["*.testtesttest.com"] }, { name: "trueAnthem", category: "social", domains: ["*.tru.am"] }, { name: "tweetmeme-VOID", company: "tweetmeme", category: "analytics", domains: ["*.tweetmeme.com"] }, { name: "uLogin", category: "other", domains: ["*.ulogin.ru"] }, { name: "uLogix", category: "ad", domains: ["*.ulogix.ru"] }, { name: "ucfunnel ucX", company: "ucfunnel", category: "ad", domains: ["*.aralego.com"] }, { name: "up-value", category: "ad", domains: ["*.up-value.de"] }, { name: "wywy", category: "ad", domains: ["*.wywy.com", "*.wywyuserservice.com"] }, { name: "CDK Dealer Management", company: "CDK Global", homepage: "https://www.cdkglobal.com/us", category: "hosting", domains: ["*.assets-cdk.com"] }, { name: "fam", company: "Fing Co Ltd.", homepage: "http://admin.fam-ad.com/report/", category: "ad", domains: ["*.fam-ad.com"] }, { name: "zypmedia", category: "ad", domains: ["*.extend.tv"] }, { name: "codigo", homepage: "https://www.codigo.se", category: "analytics", domains: ["*.codigo.se"] }, { name: "Playground", homepage: "https://playground.xyz", category: "ad", domains: ["*.playground.xyz"] }, { name: "RAM", homepage: "https://www2.rampanel.com/", category: "analytics", domains: ["*.rampanel.com"] }, { name: "Adition", homepage: "https://www.adition.com", category: "ad", domains: ["*.adition.com"] }, { name: "Widespace", homepage: "https://www.widespace.com", category: "ad", domains: ["*.widespace.com"] }, { name: "Colpirio", homepage: "https://www.widespace.com", category: "analytics", domains: ["*.colpirio.com"] }, { name: "Brandmetrics", homepage: "https://www.brandmetrics.com", category: "analytics", domains: ["*.brandmetrics.com"] }, { name: "EasyAd", homepage: "https://web.easy-ads.com/", category: "ad", domains: ["*.easy-ads.com"] }, { name: "Glimr", homepage: "https://glimr.io/", category: "analytics", domains: ["*.glimr.io"] }, { name: "Webtreck", homepage: "https://www.webtrekk.com/en/home/", category: "analytics", domains: ["*.wcfbc.net"] }, { name: "DigiTrust", homepage: "http://www.digitru.st/", category: "analytics", domains: ["*.digitru.st"] }, { name: "Kantar Sifo", homepage: "https://www.kantarsifo.se", category: "analytics", domains: ["*.research-int.se"] }, { name: "Concert", homepage: "https://concert.io/", category: "ad", domains: ["*.concert.io"] }, { name: "Emerse", homepage: "https://www.emerse.com/", category: "ad", domains: ["*.emerse.com"] }, { name: "Iterate", homepage: "https://iteratehq.com/", category: "analytics", domains: ["*.iteratehq.com"] }, { name: "Cookiebot", homepage: "https://www.cookiebot.com/", category: "utility", domains: ["*.cookiebot.com"] }, { name: "Netlify", homepage: "https://www.netlify.com/", category: "utility", domains: ["*.netlify.com", "*.netlifyusercontent.com"] }, { name: "Scroll", homepage: "https://scroll.com/", category: "utility", domains: ["*.scroll.com"] }, { name: "Consumable", homepage: "https://consumable.com/", category: "ad", domains: ["*.serverbid.com"] }, { name: "DMD Marketing", homepage: "https://www.dmdconnects.com/", category: "ad", domains: ["*.medtargetsystem.com"] }, { name: "Catchpoint", homepage: "https://www.catchpoint.com/", category: "analytics", domains: ["*.3gl.net", "*.3genlabs.net"] }, { name: "Terminus", homepage: "https://terminus.com/", category: "ad", domains: ["*.terminus.services"] }, { name: "Acceptable Ads", homepage: "https://acceptableads.com/", category: "ad", domains: ["*.aaxads.com", "*.aaxdetect.com"] }, { name: "ClearBrain", homepage: "https://www.clearbrain.com/", category: "analytics", domains: ["*.clearbrain.com"] }, { name: "Optanon", homepage: "https://www.cookielaw.org/", category: "consent-provider", domains: ["*.onetrust.com", "*.cookielaw.org"] }, { name: "TrustArc", homepage: "https://www.trustarc.com/", category: "utility", domains: ["*.trustarc.com"] }, { name: "iSpot.tv", homepage: "https://www.ispot.tv/", category: "ad", domains: ["*.ispot.tv"] }, { name: "RevJet", homepage: "https://www.revjet.com/", category: "ad", domains: ["*.revjet.com"] }, { name: "atlasRTX", homepage: "https://www.atlasrtx.com/", category: "customer-success", domains: ["*.atlasrtx.com"] }, { name: "ContactAtOnce", homepage: "https://www.contactatonce.com/", category: "customer-success", domains: ["*.contactatonce.com"] }, { name: "Algolia", homepage: "https://www.algolia.com/", category: "utility", domains: ["*.algolianet.com", "*.algolia.net", "*.algolia.io"] }, { name: "EMX Digital", homepage: "https://emxdigital.com", category: "ad", domains: ["*.emxdgt.com"] }, { name: "Moxie", homepage: "https://www.gomoxie.com/", category: "utility", domains: ["*.gomoxie.solutions"] }, { name: "Scripps Network Digital", homepage: "https://www.scrippsnetworksdigital.com/", category: "ad", domains: ["*.snidigital.com"] }, { name: "TurnTo", homepage: "https://www.turntonetworks.com/", category: "utility", domains: ["*.turnto.com"] }, { name: "Quantum Metric", homepage: "https://www.quantummetric.com/", category: "analytics", domains: ["*.quantummetric.com"] }, { name: "Carbon Ads", homepage: "https://www.carbonads.net/", category: "ad", domains: ["*.carbonads.net", "*.carbonads.com"] }, { name: "Ably", homepage: "https://www.ably.io/", category: "utility", domains: ["*.ably.io"] }, { name: "Sectigo", homepage: "https://sectigo.com/", category: "utility", domains: ["*.sectigo.com"] }, { name: "Specless", homepage: "https://gospecless.com/", category: "ad", domains: ["*.specless.tech"] }, { name: "Loggly", homepage: "https://www.loggly.com/", category: "analytics", domains: ["*.loggly.com", "d9jmv9u00p0mv.cloudfront.net"] }, { name: "Intent Media", homepage: "https://intent.com/", category: "ad", domains: ["*.intentmedia.net"] }, { name: "Supership", homepage: "https://supership.jp/", category: "ad", domains: ["*.socdm.com"] }, { name: "F@N Communications", homepage: "https://www.fancs.com/", category: "ad", domains: ["*.ladsp.com"] }, { name: "Vidyard", homepage: "https://www.vidyard.com/", category: "utility", domains: ["*.vidyard.com"] }, { name: "RapidSSL", homepage: "https://www.rapidssl.com/", category: "utility", domains: ["*.rapidssl.com"] }, { name: "Coherent Path", homepage: "https://coherentpath.com/", category: "utility", domains: ["*.coherentpath.com"] }, { name: "Attentive", homepage: "https://attentivemobile.com/", category: "ad", domains: ["*.attn.tv", "*.attentivemobile.com"] }, { name: "emetriq", homepage: "https://www.emetriq.com/", category: "ad", domains: ["*.emetriq.de", "*.xplosion.de"] }, { name: "Bonzai", homepage: "https://www.bonzai.co/", category: "ad", domains: ["*.bonzai.co"] }, { name: "Freshchat", homepage: "https://www.freshworks.com/live-chat-software/", category: "customer-success", domains: ["*.freshchat.com", "*.freshworksapi.com"], products: [{ name: "Freshdesk Messaging", urlPatterns: ["wchat.freshchat.com"], facades: [{ name: "Freshdesk Messaging (formerly Freshchat) Facade", repo: "https://github.com/coliff/freshdesk-messaging-facade/" }] }] }, { name: "Contentful", homepage: "https://www.contentful.com/", category: "utility", domains: ["*.contentful.com"] }, { name: "PureCars", homepage: "https://www.purecars.com/", category: "marketing", domains: ["*.purecars.com"] }, { name: "Tray Commerce", homepage: "https://www.tray.com.br/", category: "marketing", domains: ["*.tcdn.com.br"] }, { name: "AdScore", homepage: "https://www.adscore.com/", category: "ad", domains: ["*.adsco.re"] }, { name: "WebsiteBuilder.com", homepage: "https://www.websitebuilder.com", category: "hosting", domains: ["*.mywebsitebuilder.com"] }, { name: "mParticle", homepage: "https://www.mparticle.com/", category: "utility", domains: ["*.mparticle.com"] }, { name: "Ada", homepage: "https://www.ada.support/", category: "customer-success", domains: ["*.ada.support"] }, { name: "Quora Ads", homepage: "https://www.quora.com/business/", category: "ad", domains: ["*.quora.com"] }, { name: "Auth0", homepage: "https://auth0.com/", category: "utility", domains: ["*.auth0.com"] }, { name: "Bridgewell DSP", homepage: "https://www.bridgewell.com/", category: "ad", domains: ["*.scupio.com"] }, { name: "Wicked Reports", homepage: "https://www.wickedreports.com/", category: "marketing", domains: ["*.wickedreports.com"] }, { name: "Jaywing", homepage: "https://jaywing.com/", category: "marketing", domains: ["*.jaywing.com"] }, { name: "Holimetrix", homepage: "https://u360.d-bi.fr/", category: "marketing", domains: ["*.d-bi.fr"] }, { name: "iZooto", homepage: "https://www.izooto.com", category: "marketing", domains: ["*.izooto.com"] }, { name: "Ordergroove", homepage: "https://www.ordergroove.com/", category: "marketing", domains: ["*.ordergroove.com"] }, { name: "PageSense", homepage: "https://www.zoho.com/pagesense/", category: "analytics", domains: ["*.pagesense.io"] }, { name: "Vizzit", homepage: "https://www.vizzit.se", category: "analytics", domains: ["*.vizzit.se"] }, { name: "Click Guardian", homepage: "https://www.clickguardian.co.uk/", category: "ad", domains: ["*.clickguardian.app", "*.clickguardian.co.uk"] }, { name: "Smartsupp", company: "Smartsupp.com", homepage: "https://www.smartsupp.com", category: "customer-success", domains: ["*.smartsuppchat.com", "*.smartsupp.com", "smartsupp-widget-161959.c.cdn77.org", "*.smartsuppcdn.com"] }, { name: "Smartlook", company: "Smartsupp.com", homepage: "https://www.smartlook.com/", category: "analytics", domains: ["*.smartlook.com"] }, { name: "Luigis Box", company: "Luigis Box", homepage: "https://www.luigisbox.com/", category: "utility", domains: ["*.luigisbox.com"] }, { name: "Targito", company: "VIVmail.cz", homepage: "https://www.targito.com", category: "marketing", domains: ["*.targito.com"] }, { name: "Foxentry", company: "AVANTRO", homepage: "https://foxentry.cz/", category: "utility", domains: ["*.foxentry.cz"] }, { name: "Pendo", homepage: "https://www.pendo.io", category: "analytics", domains: ["*.pendo.io"] }, { name: "Braze", homepage: "https://www.braze.com", category: "analytics", domains: ["*.appboycdn.com"] }, { name: "Usersnap", homepage: "https://usersnap.com", category: "customer-success", domains: ["*.usersnap.com"] }, { name: "Rewardful", homepage: "https://www.getrewardful.com", category: "analytics", domains: ["*.wdfl.co"] }, { name: "Launch Darkly", homepage: "https://launchdarkly.com", category: "utility", domains: ["*.launchdarkly.com"] }, { name: "Statuspage", company: "Atlassian", homepage: "https://www.statuspage.io", category: "utility", domains: ["*.statuspage.io"] }, { name: "HyperInzerce", homepage: "https://hyperinzerce.cz", category: "ad", domains: ["*.hyperinzerce.cz"] }, { name: "POWr", homepage: "https://www.powr.io", category: "utility", domains: ["*.powr.io"] }, { name: "Coral", company: "Coral", homepage: "https://coralproject.net", category: "content", domains: ["*.coral.coralproject.net"] }, { name: "Bolt", homepage: "https://www.bolt.com/", category: "utility", domains: ["*.bolt.com"] }, { name: "Judge.me", homepage: "https://judge.me/", category: "marketing", domains: ["*.judge.me"] }, { name: "Tilda", homepage: "https://tilda.cc/", category: "hosting", domains: ["*.tildacdn.com"] }, { name: "SalesLoft", homepage: "https://salesloft.com/", category: "marketing", domains: ["*.salesloft.com"] }, { name: "Accessibe Accessibility Overlay", company: "Accessibe", homepage: "https://accessibe.com/", category: "utility", domains: ["*.accessibe.com", "*.acsbapp.com", "*.acsbap.com"] }, { name: "Builder", homepage: "https://www.builder.io/", category: "hosting", domains: ["*.builder.io"] }, { name: "Pepperjam", homepage: "https://www.pepperjam.com/", category: "marketing", domains: ["*.pepperjam.com", "*.affiliatetechnology.com"] }, { name: "Reach", homepage: "https://withreach.com/", category: "utility", domains: ["*.gointerpay.net"] }, { name: "Chameleon", homepage: "https://www.trychameleon.com/", category: "marketing", domains: ["*.trychameleon.com"] }, { name: "Matomo", company: "InnoCraft", homepage: "https://matomo.org/", category: "analytics", domains: ["*.matomo.cloud"] }, { name: "Segmanta", homepage: "https://segmanta.com/", category: "marketing", domains: ["*.segmanta.com"] }, { name: "Podsights", homepage: "https://podsights.com/", category: "marketing", domains: ["*.pdst.fm", "us-central1-adaptive-growth.cloudfunctions.net"] }, { name: "Chatwoot", homepage: "https://www.chatwoot.com/", category: "customer-success", domains: ["*.chatwoot.com"] }, { name: "Crisp", homepage: "https://crisp.chat/", category: "customer-success", domains: ["*.crisp.chat"] }, { name: "Admiral CMP", homepage: "https://www.getadmiral.com", category: "consent-provider", domains: ["admiral.mgr.consensu.org", "*.admiral.mgr.consensu.org"] }, { name: "Adnuntius CMP", homepage: "https://adnuntius.com", category: "consent-provider", domains: ["adnuntiusconsent.mgr.consensu.org", "*.adnuntiusconsent.mgr.consensu.org"] }, { name: "Clickio CMP", homepage: "https://clickio.com", category: "consent-provider", domains: ["clickio.mgr.consensu.org", "*.clickio.mgr.consensu.org"] }, { name: "AppConsent CMP", homepage: "https://appconsent.io/en", category: "consent-provider", domains: ["appconsent.mgr.consensu.org", "*.appconsent.mgr.consensu.org"] }, { name: "DMG Media CMP", homepage: "https://www.dmgmedia.co.uk", category: "consent-provider", domains: ["dmgmedia.mgr.consensu.org", "*.dmgmedia.mgr.consensu.org"] }, { name: "Axel Springer CMP", homepage: "https://www.axelspringer.com", category: "consent-provider", domains: ["axelspringer.mgr.consensu.org", "*.axelspringer.mgr.consensu.org"] }, { name: "Bedrock CMP", homepage: "https://www.bedrockstreaming.com", category: "consent-provider", domains: ["bedrock.mgr.consensu.org", "*.bedrock.mgr.consensu.org"] }, { name: "BMIND CMP", homepage: "https://www.bmind.es", category: "consent-provider", domains: ["bmind.mgr.consensu.org", "*.bmind.mgr.consensu.org"] }, { name: "Borlabs CMP", homepage: "https://borlabs.io", category: "consent-provider", domains: ["borlabs.mgr.consensu.org", "*.borlabs.mgr.consensu.org"] }, { name: "Civic CMP", homepage: "https://www.civicuk.com", category: "consent-provider", domains: ["cookiecontrol.mgr.consensu.org", "*.cookiecontrol.mgr.consensu.org"] }, { name: "Commanders Act CMP", homepage: "https://www.commandersact.com", category: "consent-provider", domains: ["commandersact.mgr.consensu.org", "*.commandersact.mgr.consensu.org"] }, { name: "Complianz CMP", homepage: "https://complianz.io/", category: "consent-provider", domains: ["complianz.mgr.consensu.org", "*.complianz.mgr.consensu.org"] }, { name: "Consent Desk CMP", homepage: "https://www.consentdesk.com/", category: "consent-provider", domains: ["consentdesk.mgr.consensu.org", "*.consentdesk.mgr.consensu.org"] }, { name: "Consent Manager CMP", homepage: "https://consentmanager.net", category: "consent-provider", domains: ["consentmanager.mgr.consensu.org", "*.consentmanager.mgr.consensu.org"] }, { name: "Conversant CMP", homepage: "https://www.conversantmedia.eu/", category: "consent-provider", domains: ["conversant.mgr.consensu.org", "*.conversant.mgr.consensu.org"] }, { name: "Cookie Information CMP", homepage: "https://www.cookieinformation.com/", category: "consent-provider", domains: ["cookieinformation.mgr.consensu.org", "*.cookieinformation.mgr.consensu.org"] }, { name: "Cookiebot CMP", homepage: "https://www.cookiebot.com", category: "consent-provider", domains: ["cookiebot.mgr.consensu.org", "*.cookiebot.mgr.consensu.org"] }, { name: "Truendo CMP", homepage: "https://truendo.com/", category: "consent-provider", domains: ["truendo.mgr.consensu.org", "*.truendo.mgr.consensu.org"] }, { name: "Dentsu CMP", homepage: "https://www.dentsuaegisnetwork.de/", category: "consent-provider", domains: ["dan.mgr.consensu.org", "*.dan.mgr.consensu.org"] }, { name: "Didomi CMP", homepage: "https://www.didomi.io/en/", category: "consent-provider", domains: ["didomi.mgr.consensu.org", "*.didomi.mgr.consensu.org"] }, { name: "Ensighten CMP", homepage: "https://www.ensighten.com/", category: "consent-provider", domains: ["ensighten.mgr.consensu.org", "*.ensighten.mgr.consensu.org"] }, { name: "Evidon CMP", homepage: "https://evidon.com", category: "consent-provider", domains: ["evidon.mgr.consensu.org", "*.evidon.mgr.consensu.org"] }, { name: "Ezoic CMP", homepage: "https://www.ezoic.com/", category: "consent-provider", domains: ["ezoic.mgr.consensu.org", "*.ezoic.mgr.consensu.org"] }, { name: "Gemius CMP", homepage: "https://www.gemius.com", category: "consent-provider", domains: ["gemius.mgr.consensu.org", "*.gemius.mgr.consensu.org"] }, { name: "NitroPay CMP", homepage: "https://nitropay.com/", category: "consent-provider", domains: ["nitropay.mgr.consensu.org", "*.nitropay.mgr.consensu.org"] }, { name: "Google FundingChoices", homepage: "https://fundingchoices.google.com/start/", category: "consent-provider", domains: ["fundingchoices.mgr.consensu.org", "*.fundingchoices.mgr.consensu.org", "fundingchoicesmessages.google.com", "*.fundingchoicesmessages.google.com"] }, { name: "Gravito CMP", homepage: "https://www.gravito.net/", category: "consent-provider", domains: ["gravito.mgr.consensu.org", "*.gravito.mgr.consensu.org"] }, { name: "ID Ward CMP", homepage: "https://id-ward.com/enterprise", category: "consent-provider", domains: ["idward.mgr.consensu.org", "*.idward.mgr.consensu.org"] }, { name: "iubenda CMP", homepage: "https://www.iubenda.com", category: "consent-provider", domains: ["iubenda.mgr.consensu.org", "*.iubenda.mgr.consensu.org"] }, { name: "Jump CMP", homepage: "https://jumpgroup.it/", category: "consent-provider", domains: ["avacy.mgr.consensu.org", "*.avacy.mgr.consensu.org"] }, { name: "LiveRamp CMP", homepage: "https://liveramp.com/", category: "consent-provider", domains: ["faktor.mgr.consensu.org", "*.faktor.mgr.consensu.org"] }, { name: "Madvertise CMP", homepage: "https://madvertise.com/en/", category: "consent-provider", domains: ["madvertise.mgr.consensu.org", "*.madvertise.mgr.consensu.org"] }, { name: "Mairdumont Netletic CMP", homepage: "https://www.mairdumont-netletix.com/", category: "consent-provider", domains: ["mdnxmp.mgr.consensu.org", "*.mdnxmp.mgr.consensu.org"] }, { name: "Marfeel CMP", homepage: "https://www.marfeel.com/", category: "consent-provider", domains: ["marfeel.mgr.consensu.org", "*.marfeel.mgr.consensu.org"] }, { name: "Mediavine CMP", homepage: "https://www.mediavine.com/", category: "consent-provider", domains: ["mediavine.mgr.consensu.org", "*.mediavine.mgr.consensu.org"] }, { name: "ConsentServe CMP", homepage: "https://www.consentserve.com/", category: "consent-provider", domains: ["consentserve.mgr.consensu.org", "*.consentserve.mgr.consensu.org"] }, { name: "Next14 CMP", homepage: "https://www.next14.com/", category: "consent-provider", domains: ["next14.mgr.consensu.org", "*.next14.mgr.consensu.org"] }, { name: "AdRoll CMP", homepage: "https://www.adroll.com/", category: "consent-provider", domains: ["adroll.mgr.consensu.org", "*.adroll.mgr.consensu.org"] }, { name: "Ogury CMP", homepage: "https://www.ogury.com/", category: "consent-provider", domains: ["ogury.mgr.consensu.org", "*.ogury.mgr.consensu.org"] }, { name: "OneTag CMP", homepage: "https://onetag.net", category: "consent-provider", domains: ["onetag.mgr.consensu.org", "*.onetag.mgr.consensu.org"] }, { name: "OneTrust CMP", homepage: "https://onetrust.com", category: "consent-provider", domains: ["onetrust.mgr.consensu.org", "*.onetrust.mgr.consensu.org"] }, { name: "optAd360 CMP", homepage: "https://www.optad360.com/", category: "consent-provider", domains: ["optad360.mgr.consensu.org", "*.optad360.mgr.consensu.org"] }, { name: "Osano CMP", homepage: "https://www.osano.com", category: "consent-provider", domains: ["osano.mgr.consensu.org", "*.osano.mgr.consensu.org", "cmp.osano.com", "*.api.osano.com"] }, { name: "Playwire CMP", homepage: "https://www.playwire.com", category: "consent-provider", domains: ["playwire.mgr.consensu.org", "*.playwire.mgr.consensu.org"] }, { name: "Pulselive CMP", homepage: "https://www.pulselive.com", category: "consent-provider", domains: ["pulselive.mgr.consensu.org", "*.pulselive.mgr.consensu.org"] }, { name: "Quantcast Choice", homepage: "https://quantcast.com", category: "consent-provider", domains: ["quantcast.mgr.consensu.org", "*.quantcast.mgr.consensu.org"] }, { name: "RCS Pubblicita CMP", homepage: "http://www.rcspubblicita.it/site/home.html", category: "consent-provider", domains: ["rcsmediagroup.mgr.consensu.org", "*.rcsmediagroup.mgr.consensu.org"] }, { name: "Rich Audience CMP", homepage: "https://richaudience.com", category: "consent-provider", domains: ["richaudience.mgr.consensu.org", "*.richaudience.mgr.consensu.org"] }, { name: "Ringier Axel Springer CMP", homepage: "https://www.ringieraxelspringer.pl/en/home/", category: "consent-provider", domains: ["rasp.mgr.consensu.org", "*.rasp.mgr.consensu.org"] }, { name: "Secure Privacy CMP", homepage: "https://secureprivacy.ai/", category: "consent-provider", domains: ["secureprivacy.mgr.consensu.org", "*.secureprivacy.mgr.consensu.org"] }, { name: "Securiti CMP", homepage: "https://securiti.ai/", category: "consent-provider", domains: ["securiti.mgr.consensu.org", "*.securiti.mgr.consensu.org"] }, { name: "Seznam.cz CMP", homepage: "https://www.seznam.cz/", category: "consent-provider", domains: ["seznam.mgr.consensu.org", "*.seznam.mgr.consensu.org"] }, { name: "ShareThis CMP", homepage: "https://sharethis.com", category: "consent-provider", domains: ["sharethis.mgr.consensu.org", "*.sharethis.mgr.consensu.org"] }, { name: "ShinyStat CMP", homepage: "https://www.shinystat.com", category: "consent-provider", domains: ["shinystat.mgr.consensu.org", "*.shinystat.mgr.consensu.org"] }, { name: "Sibbo CMP", homepage: "https://sibboventures.com/en/", category: "consent-provider", domains: ["sibboventures.mgr.consensu.org", "*.sibboventures.mgr.consensu.org"] }, { name: "Singlespot CMP", homepage: "https://www.singlespot.com/en", category: "consent-provider", domains: ["singlespot.mgr.consensu.org", "*.singlespot.mgr.consensu.org"] }, { name: "Sirdata CMP", homepage: "https://www.sirdata.com", category: "consent-provider", domains: ["sddan.mgr.consensu.org", "*.sddan.mgr.consensu.org"] }, { name: "Snigel CMP", homepage: "https://snigel.com", category: "consent-provider", domains: ["snigelweb.mgr.consensu.org", "*.snigelweb.mgr.consensu.org"] }, { name: "Sourcepoint CMP", homepage: "https://sourcepoint.com", category: "consent-provider", domains: ["sourcepoint.mgr.consensu.org", "*.sourcepoint.mgr.consensu.org"] }, { name: "Pubtech CMP", homepage: "https://www.pubtech.ai/", category: "consent-provider", domains: ["pubtech.mgr.consensu.org", "*.pubtech.mgr.consensu.org"] }, { name: "AdMetrics Pro CMP", homepage: "https://admetricspro.com", category: "consent-provider", domains: ["cmp.mgr.consensu.org", "*.cmp.mgr.consensu.org"] }, { name: "Traffective CMP", homepage: "https://traffective.com", category: "consent-provider", domains: ["traffective.mgr.consensu.org", "*.traffective.mgr.consensu.org"] }, { name: "UniConsent CMP", homepage: "https://www.uniconsent.com", category: "consent-provider", domains: ["uniconsent.mgr.consensu.org", "*.uniconsent.mgr.consensu.org", "cmp.uniconsent.com", "*.uniconsent.com"] }, { name: "TrustArc CMP", homepage: "https://trustarc.com/", category: "consent-provider", domains: ["trustarc.mgr.consensu.org", "*.trustarc.mgr.consensu.org"] }, { name: "Usercentrics CMP", homepage: "https://usercentrics.com", category: "consent-provider", domains: ["usercentrics.mgr.consensu.org", "*.usercentrics.mgr.consensu.org", "*.usercentrics.eu", "*.services.usercentrics.eu"] }, { name: "WebAds CMP", homepage: "https://www.webads.nl/", category: "consent-provider", domains: ["webads.mgr.consensu.org", "*.webads.mgr.consensu.org"] }, { name: "Trustcommander", company: "Commandersact", homepage: "https://www.commandersact.com", category: "consent-provider", domains: ["*.trustcommander.net"] }, { name: "Hubvisor", homepage: "https://www.hubvisor.io", category: "ad", domains: ["*.hubvisor.io"] }, { name: "Castle", homepage: "https://castle.io", category: "utility", domains: ["*.castle.io", "d2t77mnxyo7adj.cloudfront.net"] }, { name: "Wigzo", homepage: "https://www.wigzo.com/", category: "marketing", domains: ["*.wigzo.com", "*.wigzopush.com"] }, { name: "Convertful", homepage: "https://convertful.com/", category: "marketing", domains: ["*.convertful.com"] }, { name: "OpenLink", company: "MediaWallah", homepage: "https://www.mediawallah.com/", category: "ad", domains: ["*.mediawallahscript.com"] }, { name: "TPMN", company: "TPMN", homepage: "http://tpmn.io/", category: "ad", domains: ["*.tpmn.co.kr"] }, { name: "HERO", company: "Klarna", homepage: "https://www.usehero.com/", category: "customer-success", domains: ["*.usehero.com"] }, { name: "Zync", company: "Zeta Global", homepage: "https://zetaglobal.com/", category: "marketing", domains: ["*.rezync.com"] }, { name: "AdFuel Video", company: "AdFuel", homepage: "https://goadfuel.com/", category: "ad", domains: ["*.videoplayerhub.com"] }, { name: "Prefix Box AI Search", company: "Prefix Box", homepage: "https://www.prefixbox.com/", category: "utility", domains: ["*.prefixbox.com"] }, { name: "SpeedSize Service Worker", company: "SpeedSize", homepage: "https://speedsize.com/", category: "utility", domains: ["di6367dava8ow.cloudfront.net", "d2d22nphq0yz8t.cloudfront.net"] }, { name: "Vonage Video API", company: "Vonage", homepage: "https://www.vonage.com/communications-apis/video/", category: "video", domains: ["*.opentok.com"] }, { name: "Checkout.com", company: "Checkout.com", homepage: "https://www.checkout.com", category: "utility", domains: ["*.checkout.com"] }, { name: "Noibu", company: "Noibu", homepage: "https://www.noibu.com", category: "utility", domains: ["*.noibu.com"] }, { name: "Clarity", company: "Microsoft", homepage: "https://clarity.microsoft.com/", category: "utility", domains: ["*.clarity.ms"] }, { name: "goinstore", company: "Emplifi", homepage: "https://goinstore.com/", category: "customer-success", domains: ["*.goinstore.com"] }, { name: "SegmentStream", company: "SegmentStream", homepage: "https://segmentstream.com/", category: "marketing", domains: ["*.segmentstream.com"] }, { name: "Amazon Associates", company: "Amazon", homepage: "https://affiliate-program.amazon.co.uk/", category: "marketing", domains: ["*.associates-amazon.com"] }, { name: "DotMetrics", company: "Ipsos", homepage: "https://www.dotmetrics.net/", category: "analytics", domains: ["*.dotmetrics.net"] }, { name: "Truffle Bid", company: "Truffle", homepage: "https://truffle.bid/", category: "ad", domains: ["*.truffle.bid"] }, { name: "Hybrid", company: "Hybrid", homepage: "https://hybrid.ai/", category: "ad", domains: ["*.hybrid.ai"] }, { name: "AdMan Media", company: "AdMan", homepage: "https://admanmedia.com/", category: "video", domains: ["*.admanmedia.com"] }, { name: "ID5 Identity Cloud", company: "ID5", homepage: "https://id5.io/", category: "ad", domains: ["id5-sync.com", "*.id5-sync.com"] }, { name: "Audience Rate", company: "Audience Rate Limited", homepage: "https://www.audiencerate.com/", category: "ad", domains: ["*.audrte.com"] }, { name: "Seedtag", company: "Seedtag Advertising", homepage: "https://www.seedtag.com/", category: "ad", domains: ["*.seedtag.com"] }, { name: "IVI", company: "IVI Technologies", homepage: "http://ivitechnologies.com/", category: "ad", domains: ["*.ivitrack.com"] }, { name: "Sportradar", company: "Sportradar", homepage: "https://www.sportradar.com/", category: "ad", domains: ["*.sportradarserving.com"] }, { name: "ZEOTAP", company: "ZEOTAP", homepage: "https://zeotap.com/", category: "ad", domains: ["*.zeotap.com"] }, { name: "Web Content Assessor", company: "TMT Digital", homepage: "https://mediatrust.com/", category: "ad", domains: ["*.webcontentassessor.com"] }, { name: "Genie", company: "Media Force", homepage: "https://hellogenie.com/", category: "ad", domains: ["*.mfadsrvr.com"] }, { name: "mediarithmics", company: "mediarithmics", homepage: "https://www.mediarithmics.com/", category: "ad", domains: ["*.mediarithmics.com"] }, { name: "Ozone Project", company: "The Ozone Project", homepage: "https://www.ozoneproject.com/", category: "ad", domains: ["*.the-ozone-project.com"] }, { name: "FiftyAurora", company: "Fifty", homepage: "https://fifty.io/", category: "ad", domains: ["*.fiftyt.com"] }, { name: "smadex", company: "entravision", homepage: "https://smadex.com/", category: "ad", domains: ["*.smadex.com"] }, { name: "AWX", company: "Trinity Mirror", category: "ad", domains: ["*.tm-awx.com"] }, { name: "XPO", company: "Knorex", category: "ad", homepage: "https://www.knorex.com/", domains: ["*.brand-display.com"] }, { name: "Viafoura", company: "Viafoura", category: "ad", homepage: "https://viafoura.com/", domains: ["*.viafoura.co", "*.viafoura.net"] }, { name: "Adnami", company: "Adnami", category: "ad", homepage: "https://www.adnami.io/", domains: ["*.adnami.io"] }, { name: "LiveRamp Privacy Manager", company: "LiveRamp", category: "ad", homepage: "https://liveramp.com/privacy-legal-compliance/", domains: ["*.privacymanager.io"] }, { name: "Onfocus", company: "Onfocus SAS", category: "ad", domains: ["*.4dex.io"] }, { name: "viewTag", company: "Advanced Store", category: "ad", domains: ["*.ad4m.at"] }, { name: "MRP Prelytics", company: "Market Resource Partners", category: "ad", homepage: "https://www.mrpfd.com/", domains: ["*.mrpdata.net"] }, { name: "iPROM", company: "iPROM", category: "ad", homepage: "https://iprom.eu/", domains: ["*.iprom.net"] }, { name: "Plausible", company: "Plausible", homepage: "https://plausible.io/", category: "analytics", domains: ["*.plausible.io"] }, { name: "Micro Analytics", company: "Micro Analytics", homepage: "https://microanalytics.io/", category: "analytics", domains: ["padmin.microanalytics.io", "www.microanalytics.io", "dev.microanalytics.io", "status.microanalytics.io"] }, { name: "Scale8", company: "Scale8", homepage: "https://scale8.com/", category: "analytics", domains: ["www.scale8.com", "api-dev.scale8.com", "cdn.scale8.com", "ui.scale8.com"] }, { name: "Cabin", company: "Cabin", homepage: "https://withcabin.com/", category: "analytics", domains: ["*.withcabin.com"] }, { name: "Appcues", company: "Appcues", homepage: "https://www.appcues.com/", category: "analytics", domains: ["*.appcues.com"] }, { name: "Fathom Analytics", company: "Fathom", homepage: "https://usefathom.com/", category: "analytics", domains: ["*.usefathom.com"] }, { name: "Clearbit", company: "Clearbit", homepage: "https://clearbit.com/", category: "analytics", domains: ["*.clearbitjs.com", "*.clearbitscripts.com", "*.clearbit.com"] }, { name: "G2", company: "G2", homepage: "https://www.g2.com/", category: "utility", domains: ["*.g2.com", "*.g2crowd.com"] }, { name: "Navu", company: "Navu", homepage: "https://navu.co/", category: "ad", domains: ["*.navu.co"] }, { name: "InZynk", company: "InZynk", homepage: "https://inzynk.com/", category: "ad", domains: ["*.inzynk.com", "*.inzynk.io"] }, { name: "Integrate", company: "Integrate", homepage: "https://www.integrate.com/", category: "ad", domains: ["*.integrate.com", "*.listenloop.com"] }, { name: "Ad Lightning", company: "Boltive", homepage: "https://www.adlightning.com/", category: "ad", domains: ["*.adlightning.com"] }, { name: "GeoEdge", company: "GeoEdge", homepage: "https://www.geoedge.com/", category: "ad", domains: ["*.geoedge.com", "*.geoedge.be"] }, { name: "Doofinder", company: "Doofinder", homepage: "https://www.doofinder.com/", category: "utility", domains: ["cdn.doofinder.com"] }, { name: "Revlifter", company: "Revlifter", homepage: "https://www.revlifter.com/", category: "utility", domains: ["assets.revlifter.com"] }, { name: "Didomi", company: "Didomi", homepage: "https://www.didomi.io/", category: "consent-provider", domains: ["sdk.privacy-center.org", "api.privacy-center.org"] }, { name: "Pubperf Analytics", company: "Pubperf", homepage: "https://www.pubperf.com/", category: "analytics", domains: ["*.pubperf.com"] }];
  }
});

// node_modules/third-party-web/lib/subsets/nostats.js
var require_nostats = __commonJS({
  "node_modules/third-party-web/lib/subsets/nostats.js"(exports, module) {
    var { createAPIFromDataset } = require_create_entity_finder_api();
    var entities = require_entities_nostats();
    module.exports = createAPIFromDataset(entities);
  }
});

// node_modules/third-party-web/nostats-subset.js
var require_nostats_subset = __commonJS({
  "node_modules/third-party-web/nostats-subset.js"(exports, module) {
    module.exports = require_nostats();
  }
});

// node_modules/lighthouse/core/config/config.js
import path4 from "path";

// node_modules/lighthouse/core/runner.js
init_shim_fs();
import path2 from "path";

// node_modules/lighthouse/core/audits/audit.js
var DEFAULT_PASS = "defaultPass";
var METRIC_SAVINGS_PRECISION = {
  FCP: 50,
  LCP: 50,
  INP: 50,
  TBT: 50,
  CLS: 1e-3
};
var clampTo2Decimals = (val) => Math.round(val * 100) / 100;
var Audit = class _Audit {
  /**
   * @return {string}
   */
  static get DEFAULT_PASS() {
    return DEFAULT_PASS;
  }
  /**
   * @return {LH.Audit.ScoreDisplayModes}
   */
  static get SCORING_MODES() {
    return {
      NUMERIC: "numeric",
      METRIC_SAVINGS: "metricSavings",
      BINARY: "binary",
      MANUAL: "manual",
      INFORMATIVE: "informative",
      NOT_APPLICABLE: "notApplicable",
      ERROR: "error"
    };
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    throw new Error("Audit meta information must be overridden.");
  }
  /**
   * @return {Object}
   */
  static get defaultOptions() {
    return {};
  }
  /* eslint-disable no-unused-vars */
  /**
   *
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {LH.Audit.Product|Promise<LH.Audit.Product>}
   */
  static audit(artifacts, context) {
    throw new Error("audit() method must be overridden");
  }
  /* eslint-enable no-unused-vars */
  /**
   * Computes a score between 0 and 1 based on the measured `value`. Score is determined by
   * considering a log-normal distribution governed by two control points (the 10th
   * percentile value and the median value) and represents the percentage of sites that are
   * greater than `value`.
   *
   * Score characteristics:
   * - within [0, 1]
   * - rounded to two digits
   * - value must meet or beat a controlPoint value to meet or exceed its percentile score:
   *   - value > median will give a score < 0.5; value ≤ median will give a score ≥ 0.5.
   *   - value > p10 will give a score < 0.9; value ≤ p10 will give a score ≥ 0.9.
   * - values < p10 will get a slight boost so a score of 1 is achievable by a
   *   `value` other than those close to 0. Scores of > ~0.99524 end up rounded to 1.
   * @param {{median: number, p10: number}} controlPoints
   * @param {number} value
   * @return {number}
   */
  static computeLogNormalScore(controlPoints, value) {
    return Util.computeLogNormalScore(controlPoints, value);
  }
  /**
   * This catches typos in the `key` property of a heading definition of table/opportunity details.
   * Throws an error if any of keys referenced by headings don't exist in at least one of the items.
   *
   * @param {LH.Audit.Details.Table['headings']|LH.Audit.Details.Opportunity['headings']} headings
   * @param {LH.Audit.Details.Opportunity['items']|LH.Audit.Details.Table['items']} items
   */
  static assertHeadingKeysExist(headings, items) {
    if (!items.length) return;
    if (!isUnderTest) return;
    for (const heading of headings) {
      if (heading.key === null) continue;
      const key = heading.key;
      if (items.some((item) => key in item)) continue;
      throw new Error(`"${heading.key}" is missing from items`);
    }
  }
  /**
   * @param {LH.Audit.Details.Checklist['items']} items
   * @return {LH.Audit.Details.Checklist}
   */
  static makeChecklistDetails(items) {
    return {
      type: "checklist",
      items
    };
  }
  /**
   * @param {LH.Audit.Details.Table['headings']} headings
   * @param {LH.Audit.Details.Table['items']} results
   * @param {TableOptions=} options
   * @return {LH.Audit.Details.Table}
   */
  static makeTableDetails(headings, results, options = {}) {
    const { wastedBytes, wastedMs, sortedBy, skipSumming, isEntityGrouped } = options;
    const summary = wastedBytes || wastedMs ? { wastedBytes, wastedMs } : void 0;
    if (results.length === 0) {
      return {
        type: "table",
        headings,
        items: [],
        summary
      };
    }
    _Audit.assertHeadingKeysExist(headings, results);
    return {
      type: "table",
      headings,
      items: results,
      summary,
      sortedBy,
      skipSumming,
      isEntityGrouped
    };
  }
  /**
   * @param {LH.Audit.Details.List['items']} items
   * @return {LH.Audit.Details.List}
   */
  static makeListDetails(items) {
    return {
      type: "list",
      items
    };
  }
  /**
   * @param {LH.IcuMessage | string=} title
   * @param {LH.IcuMessage | string=} description
   * @param {LH.Audit.Details.ListableDetail} value
   * @return {LH.Audit.Details.ListSectionItem}
   */
  static makeListDetailSectionItem(value, title, description) {
    return {
      type: "list-section",
      title,
      description,
      value
    };
  }
  /** @typedef {{
   * content: string;
   * title: string;
   * lineMessages: LH.Audit.Details.SnippetValue['lineMessages'];
   * generalMessages: LH.Audit.Details.SnippetValue['generalMessages'];
   * node?: LH.Audit.Details.NodeValue;
   * maxLineLength?: number;
   * maxLinesAroundMessage?: number;
   * }} SnippetInfo */
  /**
   * @param {SnippetInfo} snippetInfo
   * @return {LH.Audit.Details.SnippetValue}
   */
  static makeSnippetDetails({
    content,
    title,
    lineMessages,
    generalMessages,
    node,
    maxLineLength = 200,
    maxLinesAroundMessage = 20
  }) {
    const allLines = _Audit._makeSnippetLinesArray(content, maxLineLength);
    const lines = Util.filterRelevantLines(allLines, lineMessages, maxLinesAroundMessage);
    return {
      type: "snippet",
      lines,
      title,
      lineMessages,
      generalMessages,
      lineCount: allLines.length,
      node
    };
  }
  /**
   * @param {string} content
   * @param {number} maxLineLength
   * @return {LH.Audit.Details.SnippetValue['lines']}
   */
  static _makeSnippetLinesArray(content, maxLineLength) {
    return content.split("\n").map((line, lineIndex) => {
      const lineNumber = lineIndex + 1;
      const lineDetail = {
        content: Util.truncate(line, maxLineLength),
        lineNumber
      };
      if (line.length > maxLineLength) {
        lineDetail.truncated = true;
      }
      return lineDetail;
    });
  }
  /**
   * @param {LH.Audit.Details.Opportunity['headings']} headings
   * @param {LH.Audit.Details.Opportunity['items']} items
   * @param {OpportunityOptions} options
   * @return {LH.Audit.Details.Opportunity}
   */
  static makeOpportunityDetails(headings, items, options) {
    _Audit.assertHeadingKeysExist(headings, items);
    const { overallSavingsMs, overallSavingsBytes, sortedBy, skipSumming, isEntityGrouped } = options;
    return {
      type: "opportunity",
      headings: items.length === 0 ? [] : headings,
      items,
      overallSavingsMs,
      overallSavingsBytes,
      sortedBy,
      skipSumming,
      isEntityGrouped
    };
  }
  /**
   * @param {LH.Artifacts.NodeDetails} node
   * @return {LH.Audit.Details.NodeValue}
   */
  static makeNodeItem(node) {
    return {
      type: "node",
      lhId: node.lhId,
      path: node.devtoolsNodePath,
      selector: node.selector,
      boundingRect: node.boundingRect,
      snippet: node.snippet,
      nodeLabel: node.nodeLabel
    };
  }
  /**
   * @param {LH.Artifacts.Bundle} bundle
   * @param {number} generatedLine
   * @param {number} generatedColumn
   * @return {LH.Audit.Details.SourceLocationValue['original']}
   */
  static _findOriginalLocation(bundle, generatedLine, generatedColumn) {
    const entry = bundle?.map.findEntry(generatedLine, generatedColumn);
    if (!entry) return;
    return {
      file: entry.sourceURL || "",
      line: entry.sourceLineNumber || 0,
      column: entry.sourceColumnNumber || 0
    };
  }
  /**
   * @param {string} url
   * @param {number} line 0-indexed
   * @param {number} column 0-indexed
   * @param {LH.Artifacts.Bundle=} bundle
   * @return {LH.Audit.Details.SourceLocationValue}
   */
  static makeSourceLocation(url2, line, column, bundle) {
    return {
      type: "source-location",
      url: url2,
      urlProvider: "network",
      line,
      column,
      original: bundle && this._findOriginalLocation(bundle, line, column)
    };
  }
  /**
   * @param {LH.Artifacts.ConsoleMessage} entry
   * @param {LH.Artifacts.Bundle=} bundle
   * @return {LH.Audit.Details.SourceLocationValue | undefined}
   */
  static makeSourceLocationFromConsoleMessage(entry, bundle) {
    if (!entry.url) return;
    const line = entry.lineNumber || 0;
    const column = entry.columnNumber || 0;
    return this.makeSourceLocation(entry.url, line, column, bundle);
  }
  /**
   * @param {number|null} score
   * @param {LH.Audit.ScoreDisplayMode} scoreDisplayMode
   * @param {string} auditId
   * @return {number|null}
   */
  static _normalizeAuditScore(score, scoreDisplayMode, auditId) {
    if (scoreDisplayMode === _Audit.SCORING_MODES.INFORMATIVE) {
      return 1;
    }
    if (scoreDisplayMode !== _Audit.SCORING_MODES.BINARY && scoreDisplayMode !== _Audit.SCORING_MODES.NUMERIC && scoreDisplayMode !== _Audit.SCORING_MODES.METRIC_SAVINGS) {
      return null;
    }
    if (score === null || !Number.isFinite(score)) {
      throw new Error(`Invalid score for ${auditId}: ${score}`);
    }
    if (score > 1) throw new Error(`Audit score for ${auditId} is > 1`);
    if (score < 0) throw new Error(`Audit score for ${auditId} is < 0`);
    score = clampTo2Decimals(score);
    return score;
  }
  /**
   * @param {LH.Audit.ProductMetricSavings|undefined} metricSavings
   * @return {LH.Audit.ProductMetricSavings|undefined}
   */
  static _quantizeMetricSavings(metricSavings) {
    if (!metricSavings) return;
    const normalizedMetricSavings = { ...metricSavings };
    for (
      const key of
      /** @type {Array<keyof LH.Audit.ProductMetricSavings>} */
      Object.keys(metricSavings)
    ) {
      let value = metricSavings[key];
      if (value === void 0) continue;
      value = Math.max(value, 0);
      const precision = METRIC_SAVINGS_PRECISION[key];
      if (precision !== void 0) {
        value = Math.round(value / precision) * precision;
      }
      normalizedMetricSavings[key] = value;
    }
    return normalizedMetricSavings;
  }
  /**
   * @param {typeof Audit} audit
   * @param {string | LH.IcuMessage} errorMessage
   * @param {string=} errorStack
   * @return {LH.RawIcu<LH.Audit.Result>}
   */
  static generateErrorAuditResult(audit, errorMessage, errorStack) {
    return _Audit.generateAuditResult(audit, {
      score: null,
      errorMessage,
      errorStack
    });
  }
  /**
   * @param {typeof Audit} audit
   * @param {LH.Audit.Product} product
   * @return {LH.RawIcu<LH.Audit.Result>}
   */
  static generateAuditResult(audit, product) {
    if (product.score === void 0) {
      throw new Error("generateAuditResult requires a score");
    }
    let scoreDisplayMode = audit.meta.scoreDisplayMode || _Audit.SCORING_MODES.BINARY;
    let score = product.score;
    if (product.errorMessage !== void 0) {
      scoreDisplayMode = _Audit.SCORING_MODES.ERROR;
    } else if (product.notApplicable) {
      scoreDisplayMode = _Audit.SCORING_MODES.NOT_APPLICABLE;
    } else if (product.scoreDisplayMode) {
      scoreDisplayMode = product.scoreDisplayMode;
    }
    const metricSavings = _Audit._quantizeMetricSavings(product.metricSavings);
    const hasSomeSavings = Object.values(metricSavings || {}).some((v) => v);
    if (scoreDisplayMode === _Audit.SCORING_MODES.METRIC_SAVINGS) {
      if (score && score >= Util.PASS_THRESHOLD) {
        score = 1;
      } else if (hasSomeSavings) {
        score = 0;
      } else {
        score = 0.5;
      }
    }
    score = _Audit._normalizeAuditScore(score, scoreDisplayMode, audit.meta.id);
    let auditTitle = audit.meta.title;
    if (audit.meta.failureTitle) {
      if (score !== null && score < Util.PASS_THRESHOLD) {
        auditTitle = audit.meta.failureTitle;
      }
    }
    const numericProduct = "numericUnit" in product ? product : void 0;
    return {
      id: audit.meta.id,
      title: auditTitle,
      description: audit.meta.description,
      score,
      scoreDisplayMode,
      numericValue: numericProduct?.numericValue,
      numericUnit: numericProduct?.numericUnit,
      displayValue: product.displayValue,
      explanation: product.explanation,
      errorMessage: product.errorMessage,
      errorStack: product.errorStack,
      warnings: product.warnings,
      scoringOptions: product.scoringOptions,
      metricSavings,
      details: product.details,
      guidanceLevel: audit.meta.guidanceLevel,
      replacesAudits: audit.meta.replacesAudits
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @returns {LH.Artifacts.MetricComputationDataInput}
   */
  static makeMetricComputationDataInput(artifacts, context) {
    const trace = artifacts.Trace ?? artifacts.traces[_Audit.DEFAULT_PASS];
    const devtoolsLog = artifacts.DevtoolsLog ?? artifacts.devtoolsLogs[_Audit.DEFAULT_PASS];
    const gatherContext = artifacts.GatherContext;
    const { URL: URL2, SourceMaps } = artifacts;
    return { trace, devtoolsLog, gatherContext, settings: context.settings, URL: URL2, SourceMaps, simulator: null };
  }
};

// node_modules/lighthouse/core/scoring.js
var clampTo2Decimals2 = (val) => Math.round(val * 100) / 100;
var ReportScoring = class _ReportScoring {
  /**
   * Computes the weighted-average of the score of the list of items.
   * @param {Array<{score: number|null, weight: number}>} items
   * @return {number|null}
   */
  static arithmeticMean(items) {
    items = items.filter((item) => item.weight > 0);
    if (items.some((item) => item.score === null)) return null;
    const results = items.reduce(
      (result, item) => {
        const score = item.score;
        const weight = item.weight;
        return {
          weight: result.weight + weight,
          sum: result.sum + /** @type {number} */
          score * weight
        };
      },
      { weight: 0, sum: 0 }
    );
    return clampTo2Decimals2(results.sum / results.weight || 0);
  }
  /**
   * Returns the report JSON object with computed scores.
   * @param {Object<string, LH.Config.Category>} configCategories
   * @param {Object<string, LH.RawIcu<LH.Audit.Result>>} resultsByAuditId
   * @return {Object<string, LH.RawIcu<LH.Result.Category>>}
   */
  static scoreAllCategories(configCategories, resultsByAuditId) {
    const scoredCategories = {};
    for (const [categoryId, configCategory] of Object.entries(configCategories)) {
      const auditRefs = configCategory.auditRefs.map((configMember) => {
        const member = { ...configMember };
        const result = resultsByAuditId[member.id];
        if (result.scoreDisplayMode === Audit.SCORING_MODES.NOT_APPLICABLE || result.scoreDisplayMode === Audit.SCORING_MODES.INFORMATIVE || result.scoreDisplayMode === Audit.SCORING_MODES.MANUAL) {
          member.weight = 0;
        }
        return member;
      });
      const scores = auditRefs.map((auditRef) => ({
        score: resultsByAuditId[auditRef.id].score,
        weight: auditRef.weight
      }));
      const score = _ReportScoring.arithmeticMean(scores);
      scoredCategories[categoryId] = {
        ...configCategory,
        auditRefs,
        id: categoryId,
        score
      };
    }
    return scoredCategories;
  }
};

// node_modules/lighthouse/core/lib/stack-packs.js
var import_lighthouse_stack_packs = __toESM(require_lighthouse_stack_packs(), 1);
var stackPacksToInclude = [
  {
    packId: "gatsby",
    requiredStacks: ["js:gatsby"]
  },
  {
    packId: "wordpress",
    requiredStacks: ["js:wordpress"]
  },
  {
    packId: "wix",
    requiredStacks: ["js:wix"]
  },
  {
    packId: "wp-rocket",
    requiredStacks: ["js:wp-rocket"]
  },
  {
    packId: "ezoic",
    requiredStacks: ["js:ezoic"]
  },
  {
    packId: "drupal",
    requiredStacks: ["js:drupal"]
  },
  {
    packId: "nitropack",
    requiredStacks: ["js:nitropack"]
  },
  {
    packId: "amp",
    requiredStacks: ["js:amp"]
  },
  {
    packId: "magento",
    requiredStacks: ["js:magento"]
  },
  {
    packId: "octobercms",
    requiredStacks: ["js:octobercms"]
  },
  {
    packId: "joomla",
    requiredStacks: ["js:joomla"]
  },
  {
    packId: "next.js",
    requiredStacks: ["js:next"]
  },
  {
    packId: "nuxt",
    requiredStacks: ["js:nuxt"]
  },
  {
    packId: "angular",
    requiredStacks: ["js:angular"]
  },
  {
    packId: "react",
    requiredStacks: ["js:react"]
  }
];
function getStackPacks(pageStacks) {
  if (!pageStacks) return [];
  const packs = [];
  for (const pageStack of pageStacks) {
    const stackPackToIncl = stackPacksToInclude.find((stackPackToIncl2) => stackPackToIncl2.requiredStacks.includes(`${pageStack.detector}:${pageStack.id}`));
    if (!stackPackToIncl) {
      continue;
    }
    const matchedPack = import_lighthouse_stack_packs.default.find((pack) => pack.id === stackPackToIncl.packId);
    if (!matchedPack) {
      lighthouse_logger_default.warn(
        "StackPacks",
        `'${stackPackToIncl.packId}' stack pack was matched but is not found in stack-packs lib`
      );
      continue;
    }
    const str_2 = createIcuMessageFn(
      `node_modules/lighthouse-stack-packs/packs/${matchedPack.id}.js`,
      matchedPack.UIStrings
    );
    const descriptions = {};
    const UIStrings2 = matchedPack.UIStrings;
    for (const key in UIStrings2) {
      if (UIStrings2[key]) {
        descriptions[key] = str_2(UIStrings2[key]);
      }
    }
    packs.push({
      id: matchedPack.id,
      title: matchedPack.title,
      iconDataURL: matchedPack.icon,
      descriptions
    });
  }
  return packs.sort((a, b) => {
    const aVal = stackPacksToInclude.findIndex((p) => p.packId === a.id);
    const bVal = stackPacksToInclude.findIndex((p) => p.packId === b.id);
    return aVal - bVal;
  });
}

// node_modules/lighthouse/core/lib/asset-saver.js
init_shim_fs();
import path from "path";
import stream from "stream";
import { createGzip, gunzipSync } from "zlib";

// node_modules/lighthouse/core/computed/network-analysis.js
var NetworkAnalysis = class {
  /**
   * @param {LH.DevtoolsLog} devtoolsLog
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.NetworkAnalysis>}
   */
  static async compute_(devtoolsLog, context) {
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    const analysis = core_exports.NetworkAnalyzer.analyze(records);
    if (!analysis) {
      lighthouse_logger_default.error("NetworkAnalysis", "Network analysis failed due to lack of transfer data");
      return {
        throughput: 0,
        rtt: Number.POSITIVE_INFINITY,
        additionalRttByOrigin: /* @__PURE__ */ new Map(),
        serverResponseTimeByOrigin: /* @__PURE__ */ new Map()
      };
    }
    return analysis;
  }
};
var NetworkAnalysisComputed = makeComputedArtifact(NetworkAnalysis, null);

// node_modules/lighthouse/core/computed/load-simulator.js
var LoadSimulator = class {
  /**
   * @param {{devtoolsLog: LH.DevtoolsLog, settings: LH.Audit.Context['settings']}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Gatherer.Simulation.Simulator>}
   */
  static async compute_(data, context) {
    const networkAnalysis = await NetworkAnalysisComputed.request(data.devtoolsLog, context);
    return simulation_exports.Simulator.createSimulator({ ...data.settings, networkAnalysis });
  }
  /**
   * @param {LH.Artifacts.NetworkAnalysis} networkAnalysis
   * @return {LH.PrecomputedLanternData}
   */
  static convertAnalysisToSaveableLanternData(networkAnalysis) {
    const lanternData = { additionalRttByOrigin: {}, serverResponseTimeByOrigin: {} };
    for (const [origin, value] of networkAnalysis.additionalRttByOrigin.entries()) {
      if (origin.startsWith("http")) lanternData.additionalRttByOrigin[origin] = value;
    }
    for (const [origin, value] of networkAnalysis.serverResponseTimeByOrigin.entries()) {
      if (origin.startsWith("http")) lanternData.serverResponseTimeByOrigin[origin] = value;
    }
    return lanternData;
  }
};
var LoadSimulatorComputed = makeComputedArtifact(LoadSimulator, ["devtoolsLog", "settings"]);

// node_modules/lighthouse/core/lib/asset-saver.js
var artifactsFilename = "artifacts.json";
var traceSuffix = ".trace.json";
var devtoolsLogSuffix = ".devtoolslog.json";
var defaultPrefix = "defaultPass";
var errorPrefix = "pageLoadError-defaultPass";
async function writeJson(contents, path5, gzip) {
  const writeStream = shim_fs_default.createWriteStream(gzip ? path5 + ".gz" : path5);
  if (gzip) {
    await stream.promises.pipeline(contents, createGzip(), writeStream);
  } else {
    await stream.promises.pipeline(contents, writeStream);
  }
}
function readJson(filename, reviver) {
  if (shim_fs_default.existsSync(filename + ".gz")) {
    filename = filename + ".gz";
  }
  if (!filename.endsWith(".json.gz")) {
    return JSON.parse(shim_fs_default.readFileSync(filename, "utf8"), reviver);
  }
  const buffer = gunzipSync(shim_fs_default.readFileSync(filename));
  return JSON.parse(buffer.toString("utf8"), reviver);
}
function endsWithSuffix(filename, suffix) {
  return filename.endsWith(suffix) || filename.endsWith(suffix + ".gz");
}
function loadArtifacts(basePath) {
  lighthouse_logger_default.log("Reading artifacts from disk:", basePath);
  if (!shim_fs_default.existsSync(basePath)) {
    throw new Error("No saved artifacts found at " + basePath);
  }
  const artifacts = readJson(path.join(basePath, artifactsFilename), LighthouseError.parseReviver);
  const filenames = shim_fs_default.readdirSync(basePath);
  filenames.filter((f) => endsWithSuffix(f, devtoolsLogSuffix)).forEach((filename) => {
    if (!artifacts.devtoolsLogs) artifacts.devtoolsLogs = {};
    const prefix = filename.replace(devtoolsLogSuffix + ".gz", "").replace(devtoolsLogSuffix, "");
    const devtoolsLog = readJson(path.join(basePath, filename));
    artifacts.devtoolsLogs[prefix] = devtoolsLog;
    if (prefix === defaultPrefix) {
      artifacts.DevtoolsLog = devtoolsLog;
    }
    if (prefix === errorPrefix) {
      artifacts.DevtoolsLogError = devtoolsLog;
    }
  });
  filenames.filter((f) => endsWithSuffix(f, traceSuffix)).forEach((filename) => {
    if (!artifacts.traces) artifacts.traces = {};
    const trace = readJson(path.join(basePath, filename));
    const prefix = filename.replace(traceSuffix + ".gz", "").replace(traceSuffix, "");
    artifacts.traces[prefix] = Array.isArray(trace) ? { traceEvents: trace } : trace;
    if (prefix === defaultPrefix) {
      artifacts.Trace = artifacts.traces[prefix];
    }
    if (prefix === errorPrefix) {
      artifacts.TraceError = artifacts.traces[prefix];
    }
  });
  if (Array.isArray(artifacts.Timing)) {
    artifacts.Timing.forEach((entry) => entry.gather = true);
  }
  return artifacts;
}
function stringifyReplacer(key, value) {
  if (value instanceof Error) {
    return LighthouseError.stringifyReplacer(value);
  }
  return value;
}
async function saveArtifacts(artifacts, basePath, options = {}) {
  const status = { msg: "Saving artifacts", id: "lh:assetSaver:saveArtifacts" };
  lighthouse_logger_default.time(status);
  shim_fs_default.mkdirSync(basePath, { recursive: true });
  const filenames = shim_fs_default.readdirSync(basePath);
  for (const filename of filenames) {
    const isPreviousFile = filename.endsWith(traceSuffix) || filename.endsWith(devtoolsLogSuffix) || filename.endsWith(traceSuffix + ".gz") || filename.endsWith(devtoolsLogSuffix + ".gz") || filename === artifactsFilename || filename === artifactsFilename + ".gz";
    if (isPreviousFile) {
      shim_fs_default.unlinkSync(`${basePath}/${filename}`);
    }
  }
  const {
    // eslint-disable-next-line no-unused-vars
    traces,
    // eslint-disable-next-line no-unused-vars
    devtoolsLogs,
    DevtoolsLog,
    Trace,
    DevtoolsLogError,
    TraceError,
    ...restArtifacts
  } = artifacts;
  if (Trace) {
    await saveTrace(Trace, `${basePath}/${defaultPrefix}${traceSuffix}`, options);
  }
  if (TraceError) {
    await saveTrace(TraceError, `${basePath}/${errorPrefix}${traceSuffix}`, options);
  }
  if (DevtoolsLog) {
    await saveDevtoolsLog(
      DevtoolsLog,
      `${basePath}/${defaultPrefix}${devtoolsLogSuffix}`,
      options
    );
  }
  if (DevtoolsLogError) {
    await saveDevtoolsLog(
      DevtoolsLogError,
      `${basePath}/${errorPrefix}${devtoolsLogSuffix}`,
      options
    );
  }
  const restArtifactsString = JSON.stringify(restArtifacts, stringifyReplacer, 2);
  await writeJson(function* () {
    yield restArtifactsString;
    yield "\n";
  }, `${basePath}/${artifactsFilename}`, !!options.gzip);
  lighthouse_logger_default.log("Artifacts saved to disk in folder:", basePath);
  lighthouse_logger_default.timeEnd(status);
}
function saveLhr(lhr, basePath) {
  shim_fs_default.writeFileSync(`${basePath}/lhr.report.json`, JSON.stringify(lhr, null, 2));
}
function* arrayOfObjectsJsonGenerator(arrayOfObjects) {
  const ITEMS_PER_ITERATION = 500;
  yield "[\n";
  if (arrayOfObjects.length > 0) {
    const itemsIterator = arrayOfObjects[Symbol.iterator]();
    const firstItem = itemsIterator.next().value;
    yield `  ${JSON.stringify(firstItem)}`;
    let itemsRemaining = ITEMS_PER_ITERATION;
    let itemsJSON = "";
    for (const item of itemsIterator) {
      itemsJSON += `,
  ${JSON.stringify(item)}`;
      itemsRemaining--;
      if (itemsRemaining === 0) {
        yield itemsJSON;
        itemsRemaining = ITEMS_PER_ITERATION;
        itemsJSON = "";
      }
    }
    yield itemsJSON;
  }
  yield "\n]";
}
function* traceJsonGenerator(traceData) {
  const { traceEvents, ...rest } = traceData;
  yield "{\n";
  yield '"traceEvents": ';
  yield* arrayOfObjectsJsonGenerator(traceEvents);
  for (const [key, value] of Object.entries(rest)) {
    yield `,
"${key}": ${JSON.stringify(value, null, 2)}`;
  }
  yield "}\n";
}
function saveTrace(traceData, traceFilename, options = {}) {
  const traceIter = traceJsonGenerator(traceData);
  return writeJson(traceIter, traceFilename, !!options.gzip);
}
function saveDevtoolsLog(devtoolsLog, devtoolLogFilename, options = {}) {
  return writeJson(function* () {
    yield* arrayOfObjectsJsonGenerator(devtoolsLog);
    yield "\n";
  }, devtoolLogFilename, !!options.gzip);
}

// node_modules/lighthouse/report/generator/report-assets.js
init_shim_fs();

// node_modules/lighthouse/report/generator/flow-report-assets.js
init_shim_fs();
var moduleDir = getModuleDirectory(import.meta);
var FLOW_REPORT_TEMPLATE = shim_fs_default.readFileSync(`${moduleDir}/../../flow-report/assets/standalone-flow-template.html`, "utf8");
var REGULAR_REPORT_CSS = shim_fs_default.readFileSync(moduleDir + "/../assets/styles.css", "utf8");
var FLOW_REPORT_CSS = shim_fs_default.readFileSync(`${moduleDir}/../../flow-report/assets/styles.css`, "utf8");
var FLOW_REPORT_JAVASCRIPT = shim_fs_default.readFileSync(`${moduleDir}/../../dist/report/flow.js`, "utf8");
var flowReportAssets = {
  FLOW_REPORT_TEMPLATE,
  FLOW_REPORT_CSS: [REGULAR_REPORT_CSS, FLOW_REPORT_CSS].join("\n"),
  FLOW_REPORT_JAVASCRIPT
};

// node_modules/lighthouse/report/generator/report-assets.js
var moduleDir2 = getModuleDirectory(import.meta);
var REPORT_TEMPLATE = shim_fs_default.readFileSync(
  moduleDir2 + "/../assets/standalone-template.html",
  "utf8"
);
var REPORT_JAVASCRIPT = shim_fs_default.readFileSync(moduleDir2 + "/../../dist/report/standalone.js", "utf8");
var reportAssets = {
  REPORT_TEMPLATE,
  REPORT_JAVASCRIPT,
  // Flow report assets are not needed for every bundle.
  // Replacing/ignoring flow-report-assets.js (e.g. `rollupPlugins.shim`) will
  // remove the flow assets from the bundle.
  ...flowReportAssets
};

// node_modules/lighthouse/report/generator/report-generator.js
var ReportGenerator = class _ReportGenerator {
  /**
   * Replaces all the specified strings in source without serial replacements.
   * @param {string} source
   * @param {!Array<{search: string, replacement: string}>} replacements
   * @return {string}
   */
  static replaceStrings(source, replacements) {
    if (replacements.length === 0) {
      return source;
    }
    const firstReplacement = replacements[0];
    const nextReplacements = replacements.slice(1);
    return source.split(firstReplacement.search).map((part) => _ReportGenerator.replaceStrings(part, nextReplacements)).join(firstReplacement.replacement);
  }
  /**
   * @param {unknown} object
   * @return {string}
   */
  static sanitizeJson(object) {
    return JSON.stringify(object).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  /**
   * Returns the standalone report HTML as a string with the report JSON and renderer JS inlined.
   * @param {LHResult} lhr
   * @return {string}
   */
  static generateReportHtml(lhr) {
    const sanitizedJson = _ReportGenerator.sanitizeJson(lhr);
    const sanitizedJavascript = reportAssets.REPORT_JAVASCRIPT.replace(/<\//g, "\\u003c/");
    return _ReportGenerator.replaceStrings(reportAssets.REPORT_TEMPLATE, [
      { search: "%%LIGHTHOUSE_JSON%%", replacement: sanitizedJson },
      { search: "%%LIGHTHOUSE_JAVASCRIPT%%", replacement: sanitizedJavascript }
    ]);
  }
  /**
   * Returns the standalone flow report HTML as a string with the report JSON and renderer JS inlined.
   * @param {FlowResult} flow
   * @return {string}
   */
  static generateFlowReportHtml(flow) {
    const sanitizedJson = _ReportGenerator.sanitizeJson(flow);
    const sanitizedJavascript = reportAssets.FLOW_REPORT_JAVASCRIPT.replace(/<\//g, "\\u003c/");
    return _ReportGenerator.replaceStrings(reportAssets.FLOW_REPORT_TEMPLATE, [
      { search: "%%LIGHTHOUSE_FLOW_JSON%%", replacement: sanitizedJson },
      { search: "%%LIGHTHOUSE_FLOW_JAVASCRIPT%%", replacement: sanitizedJavascript },
      { search: "/*%%LIGHTHOUSE_FLOW_CSS%%*/", replacement: reportAssets.FLOW_REPORT_CSS }
    ]);
  }
  /**
   * Converts the results to a CSV formatted string
   * Each row describes the result of 1 audit with
   *  - the name of the category the audit belongs to
   *  - the name of the audit
   *  - a description of the audit
   *  - the score type that is used for the audit
   *  - the score value of the audit
   *
   * @param {LHResult} lhr
   * @return {string}
   */
  static generateReportCSV(lhr) {
    const CRLF = "\r\n";
    const separator = ",";
    const escape = (value) => `"${value.replace(/"/g, '""')}"`;
    const rowFormatter = (row) => row.map((value) => {
      if (value === null) return "null";
      return value.toString();
    }).map(escape);
    const rows = [];
    const topLevelKeys = (
      /** @type {const} */
      ["requestedUrl", "finalDisplayedUrl", "fetchTime", "gatherMode"]
    );
    rows.push(rowFormatter(topLevelKeys));
    rows.push(rowFormatter(topLevelKeys.map((key) => lhr[key] ?? null)));
    rows.push([]);
    rows.push(["category", "score"]);
    for (const category of Object.values(lhr.categories)) {
      rows.push(rowFormatter([
        category.id,
        category.score
      ]));
    }
    rows.push([]);
    rows.push(["category", "audit", "score", "displayValue", "description"]);
    for (const category of Object.values(lhr.categories)) {
      for (const auditRef of category.auditRefs) {
        const audit = lhr.audits[auditRef.id];
        if (!audit) continue;
        rows.push(rowFormatter([
          category.id,
          auditRef.id,
          audit.score,
          audit.displayValue || "",
          audit.description
        ]));
      }
    }
    return rows.map((row) => row.join(separator)).join(CRLF);
  }
  /**
   * @param {LHResult|FlowResult} result
   * @return {result is FlowResult}
   */
  static isFlowResult(result) {
    return "steps" in result;
  }
  /**
   * Creates the results output in a format based on the `mode`.
   * @param {LHResult|FlowResult} result
   * @param {LHResult['configSettings']['output']} outputModes
   * @return {string|string[]}
   */
  static generateReport(result, outputModes) {
    const outputAsArray = Array.isArray(outputModes);
    if (typeof outputModes === "string") outputModes = [outputModes];
    const output = outputModes.map((outputMode) => {
      if (outputMode === "html") {
        if (_ReportGenerator.isFlowResult(result)) {
          return _ReportGenerator.generateFlowReportHtml(result);
        }
        return _ReportGenerator.generateReportHtml(result);
      }
      if (outputMode === "csv") {
        if (_ReportGenerator.isFlowResult(result)) {
          throw new Error("CSV output is not support for user flows");
        }
        return _ReportGenerator.generateReportCSV(result);
      }
      if (outputMode === "json") {
        return JSON.stringify(result, null, 2);
      }
      throw new Error("Invalid output mode: " + outputMode);
    });
    return outputAsArray ? output : output[0];
  }
};

// node_modules/lighthouse/core/lib/third-party-web.js
var import_nostats_subset = __toESM(require_nostats_subset(), 1);
var thirdPartyWeb = import_nostats_subset.default;
function provideThirdPartyWeb(providedThirdPartyWeb) {
  thirdPartyWeb = providedThirdPartyWeb;
}
function getEntity(url2) {
  return thirdPartyWeb.getEntity(url2);
}
function getProduct(url2) {
  return thirdPartyWeb.getProduct(url2);
}
function isThirdParty(url2, mainDocumentEntity) {
  const entity = getEntity(url2);
  if (!entity) return false;
  if (entity === mainDocumentEntity) return false;
  return true;
}
function isFirstParty(url2, mainDocumentEntity) {
  return !isThirdParty(url2, mainDocumentEntity);
}
var third_party_web_default = {
  provideThirdPartyWeb,
  getEntity,
  getProduct,
  isThirdParty,
  isFirstParty
};

// node_modules/lighthouse/core/computed/entity-classification.js
var EntityClassification = class _EntityClassification {
  /**
   * @param {EntityCache} entityCache
   * @param {string} url
   * @param {string=} extensionName
   * @return {LH.Artifacts.Entity}
   */
  static makeupChromeExtensionEntity_(entityCache, url2, extensionName) {
    const origin = Util.getChromeExtensionOrigin(url2);
    const host = new URL(origin).host;
    const name = extensionName || host;
    const cachedEntity = entityCache.get(origin);
    if (cachedEntity) return cachedEntity;
    const chromeExtensionEntity = {
      name,
      company: name,
      category: "Chrome Extension",
      homepage: "https://chromewebstore.google.com/detail/" + host,
      categories: [],
      domains: [],
      averageExecutionTime: 0,
      totalExecutionTime: 0,
      totalOccurrences: 0
    };
    entityCache.set(origin, chromeExtensionEntity);
    return chromeExtensionEntity;
  }
  /**
   * @param {EntityCache} entityCache
   * @param {string} url
   * @return {LH.Artifacts.Entity | undefined}
   */
  static _makeUpAnEntity(entityCache, url2) {
    if (!url_utils_default.isValid(url2)) return;
    const parsedUrl = Util.createOrReturnURL(url2);
    if (parsedUrl.protocol === "chrome-extension:") {
      return _EntityClassification.makeupChromeExtensionEntity_(entityCache, url2);
    }
    if (!parsedUrl.protocol.startsWith("http")) return;
    const rootDomain = url_utils_default.getRootDomain(url2);
    if (!rootDomain) return;
    if (entityCache.has(rootDomain)) return entityCache.get(rootDomain);
    const unrecognizedEntity = {
      name: rootDomain,
      company: rootDomain,
      category: "",
      categories: [],
      domains: [rootDomain],
      averageExecutionTime: 0,
      totalExecutionTime: 0,
      totalOccurrences: 0,
      isUnrecognized: true
    };
    entityCache.set(rootDomain, unrecognizedEntity);
    return unrecognizedEntity;
  }
  /**
   * Preload Chrome extensions found in the devtoolsLog into cache.
   * @param {EntityCache} entityCache
   * @param {LH.DevtoolsLog} devtoolsLog
   */
  static _preloadChromeExtensionsToCache(entityCache, devtoolsLog) {
    for (const entry of devtoolsLog.values()) {
      if (entry.method !== "Runtime.executionContextCreated") continue;
      const origin = entry.params.context.origin;
      if (!origin.startsWith("chrome-extension:")) continue;
      if (entityCache.has(origin)) continue;
      _EntityClassification.makeupChromeExtensionEntity_(
        entityCache,
        origin,
        entry.params.context.name
      );
    }
  }
  /**
   * @param {{URL: LH.Artifacts['URL'], devtoolsLog: LH.DevtoolsLog}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.EntityClassification>}
   */
  static async compute_(data, context) {
    const networkRecords = await NetworkRecordsComputed.request(data.devtoolsLog, context);
    const madeUpEntityCache = /* @__PURE__ */ new Map();
    const entityByUrl = /* @__PURE__ */ new Map();
    const urlsByEntity = /* @__PURE__ */ new Map();
    _EntityClassification._preloadChromeExtensionsToCache(madeUpEntityCache, data.devtoolsLog);
    for (const record of networkRecords) {
      const { url: url2 } = record;
      if (entityByUrl.has(url2)) continue;
      const entity = third_party_web_default.getEntity(url2) || _EntityClassification._makeUpAnEntity(madeUpEntityCache, url2);
      if (!entity) continue;
      const entityURLs = urlsByEntity.get(entity) || /* @__PURE__ */ new Set();
      entityURLs.add(url2);
      urlsByEntity.set(entity, entityURLs);
      entityByUrl.set(url2, entity);
    }
    const firstPartyUrl = data.URL.mainDocumentUrl || data.URL.finalDisplayedUrl;
    const firstParty = third_party_web_default.getEntity(firstPartyUrl) || _EntityClassification._makeUpAnEntity(madeUpEntityCache, firstPartyUrl);
    function isFirstParty2(url2) {
      const entityUrl = entityByUrl.get(url2);
      return entityUrl === firstParty;
    }
    return {
      entityByUrl,
      urlsByEntity,
      firstParty,
      isFirstParty: isFirstParty2
    };
  }
};
var EntityClassificationComputed = makeComputedArtifact(
  EntityClassification,
  ["URL", "devtoolsLog"]
);

// node_modules/lighthouse/core/runner.js
var moduleDir3 = getModuleDirectory(import.meta);
var Runner = class _Runner {
  /**
   * @param {LH.Artifacts} artifacts
   * @param {{resolvedConfig: LH.Config.ResolvedConfig, computedCache: Map<string, ArbitraryEqualityMap>}} options
   * @return {Promise<LH.RunnerResult|undefined>}
   */
  static async audit(artifacts, options) {
    const { resolvedConfig, computedCache } = options;
    const settings = resolvedConfig.settings;
    try {
      const runnerStatus = { msg: "Audit phase", id: "lh:runner:audit" };
      lighthouse_logger_default.time(runnerStatus, "verbose");
      const lighthouseRunWarnings = [];
      if (settings.gatherMode && !settings.auditMode) return;
      if (!resolvedConfig.audits) {
        throw new Error("No audits to evaluate.");
      }
      const auditResultsById = await _Runner._runAudits(
        settings,
        resolvedConfig.audits,
        artifacts,
        lighthouseRunWarnings,
        computedCache
      );
      const resultsStatus = { msg: "Generating results...", id: "lh:runner:generate" };
      lighthouse_logger_default.time(resultsStatus);
      if (artifacts.LighthouseRunWarnings) {
        lighthouseRunWarnings.push(...artifacts.LighthouseRunWarnings);
      }
      const axeVersion = artifacts.Accessibility?.version;
      const credits = {
        "axe-core": axeVersion
      };
      let categories = {};
      if (resolvedConfig.categories) {
        categories = ReportScoring.scoreAllCategories(resolvedConfig.categories, auditResultsById);
      }
      lighthouse_logger_default.timeEnd(resultsStatus);
      lighthouse_logger_default.timeEnd(runnerStatus);
      let fullPageScreenshot = artifacts.FullPageScreenshot;
      if (resolvedConfig.settings.disableFullPageScreenshot || fullPageScreenshot instanceof Error) {
        fullPageScreenshot = void 0;
      }
      const i18nLhr = {
        lighthouseVersion,
        requestedUrl: artifacts.URL.requestedUrl,
        mainDocumentUrl: artifacts.URL.mainDocumentUrl,
        finalDisplayedUrl: artifacts.URL.finalDisplayedUrl,
        finalUrl: artifacts.URL.mainDocumentUrl,
        fetchTime: artifacts.fetchTime,
        gatherMode: artifacts.GatherContext.gatherMode,
        runtimeError: _Runner.getArtifactRuntimeError(artifacts),
        runWarnings: lighthouseRunWarnings,
        userAgent: artifacts.HostUserAgent,
        environment: {
          networkUserAgent: artifacts.NetworkUserAgent,
          hostUserAgent: artifacts.HostUserAgent,
          benchmarkIndex: artifacts.BenchmarkIndex,
          credits
        },
        audits: auditResultsById,
        configSettings: settings,
        categories,
        categoryGroups: resolvedConfig.groups || void 0,
        stackPacks: getStackPacks(artifacts.Stacks),
        entities: await _Runner.getEntityClassification(artifacts, { computedCache }),
        fullPageScreenshot,
        timing: this._getTiming(artifacts),
        i18n: {
          rendererFormattedStrings: getRendererFormattedStrings(settings.locale),
          icuMessagePaths: {}
        }
      };
      i18nLhr.i18n.icuMessagePaths = replaceIcuMessages(i18nLhr, settings.locale);
      const lhr = (
        /** @type {LH.Result} */
        i18nLhr
      );
      if (settings.auditMode) {
        const path5 = _Runner._getDataSavePath(settings);
        saveLhr(lhr, path5);
      }
      const report = ReportGenerator.generateReport(lhr, settings.output);
      return { lhr, artifacts, report };
    } catch (err) {
      throw _Runner.createRunnerError(err, settings);
    }
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Artifacts.ComputedContext} context
   */
  static async getEntityClassification(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    if (!devtoolsLog) return;
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const entities = [];
    for (const [entity, entityUrls] of classifiedEntities.urlsByEntity) {
      const uniqueOrigins = /* @__PURE__ */ new Set();
      for (const url2 of entityUrls) {
        const origin = url_utils_default.getOrigin(url2);
        if (origin) uniqueOrigins.add(origin);
      }
      const shortEntity = {
        name: entity.name,
        homepage: entity.homepage,
        origins: [...uniqueOrigins]
      };
      if (entity === classifiedEntities.firstParty) shortEntity.isFirstParty = true;
      if (entity.isUnrecognized) shortEntity.isUnrecognized = true;
      if (entity.category) shortEntity.category = entity.category;
      entities.push(shortEntity);
    }
    return entities;
  }
  /**
   * User can run -G solo, -A solo, or -GA together
   * -G and -A will run partial lighthouse pipelines,
   * and -GA will run everything plus save artifacts and lhr to disk.
   *
   * @param {(runnerData: {resolvedConfig: LH.Config.ResolvedConfig}) => Promise<LH.Artifacts>} gatherFn
   * @param {{resolvedConfig: LH.Config.ResolvedConfig, computedCache: Map<string, ArbitraryEqualityMap>}} options
   * @return {Promise<LH.Artifacts>}
   */
  static async gather(gatherFn, options) {
    const settings = options.resolvedConfig.settings;
    try {
      const sentryContext = Sentry.getContext();
      Sentry.captureBreadcrumb({
        message: "Run started",
        category: "lifecycle",
        data: sentryContext
      });
      if (settings.auditMode && !settings.gatherMode) {
        const path5 = this._getDataSavePath(settings);
        return loadArtifacts(path5);
      }
      const runnerStatus = { msg: "Gather phase", id: "lh:runner:gather" };
      lighthouse_logger_default.time(runnerStatus, "verbose");
      const artifacts = await gatherFn({ resolvedConfig: options.resolvedConfig });
      lighthouse_logger_default.timeEnd(runnerStatus);
      artifacts.Timing = lighthouse_logger_default.takeTimeEntries();
      if (settings.gatherMode) {
        const path5 = this._getDataSavePath(settings);
        await saveArtifacts(artifacts, path5);
      }
      return artifacts;
    } catch (err) {
      throw _Runner.createRunnerError(err, settings);
    }
  }
  /**
   * @param {any} err
   * @param {LH.Config.Settings} settings
   */
  static createRunnerError(err, settings) {
    if (err.friendlyMessage) {
      err.friendlyMessage = getFormatted(err.friendlyMessage, settings.locale);
    }
    Sentry.captureException(err, { level: "fatal" });
    return err;
  }
  /**
   * This handles both the auditMode case where gatherer entries need to be merged in and
   * the gather/audit case where timingEntriesFromRunner contains all entries from this run,
   * including those also in timingEntriesFromArtifacts.
   * @param {LH.Artifacts} artifacts
   * @return {LH.Result.Timing}
   */
  static _getTiming(artifacts) {
    const timingEntriesFromArtifacts = artifacts.Timing || [];
    const timingEntriesFromRunner = lighthouse_logger_default.takeTimeEntries();
    const timingEntriesKeyValues = [
      ...timingEntriesFromArtifacts,
      ...timingEntriesFromRunner
    ].map((entry) => (
      /** @type {[string, PerformanceEntry]} */
      [
        // As entries can share a name and start time, dedupe based on the name, startTime and duration
        `${entry.startTime}-${entry.name}-${entry.duration}`,
        entry
      ]
    ));
    const timingEntries = Array.from(new Map(timingEntriesKeyValues).values()).map((entry) => {
      return {
        // Don't spread entry because browser PerformanceEntries can't be spread.
        // https://github.com/GoogleChrome/lighthouse/issues/8638
        startTime: parseFloat(entry.startTime.toFixed(2)),
        name: entry.name,
        duration: parseFloat(entry.duration.toFixed(2)),
        entryType: entry.entryType
      };
    }).sort((a, b) => a.startTime - b.startTime);
    const gatherEntry = timingEntries.find((e) => e.name === "lh:runner:gather");
    const auditEntry = timingEntries.find((e) => e.name === "lh:runner:audit");
    const gatherTiming = gatherEntry?.duration || 0;
    const auditTiming = auditEntry?.duration || 0;
    return { entries: timingEntries, total: gatherTiming + auditTiming };
  }
  /**
   * Run all audits with specified settings and artifacts.
   * @param {LH.Config.Settings} settings
   * @param {Array<LH.Config.AuditDefn>} audits
   * @param {LH.Artifacts} artifacts
   * @param {Array<string | LH.IcuMessage>} runWarnings
   * @param {Map<string, ArbitraryEqualityMap>} computedCache
   * @return {Promise<Record<string, LH.RawIcu<LH.Audit.Result>>>}
   */
  static async _runAudits(settings, audits, artifacts, runWarnings, computedCache) {
    const status = { msg: "Analyzing and running audits...", id: "lh:runner:auditing" };
    lighthouse_logger_default.time(status);
    if (artifacts.settings) {
      const overrides = {
        locale: void 0,
        gatherMode: void 0,
        auditMode: void 0,
        output: void 0,
        channel: void 0
      };
      const normalizedGatherSettings = Object.assign({}, artifacts.settings, overrides);
      const normalizedAuditSettings = Object.assign({}, settings, overrides);
      const keys = /* @__PURE__ */ new Set([
        ...Object.keys(normalizedGatherSettings),
        ...Object.keys(normalizedAuditSettings)
      ]);
      for (const k of keys) {
        if (!isEqual_default(normalizedGatherSettings[k], normalizedAuditSettings[k])) {
          throw new Error(
            `Cannot change settings between gathering and auditing\u2026
Difference found at: \`${k}\`: ${JSON.stringify(normalizedGatherSettings[k], null, 2)}
vs: ${JSON.stringify(normalizedAuditSettings[k], null, 2)}`
          );
        }
      }
      if (!isEqual_default(normalizedGatherSettings, normalizedAuditSettings)) {
        throw new Error("Cannot change settings between gathering and auditing");
      }
    }
    const sharedAuditContext = {
      settings,
      computedCache
    };
    const auditResultsById = {};
    for (const auditDefn of audits) {
      const auditId = auditDefn.implementation.meta.id;
      const auditResult = await _Runner._runAudit(
        auditDefn,
        artifacts,
        sharedAuditContext,
        runWarnings
      );
      auditResultsById[auditId] = auditResult;
    }
    lighthouse_logger_default.timeEnd(status);
    return auditResultsById;
  }
  /**
   * Checks that the audit's required artifacts exist and runs the audit if so.
   * Otherwise returns error audit result.
   * @param {LH.Config.AuditDefn} auditDefn
   * @param {LH.Artifacts} artifacts
   * @param {Pick<LH.Audit.Context, 'settings'|'computedCache'>} sharedAuditContext
   * @param {Array<string | LH.IcuMessage>} runWarnings
   * @return {Promise<LH.RawIcu<LH.Audit.Result>>}
   * @private
   */
  static async _runAudit(auditDefn, artifacts, sharedAuditContext, runWarnings) {
    const audit = auditDefn.implementation;
    const status = {
      msg: `Auditing: ${getFormatted(audit.meta.title, "en-US")}`,
      id: `lh:audit:${audit.meta.id}`
    };
    lighthouse_logger_default.time(status);
    let auditResult;
    try {
      if (artifacts.PageLoadError) throw artifacts.PageLoadError;
      for (const artifactName of audit.meta.requiredArtifacts) {
        const noArtifact = artifacts[artifactName] === void 0;
        const noRequiredTrace = artifactName === "traces" && !artifacts.traces?.[Audit.DEFAULT_PASS];
        const noRequiredDevtoolsLog = artifactName === "devtoolsLogs" && !artifacts.devtoolsLogs?.[Audit.DEFAULT_PASS];
        if (noArtifact || noRequiredTrace || noRequiredDevtoolsLog) {
          lighthouse_logger_default.warn(
            "Runner",
            `${artifactName} gatherer, required by audit ${audit.meta.id}, did not run.`
          );
          throw new LighthouseError(
            LighthouseError.errors.MISSING_REQUIRED_ARTIFACT,
            { artifactName }
          );
        }
        if (artifacts[artifactName] instanceof Error) {
          const artifactError = artifacts[artifactName];
          lighthouse_logger_default.warn("Runner", `${artifactName} gatherer, required by audit ${audit.meta.id}, encountered an error: ${artifactError.message}`);
          const error = new LighthouseError(
            LighthouseError.errors.ERRORED_REQUIRED_ARTIFACT,
            { artifactName, errorMessage: artifactError.message },
            { cause: artifactError }
          );
          error.expected = true;
          throw error;
        }
      }
      const auditOptions = Object.assign({}, audit.defaultOptions, auditDefn.options);
      const auditContext = {
        options: auditOptions,
        ...sharedAuditContext
      };
      const requestedArtifacts = audit.meta.requiredArtifacts.concat(audit.meta.__internalOptionalArtifacts || []);
      const narrowedArtifacts = requestedArtifacts.reduce(
        (narrowedArtifacts2, artifactName) => {
          const requestedArtifact = artifacts[artifactName];
          narrowedArtifacts2[artifactName] = requestedArtifact;
          return narrowedArtifacts2;
        },
        /** @type {LH.Artifacts} */
        {}
      );
      const product = await audit.audit(narrowedArtifacts, auditContext);
      runWarnings.push(...product.runWarnings || []);
      auditResult = Audit.generateAuditResult(audit, product);
    } catch (err) {
      if (err.code !== "MISSING_REQUIRED_ARTIFACT" && err.code !== "ERRORED_REQUIRED_ARTIFACT") {
        lighthouse_logger_default.warn(audit.meta.id, `Caught exception: ${err.message}`);
      }
      Sentry.captureException(err, { tags: { audit: audit.meta.id }, level: "error" });
      const errorMessage = err.friendlyMessage ? err.friendlyMessage : err.message;
      const stack = err.cause?.stack ?? err.stack;
      auditResult = Audit.generateErrorAuditResult(audit, errorMessage, stack);
    }
    lighthouse_logger_default.timeEnd(status);
    return auditResult;
  }
  /**
   * Searches a pass's artifacts for any `lhrRuntimeError` error artifacts.
   * Returns the first one found or `null` if none found.
   * @param {LH.Artifacts} artifacts
   * @return {LH.RawIcu<LH.Result['runtimeError']>|undefined}
   */
  static getArtifactRuntimeError(artifacts) {
    const possibleErrorArtifacts = [
      ["PageLoadError", artifacts.PageLoadError],
      // Preferentially use `PageLoadError`, if it exists.
      ...Object.entries(artifacts)
      // Otherwise check amongst all artifacts.
    ];
    for (const [artifactKey, possibleErrorArtifact] of possibleErrorArtifacts) {
      const isError = possibleErrorArtifact instanceof LighthouseError;
      if (isError && possibleErrorArtifact.lhrRuntimeError) {
        const errorMessage = possibleErrorArtifact.friendlyMessage || possibleErrorArtifact.message;
        const stack = (
          /** @type {any} */
          possibleErrorArtifact.cause?.stack ?? possibleErrorArtifact.stack
        );
        return {
          code: possibleErrorArtifact.code,
          message: errorMessage,
          errorStack: stack,
          artifactKey
        };
      }
    }
    return void 0;
  }
  /**
   * Returns list of audit names for external querying.
   * @return {Array<string>}
   */
  static getAuditList() {
    const ignoredFiles = [
      "audit.js",
      "violation-audit.js",
      "accessibility/axe-audit.js",
      "multi-check-audit.js",
      "byte-efficiency/byte-efficiency-audit.js",
      "manual/manual-audit.js",
      "insights/insight-audit.js"
    ];
    const fileList = [
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits")),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/dobetterweb")).map((f) => `dobetterweb/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/metrics")).map((f) => `metrics/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/seo")).map((f) => `seo/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/seo/manual")).map((f) => `seo/manual/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/accessibility")).map((f) => `accessibility/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/accessibility/manual")).map((f) => `accessibility/manual/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/byte-efficiency")).map((f) => `byte-efficiency/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/manual")).map((f) => `manual/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./audits/insights")).map((f) => `insights/${f}`)
    ];
    return fileList.filter((f) => {
      return /\.js$/.test(f) && !ignoredFiles.includes(f);
    }).sort();
  }
  /**
   * Returns list of gatherer names for external querying.
   * @return {Array<string>}
   */
  static getGathererList() {
    const fileList = [
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./gather/gatherers")),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./gather/gatherers/seo")).map((f) => `seo/${f}`),
      ...shim_fs_default.readdirSync(path2.join(moduleDir3, "./gather/gatherers/dobetterweb")).map((f) => `dobetterweb/${f}`)
    ];
    return fileList.filter((f) => /\.js$/.test(f) && f !== "gatherer.js").sort();
  }
  /**
   * Get path to use for -G and -A modes. Defaults to $CWD/latest-run
   * @param {LH.Config.Settings} settings
   * @return {string}
   */
  static _getDataSavePath(settings) {
    const { auditMode, gatherMode } = settings;
    if (typeof auditMode === "string") return path2.resolve(process.cwd(), auditMode);
    if (typeof gatherMode === "string") return path2.resolve(process.cwd(), gatherMode);
    return path2.join(process.cwd(), "latest-run");
  }
};

// node_modules/lighthouse/core/config/constants.js
var constants_exports = {};
__export(constants_exports, {
  defaultSettings: () => defaultSettings,
  nonSimulatedSettingsOverrides: () => nonSimulatedSettingsOverrides,
  screenEmulationMetrics: () => screenEmulationMetrics,
  throttling: () => throttling,
  userAgents: () => userAgents
});
var throttling = simulation_exports.Constants.throttling;
var MOTOGPOWER_EMULATION_METRICS = {
  mobile: true,
  width: 412,
  height: 823,
  // This value has some interesting ramifications for image-size-responsive, see:
  // https://github.com/GoogleChrome/lighthouse/issues/10741#issuecomment-626903508
  deviceScaleFactor: 1.75,
  disabled: false
};
var DESKTOP_EMULATION_METRICS = {
  mobile: false,
  width: 1350,
  height: 940,
  deviceScaleFactor: 1,
  disabled: false
};
var screenEmulationMetrics = {
  mobile: MOTOGPOWER_EMULATION_METRICS,
  desktop: DESKTOP_EMULATION_METRICS
};
var MOTOG4_USERAGENT = "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36";
var DESKTOP_USERAGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
var userAgents = {
  mobile: MOTOG4_USERAGENT,
  desktop: DESKTOP_USERAGENT
};
var defaultSettings = {
  output: "json",
  maxWaitForFcp: 30 * 1e3,
  maxWaitForLoad: 45 * 1e3,
  pauseAfterFcpMs: 1e3,
  pauseAfterLoadMs: 1e3,
  networkQuietThresholdMs: 1e3,
  cpuQuietThresholdMs: 1e3,
  formFactor: "mobile",
  throttling: throttling.mobileSlow4G,
  throttlingMethod: "simulate",
  screenEmulation: screenEmulationMetrics.mobile,
  emulatedUserAgent: userAgents.mobile,
  auditMode: false,
  gatherMode: false,
  clearStorageTypes: ["file_systems", "shader_cache", "service_workers", "cache_storage"],
  disableStorageReset: false,
  debugNavigation: false,
  channel: "node",
  usePassiveGathering: false,
  disableFullPageScreenshot: false,
  skipAboutBlank: false,
  blankPage: "about:blank",
  ignoreStatusCode: false,
  // the following settings have no defaults but we still want ensure that `key in settings`
  // in config will work in a typechecked way
  locale: "en-US",
  // actual default determined by Config using lib/i18n
  blockedUrlPatterns: null,
  additionalTraceCategories: null,
  extraHeaders: null,
  precomputedLanternData: null,
  onlyAudits: null,
  onlyCategories: null,
  skipAudits: null
};
var nonSimulatedSettingsOverrides = {
  pauseAfterFcpMs: 5250,
  pauseAfterLoadMs: 5250,
  networkQuietThresholdMs: 5250,
  cpuQuietThresholdMs: 5250
};

// node_modules/lighthouse/core/config/default-config.js
var UIStrings = {
  /** Title of the Performance category of audits. Equivalent to 'Web performance', this term is inclusive of all web page speed and loading optimization topics. Also used as a label of a score gauge; try to limit to 20 characters. */
  performanceCategoryTitle: "Performance",
  /** Title of the speed metrics section of the Performance category. Within this section are various speed metrics which quantify the pageload performance into values presented in seconds and milliseconds. */
  metricGroupTitle: "Metrics",
  /** Title of the insights section of the Performance category. Within this section are various insights to give developers tips on how to improve the performance of their page. */
  insightsGroupTitle: "Insights",
  /** Description of the insights section of the Performance category. Within this section are various insights to give developers tips on how to improve the performance of their page. */
  insightsGroupDescription: "These insights are also available in the Chrome DevTools Performance Panel - [record a trace](https://developer.chrome.com/docs/devtools/performance/reference) to view more detailed information.",
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupTitle: "First Paint Improvements",
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupDescription: "The most critical aspect of performance is how quickly pixels are rendered onscreen. Key metrics: First Contentful Paint, First Meaningful Paint",
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupTitle: "Overall Improvements",
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupDescription: "Enhance the overall loading experience, so the page is responsive and ready to use as soon as possible. Key metrics: Time to Interactive, Speed Index",
  /** Title of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on the page's page load performance characteristics. Whereas the 'Opportunities' suggest an action along with expected time savings, diagnostics do not. Within this section, the user may read the details and deduce additional actions they could take. */
  diagnosticsGroupTitle: "Diagnostics",
  /** Description of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on a web page's load performance characteristics. Within this section, the user may read the details and deduce additional actions they could take to improve performance. */
  diagnosticsGroupDescription: "More information about the performance of your application. These numbers don't [directly affect](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) the Performance score.",
  /** Title of the Accessibility category of audits. This section contains audits focused on making web content accessible to all users. Also used as a label of a score gauge; try to limit to 20 characters. */
  a11yCategoryTitle: "Accessibility",
  /** Description of the Accessibility category. This is displayed at the top of a list of audits focused on making web content accessible to all users. No character length limits. 'improve the accessibility of your web app' and 'manual testing' become link texts to additional documentation. */
  a11yCategoryDescription: "These checks highlight opportunities to [improve the accessibility of your web app](https://developer.chrome.com/docs/lighthouse/accessibility/). Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so [manual testing](https://web.dev/articles/how-to-review) is also encouraged.",
  /** Description of the Accessibility manual checks category. This description is displayed above a list of accessibility audits that currently have no automated test and so must be verified manually by the user. No character length limits. 'conducting an accessibility review' becomes link text to additional documentation. */
  a11yCategoryManualDescription: "These items address areas which an automated testing tool cannot cover. Learn more in our guide on [conducting an accessibility review](https://web.dev/articles/how-to-review).",
  /** Title of the best practices section of the Accessibility category. Within this section are audits with descriptive titles that highlight common accessibility best practices. */
  a11yBestPracticesGroupTitle: "Best practices",
  /** Description of the best practices section within the Accessibility category. Within this section are audits with descriptive titles that highlight common accessibility best practices. */
  a11yBestPracticesGroupDescription: "These items highlight common accessibility best practices.",
  /** Title of the color contrast section within the Accessibility category. Within this section are audits with descriptive titles that highlight the color and vision aspects of the page's accessibility that are passing or failing. */
  a11yColorContrastGroupTitle: "Contrast",
  /** Description of the color contrast section within the Accessibility category. Within this section are audits with descriptive titles that highlight the color and vision aspects of the page's accessibility that are passing or failing. */
  a11yColorContrastGroupDescription: "These are opportunities to improve the legibility of your content.",
  /** Title of the HTML element naming section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the non-textual HTML elements on the page have names discernible by a screen reader. */
  a11yNamesLabelsGroupTitle: "Names and labels",
  /** Description of the HTML element naming section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the non-textual HTML elements on the page have names discernible by a screen reader. */
  a11yNamesLabelsGroupDescription: "These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.",
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve keyboard navigation. */
  a11yNavigationGroupTitle: "Navigation",
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve keyboard navigation. */
  a11yNavigationGroupDescription: "These are opportunities to improve keyboard navigation in your application.",
  /** Title of the ARIA validity section within the Accessibility category. Within this section are audits with descriptive titles that highlight if whether all the aria-* HTML attributes have been used properly. */
  a11yAriaGroupTitle: "ARIA",
  /** Description of the ARIA validity section within the Accessibility category. Within this section are audits with descriptive titles that highlight if whether all the aria-* HTML attributes have been used properly. */
  a11yAriaGroupDescription: "These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.",
  /** Title of the language section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the language has been annotated in the correct HTML attributes on the page. */
  a11yLanguageGroupTitle: "Internationalization and localization",
  /** Description of the language section within the Accessibility category. Within this section are audits with descriptive titles that highlight if the language has been annotated in the correct HTML attributes on the page. */
  a11yLanguageGroupDescription: "These are opportunities to improve the interpretation of your content by users in different locales.",
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to provide alternative content for audio and video. */
  a11yAudioVideoGroupTitle: "Audio and video",
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to provide alternative content for audio and video. */
  a11yAudioVideoGroupDescription: "These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments.",
  /** Title of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve the experience of reading tabular or list data using assistive technology. */
  a11yTablesListsVideoGroupTitle: "Tables and lists",
  /** Description of the navigation section within the Accessibility category. Within this section are audits with descriptive titles that highlight opportunities to improve the experience of reading tabular or list data using assistive technology. */
  a11yTablesListsVideoGroupDescription: "These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.",
  /** Title of the Search Engine Optimization (SEO) category of audits. This is displayed at the top of a list of audits focused on topics related to optimizing a website for indexing by search engines. Also used as a label of a score gauge; try to limit to 20 characters. */
  seoCategoryTitle: "SEO",
  /** Description of the Search Engine Optimization (SEO) category. This is displayed at the top of a list of audits focused on optimizing a website for indexing by search engines. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  seoCategoryDescription: "These checks ensure that your page is following basic search engine optimization advice. There are many additional factors Lighthouse does not score here that may affect your search ranking, including performance on [Core Web Vitals](https://web.dev/explore/vitals). [Learn more about Google Search Essentials](https://support.google.com/webmasters/answer/35769).",
  /** Description of the Search Engine Optimization (SEO) manual checks category, the additional validators must be run by hand in order to check all SEO best practices. This is displayed at the top of a list of manually run audits focused on optimizing a website for indexing by search engines. No character length limits. */
  seoCategoryManualDescription: "Run these additional validators on your site to check additional SEO best practices.",
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight opportunities to make a page more usable on mobile devices. */
  seoMobileGroupTitle: "Mobile Friendly",
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight opportunities to make a page more usable on mobile devices. */
  seoMobileGroupDescription: "Make sure your pages are mobile friendly so users don\u2019t have to pinch or zoom in order to read the content pages. [Learn how to make pages mobile-friendly](https://developers.google.com/search/mobile-sites/).",
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website content more easily understood by search engine crawler bots. */
  seoContentGroupTitle: "Content Best Practices",
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website content more easily understood by search engine crawler bots. */
  seoContentGroupDescription: "Format your HTML in a way that enables crawlers to better understand your app\u2019s content.",
  /** Title of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website accessible to search engine crawlers. */
  seoCrawlingGroupTitle: "Crawling and Indexing",
  /** Description of the navigation section within the Search Engine Optimization (SEO) category. Within this section are audits with descriptive titles that highlight ways to make a website accessible to search engine crawlers. */
  seoCrawlingGroupDescription: "To appear in search results, crawlers need access to your app.",
  /** Title of the Best Practices category of audits. This is displayed at the top of a list of audits focused on topics related to following web development best practices and accepted guidelines. Also used as a label of a score gauge; try to limit to 20 characters. */
  bestPracticesCategoryTitle: "Best Practices",
  /** Title of the Trust & Safety group of audits. This is displayed at the top of a list of audits focused on maintaining user trust and protecting security in web development. */
  bestPracticesTrustSafetyGroupTitle: "Trust and Safety",
  /** Title of the User Experience group of the Best Practices category. Within this section are the audits related to the end user's experience of the webpage. */
  bestPracticesUXGroupTitle: "User Experience",
  /** Title of the Browser Compatibility group of the Best Practices category. Within this section are the audits related to whether the page is interpreted consistently by browsers. */
  bestPracticesBrowserCompatGroupTitle: "Browser Compatibility",
  /** Title of the General group of the Best Practices category. Within this section are the audits that don't belong to a specific group but are of general interest. */
  bestPracticesGeneralGroupTitle: "General"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var defaultConfig = {
  settings: defaultSettings,
  artifacts: [
    // Artifacts which can be depended on come first.
    { id: "DevtoolsLog", gatherer: "devtools-log" },
    { id: "Trace", gatherer: "trace" },
    { id: "Accessibility", gatherer: "accessibility" },
    { id: "AnchorElements", gatherer: "anchor-elements" },
    { id: "CacheContents", gatherer: "cache-contents" },
    { id: "ConsoleMessages", gatherer: "console-messages" },
    { id: "CSSUsage", gatherer: "css-usage" },
    { id: "Doctype", gatherer: "dobetterweb/doctype" },
    { id: "DOMStats", gatherer: "dobetterweb/domstats" },
    { id: "FontSize", gatherer: "seo/font-size" },
    { id: "Inputs", gatherer: "inputs" },
    { id: "IFrameElements", gatherer: "iframe-elements" },
    { id: "ImageElements", gatherer: "image-elements" },
    { id: "InspectorIssues", gatherer: "inspector-issues" },
    { id: "JsUsage", gatherer: "js-usage" },
    { id: "LinkElements", gatherer: "link-elements" },
    { id: "MainDocumentContent", gatherer: "main-document-content" },
    { id: "MetaElements", gatherer: "meta-elements" },
    { id: "NetworkUserAgent", gatherer: "network-user-agent" },
    { id: "OptimizedImages", gatherer: "dobetterweb/optimized-images" },
    { id: "ResponseCompression", gatherer: "dobetterweb/response-compression" },
    { id: "RobotsTxt", gatherer: "seo/robots-txt" },
    { id: "Scripts", gatherer: "scripts" },
    { id: "SourceMaps", gatherer: "source-maps" },
    { id: "Stacks", gatherer: "stacks" },
    { id: "Stylesheets", gatherer: "stylesheets" },
    { id: "TraceElements", gatherer: "trace-elements" },
    { id: "ViewportDimensions", gatherer: "viewport-dimensions" },
    // Artifact copies are renamed for compatibility with legacy artifacts.
    { id: "devtoolsLogs", gatherer: "devtools-log-compat" },
    { id: "traces", gatherer: "trace-compat" },
    // FullPageScreenshot comes at the end so all other node analysis is captured.
    { id: "FullPageScreenshot", gatherer: "full-page-screenshot" },
    // BFCacheFailures comes at the very end because it can perform a page navigation.
    { id: "BFCacheFailures", gatherer: "bf-cache-failures" }
  ],
  audits: [
    "is-on-https",
    "redirects-http",
    "viewport",
    "metrics/first-contentful-paint",
    "metrics/largest-contentful-paint",
    "metrics/first-meaningful-paint",
    "metrics/speed-index",
    "screenshot-thumbnails",
    "final-screenshot",
    "metrics/total-blocking-time",
    "metrics/max-potential-fid",
    "metrics/cumulative-layout-shift",
    "metrics/interaction-to-next-paint",
    "errors-in-console",
    "server-response-time",
    "metrics/interactive",
    "user-timings",
    "critical-request-chains",
    "redirects",
    "image-aspect-ratio",
    "image-size-responsive",
    "deprecations",
    "third-party-cookies",
    "mainthread-work-breakdown",
    "bootup-time",
    "uses-rel-preconnect",
    "font-display",
    "diagnostics",
    "network-requests",
    "network-rtt",
    "network-server-latency",
    "main-thread-tasks",
    "metrics",
    "resource-summary",
    "third-party-summary",
    "third-party-facades",
    "largest-contentful-paint-element",
    "lcp-lazy-loaded",
    "layout-shifts",
    "long-tasks",
    "non-composited-animations",
    "unsized-images",
    "valid-source-maps",
    "prioritize-lcp-image",
    "csp-xss",
    "has-hsts",
    "origin-isolation",
    "clickjacking-mitigation",
    "trusted-types-xss",
    "script-treemap-data",
    "accessibility/accesskeys",
    "accessibility/aria-allowed-attr",
    "accessibility/aria-allowed-role",
    "accessibility/aria-command-name",
    "accessibility/aria-conditional-attr",
    "accessibility/aria-deprecated-role",
    "accessibility/aria-dialog-name",
    "accessibility/aria-hidden-body",
    "accessibility/aria-hidden-focus",
    "accessibility/aria-input-field-name",
    "accessibility/aria-meter-name",
    "accessibility/aria-progressbar-name",
    "accessibility/aria-prohibited-attr",
    "accessibility/aria-required-attr",
    "accessibility/aria-required-children",
    "accessibility/aria-required-parent",
    "accessibility/aria-roles",
    "accessibility/aria-text",
    "accessibility/aria-toggle-field-name",
    "accessibility/aria-tooltip-name",
    "accessibility/aria-treeitem-name",
    "accessibility/aria-valid-attr-value",
    "accessibility/aria-valid-attr",
    "accessibility/button-name",
    "accessibility/bypass",
    "accessibility/color-contrast",
    "accessibility/definition-list",
    "accessibility/dlitem",
    "accessibility/document-title",
    "accessibility/duplicate-id-aria",
    "accessibility/empty-heading",
    "accessibility/form-field-multiple-labels",
    "accessibility/frame-title",
    "accessibility/heading-order",
    "accessibility/html-has-lang",
    "accessibility/html-lang-valid",
    "accessibility/html-xml-lang-mismatch",
    "accessibility/identical-links-same-purpose",
    "accessibility/image-alt",
    "accessibility/image-redundant-alt",
    "accessibility/input-button-name",
    "accessibility/input-image-alt",
    "accessibility/label-content-name-mismatch",
    "accessibility/label",
    "accessibility/landmark-one-main",
    "accessibility/link-name",
    "accessibility/link-in-text-block",
    "accessibility/list",
    "accessibility/listitem",
    "accessibility/meta-refresh",
    "accessibility/meta-viewport",
    "accessibility/object-alt",
    "accessibility/select-name",
    "accessibility/skip-link",
    "accessibility/tabindex",
    "accessibility/table-duplicate-name",
    "accessibility/table-fake-caption",
    "accessibility/target-size",
    "accessibility/td-has-header",
    "accessibility/td-headers-attr",
    "accessibility/th-has-data-cells",
    "accessibility/valid-lang",
    "accessibility/video-caption",
    "accessibility/manual/custom-controls-labels",
    "accessibility/manual/custom-controls-roles",
    "accessibility/manual/focus-traps",
    "accessibility/manual/focusable-controls",
    "accessibility/manual/interactive-element-affordance",
    "accessibility/manual/logical-tab-order",
    "accessibility/manual/managed-focus",
    "accessibility/manual/offscreen-content-hidden",
    "accessibility/manual/use-landmarks",
    "accessibility/manual/visual-order-follows-dom",
    "byte-efficiency/uses-long-cache-ttl",
    "byte-efficiency/total-byte-weight",
    "byte-efficiency/offscreen-images",
    "byte-efficiency/render-blocking-resources",
    "byte-efficiency/unminified-css",
    "byte-efficiency/unminified-javascript",
    "byte-efficiency/unused-css-rules",
    "byte-efficiency/unused-javascript",
    "byte-efficiency/modern-image-formats",
    "byte-efficiency/uses-optimized-images",
    "byte-efficiency/uses-text-compression",
    "byte-efficiency/uses-responsive-images",
    "byte-efficiency/efficient-animated-content",
    "byte-efficiency/duplicated-javascript",
    "byte-efficiency/legacy-javascript",
    "byte-efficiency/uses-responsive-images-snapshot",
    "dobetterweb/doctype",
    "dobetterweb/charset",
    "dobetterweb/dom-size",
    "dobetterweb/geolocation-on-start",
    "dobetterweb/inspector-issues",
    "dobetterweb/no-document-write",
    "dobetterweb/js-libraries",
    "dobetterweb/notification-on-start",
    "dobetterweb/paste-preventing-inputs",
    "dobetterweb/uses-http2",
    "dobetterweb/uses-passive-event-listeners",
    "seo/meta-description",
    "seo/http-status-code",
    "seo/font-size",
    "seo/link-text",
    "seo/crawlable-anchors",
    "seo/is-crawlable",
    "seo/robots-txt",
    "seo/hreflang",
    "seo/canonical",
    "seo/manual/structured-data",
    "work-during-interaction",
    "bf-cache",
    "insights/cache-insight",
    "insights/cls-culprits-insight",
    "insights/document-latency-insight",
    "insights/dom-size-insight",
    "insights/duplicated-javascript-insight",
    "insights/font-display-insight",
    "insights/forced-reflow-insight",
    "insights/image-delivery-insight",
    "insights/inp-breakdown-insight",
    "insights/lcp-breakdown-insight",
    "insights/lcp-discovery-insight",
    "insights/legacy-javascript-insight",
    "insights/modern-http-insight",
    "insights/network-dependency-tree-insight",
    "insights/render-blocking-insight",
    "insights/third-parties-insight",
    "insights/viewport-insight"
  ],
  groups: {
    "metrics": {
      title: str_(UIStrings.metricGroupTitle)
    },
    "insights": {
      title: str_(UIStrings.insightsGroupTitle),
      description: str_(UIStrings.insightsGroupDescription)
    },
    "diagnostics": {
      title: str_(UIStrings.diagnosticsGroupTitle),
      description: str_(UIStrings.diagnosticsGroupDescription)
    },
    "a11y-best-practices": {
      title: str_(UIStrings.a11yBestPracticesGroupTitle),
      description: str_(UIStrings.a11yBestPracticesGroupDescription)
    },
    "a11y-color-contrast": {
      title: str_(UIStrings.a11yColorContrastGroupTitle),
      description: str_(UIStrings.a11yColorContrastGroupDescription)
    },
    "a11y-names-labels": {
      title: str_(UIStrings.a11yNamesLabelsGroupTitle),
      description: str_(UIStrings.a11yNamesLabelsGroupDescription)
    },
    "a11y-navigation": {
      title: str_(UIStrings.a11yNavigationGroupTitle),
      description: str_(UIStrings.a11yNavigationGroupDescription)
    },
    "a11y-aria": {
      title: str_(UIStrings.a11yAriaGroupTitle),
      description: str_(UIStrings.a11yAriaGroupDescription)
    },
    "a11y-language": {
      title: str_(UIStrings.a11yLanguageGroupTitle),
      description: str_(UIStrings.a11yLanguageGroupDescription)
    },
    "a11y-audio-video": {
      title: str_(UIStrings.a11yAudioVideoGroupTitle),
      description: str_(UIStrings.a11yAudioVideoGroupDescription)
    },
    "a11y-tables-lists": {
      title: str_(UIStrings.a11yTablesListsVideoGroupTitle),
      description: str_(UIStrings.a11yTablesListsVideoGroupDescription)
    },
    "seo-mobile": {
      title: str_(UIStrings.seoMobileGroupTitle),
      description: str_(UIStrings.seoMobileGroupDescription)
    },
    "seo-content": {
      title: str_(UIStrings.seoContentGroupTitle),
      description: str_(UIStrings.seoContentGroupDescription)
    },
    "seo-crawl": {
      title: str_(UIStrings.seoCrawlingGroupTitle),
      description: str_(UIStrings.seoCrawlingGroupDescription)
    },
    "best-practices-trust-safety": {
      title: str_(UIStrings.bestPracticesTrustSafetyGroupTitle)
    },
    "best-practices-ux": {
      title: str_(UIStrings.bestPracticesUXGroupTitle)
    },
    "best-practices-browser-compat": {
      title: str_(UIStrings.bestPracticesBrowserCompatGroupTitle)
    },
    "best-practices-general": {
      title: str_(UIStrings.bestPracticesGeneralGroupTitle)
    },
    // Group for audits that should not be displayed.
    "hidden": { title: "" }
  },
  categories: {
    "performance": {
      title: str_(UIStrings.performanceCategoryTitle),
      supportedModes: ["navigation", "timespan", "snapshot"],
      auditRefs: [
        { id: "first-contentful-paint", weight: 10, group: "metrics", acronym: "FCP" },
        { id: "largest-contentful-paint", weight: 25, group: "metrics", acronym: "LCP" },
        { id: "total-blocking-time", weight: 30, group: "metrics", acronym: "TBT" },
        { id: "cumulative-layout-shift", weight: 25, group: "metrics", acronym: "CLS" },
        { id: "speed-index", weight: 10, group: "metrics", acronym: "SI" },
        { id: "interaction-to-next-paint", weight: 0, group: "metrics", acronym: "INP" },
        // Insight audits.
        { id: "cache-insight", weight: 0, group: "hidden" },
        { id: "cls-culprits-insight", weight: 0, group: "hidden" },
        { id: "document-latency-insight", weight: 0, group: "hidden" },
        { id: "dom-size-insight", weight: 0, group: "hidden" },
        { id: "duplicated-javascript-insight", weight: 0, group: "hidden" },
        { id: "font-display-insight", weight: 0, group: "hidden" },
        { id: "forced-reflow-insight", weight: 0, group: "hidden" },
        { id: "image-delivery-insight", weight: 0, group: "hidden" },
        { id: "inp-breakdown-insight", weight: 0, group: "hidden" },
        { id: "lcp-breakdown-insight", weight: 0, group: "hidden" },
        { id: "lcp-discovery-insight", weight: 0, group: "hidden" },
        { id: "legacy-javascript-insight", weight: 0, group: "hidden" },
        { id: "modern-http-insight", weight: 0, group: "hidden" },
        { id: "network-dependency-tree-insight", weight: 0, group: "hidden" },
        { id: "render-blocking-insight", weight: 0, group: "hidden" },
        { id: "third-parties-insight", weight: 0, group: "hidden" },
        { id: "viewport-insight", weight: 0, group: "hidden" },
        // These are our "invisible" metrics. Not displayed, but still in the LHR.
        { id: "interactive", weight: 0, group: "hidden", acronym: "TTI" },
        { id: "max-potential-fid", weight: 0, group: "hidden" },
        { id: "first-meaningful-paint", weight: 0, acronym: "FMP", group: "hidden" },
        { id: "render-blocking-resources", weight: 0, group: "diagnostics" },
        { id: "uses-responsive-images", weight: 0, group: "diagnostics" },
        { id: "offscreen-images", weight: 0, group: "diagnostics" },
        { id: "unminified-css", weight: 0, group: "diagnostics" },
        { id: "unminified-javascript", weight: 0, group: "diagnostics" },
        { id: "unused-css-rules", weight: 0, group: "diagnostics" },
        { id: "unused-javascript", weight: 0, group: "diagnostics" },
        { id: "uses-optimized-images", weight: 0, group: "diagnostics" },
        { id: "modern-image-formats", weight: 0, group: "diagnostics" },
        { id: "uses-text-compression", weight: 0, group: "diagnostics" },
        { id: "uses-rel-preconnect", weight: 0, group: "diagnostics" },
        { id: "server-response-time", weight: 0, group: "diagnostics" },
        { id: "redirects", weight: 0, group: "diagnostics" },
        { id: "uses-http2", weight: 0, group: "diagnostics" },
        { id: "efficient-animated-content", weight: 0, group: "diagnostics" },
        { id: "duplicated-javascript", weight: 0, group: "diagnostics" },
        { id: "legacy-javascript", weight: 0, group: "diagnostics" },
        { id: "prioritize-lcp-image", weight: 0, group: "diagnostics" },
        { id: "total-byte-weight", weight: 0, group: "diagnostics" },
        { id: "uses-long-cache-ttl", weight: 0, group: "diagnostics" },
        { id: "dom-size", weight: 0, group: "diagnostics" },
        { id: "critical-request-chains", weight: 0, group: "diagnostics" },
        { id: "user-timings", weight: 0, group: "diagnostics" },
        { id: "bootup-time", weight: 0, group: "diagnostics" },
        { id: "mainthread-work-breakdown", weight: 0, group: "diagnostics" },
        { id: "font-display", weight: 0, group: "diagnostics" },
        { id: "third-party-summary", weight: 0, group: "diagnostics" },
        { id: "third-party-facades", weight: 0, group: "diagnostics" },
        { id: "largest-contentful-paint-element", weight: 0, group: "diagnostics" },
        { id: "lcp-lazy-loaded", weight: 0, group: "diagnostics" },
        { id: "layout-shifts", weight: 0, group: "diagnostics" },
        { id: "uses-passive-event-listeners", weight: 0, group: "diagnostics" },
        { id: "no-document-write", weight: 0, group: "diagnostics" },
        { id: "long-tasks", weight: 0, group: "diagnostics" },
        { id: "non-composited-animations", weight: 0, group: "diagnostics" },
        { id: "unsized-images", weight: 0, group: "diagnostics" },
        { id: "viewport", weight: 0, group: "diagnostics" },
        { id: "uses-responsive-images-snapshot", weight: 0, group: "diagnostics" },
        { id: "work-during-interaction", weight: 0, group: "diagnostics" },
        { id: "bf-cache", weight: 0, group: "diagnostics" },
        // Audits past this point contain useful data but are not displayed with other audits.
        { id: "network-requests", weight: 0, group: "hidden" },
        { id: "network-rtt", weight: 0, group: "hidden" },
        { id: "network-server-latency", weight: 0, group: "hidden" },
        { id: "main-thread-tasks", weight: 0, group: "hidden" },
        { id: "diagnostics", weight: 0, group: "hidden" },
        { id: "metrics", weight: 0, group: "hidden" },
        { id: "screenshot-thumbnails", weight: 0, group: "hidden" },
        { id: "final-screenshot", weight: 0, group: "hidden" },
        { id: "script-treemap-data", weight: 0, group: "hidden" },
        { id: "resource-summary", weight: 0, group: "hidden" }
      ]
    },
    "accessibility": {
      title: str_(UIStrings.a11yCategoryTitle),
      description: str_(UIStrings.a11yCategoryDescription),
      manualDescription: str_(UIStrings.a11yCategoryManualDescription),
      supportedModes: ["navigation", "snapshot"],
      // Audit weights are meant to match the aXe scoring system of
      // minor, moderate, serious, and critical.
      // See the audits listed at dequeuniversity.com/rules/axe/4.7.
      // Click on an audit and check the right hand column to see its severity.
      auditRefs: [
        { id: "accesskeys", weight: 7, group: "a11y-navigation" },
        { id: "aria-allowed-attr", weight: 10, group: "a11y-aria" },
        { id: "aria-allowed-role", weight: 1, group: "a11y-aria" },
        { id: "aria-command-name", weight: 7, group: "a11y-aria" },
        { id: "aria-conditional-attr", weight: 7, group: "a11y-aria" },
        { id: "aria-deprecated-role", weight: 1, group: "a11y-aria" },
        { id: "aria-dialog-name", weight: 7, group: "a11y-aria" },
        { id: "aria-hidden-body", weight: 10, group: "a11y-aria" },
        { id: "aria-hidden-focus", weight: 7, group: "a11y-aria" },
        { id: "aria-input-field-name", weight: 7, group: "a11y-aria" },
        { id: "aria-meter-name", weight: 7, group: "a11y-aria" },
        { id: "aria-progressbar-name", weight: 7, group: "a11y-aria" },
        { id: "aria-prohibited-attr", weight: 7, group: "a11y-aria" },
        { id: "aria-required-attr", weight: 10, group: "a11y-aria" },
        { id: "aria-required-children", weight: 10, group: "a11y-aria" },
        { id: "aria-required-parent", weight: 10, group: "a11y-aria" },
        { id: "aria-roles", weight: 7, group: "a11y-aria" },
        { id: "aria-text", weight: 7, group: "a11y-aria" },
        { id: "aria-toggle-field-name", weight: 7, group: "a11y-aria" },
        { id: "aria-tooltip-name", weight: 7, group: "a11y-aria" },
        { id: "aria-treeitem-name", weight: 7, group: "a11y-aria" },
        { id: "aria-valid-attr-value", weight: 10, group: "a11y-aria" },
        { id: "aria-valid-attr", weight: 10, group: "a11y-aria" },
        { id: "button-name", weight: 10, group: "a11y-names-labels" },
        { id: "bypass", weight: 7, group: "a11y-navigation" },
        { id: "color-contrast", weight: 7, group: "a11y-color-contrast" },
        { id: "definition-list", weight: 7, group: "a11y-tables-lists" },
        { id: "dlitem", weight: 7, group: "a11y-tables-lists" },
        { id: "document-title", weight: 7, group: "a11y-names-labels" },
        { id: "duplicate-id-aria", weight: 10, group: "a11y-aria" },
        { id: "form-field-multiple-labels", weight: 3, group: "a11y-names-labels" },
        { id: "frame-title", weight: 7, group: "a11y-names-labels" },
        { id: "heading-order", weight: 3, group: "a11y-navigation" },
        { id: "html-has-lang", weight: 7, group: "a11y-language" },
        { id: "html-lang-valid", weight: 7, group: "a11y-language" },
        { id: "html-xml-lang-mismatch", weight: 3, group: "a11y-language" },
        { id: "image-alt", weight: 10, group: "a11y-names-labels" },
        { id: "image-redundant-alt", weight: 1, group: "a11y-names-labels" },
        { id: "input-button-name", weight: 10, group: "a11y-names-labels" },
        { id: "input-image-alt", weight: 10, group: "a11y-names-labels" },
        { id: "label", weight: 7, group: "a11y-names-labels" },
        { id: "link-in-text-block", weight: 7, group: "a11y-color-contrast" },
        { id: "link-name", weight: 7, group: "a11y-names-labels" },
        { id: "list", weight: 7, group: "a11y-tables-lists" },
        { id: "listitem", weight: 7, group: "a11y-tables-lists" },
        { id: "meta-refresh", weight: 10, group: "a11y-best-practices" },
        { id: "meta-viewport", weight: 10, group: "a11y-best-practices" },
        { id: "object-alt", weight: 7, group: "a11y-names-labels" },
        { id: "select-name", weight: 7, group: "a11y-names-labels" },
        { id: "skip-link", weight: 3, group: "a11y-names-labels" },
        { id: "tabindex", weight: 7, group: "a11y-navigation" },
        { id: "table-duplicate-name", weight: 1, group: "a11y-tables-lists" },
        { id: "target-size", weight: 7, group: "a11y-best-practices" },
        { id: "td-headers-attr", weight: 7, group: "a11y-tables-lists" },
        { id: "th-has-data-cells", weight: 7, group: "a11y-tables-lists" },
        { id: "valid-lang", weight: 7, group: "a11y-language" },
        { id: "video-caption", weight: 10, group: "a11y-audio-video" },
        // Manual audits
        { id: "focusable-controls", weight: 0 },
        { id: "interactive-element-affordance", weight: 0 },
        { id: "logical-tab-order", weight: 0 },
        { id: "visual-order-follows-dom", weight: 0 },
        { id: "focus-traps", weight: 0 },
        { id: "managed-focus", weight: 0 },
        { id: "use-landmarks", weight: 0 },
        { id: "offscreen-content-hidden", weight: 0 },
        { id: "custom-controls-labels", weight: 0 },
        { id: "custom-controls-roles", weight: 0 },
        // Hidden audits
        { id: "empty-heading", weight: 0, group: "hidden" },
        { id: "identical-links-same-purpose", weight: 0, group: "hidden" },
        { id: "landmark-one-main", weight: 0, group: "hidden" },
        { id: "label-content-name-mismatch", weight: 0, group: "hidden" },
        { id: "table-fake-caption", weight: 0, group: "hidden" },
        { id: "td-has-header", weight: 0, group: "hidden" }
      ]
    },
    "best-practices": {
      title: str_(UIStrings.bestPracticesCategoryTitle),
      supportedModes: ["navigation", "timespan", "snapshot"],
      auditRefs: [
        // Trust & Safety
        { id: "is-on-https", weight: 5, group: "best-practices-trust-safety" },
        { id: "redirects-http", weight: 1, group: "best-practices-trust-safety" },
        { id: "geolocation-on-start", weight: 1, group: "best-practices-trust-safety" },
        { id: "notification-on-start", weight: 1, group: "best-practices-trust-safety" },
        { id: "csp-xss", weight: 0, group: "best-practices-trust-safety" },
        { id: "has-hsts", weight: 0, group: "best-practices-trust-safety" },
        { id: "origin-isolation", weight: 0, group: "best-practices-trust-safety" },
        { id: "clickjacking-mitigation", weight: 0, group: "best-practices-trust-safety" },
        { id: "trusted-types-xss", weight: 0, group: "best-practices-trust-safety" },
        // User Experience
        { id: "paste-preventing-inputs", weight: 3, group: "best-practices-ux" },
        { id: "image-aspect-ratio", weight: 1, group: "best-practices-ux" },
        { id: "image-size-responsive", weight: 1, group: "best-practices-ux" },
        { id: "viewport", weight: 1, group: "best-practices-ux" },
        { id: "font-size", weight: 1, group: "best-practices-ux" },
        // Browser Compatibility
        { id: "doctype", weight: 1, group: "best-practices-browser-compat" },
        { id: "charset", weight: 1, group: "best-practices-browser-compat" },
        // General Group
        { id: "js-libraries", weight: 0, group: "best-practices-general" },
        { id: "deprecations", weight: 5, group: "best-practices-general" },
        { id: "third-party-cookies", weight: 5, group: "best-practices-general" },
        { id: "errors-in-console", weight: 1, group: "best-practices-general" },
        { id: "valid-source-maps", weight: 0, group: "best-practices-general" },
        { id: "inspector-issues", weight: 1, group: "best-practices-general" }
      ]
    },
    "seo": {
      title: str_(UIStrings.seoCategoryTitle),
      description: str_(UIStrings.seoCategoryDescription),
      manualDescription: str_(UIStrings.seoCategoryManualDescription),
      supportedModes: ["navigation", "snapshot"],
      auditRefs: [
        // Should be at least 31% of the score, such that this audit failing
        // results in the SEO category failing.
        // Solve for w:
        //    w / (w + T) >= 0.31
        // where T is the sum of all the other weights.
        { id: "is-crawlable", weight: 93 / 23, group: "seo-crawl" },
        { id: "document-title", weight: 1, group: "seo-content" },
        { id: "meta-description", weight: 1, group: "seo-content" },
        { id: "http-status-code", weight: 1, group: "seo-crawl" },
        { id: "link-text", weight: 1, group: "seo-content" },
        { id: "crawlable-anchors", weight: 1, group: "seo-crawl" },
        { id: "robots-txt", weight: 1, group: "seo-crawl" },
        { id: "image-alt", weight: 1, group: "seo-content" },
        { id: "hreflang", weight: 1, group: "seo-content" },
        { id: "canonical", weight: 1, group: "seo-content" },
        // Manual audits
        { id: "structured-data", weight: 0 }
      ]
    }
  }
};
Object.defineProperty(defaultConfig, "UIStrings", {
  enumerable: false,
  get: () => UIStrings
});
var default_config_default = defaultConfig;

// node_modules/lighthouse/core/config/validation.js
function isValidArtifactDependency(dependent, dependency) {
  const levels = { timespan: 0, snapshot: 1, navigation: 2 };
  const dependentLevel = Math.min(...dependent.instance.meta.supportedModes.map((l) => levels[l]));
  const dependencyLevel = Math.min(...dependency.instance.meta.supportedModes.map((l) => levels[l]));
  if (dependentLevel === levels.timespan) return dependencyLevel === levels.timespan;
  if (dependentLevel === levels.snapshot) return dependencyLevel === levels.snapshot;
  return true;
}
function assertValidPluginName(config, pluginName) {
  const parts = pluginName.split("/");
  if (parts.length === 2) {
    pluginName = parts[1];
  }
  if (!pluginName.startsWith("lighthouse-plugin-")) {
    throw new Error(`plugin name '${pluginName}' does not start with 'lighthouse-plugin-'`);
  }
  if (config.categories?.[pluginName]) {
    throw new Error(`plugin name '${pluginName}' not allowed because it is the id of a category already found in config`);
  }
}
function assertValidArtifact(artifactDefn) {
  const gatherer = artifactDefn.gatherer.instance;
  if (typeof gatherer.meta !== "object") {
    throw new Error(`Gatherer for ${artifactDefn.id} did not provide a meta object.`);
  }
  if (gatherer.meta.supportedModes.length === 0) {
    throw new Error(`Gatherer for ${artifactDefn.id} did not support any gather modes.`);
  }
  if (typeof gatherer.getArtifact !== "function" || gatherer.getArtifact === base_gatherer_default.prototype.getArtifact) {
    throw new Error(`Gatherer for ${artifactDefn.id} did not define a "getArtifact" method.`);
  }
}
function assertValidAudit(auditDefinition) {
  const { implementation, path: auditPath } = auditDefinition;
  const auditName = auditPath || implementation?.meta?.id || "Unknown audit";
  if (typeof implementation.audit !== "function" || implementation.audit === Audit.audit) {
    throw new Error(`${auditName} has no audit() method.`);
  }
  if (typeof implementation.meta.id !== "string") {
    throw new Error(`${auditName} has no meta.id property, or the property is not a string.`);
  }
  if (!isStringOrIcuMessage(implementation.meta.title)) {
    throw new Error(`${auditName} has no meta.title property, or the property is not a string.`);
  }
  const scoreDisplayMode = implementation.meta.scoreDisplayMode || Audit.SCORING_MODES.BINARY;
  if (!isStringOrIcuMessage(implementation.meta.failureTitle) && scoreDisplayMode === Audit.SCORING_MODES.BINARY) {
    throw new Error(`${auditName} has no meta.failureTitle and should.`);
  }
  if (!isStringOrIcuMessage(implementation.meta.description)) {
    throw new Error(
      `${auditName} has no meta.description property, or the property is not a string.`
    );
  } else if (implementation.meta.description === "") {
    throw new Error(
      `${auditName} has an empty meta.description string. Please add a description for the UI.`
    );
  }
  if (!Array.isArray(implementation.meta.requiredArtifacts)) {
    throw new Error(
      `${auditName} has no meta.requiredArtifacts property, or the property is not an array.`
    );
  }
}
function assertValidCategories(categories, audits, groups) {
  if (!categories) {
    return;
  }
  const auditsKeyedById = new Map((audits || []).map((audit) => {
    return [audit.implementation.meta.id, audit];
  }));
  Object.keys(categories).forEach((categoryId) => {
    categories[categoryId].auditRefs.forEach((auditRef, index) => {
      if (!auditRef.id) {
        throw new Error(`missing an audit id at ${categoryId}[${index}]`);
      }
      const audit = auditsKeyedById.get(auditRef.id);
      if (!audit) {
        throw new Error(`could not find ${auditRef.id} audit for category ${categoryId}`);
      }
      const auditImpl = audit.implementation;
      const isManual = auditImpl.meta.scoreDisplayMode === "manual";
      if (categoryId === "accessibility" && !auditRef.group && !isManual) {
        throw new Error(`${auditRef.id} accessibility audit does not have a group`);
      }
      if (auditRef.weight > 0 && isManual) {
        throw new Error(`${auditRef.id} is manual but has a positive weight`);
      }
      if (auditRef.group && (!groups || !groups[auditRef.group])) {
        throw new Error(`${auditRef.id} references unknown group ${auditRef.group}`);
      }
    });
  });
}
function assertValidSettings(settings) {
  if (!settings.formFactor) {
    throw new Error(`\`settings.formFactor\` must be defined as 'mobile' or 'desktop'. See https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md`);
  }
  if (!settings.screenEmulation.disabled) {
    if (settings.screenEmulation.mobile !== (settings.formFactor === "mobile")) {
      throw new Error(`Screen emulation mobile setting (${settings.screenEmulation.mobile}) does not match formFactor setting (${settings.formFactor}). See https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md`);
    }
  }
  const skippedAndOnlyAuditId = settings.skipAudits?.find((auditId) => settings.onlyAudits?.includes(auditId));
  if (skippedAndOnlyAuditId) {
    throw new Error(`${skippedAndOnlyAuditId} appears in both skipAudits and onlyAudits`);
  }
}
function assertValidArtifacts(artifactDefns) {
  const availableArtifacts = /* @__PURE__ */ new Set();
  for (const artifact of artifactDefns) {
    assertValidArtifact(artifact);
    if (availableArtifacts.has(artifact.id)) {
      throw new Error(`Config defined multiple artifacts with id '${artifact.id}'`);
    }
    availableArtifacts.add(artifact.id);
    if (!artifact.dependencies) continue;
    for (const [dependencyKey, { id: dependencyId }] of Object.entries(artifact.dependencies)) {
      if (availableArtifacts.has(dependencyId)) continue;
      throwInvalidDependencyOrder(artifact.id, dependencyKey);
    }
  }
}
function assertValidConfig(resolvedConfig) {
  assertValidArtifacts(resolvedConfig.artifacts || []);
  for (const auditDefn of resolvedConfig.audits || []) {
    assertValidAudit(auditDefn);
  }
  assertValidCategories(resolvedConfig.categories, resolvedConfig.audits, resolvedConfig.groups);
  assertValidSettings(resolvedConfig.settings);
}
function throwInvalidDependencyOrder(artifactId, dependencyKey) {
  throw new Error(
    [
      `Failed to find dependency "${dependencyKey}" for "${artifactId}" artifact`,
      `Check that...`,
      `  1. A gatherer exposes a matching Symbol that satisfies "${dependencyKey}".`,
      `  2. "${dependencyKey}" is configured to run before "${artifactId}"`
    ].join("\n")
  );
}
function throwInvalidArtifactDependency(artifactId, dependencyKey) {
  throw new Error(
    [
      `Dependency "${dependencyKey}" for "${artifactId}" artifact is invalid.`,
      `The dependency must be collected before the dependent.`
    ].join("\n")
  );
}

// node_modules/lighthouse/core/config/filters.js
var baseArtifactKeySource = {
  fetchTime: "",
  LighthouseRunWarnings: "",
  BenchmarkIndex: "",
  HostDPR: "",
  settings: "",
  Timing: "",
  URL: "",
  PageLoadError: "",
  HostFormFactor: "",
  HostUserAgent: "",
  HostProduct: "",
  GatherContext: ""
};
var baseArtifactKeys = Object.keys(baseArtifactKeySource);
var filterResistantAuditIds = [];
var filterResistantArtifactIds = ["Stacks", "NetworkUserAgent", "FullPageScreenshot"];
function getAuditIdsInCategories(allCategories, onlyCategories) {
  if (!allCategories) return /* @__PURE__ */ new Set();
  onlyCategories = onlyCategories || Object.keys(allCategories);
  const categories = onlyCategories.map((categoryId) => allCategories[categoryId]);
  const auditRefs = categories.flatMap((category) => category?.auditRefs || []);
  return new Set(auditRefs.map((auditRef) => auditRef.id));
}
function filterArtifactsByAvailableAudits(artifacts, audits) {
  if (!artifacts) return null;
  if (!audits) return artifacts;
  const artifactsById = new Map(artifacts.map((artifact) => [artifact.id, artifact]));
  const artifactIdsToKeep = /* @__PURE__ */ new Set([
    ...filterResistantArtifactIds,
    ...audits.flatMap((audit) => audit.implementation.meta.requiredArtifacts)
  ]);
  let previousSize = 0;
  while (previousSize !== artifactIdsToKeep.size) {
    previousSize = artifactIdsToKeep.size;
    for (const artifactId of artifactIdsToKeep) {
      const artifact = artifactsById.get(artifactId);
      if (!artifact) continue;
      if (!artifact.dependencies) continue;
      for (const dep of Object.values(artifact.dependencies)) {
        artifactIdsToKeep.add(dep.id);
      }
    }
  }
  return artifacts.filter((artifact) => artifactIdsToKeep.has(artifact.id));
}
function filterArtifactsByGatherMode(artifacts, mode) {
  if (!artifacts) return null;
  return artifacts.filter((artifact) => {
    return artifact.gatherer.instance.meta.supportedModes.includes(mode);
  });
}
function filterAuditsByAvailableArtifacts(audits, availableArtifacts) {
  if (!audits) return null;
  const availableArtifactIds = new Set(
    availableArtifacts.map((artifact) => artifact.id).concat(baseArtifactKeys)
  );
  return audits.filter((audit) => {
    const meta = audit.implementation.meta;
    return meta.requiredArtifacts.every((id) => availableArtifactIds.has(id));
  });
}
function filterAuditsByGatherMode(audits, mode) {
  if (!audits) return null;
  return audits.filter((audit) => {
    const meta = audit.implementation.meta;
    return !meta.supportedModes || meta.supportedModes.includes(mode);
  });
}
function filterCategoriesByGatherMode(categories, mode) {
  if (!categories) return null;
  const categoriesToKeep = Object.entries(categories).filter(([_, category]) => {
    return !category.supportedModes || category.supportedModes.includes(mode);
  });
  return Object.fromEntries(categoriesToKeep);
}
function filterCategoriesByExplicitFilters(categories, onlyCategories) {
  if (!categories || !onlyCategories) return categories;
  const categoriesToKeep = Object.entries(categories).filter(([categoryId]) => onlyCategories.includes(categoryId));
  return Object.fromEntries(categoriesToKeep);
}
function warnOnUnknownOnlyCategories(allCategories, onlyCategories) {
  if (!onlyCategories) return;
  for (const onlyCategoryId of onlyCategories) {
    if (!allCategories?.[onlyCategoryId]) {
      lighthouse_logger_default.warn("config", `unrecognized category in 'onlyCategories': ${onlyCategoryId}`);
    }
  }
}
function filterCategoriesByAvailableAudits(categories, availableAudits) {
  if (!categories) return categories;
  const availableAuditIdToMeta = new Map(
    availableAudits.map((audit) => [audit.implementation.meta.id, audit.implementation.meta])
  );
  const categoryEntries = Object.entries(categories).map(([categoryId, category]) => {
    const filteredCategory = {
      ...category,
      auditRefs: category.auditRefs.filter((ref) => availableAuditIdToMeta.has(ref.id))
    };
    const didFilter = filteredCategory.auditRefs.length < category.auditRefs.length;
    const hasOnlyManualAudits = filteredCategory.auditRefs.every((ref) => {
      const meta = availableAuditIdToMeta.get(ref.id);
      if (!meta) return false;
      return meta.scoreDisplayMode === Audit.SCORING_MODES.MANUAL;
    });
    if (didFilter && hasOnlyManualAudits) filteredCategory.auditRefs = [];
    return [categoryId, filteredCategory];
  }).filter((entry) => typeof entry[1] === "object" && entry[1].auditRefs.length);
  return Object.fromEntries(categoryEntries);
}
function filterConfigByGatherMode(resolvedConfig, mode) {
  const artifacts = filterArtifactsByGatherMode(resolvedConfig.artifacts, mode);
  const supportedAudits = filterAuditsByGatherMode(resolvedConfig.audits, mode);
  const audits = filterAuditsByAvailableArtifacts(supportedAudits, artifacts || []);
  const supportedCategories = filterCategoriesByGatherMode(resolvedConfig.categories, mode);
  const categories = filterCategoriesByAvailableAudits(supportedCategories, audits || []);
  return {
    ...resolvedConfig,
    artifacts,
    audits,
    categories
  };
}
function filterConfigByExplicitFilters(resolvedConfig, filters) {
  const { onlyAudits, onlyCategories, skipAudits } = filters;
  if (onlyAudits && !onlyAudits.length) {
    throw new Error(`onlyAudits cannot be an empty array.`);
  }
  if (onlyCategories && !onlyCategories.length) {
    throw new Error(`onlyCategories cannot be an empty array.`);
  }
  warnOnUnknownOnlyCategories(resolvedConfig.categories, onlyCategories);
  let baseAuditIds = getAuditIdsInCategories(resolvedConfig.categories, void 0);
  if (onlyCategories) {
    baseAuditIds = getAuditIdsInCategories(resolvedConfig.categories, onlyCategories);
  } else if (onlyAudits) {
    baseAuditIds = /* @__PURE__ */ new Set();
  } else if (!resolvedConfig.categories || !Object.keys(resolvedConfig.categories).length) {
    baseAuditIds = new Set(resolvedConfig.audits?.map((audit) => audit.implementation.meta.id));
  }
  const auditIdsToKeep = new Set(
    [
      ...baseAuditIds,
      // Start with our base audits.
      ...onlyAudits || [],
      // Additionally include the opt-in audits from `onlyAudits`.
      ...filterResistantAuditIds
      // Always include any filter-resistant audits.
    ].filter((auditId) => !skipAudits || !skipAudits.includes(auditId))
  );
  const audits = auditIdsToKeep.size && resolvedConfig.audits ? resolvedConfig.audits.filter((audit) => auditIdsToKeep.has(audit.implementation.meta.id)) : resolvedConfig.audits;
  const availableCategories = filterCategoriesByAvailableAudits(resolvedConfig.categories, audits || []);
  const categories = filterCategoriesByExplicitFilters(availableCategories, onlyCategories);
  let artifacts = filterArtifactsByAvailableAudits(resolvedConfig.artifacts, audits);
  if (artifacts && resolvedConfig.settings.disableFullPageScreenshot) {
    artifacts = artifacts.filter(({ id }) => id !== "FullPageScreenshot");
  }
  return {
    ...resolvedConfig,
    artifacts,
    audits,
    categories
  };
}

// node_modules/lighthouse/core/config/config-helpers.js
import path3 from "path";
import { createRequire } from "module";
import url from "url";

// node_modules/lighthouse/core/config/config-plugin.js
function isArrayOfUnknownObjects(arr) {
  return Array.isArray(arr) && arr.every(isObjectOfUnknownProperties);
}
function isObjectOfUnknownProperties(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}
function objectIsGatherMode(str) {
  if (typeof str !== "string") return false;
  return str === "navigation" || str === "timespan" || str === "snapshot";
}
function isArrayOfGatherModes(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every(objectIsGatherMode);
}
function assertNoExcessProperties(obj, pluginName, objectName = "") {
  if (objectName) {
    objectName += " ";
  }
  const invalidKeys = Object.keys(obj);
  if (invalidKeys.length > 0) {
    const keys = invalidKeys.join(", ");
    throw new Error(`${pluginName} has unrecognized ${objectName}properties: [${keys}]`);
  }
}
var ConfigPlugin = class _ConfigPlugin {
  /**
   * Extract and validate the list of AuditDefns added by the plugin (or undefined
   * if no additional audits are being added by the plugin).
   * @param {unknown} auditsJson
   * @param {string} pluginName
   * @return {Array<{path: string}>|undefined}
   */
  static _parseAuditsList(auditsJson, pluginName) {
    if (auditsJson === void 0) {
      return void 0;
    } else if (!isArrayOfUnknownObjects(auditsJson)) {
      throw new Error(`${pluginName} has an invalid audits array.`);
    }
    return auditsJson.map((auditDefnJson) => {
      const { path: path5, ...invalidRest } = auditDefnJson;
      assertNoExcessProperties(invalidRest, pluginName, "audit");
      if (typeof path5 !== "string") {
        throw new Error(`${pluginName} has a missing audit path.`);
      }
      return {
        path: path5
      };
    });
  }
  /**
   * Extract and validate the list of category AuditRefs added by the plugin.
   * @param {unknown} auditRefsJson
   * @param {string} pluginName
   * @return {Array<LH.Config.AuditRefJson>}
   */
  static _parseAuditRefsList(auditRefsJson, pluginName) {
    if (!isArrayOfUnknownObjects(auditRefsJson)) {
      throw new Error(`${pluginName} has no valid auditsRefs.`);
    }
    return auditRefsJson.map((auditRefJson) => {
      const { id, weight, group, ...invalidRest } = auditRefJson;
      assertNoExcessProperties(invalidRest, pluginName, "auditRef");
      if (typeof id !== "string") {
        throw new Error(`${pluginName} has an invalid auditRef id.`);
      }
      if (typeof weight !== "number") {
        throw new Error(`${pluginName} has an invalid auditRef weight.`);
      }
      if (typeof group !== "string" && typeof group !== "undefined") {
        throw new Error(`${pluginName} has an invalid auditRef group.`);
      }
      const prependedGroup = group ? `${pluginName}-${group}` : group;
      return {
        id,
        weight,
        group: prependedGroup
      };
    });
  }
  /**
   * Extract and validate the category added by the plugin.
   * @param {unknown} categoryJson
   * @param {string} pluginName
   * @return {LH.Config.CategoryJson}
   */
  static _parseCategory(categoryJson, pluginName) {
    if (!isObjectOfUnknownProperties(categoryJson)) {
      throw new Error(`${pluginName} has no valid category.`);
    }
    const {
      title,
      description,
      manualDescription,
      auditRefs: auditRefsJson,
      supportedModes,
      ...invalidRest
    } = categoryJson;
    assertNoExcessProperties(invalidRest, pluginName, "category");
    if (!isStringOrIcuMessage(title)) {
      throw new Error(`${pluginName} has an invalid category tile.`);
    }
    if (!isStringOrIcuMessage(description) && description !== void 0) {
      throw new Error(`${pluginName} has an invalid category description.`);
    }
    if (!isStringOrIcuMessage(manualDescription) && manualDescription !== void 0) {
      throw new Error(`${pluginName} has an invalid category manualDescription.`);
    }
    if (!isArrayOfGatherModes(supportedModes) && supportedModes !== void 0) {
      throw new Error(
        `${pluginName} supportedModes must be an array, valid array values are "navigation", "timespan", and "snapshot".`
      );
    }
    const auditRefs = _ConfigPlugin._parseAuditRefsList(auditRefsJson, pluginName);
    return {
      title,
      auditRefs,
      description,
      manualDescription,
      supportedModes
    };
  }
  /**
   * Extract and validate groups JSON added by the plugin.
   * @param {unknown} groupsJson
   * @param {string} pluginName
   * @return {Record<string, LH.Config.GroupJson>|undefined}
   */
  static _parseGroups(groupsJson, pluginName) {
    if (groupsJson === void 0) {
      return void 0;
    }
    if (!isObjectOfUnknownProperties(groupsJson)) {
      throw new Error(`${pluginName} groups json is not defined as an object.`);
    }
    const groups = Object.entries(groupsJson);
    const parsedGroupsJson = {};
    groups.forEach(([groupId, groupJson]) => {
      if (!isObjectOfUnknownProperties(groupJson)) {
        throw new Error(`${pluginName} has a group not defined as an object.`);
      }
      const { title, description, ...invalidRest } = groupJson;
      assertNoExcessProperties(invalidRest, pluginName, "group");
      if (!isStringOrIcuMessage(title)) {
        throw new Error(`${pluginName} has an invalid group title.`);
      }
      if (!isStringOrIcuMessage(description) && description !== void 0) {
        throw new Error(`${pluginName} has an invalid group description.`);
      }
      parsedGroupsJson[`${pluginName}-${groupId}`] = {
        title,
        description
      };
    });
    return parsedGroupsJson;
  }
  /**
   * Extracts and validates a config from the provided plugin input, throwing
   * if it deviates from the expected object shape.
   * @param {unknown} pluginJson
   * @param {string} pluginName
   * @return {LH.Config}
   */
  static parsePlugin(pluginJson, pluginName) {
    pluginJson = JSON.parse(JSON.stringify(pluginJson));
    if (!isObjectOfUnknownProperties(pluginJson)) {
      throw new Error(`${pluginName} is not defined as an object.`);
    }
    const {
      audits: pluginAuditsJson,
      category: pluginCategoryJson,
      groups: pluginGroupsJson,
      ...invalidRest
    } = pluginJson;
    assertNoExcessProperties(invalidRest, pluginName);
    return {
      audits: _ConfigPlugin._parseAuditsList(pluginAuditsJson, pluginName),
      categories: {
        [pluginName]: _ConfigPlugin._parseCategory(pluginCategoryJson, pluginName)
      },
      groups: _ConfigPlugin._parseGroups(pluginGroupsJson, pluginName)
    };
  }
};
var config_plugin_default = ConfigPlugin;

// node_modules/lighthouse/core/config/config-helpers.js
var require2 = createRequire(import.meta.url);
function isBundledEnvironment() {
  if (global.isDevtools || global.isLightrider) return true;
  try {
    require2.resolve("lighthouse-logger");
    return false;
  } catch (err) {
    return true;
  }
}
var mergeOptionsOfItems = function(items) {
  const mergedItems = [];
  for (const item of items) {
    const existingItem = item.path && mergedItems.find((candidate) => candidate.path === item.path);
    if (!existingItem) {
      mergedItems.push(item);
      continue;
    }
    existingItem.options = Object.assign({}, existingItem.options, item.options);
  }
  return mergedItems;
};
function _mergeConfigFragment(base, extension, overwriteArrays = false) {
  if (typeof base === "undefined" || base === null) {
    return extension;
  } else if (typeof extension === "undefined") {
    return base;
  } else if (Array.isArray(extension)) {
    if (overwriteArrays) return extension;
    if (!Array.isArray(base)) throw new TypeError(`Expected array but got ${typeof base}`);
    const merged = base.slice();
    extension.forEach((item) => {
      if (!merged.some((candidate) => isEqual_default(candidate, item))) merged.push(item);
    });
    return merged;
  } else if (typeof extension === "object") {
    if (typeof base !== "object") throw new TypeError(`Expected object but got ${typeof base}`);
    if (Array.isArray(base)) throw new TypeError("Expected object but got Array");
    Object.keys(extension).forEach((key) => {
      const localOverwriteArrays = overwriteArrays || key === "settings" && typeof base[key] === "object";
      base[key] = _mergeConfigFragment(base[key], extension[key], localOverwriteArrays);
    });
    return base;
  }
  return extension;
}
var mergeConfigFragment = _mergeConfigFragment;
function mergeConfigFragmentArrayByKey(baseArray, extensionArray, keyFn) {
  const itemsByKey = /* @__PURE__ */ new Map();
  const mergedArray = baseArray || [];
  for (let i = 0; i < mergedArray.length; i++) {
    const item = mergedArray[i];
    itemsByKey.set(keyFn(item), { index: i, item });
  }
  for (const item of extensionArray || []) {
    const baseItemEntry = itemsByKey.get(keyFn(item));
    if (baseItemEntry) {
      const baseItem = baseItemEntry.item;
      const merged = typeof item === "object" && typeof baseItem === "object" ? mergeConfigFragment(baseItem, item, true) : item;
      mergedArray[baseItemEntry.index] = merged;
    } else {
      mergedArray.push(item);
    }
  }
  return mergedArray;
}
function expandGathererShorthand(gatherer) {
  if (typeof gatherer === "string") {
    return { path: gatherer };
  } else if ("implementation" in gatherer || "instance" in gatherer) {
    return gatherer;
  } else if ("path" in gatherer) {
    if (typeof gatherer.path !== "string") {
      throw new Error("Invalid Gatherer type " + JSON.stringify(gatherer));
    }
    return gatherer;
  } else if (typeof gatherer === "function") {
    return { implementation: gatherer };
  } else if (gatherer && typeof gatherer.getArtifact === "function") {
    return { instance: gatherer };
  } else {
    throw new Error("Invalid Gatherer type " + JSON.stringify(gatherer));
  }
}
function expandAuditShorthand(audit) {
  if (typeof audit === "string") {
    return { path: audit, options: {} };
  } else if ("implementation" in audit && typeof audit.implementation.audit === "function") {
    return audit;
  } else if ("path" in audit && typeof audit.path === "string") {
    return audit;
  } else if ("audit" in audit && typeof audit.audit === "function") {
    return { implementation: audit, options: {} };
  } else {
    throw new Error("Invalid Audit type " + JSON.stringify(audit));
  }
}
var bundledModules = /* @__PURE__ */ new Map(
  /* BUILD_REPLACE_BUNDLED_MODULES */
);
async function requireWrapper(requirePath) {
  if (path3.isAbsolute(requirePath)) {
    requirePath = url.pathToFileURL(requirePath).href;
  }
  let module;
  if (bundledModules.has(requirePath)) {
    module = await bundledModules.get(requirePath);
  } else if (requirePath.match(/\.(js|mjs|cjs)$/)) {
    module = await import(requirePath);
  } else {
    requirePath += ".js";
    module = await import(requirePath);
  }
  if (module.default) return module.default;
  const methods = /* @__PURE__ */ new Set(["meta"]);
  const possibleNamedExports = Object.keys(module).filter((key) => {
    if (!(module[key] && module[key] instanceof Object)) return false;
    return Object.getOwnPropertyNames(module[key]).some((method) => methods.has(method));
  });
  if (possibleNamedExports.length === 1) return possibleNamedExports[0];
  if (possibleNamedExports.length > 1) {
    throw new Error(`module '${requirePath}' has too many possible exports`);
  }
  throw new Error(`module '${requirePath}' missing default export`);
}
async function requireGatherer(gathererPath, coreGathererList, configDir) {
  const coreGatherer = coreGathererList.find((a) => a === `${gathererPath}.js`);
  let requirePath = `../gather/gatherers/${gathererPath}`;
  if (!coreGatherer) {
    requirePath = resolveModulePath(gathererPath, configDir, "gatherer");
  }
  const GathererClass = (
    /** @type {GathererConstructor} */
    await requireWrapper(requirePath)
  );
  return {
    instance: new GathererClass(),
    implementation: GathererClass,
    path: gathererPath
  };
}
function requireAudit(auditPath, coreAuditList, configDir) {
  const auditPathJs = `${auditPath}.js`;
  const coreAudit = coreAuditList.find((a) => a === auditPathJs);
  let requirePath = `../audits/${auditPath}`;
  if (!coreAudit) {
    if (isBundledEnvironment()) {
      requirePath = auditPath;
    } else {
      const absolutePath = resolveModulePath(auditPath, configDir, "audit");
      if (isBundledEnvironment()) {
        requirePath = path3.relative(getModuleDirectory(import.meta), absolutePath);
      } else {
        requirePath = absolutePath;
      }
    }
  }
  return requireWrapper(requirePath);
}
function cleanFlagsForSettings(flags = {}) {
  const settings = {};
  for (const key of Object.keys(flags)) {
    if (key in defaultSettings) {
      settings[key] = flags[key];
    }
  }
  return settings;
}
function resolveSettings(settingsJson = {}, overrides = void 0) {
  const locale = lookupLocale(overrides?.locale || settingsJson.locale);
  const { defaultSettings: defaultSettings2 } = constants_exports;
  const settingWithDefaults = mergeConfigFragment(deepClone(defaultSettings2), settingsJson, true);
  const settingsWithFlags = mergeConfigFragment(
    settingWithDefaults,
    cleanFlagsForSettings(overrides),
    true
  );
  settingsWithFlags.locale = locale;
  if (settingsWithFlags.emulatedUserAgent === true) {
    settingsWithFlags.emulatedUserAgent = userAgents[settingsWithFlags.formFactor];
  }
  assertValidSettings(settingsWithFlags);
  return settingsWithFlags;
}
async function mergePlugins(config, configDir, flags) {
  const configPlugins = config.plugins || [];
  const flagPlugins = flags?.plugins || [];
  const pluginNames = /* @__PURE__ */ new Set([...configPlugins, ...flagPlugins]);
  for (const pluginName of pluginNames) {
    assertValidPluginName(config, pluginName);
    const pluginPath = isBundledEnvironment() ? pluginName : resolveModulePath(pluginName, configDir, "plugin");
    const rawPluginJson = await requireWrapper(pluginPath);
    const pluginJson = config_plugin_default.parsePlugin(rawPluginJson, pluginName);
    config = mergeConfigFragment(config, pluginJson);
  }
  return config;
}
async function resolveGathererToDefn(gathererJson, coreGathererList, configDir) {
  const gathererDefn = expandGathererShorthand(gathererJson);
  if (gathererDefn.instance) {
    return {
      instance: gathererDefn.instance,
      implementation: gathererDefn.implementation,
      path: gathererDefn.path
    };
  } else if (gathererDefn.implementation) {
    const GathererClass = gathererDefn.implementation;
    return {
      instance: new GathererClass(),
      implementation: gathererDefn.implementation,
      path: gathererDefn.path
    };
  } else if (gathererDefn.path) {
    const path5 = gathererDefn.path;
    return requireGatherer(path5, coreGathererList, configDir);
  } else {
    throw new Error("Invalid expanded Gatherer: " + JSON.stringify(gathererDefn));
  }
}
async function resolveAuditsToDefns(audits, configDir) {
  if (!audits) {
    return null;
  }
  const coreList = Runner.getAuditList();
  const auditDefnsPromises = audits.map(async (auditJson) => {
    const auditDefn = expandAuditShorthand(auditJson);
    let implementation;
    if ("implementation" in auditDefn) {
      implementation = auditDefn.implementation;
    } else {
      implementation = await requireAudit(auditDefn.path, coreList, configDir);
    }
    return {
      implementation,
      path: auditDefn.path,
      options: auditDefn.options || {}
    };
  });
  const auditDefns = await Promise.all(auditDefnsPromises);
  const mergedAuditDefns = mergeOptionsOfItems(auditDefns);
  mergedAuditDefns.forEach((audit) => assertValidAudit(audit));
  return mergedAuditDefns;
}
function resolveModulePath(moduleIdentifier, configDir, category) {
  try {
    return require2.resolve(moduleIdentifier);
  } catch (e) {
  }
  try {
    return require2.resolve(moduleIdentifier, { paths: [process.cwd()] });
  } catch (e) {
  }
  const cwdPath = path3.resolve(process.cwd(), moduleIdentifier);
  try {
    return require2.resolve(cwdPath);
  } catch (e) {
  }
  const errorString = "Unable to locate " + (category ? `${category}: ` : "") + `\`${moduleIdentifier}\`.
     Tried to resolve the module from these locations:
       ${getModuleDirectory(import.meta)}
       ${cwdPath}`;
  if (!configDir) {
    throw new Error(errorString);
  }
  const relativePath = path3.resolve(configDir, moduleIdentifier);
  try {
    return require2.resolve(relativePath);
  } catch (requireError) {
  }
  try {
    return require2.resolve(moduleIdentifier, { paths: [configDir] });
  } catch (requireError) {
  }
  throw new Error(errorString + `
       ${relativePath}`);
}
function shallowClone(item) {
  if (typeof item === "object") {
    return Object.assign(
      Object.create(
        Object.getPrototypeOf(item)
      ),
      item
    );
  }
  return item;
}
function deepClone(json) {
  return JSON.parse(JSON.stringify(json));
}
function deepCloneConfigJson(json) {
  const cloned = deepClone(json);
  if (Array.isArray(json.audits)) {
    cloned.audits = json.audits.map((audit) => shallowClone(audit));
  }
  if (Array.isArray(json.artifacts)) {
    cloned.artifacts = json.artifacts.map((artifact) => ({
      ...artifact,
      gatherer: shallowClone(artifact.gatherer)
    }));
  }
  return cloned;
}

// node_modules/lighthouse/core/config/config.js
var defaultConfigPath = path4.join(
  getModuleDirectory(import.meta),
  "../../config/default-config.js"
);
var internalArtifactPriorities = {
  FullPageScreenshot: 1,
  BFCacheFailures: 1
};
function resolveWorkingCopy(config, context) {
  let { configPath } = context;
  if (configPath && !path4.isAbsolute(configPath)) {
    throw new Error("configPath must be an absolute path");
  }
  if (!config) {
    config = default_config_default;
    configPath = defaultConfigPath;
  }
  const configDir = configPath ? path4.dirname(configPath) : void 0;
  return {
    configWorkingCopy: deepCloneConfigJson(config),
    configPath,
    configDir
  };
}
function resolveExtensions(config) {
  if (!config.extends) return config;
  if (config.extends !== "lighthouse:default") {
    throw new Error("`lighthouse:default` is the only valid extension method.");
  }
  const { artifacts, ...extensionJSON } = config;
  const defaultClone = deepCloneConfigJson(default_config_default);
  const mergedConfig = mergeConfigFragment(defaultClone, extensionJSON);
  mergedConfig.artifacts = mergeConfigFragmentArrayByKey(
    defaultClone.artifacts,
    artifacts,
    (artifact) => artifact.id
  );
  return mergedConfig;
}
function resolveArtifactDependencies(artifact, gatherer, artifactDefnsBySymbol) {
  if (!("dependencies" in gatherer.instance.meta)) return void 0;
  const dependencies = Object.entries(gatherer.instance.meta.dependencies).map(
    ([dependencyName, artifactSymbol]) => {
      const dependency = artifactDefnsBySymbol.get(artifactSymbol);
      if (!dependency) throwInvalidDependencyOrder(artifact.id, dependencyName);
      const validDependency = isValidArtifactDependency(gatherer, dependency.gatherer);
      if (!validDependency) throwInvalidArtifactDependency(artifact.id, dependencyName);
      return [dependencyName, { id: dependency.id }];
    }
  );
  return Object.fromEntries(dependencies);
}
async function resolveArtifactsToDefns(artifacts, configDir) {
  if (!artifacts) return null;
  const status = { msg: "Resolve artifact definitions", id: "lh:config:resolveArtifactsToDefns" };
  lighthouse_logger_default.time(status, "verbose");
  const sortedArtifacts = [...artifacts];
  sortedArtifacts.sort((a, b) => {
    const aPriority = internalArtifactPriorities[a.id] || 0;
    const bPriority = internalArtifactPriorities[b.id] || 0;
    return aPriority - bPriority;
  });
  const artifactDefnsBySymbol = /* @__PURE__ */ new Map();
  const coreGathererList = Runner.getGathererList();
  const artifactDefns = [];
  for (const artifactJson of sortedArtifacts) {
    const gathererJson = artifactJson.gatherer;
    const gatherer = await resolveGathererToDefn(gathererJson, coreGathererList, configDir);
    const artifact = {
      id: artifactJson.id,
      gatherer,
      dependencies: resolveArtifactDependencies(artifactJson, gatherer, artifactDefnsBySymbol)
    };
    const symbol = artifact.gatherer.instance.meta.symbol;
    if (symbol) artifactDefnsBySymbol.set(symbol, artifact);
    artifactDefns.push(artifact);
  }
  lighthouse_logger_default.timeEnd(status);
  return artifactDefns;
}
function overrideSettingsForGatherMode(settings, gatherMode) {
  if (gatherMode === "timespan") {
    if (settings.throttlingMethod === "simulate") {
      settings.throttlingMethod = "devtools";
    }
  }
}
function overrideThrottlingWindows(settings) {
  if (settings.throttlingMethod === "simulate") return;
  settings.cpuQuietThresholdMs = Math.max(
    settings.cpuQuietThresholdMs || 0,
    nonSimulatedSettingsOverrides.cpuQuietThresholdMs
  );
  settings.networkQuietThresholdMs = Math.max(
    settings.networkQuietThresholdMs || 0,
    nonSimulatedSettingsOverrides.networkQuietThresholdMs
  );
  settings.pauseAfterFcpMs = Math.max(
    settings.pauseAfterFcpMs || 0,
    nonSimulatedSettingsOverrides.pauseAfterFcpMs
  );
  settings.pauseAfterLoadMs = Math.max(
    settings.pauseAfterLoadMs || 0,
    nonSimulatedSettingsOverrides.pauseAfterLoadMs
  );
}
async function initializeConfig(gatherMode, config, flags = {}) {
  const status = { msg: "Initialize config", id: "lh:config" };
  lighthouse_logger_default.time(status, "verbose");
  let { configWorkingCopy, configDir } = resolveWorkingCopy(config, flags);
  configWorkingCopy = resolveExtensions(configWorkingCopy);
  configWorkingCopy = await mergePlugins(configWorkingCopy, configDir, flags);
  const settings = resolveSettings(configWorkingCopy.settings || {}, flags);
  overrideSettingsForGatherMode(settings, gatherMode);
  overrideThrottlingWindows(settings);
  const artifacts = await resolveArtifactsToDefns(configWorkingCopy.artifacts, configDir);
  let resolvedConfig = {
    artifacts,
    audits: await resolveAuditsToDefns(configWorkingCopy.audits, configDir),
    categories: configWorkingCopy.categories || null,
    groups: configWorkingCopy.groups || null,
    settings
  };
  assertValidConfig(resolvedConfig);
  resolvedConfig = filterConfigByGatherMode(resolvedConfig, gatherMode);
  resolvedConfig = filterConfigByExplicitFilters(resolvedConfig, settings);
  lighthouse_logger_default.timeEnd(status);
  return { resolvedConfig };
}

// node_modules/lighthouse/core/lib/sentry.js
var SENTRY_URL = "https://a6bb0da87ee048cc9ae2a345fc09ab2e:63a7029f46f74265981b7e005e0f69f8@sentry.io/174697";
var SAMPLE_RATE = 0.01;
var noop = () => {
};
var sentryDelegate = {
  init,
  /** @type {(message: string, level?: SeverityLevel) => void} */
  captureMessage: noop,
  /** @type {(breadcrumb: Breadcrumb) => void} */
  captureBreadcrumb: noop,
  /** @type {() => any} */
  getContext: noop,
  /** @type {(error: Error, options: {level?: string, tags?: {[key: string]: any}, extra?: {[key: string]: any}}) => Promise<void>} */
  captureException: async () => {
  },
  _shouldSample() {
    return SAMPLE_RATE >= Math.random();
  }
};
async function init(opts) {
  if (!opts.flags.enableErrorReporting) {
    return;
  }
  if (!sentryDelegate._shouldSample()) {
    return;
  }
  try {
    const Sentry2 = await import("./esm-KEB64B5I.js");
    Sentry2.init({
      ...opts.environmentData,
      dsn: SENTRY_URL
    });
    let settings = opts.flags;
    try {
      const { resolvedConfig } = await initializeConfig("navigation", opts.config, opts.flags);
      settings = resolvedConfig.settings;
    } catch {
    }
    const baseTags = {
      channel: settings.channel,
      formFactor: settings.formFactor,
      throttlingMethod: settings.throttlingMethod
    };
    Sentry2.setTags(baseTags);
    const extras = {
      ...settings.throttling,
      url: opts.url
    };
    Sentry2.setExtras(extras);
    sentryDelegate.captureMessage = (...args) => Sentry2.captureMessage(...args);
    sentryDelegate.captureBreadcrumb = (...args) => Sentry2.addBreadcrumb(...args);
    sentryDelegate.getContext = () => extras;
    const sentryExceptionCache = /* @__PURE__ */ new Map();
    sentryDelegate.captureException = async (err, opts2 = {}) => {
      if (!err) return;
      if (err.expected) return;
      const tags = opts2.tags || {};
      if (tags.audit) {
        const key = `audit-${tags.audit}-${err.message}`;
        if (sentryExceptionCache.has(key)) return;
        sentryExceptionCache.set(key, true);
      }
      if (tags.gatherer) {
        const key = `gatherer-${tags.gatherer}-${err.message}`;
        if (sentryExceptionCache.has(key)) return;
        sentryExceptionCache.set(key, true);
      }
      if (err.protocolMethod) {
        opts2.fingerprint = ["{{ default }}", err.protocolMethod, err.protocolError];
        opts2.tags = opts2.tags || {};
        opts2.tags.protocolMethod = err.protocolMethod;
      }
      Sentry2.withScope((scope) => {
        if (opts2.level) {
          scope.setLevel(opts2.level);
        }
        if (opts2.tags) {
          scope.setTags(opts2.tags);
        }
        let extra;
        if (opts2.extra) extra = { ...opts2.extra };
        if (err.extra) extra = { ...extra, ...err.extra };
        if (extra) {
          scope.setExtras(extra);
        }
        Sentry2.captureException(err);
      });
    };
  } catch (e) {
    lighthouse_logger_default.warn(
      "sentry",
      "Could not load Sentry, errors will not be reported."
    );
  }
}
var Sentry = sentryDelegate;

export {
  Sentry
};
/*! Bundled license information:

lighthouse-stack-packs/packs/joomla.js:
  (**
   * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

lighthouse/core/audits/audit.js:
lighthouse/core/lib/asset-saver.js:
lighthouse/core/runner.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/scoring.js:
lighthouse/core/lib/lantern-trace-saver.js:
lighthouse/core/computed/load-simulator.js:
lighthouse/report/generator/report-assets.js:
lighthouse/core/config/constants.js:
lighthouse/core/config/default-config.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/stack-packs.js:
lighthouse/core/config/config-plugin.js:
lighthouse/core/config/config-helpers.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/traces/metric-trace-events.js:
lighthouse/core/computed/network-analysis.js:
lighthouse/report/generator/report-generator.js:
lighthouse/core/lib/sentry.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/report/generator/flow-report-assets.js:
lighthouse/core/config/validation.js:
lighthouse/core/config/filters.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/third-party-web.js:
lighthouse/core/config/config.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/entity-classification.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
