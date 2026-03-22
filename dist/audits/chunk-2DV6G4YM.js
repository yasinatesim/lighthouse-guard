import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  EntityClassificationComputed
} from "./chunk-EXNQHM7K.js";
import {
  NetworkAnalysisComputed
} from "./chunk-UNPQMFMQ.js";
import {
  simulation_exports
} from "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import {
  LighthouseError
} from "./chunk-4VECFSJ3.js";
import {
  isEqual_default,
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  createIcuMessageFn,
  getFormatted,
  getModuleDirectory,
  getRendererFormattedStrings,
  isStringOrIcuMessage,
  lighthouseVersion,
  lookupLocale,
  replaceIcuMessages
} from "./chunk-4MZOSFEN.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import {
  init_shim_fs,
  shim_fs_default
} from "./chunk-7FMDRUEI.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __commonJS,
  __export,
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

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

// node_modules/lighthouse/core/computed/load-simulator.js
var LoadSimulator = class {
  static {
    __name(this, "LoadSimulator");
  }
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

// node_modules/lighthouse/core/config/config.js
import path4 from "path";

// node_modules/lighthouse/core/runner.js
init_shim_fs();
import path2 from "path";

// node_modules/lighthouse/core/scoring.js
var clampTo2Decimals = /* @__PURE__ */ __name((val) => Math.round(val * 100) / 100, "clampTo2Decimals");
var ReportScoring = class _ReportScoring {
  static {
    __name(this, "ReportScoring");
  }
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
    return clampTo2Decimals(results.sum / results.weight || 0);
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
__name(getStackPacks, "getStackPacks");

// node_modules/lighthouse/core/lib/asset-saver.js
init_shim_fs();
import path from "path";
import stream from "stream";
import { createGzip, gunzipSync } from "zlib";
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
__name(writeJson, "writeJson");
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
__name(readJson, "readJson");
function endsWithSuffix(filename, suffix) {
  return filename.endsWith(suffix) || filename.endsWith(suffix + ".gz");
}
__name(endsWithSuffix, "endsWithSuffix");
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
__name(loadArtifacts, "loadArtifacts");
function stringifyReplacer(key, value) {
  if (value instanceof Error) {
    return LighthouseError.stringifyReplacer(value);
  }
  return value;
}
__name(stringifyReplacer, "stringifyReplacer");
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
__name(saveArtifacts, "saveArtifacts");
function saveLhr(lhr, basePath) {
  shim_fs_default.writeFileSync(`${basePath}/lhr.report.json`, JSON.stringify(lhr, null, 2));
}
__name(saveLhr, "saveLhr");
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
__name(arrayOfObjectsJsonGenerator, "arrayOfObjectsJsonGenerator");
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
__name(traceJsonGenerator, "traceJsonGenerator");
function saveTrace(traceData, traceFilename, options = {}) {
  const traceIter = traceJsonGenerator(traceData);
  return writeJson(traceIter, traceFilename, !!options.gzip);
}
__name(saveTrace, "saveTrace");
function saveDevtoolsLog(devtoolsLog, devtoolLogFilename, options = {}) {
  return writeJson(function* () {
    yield* arrayOfObjectsJsonGenerator(devtoolsLog);
    yield "\n";
  }, devtoolLogFilename, !!options.gzip);
}
__name(saveDevtoolsLog, "saveDevtoolsLog");

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
  static {
    __name(this, "ReportGenerator");
  }
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
    const escape = /* @__PURE__ */ __name((value) => `"${value.replace(/"/g, '""')}"`, "escape");
    const rowFormatter = /* @__PURE__ */ __name((row) => row.map((value) => {
      if (value === null) return "null";
      return value.toString();
    }).map(escape), "rowFormatter");
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

// node_modules/lighthouse/core/runner.js
var moduleDir3 = getModuleDirectory(import.meta);
var Runner = class _Runner {
  static {
    __name(this, "Runner");
  }
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
  get: /* @__PURE__ */ __name(() => UIStrings, "get")
});
var default_config_default = defaultConfig;

// node_modules/lighthouse/core/gather/base-gatherer.js
var BaseGatherer = class {
  static {
    __name(this, "BaseGatherer");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = { supportedModes: [] };
  /**
   * Method to start observing a page for an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startInstrumentation(passContext) {
  }
  /**
   * Method to start observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to stop observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   *
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to end observing a page after an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopInstrumentation(passContext) {
  }
  /**
   * Method to gather results about a page.
   * @param {LH.Gatherer.Context} passContext
   * @return {LH.Gatherer.PhaseResult}
   */
  getArtifact(passContext) {
  }
};
var base_gatherer_default = BaseGatherer;

// node_modules/lighthouse/core/config/validation.js
function isValidArtifactDependency(dependent, dependency) {
  const levels = { timespan: 0, snapshot: 1, navigation: 2 };
  const dependentLevel = Math.min(...dependent.instance.meta.supportedModes.map((l) => levels[l]));
  const dependencyLevel = Math.min(...dependency.instance.meta.supportedModes.map((l) => levels[l]));
  if (dependentLevel === levels.timespan) return dependencyLevel === levels.timespan;
  if (dependentLevel === levels.snapshot) return dependencyLevel === levels.snapshot;
  return true;
}
__name(isValidArtifactDependency, "isValidArtifactDependency");
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
__name(assertValidPluginName, "assertValidPluginName");
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
__name(assertValidArtifact, "assertValidArtifact");
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
__name(assertValidAudit, "assertValidAudit");
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
__name(assertValidCategories, "assertValidCategories");
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
__name(assertValidSettings, "assertValidSettings");
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
__name(assertValidArtifacts, "assertValidArtifacts");
function assertValidConfig(resolvedConfig) {
  assertValidArtifacts(resolvedConfig.artifacts || []);
  for (const auditDefn of resolvedConfig.audits || []) {
    assertValidAudit(auditDefn);
  }
  assertValidCategories(resolvedConfig.categories, resolvedConfig.audits, resolvedConfig.groups);
  assertValidSettings(resolvedConfig.settings);
}
__name(assertValidConfig, "assertValidConfig");
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
__name(throwInvalidDependencyOrder, "throwInvalidDependencyOrder");
function throwInvalidArtifactDependency(artifactId, dependencyKey) {
  throw new Error(
    [
      `Dependency "${dependencyKey}" for "${artifactId}" artifact is invalid.`,
      `The dependency must be collected before the dependent.`
    ].join("\n")
  );
}
__name(throwInvalidArtifactDependency, "throwInvalidArtifactDependency");

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
__name(getAuditIdsInCategories, "getAuditIdsInCategories");
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
__name(filterArtifactsByAvailableAudits, "filterArtifactsByAvailableAudits");
function filterArtifactsByGatherMode(artifacts, mode) {
  if (!artifacts) return null;
  return artifacts.filter((artifact) => {
    return artifact.gatherer.instance.meta.supportedModes.includes(mode);
  });
}
__name(filterArtifactsByGatherMode, "filterArtifactsByGatherMode");
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
__name(filterAuditsByAvailableArtifacts, "filterAuditsByAvailableArtifacts");
function filterAuditsByGatherMode(audits, mode) {
  if (!audits) return null;
  return audits.filter((audit) => {
    const meta = audit.implementation.meta;
    return !meta.supportedModes || meta.supportedModes.includes(mode);
  });
}
__name(filterAuditsByGatherMode, "filterAuditsByGatherMode");
function filterCategoriesByGatherMode(categories, mode) {
  if (!categories) return null;
  const categoriesToKeep = Object.entries(categories).filter(([_, category]) => {
    return !category.supportedModes || category.supportedModes.includes(mode);
  });
  return Object.fromEntries(categoriesToKeep);
}
__name(filterCategoriesByGatherMode, "filterCategoriesByGatherMode");
function filterCategoriesByExplicitFilters(categories, onlyCategories) {
  if (!categories || !onlyCategories) return categories;
  const categoriesToKeep = Object.entries(categories).filter(([categoryId]) => onlyCategories.includes(categoryId));
  return Object.fromEntries(categoriesToKeep);
}
__name(filterCategoriesByExplicitFilters, "filterCategoriesByExplicitFilters");
function warnOnUnknownOnlyCategories(allCategories, onlyCategories) {
  if (!onlyCategories) return;
  for (const onlyCategoryId of onlyCategories) {
    if (!allCategories?.[onlyCategoryId]) {
      lighthouse_logger_default.warn("config", `unrecognized category in 'onlyCategories': ${onlyCategoryId}`);
    }
  }
}
__name(warnOnUnknownOnlyCategories, "warnOnUnknownOnlyCategories");
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
__name(filterCategoriesByAvailableAudits, "filterCategoriesByAvailableAudits");
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
__name(filterConfigByGatherMode, "filterConfigByGatherMode");
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
__name(filterConfigByExplicitFilters, "filterConfigByExplicitFilters");

// node_modules/lighthouse/core/config/config-helpers.js
import path3 from "path";
import { createRequire } from "module";
import url from "url";

// node_modules/lighthouse/core/config/config-plugin.js
function isArrayOfUnknownObjects(arr) {
  return Array.isArray(arr) && arr.every(isObjectOfUnknownProperties);
}
__name(isArrayOfUnknownObjects, "isArrayOfUnknownObjects");
function isObjectOfUnknownProperties(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}
__name(isObjectOfUnknownProperties, "isObjectOfUnknownProperties");
function objectIsGatherMode(str) {
  if (typeof str !== "string") return false;
  return str === "navigation" || str === "timespan" || str === "snapshot";
}
__name(objectIsGatherMode, "objectIsGatherMode");
function isArrayOfGatherModes(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every(objectIsGatherMode);
}
__name(isArrayOfGatherModes, "isArrayOfGatherModes");
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
__name(assertNoExcessProperties, "assertNoExcessProperties");
var ConfigPlugin = class _ConfigPlugin {
  static {
    __name(this, "ConfigPlugin");
  }
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
__name(isBundledEnvironment, "isBundledEnvironment");
var mergeOptionsOfItems = /* @__PURE__ */ __name(function(items) {
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
}, "mergeOptionsOfItems");
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
__name(_mergeConfigFragment, "_mergeConfigFragment");
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
__name(mergeConfigFragmentArrayByKey, "mergeConfigFragmentArrayByKey");
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
__name(expandGathererShorthand, "expandGathererShorthand");
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
__name(expandAuditShorthand, "expandAuditShorthand");
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
__name(requireWrapper, "requireWrapper");
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
__name(requireGatherer, "requireGatherer");
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
__name(requireAudit, "requireAudit");
function cleanFlagsForSettings(flags = {}) {
  const settings = {};
  for (const key of Object.keys(flags)) {
    if (key in defaultSettings) {
      settings[key] = flags[key];
    }
  }
  return settings;
}
__name(cleanFlagsForSettings, "cleanFlagsForSettings");
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
__name(resolveSettings, "resolveSettings");
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
__name(mergePlugins, "mergePlugins");
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
__name(resolveGathererToDefn, "resolveGathererToDefn");
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
__name(resolveAuditsToDefns, "resolveAuditsToDefns");
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
__name(resolveModulePath, "resolveModulePath");
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
__name(shallowClone, "shallowClone");
function deepClone(json) {
  return JSON.parse(JSON.stringify(json));
}
__name(deepClone, "deepClone");
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
__name(deepCloneConfigJson, "deepCloneConfigJson");

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
__name(resolveWorkingCopy, "resolveWorkingCopy");
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
__name(resolveExtensions, "resolveExtensions");
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
__name(resolveArtifactDependencies, "resolveArtifactDependencies");
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
__name(resolveArtifactsToDefns, "resolveArtifactsToDefns");
function overrideSettingsForGatherMode(settings, gatherMode) {
  if (gatherMode === "timespan") {
    if (settings.throttlingMethod === "simulate") {
      settings.throttlingMethod = "devtools";
    }
  }
}
__name(overrideSettingsForGatherMode, "overrideSettingsForGatherMode");
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
__name(overrideThrottlingWindows, "overrideThrottlingWindows");
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
__name(initializeConfig, "initializeConfig");

// node_modules/lighthouse/core/lib/sentry.js
var SENTRY_URL = "https://a6bb0da87ee048cc9ae2a345fc09ab2e:63a7029f46f74265981b7e005e0f69f8@sentry.io/174697";
var SAMPLE_RATE = 0.01;
var noop = /* @__PURE__ */ __name(() => {
}, "noop");
var sentryDelegate = {
  init,
  /** @type {(message: string, level?: SeverityLevel) => void} */
  captureMessage: noop,
  /** @type {(breadcrumb: Breadcrumb) => void} */
  captureBreadcrumb: noop,
  /** @type {() => any} */
  getContext: noop,
  /** @type {(error: Error, options: {level?: string, tags?: {[key: string]: any}, extra?: {[key: string]: any}}) => Promise<void>} */
  captureException: /* @__PURE__ */ __name(async () => {
  }, "captureException"),
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
    const Sentry2 = await import("./esm-7Z7BNDKM.js");
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
__name(init, "init");
var Sentry = sentryDelegate;

export {
  LoadSimulatorComputed,
  defaultSettings,
  base_gatherer_default,
  Sentry
};
/*! Bundled license information:

lighthouse-stack-packs/packs/joomla.js:
  (**
   * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)

lighthouse/core/computed/load-simulator.js:
lighthouse/core/config/constants.js:
lighthouse/core/scoring.js:
lighthouse/core/lib/lantern-trace-saver.js:
lighthouse/report/generator/report-assets.js:
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
lighthouse/report/generator/report-generator.js:
lighthouse/core/lib/sentry.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/asset-saver.js:
lighthouse/core/runner.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/report/generator/flow-report-assets.js:
lighthouse/core/gather/base-gatherer.js:
lighthouse/core/config/validation.js:
lighthouse/core/config/filters.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/config/config.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
