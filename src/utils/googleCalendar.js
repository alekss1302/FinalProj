import { gapi } from "gapi-script";

const CLIENT_ID = "591158148607-qesq94m7v8od286j9bv7uens0jdum2ui.apps.googleusercontent.com";
const API_KEY = "AIzaSyD-JV12cN_Ql8B2QgpAUQ8_XnhiZJ6hSg8";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initGoogleAPI = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      ],
      scope: SCOPES,
    });
  });
};

export const signInToGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {
    await auth.signIn();
  }
};

export const createGoogleCalendarEvent = async (event) => {
  await gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};
