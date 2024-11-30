'use client'

import BaseButton from "@/components/common/base-button"
import BaseInput from "@/components/form/base-input"
import BaseAgentInput from "@/components/form/base-input-agent"
import { axiosInstance } from "@/utils/instance"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
interface LoginData{
    email:string,
    password:string
}
export default function ForgotPassword() {
    const { handleSubmit, control } = useForm()
    const router=useRouter()
    const loginMutation=useMutation((data:LoginData)=> axiosInstance.post(`/auth/forgot-password?email=${data.email}`),{
        onSuccess(data) {
            console.log('sucess',data.data)
            router.replace(`/change-password?email=${data.data.email}`)
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
            <form onSubmit={handleSubmit(LoginSubmit)} className=" sm:w-1/2 w-[90%]  flex flex-col gap-4 p-4 border-2 rounded-lg border-main-2  mt-4 mx-auto mb-4">
                <div className="text-xl text-center font-semibold">Forgot Password</div>
                <BaseAgentInput name="email" type="email" control={control} placeholder="Enter Email" labelPlacement="outside" label="Email" rules={{ required: "Enter Email" }} />
                <BaseButton isLoading={loginMutation.isLoading} isDisabled={loginMutation.isLoading} type="submit" className="min-w-28">Submit</BaseButton>
            </form>
        </>
    )
}