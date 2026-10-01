# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Horsepower - empty inputs show inline errors
- Location: tests\playwright-edge-cases.test.ts:16:5

# Error details

```
Error: page.goto: Page crashed
Call log:
  - navigating to "http://localhost:4321/calculators/horsepower/", waiting until "load"

```

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\HomePC\AppData\Local\ms-playwright\firefox-1543\firefox\firefox.exe -no-remote -headless -profile C:\Users\HomePC\AppData\Local\Temp\playwright_firefoxdev_profile-kZJdPe -juggler-pipe -silent
<launched> pid=13048
[pid=13048][err] *** You are running in headless mode.
[pid=13048][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 125: unreachable code after return statement
[pid=13048][out] 
[pid=13048][out] Juggler listening to the pipe
[pid=13048][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=2.91313) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
[pid=13048][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
[pid=13048][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=2.91313) |[1][GFX1-]: VideoBridgeParent receives IPC close with reason=AbnormalShutdown (t=6.47893) [GFX1-]: VideoBridgeParent receives IPC close with reason=AbnormalShutdown
```