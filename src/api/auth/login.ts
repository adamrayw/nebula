import { ISignIn } from "@/types/inputSignin";

export const login = async ({ data }: { data: ISignIn }): Promise<void> => {

    const response = await fetch('http://localhost:8080/api/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if(!response.ok) {
        throw new Error(result.message)
    }

    sessionStorage.setItem("token", result.token)
    sessionStorage.setItem("user", JSON.stringify(result.data))

    return result;
}