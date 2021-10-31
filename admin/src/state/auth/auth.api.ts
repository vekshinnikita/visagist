import { api, setNewHeaders } from "@/utils";
import { SignInData } from "@/types/models";

const tokenObtainUrl = "/token/obtain/";

export const signInApi = (signInData: SignInData) =>
  api
    .post(tokenObtainUrl, signInData)
    .then((response) => setNewHeaders(response));
