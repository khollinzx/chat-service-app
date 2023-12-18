export const API = "http://localhost:9901/api/v1/";
export const pusherKey = "e7a354fc3e33aa655051";
export const pushCluster = "eu";

export const Headers = () => {
   return {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
   }
}
export const AuthHeaders = (token) => {
   return {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': `Bearer ${token}`,
   }
}