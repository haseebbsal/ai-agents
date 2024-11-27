'use client'

import BaseButton from "@/components/common/base-button"
import BaseInput from "@/components/form/base-input"
import BaseAgentInput from "@/components/form/base-input-agent"
import { axiosInstance } from "@/utils/instance"
import { useRouter } from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
interface LoginData{
    email:string,
    password:string
}
export default function Login() {
    const { handleSubmit, control } = useForm()
    const router=useRouter()
    const loginMutation=useMutation((data:LoginData)=> axiosInstance.post('/auth/login',data),{
        onSuccess(data) {
            console.log('sucess',data.data)
            router.replace('/')
            router.refresh()
        },
        onError(error:any) {
            toast.error(error.response.data.detail)
            console.log('error',error)
        },
    })
    function LoginSubmit(e: FieldValues) {
        loginMutation.mutate(e as LoginData)

    }
    return (
        <>
            <form onSubmit={handleSubmit(LoginSubmit)} className=" w-1/2   flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mx-auto mb-4">
                <div className="text-xl text-center font-semibold">Login</div>
                <BaseAgentInput name="email" type="email" control={control} placeholder="Enter Email" labelPlacement="outside" label="Email" rules={{ required: "Enter Email" }} />
                <BaseAgentInput name="password" type="password" control={control} placeholder="Enter Password" labelPlacement="outside" label="Password" rules={{ required: "Enter Email" }} />
                <BaseButton isLoading={loginMutation.isLoading} isDisabled={loginMutation.isLoading} type="submit" className="min-w-28">Log In</BaseButton>
            </form>
        </>
    )
}