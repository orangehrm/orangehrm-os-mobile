package com.orangehrm.opensource;

import android.os.Build;
import android.os.Bundle;
import androidx.activity.OnBackPressedCallback;
import androidx.core.view.WindowCompat;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  // Apps targeting SDK 36+ get predictive back on Android 16+, so the system no
  // longer calls onBackPressed() and ReactActivity never forwards the press to JS
  // (the app just closed). Route back presses through the dispatcher instead.
  private final OnBackPressedCallback backPressedCallback =
      new OnBackPressedCallback(true) {
        @Override
        public void handleOnBackPressed() {
          if (!getReactActivityDelegate().onBackPressed()) {
            invokeDefaultOnBackPressed();
          }
        }
      };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // Fix for SDK 35 overlapping issues
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    }

    getOnBackPressedDispatcher().addCallback(this, backPressedCallback);
  }

  /**
   * Called when JS doesn't handle the back press (e.g. on a root screen). Disable our
   * callback so the dispatcher falls through to the system default instead of looping
   * back into it.
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    backPressedCallback.setEnabled(false);
    super.invokeDefaultOnBackPressed();
    backPressedCallback.setEnabled(true);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "OrangeHRM";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        false); // Disable New Architecture/Fabric
  }
}
