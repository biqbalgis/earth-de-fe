import type {GoogleLoginResponse} from "react-google-login";
import CommonUtils from "../../base/utils/CommonUtils";
import {AlertType} from "../../base/model/SnackbarSlice";
class AuthUtils {

  static googleLogin (p1: GoogleLoginResponse ) { //| GoogleLoginResponseOffline
    // @ts-ignore
    const profile: BasicProfile = p1.getBasicProfile();
    // store.dispatch(setProfilePicURL(profile.getImageUrl()));
    const data = {
      id : p1.getId(),
      googleId:  p1.googleId,
      accessId: p1.accessToken,
      code:  p1.code,
      tokenId:  p1.tokenId,
      tokenObj: p1.tokenObj,
      profile : {
        id : profile.getId(),
        name: profile.getName(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      }
    };
    console.log(data);
    CommonUtils.showSnackbar(`Welcome, ${profile.getName()}`, AlertType.success);
  }

  static googleLoginError (error: any) {
    console.error("google login error", error);
    // store.dispatch(setAuthentication(false));
    // this.logoutUser
    const msg = typeof (error) == "string" ? error : "Failed to login. Please try again";
    // CommonUtils.getBackToMainPage(msg);

    CommonUtils.showSnackbar(msg,  AlertType.error);
    // CommonUtils.showSnackbar("Failed to login. Please try again", AlertType.error);
  }
}

export default AuthUtils;
