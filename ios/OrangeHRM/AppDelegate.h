#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

#import "RNAppAuthAuthorizationFlowManager.h"

@interface AppDelegate : RCTAppDelegate<RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;



@end

// UIScene life cycle is mandatory for apps built with the iOS 27 SDK.
// The window and React root view are created per scene (see Info.plist UIApplicationSceneManifest).
@interface SceneDelegate : UIResponder <UIWindowSceneDelegate>

@property(nonatomic, strong) UIWindow *window;

@end
