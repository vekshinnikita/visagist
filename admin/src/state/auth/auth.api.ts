import { axiosAPI, setNewHeaders } from "@/utils";
import { SERVER_URL } from "@/env";
import { SignInData } from "@/types/models";

const tokenObtainUrl = SERVER_URL + "/token/obtain/";

export const signInApi = (signInData: SignInData) =>
  axiosAPI
    .post(tokenObtainUrl, signInData)
    .then((response) => setNewHeaders(response));
